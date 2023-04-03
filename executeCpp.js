const {exec} = require("child_process");

const fs=require("fs");
const path=require("path");


const outputPath=path.join(__dirname,"output");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executeCpp=(filepath)=>{
    // 8d8cbb2d-5b57-461e-8f8f-5a706254b5b3.c
    const jobId=path.basename(filepath).split(".")[0];
    const outPath=path.join(outputPath,`${jobId}.out`);
    

    return new Promise((resolve,reject)=>{
        exec(
          `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out `,
          (error,stdout,stderr)=>{
            // error && reject({error,stderr});
            // stderr && reject(stderr);
            if(error){
              console.log({error,stderr});
              reject({error,stderr});
            }
            if(stderr){
              console.log(stderr);
              reject(stderr);
            }

            resolve(stdout);
          }
        )
    })
}

module.exports={
    executeCpp,
}

