const fs=require("fs");
const fsPromises = require("fs").promises;
const path=require("path");
const {v4:uuid}=require('uuid');
const dirCodes=path.join(__dirname,"codes");

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}

const generateFile=async(format,content)=>{
    try {
        const jobid=uuid();
        const filename=`${jobid}.${format}`;
        const filepath=path.join(dirCodes,filename);
    
        await fsPromises.writeFile(filepath,content);
        return filepath;
    } catch(err) {
        console.log(err)
        return null;
    }
    

};
module.exports={
    generateFile
}