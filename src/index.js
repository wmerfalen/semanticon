const fs = require('fs');

class Parser {

  constructor(buf){
    this.buf = buf;
    this.headers = [];
    this.program = [];
    this.binds = [];
  }

  parse(){

  }

  dump(){
    console.log(JSON.stringify({
      headers: this.headers,
      program: this.program,
      binds: this.binds,
    },null,2));
  }
}

const main = async (args) => {
  const file = args.file;
  let buf = await fs.readFileSync(file);
  buf = buf.toString();
  let parser = new Parser(buf);
  delete buf;
  parser.parse();
  parser.dump();
};

(async () => {
  let file = null;
  for(const arg of process.argv){
    let match = arg.match(/^\-\-file=(.*)$/);
    if(match && match[1]){
      file = match[1];
      continue;
    }
  }
  if(!file){
    file = 'template.txt';
  }
  await main({file});
})();
