import {spawnSync} from 'node:child_process';
const current=spawnSync('git',['config','--get','core.hooksPath'],{encoding:'utf8'}).stdout.trim();
if(current&&current!=='.githooks'){console.error('Existing hooks path: '+current+'. Preserve it; integrate the message check rather than replacing its hooks.');process.exit(1);}
const r=spawnSync('git',['config','--local','core.hooksPath','.githooks'],{stdio:'inherit'});process.exitCode=r.status??1;if(!process.exitCode)console.log('Installed repository-local commit-message hook. Other repositories and global settings are unchanged.');
