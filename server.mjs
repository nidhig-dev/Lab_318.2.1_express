import express from "express";
import globalErr from "./middleware/globalErrorHandle.mjs";
import fs from "fs";
import baseRoutes from "./routes/baseRoutes.mjs"
import morgan from "morgan";

const app=express();
const PORT=3000;

// middle ware

app.use(morgan('combined'));

//define template engine
app.engine("perscholas",(path,options,callback)=>{
    fs.readFile(path,(error,content)=>{
        if(error){
            return(callback(error));
        }
        let rendered=content
        .toString()
        .replaceAll("#heading#",options.heading)
        .replace("#info#",options.info)
        .replace("#title",options.title);
    return(callback(null,rendered)); 

    })
})
// specify dir for template engine
app.set("views","./views");
//register template engine
app.set("view engine","perscholas");

//routes
app.use("/",baseRoutes);
//template route for home
app.get("/home",(req,res)=>{
    let option={
        heading:"This is my Cat heading page",
        info:"My cat is the most obedient cat in the whole world",
        title:"My cat home Page"
    };
    res.render("home",option);
})
app.get("/form", (req, res) => {
    let option = {
        heading: "My cat form",
        info: "Enter cat name",
        title:"Form page"
    };
    res.render("form", option);
})
app.post("/postAction",(req,res)=>{
    
    console.log(`you posted cat name`);
    res.send(`you posted cat name`);
})
app.use(globalErr);
app.listen(PORT,()=>{
    console.log(`server listening in port: ${PORT}`);
})