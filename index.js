const {generateFile}=require("./generateFile");
const express=require("express");
const app=express();
// const {executeCpp}=require("./executeCpp");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({server:"hello from server side"});
})

app.post("/run",async(req,res)=>{
    const {language="cpp",code}=req.body;
    if(code == undefined){
       return res.status(400).json({"success":false,"error":"Empty code body !"});
    }


    // need to generate a c++ file with content from the request
    const filepath=await generateFile(language,code);
    if(!filepath) {
        return res.status(503).json({"success": false, "error": "File Creation Error"});
    }
    // we need to run the file and send the response
    // const output=await executeCpp(filepath);

    return res.json({filepath});
})

const port=process.env.PORT || 5050

app.listen(port,(req,res)=>{
    console.log(`server is listening at port number ${port}`);
})  