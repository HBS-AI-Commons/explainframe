import fs from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {messageProblems,aiIdentity} from './message-policy.mjs';
const args=process.argv.slice(2),problems=[];
if(args[0]==='--file'){
  const text=await fs.readFile(args[1],'utf8');problems.push(...messageProblems(text));
  const gitDir=spawnSync('git',['rev-parse','--git-dir'],{encoding:'utf8'}).stdout?.trim();
  if(gitDir){for(const identity of ['GIT_AUTHOR_IDENT','GIT_COMMITTER_IDENT']){const r=spawnSync('git',['var',identity],{encoding:'utf8'});if(r.status===0&&aiIdentity(r.stdout.replace(/>.*$/,'>')))problems.push('Use the actual responsible human Git identity; do not attribute authorship to an AI agent.');}}
}else if(args[0]==='--pr-event'){
  const event=JSON.parse(await fs.readFile(args[1],'utf8'));
  if(event.pull_request){problems.push(...messageProblems(event.pull_request.title),...messageProblems(event.pull_request.body??'',{subject:false}));}
}else if(args[0]==='--history'){
  const r=spawnSync('git',['log','--all','--format=%H%x1f%P%x1f%an%x1f%ae%x1f%cn%x1f%ce%x1f%B%x1e'],{encoding:'utf8',maxBuffer:16*1024*1024});
  if(r.status!==0){console.error('Cannot inspect Git history. Run this command in the repository.');process.exit(1);}
  let count=0;
  for(const record of r.stdout.split('\x1e').filter(s=>s.trim())){
    const [sha,parents,name,email,committer,committerEmail,...parts]=record.trim().split('\x1f');count++;
    const issues=messageProblems(parts.join('\x1f'),{allowMerge:parents.split(' ').length>1});
    if(aiIdentity(name+' <'+email+'>')||aiIdentity(committer+' <'+committerEmail+'>'))issues.push('AI/bot author identity requires maintainer review.');
    for(const issue of issues)problems.push(sha.slice(0,8)+': '+issue);
  }
  console.log('Inspected '+count+' commits.');
}else{console.error('Use --file MESSAGE_FILE, --history, or --pr-event EVENT_JSON.');process.exit(1);}
if(problems.length){console.error(problems.join('\n'));process.exit(1);}console.log('Message policy passed.');
