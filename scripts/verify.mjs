import path from 'node:path';import fs from 'node:fs/promises';import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
function run(command,args){const r=spawnSync(command,args,{cwd:root,stdio:'inherit'});if(r.status!==0)process.exit(r.status??1);}
run(process.execPath,['scripts/repository-check.mjs']);
for(const folder of ['bin','lib','runtime','scripts','tests','examples/six-dots/scenes'])for(const name of await fs.readdir(path.join(root,folder)))if(name.endsWith('.mjs'))run(process.execPath,['--check',path.join(folder,name)]);
const py=spawnSync('python3',['--version'],{stdio:'ignore'});if(py.status===0)run('python3',['-c',"import ast,pathlib; ast.parse(pathlib.Path('python/narrate.py').read_text()); print('Python syntax passed; voice inference is a separate check.')"]);else console.log('Python syntax not checked: python3 unavailable. Bundled-media tests still run.');
const gitRoot=spawnSync('git',['rev-parse','--show-toplevel'],{cwd:root,encoding:'utf8'}).stdout?.trim();if(gitRoot===root)run(process.execPath,['scripts/check-commit.mjs','--history']);else console.log('Git history not checked: this is a source archive, not a Git checkout.');
const tests=(await fs.readdir(path.join(root,'tests'))).filter(f=>f.endsWith('.test.mjs')).map(f=>'tests/'+f);run(process.execPath,['--test',...tests]);
console.log('Verification passed. No video render, model download or speech inference was requested.');
