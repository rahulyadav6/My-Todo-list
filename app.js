const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy Food","Cook Food", "Eat Food"];
let workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",(req,res)=>{
    

    let day = date();

    res.render("list", {listTitle: day, newListItems:items});
});

app.post("/",(req,res)=>{
    let item = req.body.newItem;
    console.log(req.path);
    if(req.body.List === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work List", newListItems:workItems});
}); 

app.listen(3000,()=>{
    console.log("server started on port 3000");
});