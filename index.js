const express = require("express");
const mongoose = require("mongoose");

const app = express()

const Article = require("./models/Article")

mongoose.connect("mongodb+srv://abdo:abdo2003@cluster0.vhqo6nc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("connected successfully")
    }
    ).catch((error)=>{
        console.log("error with connecting with DB",error)
    })
// mongodb+srv://<abdo>:<abdo2003>@cluster0.vhqo6nc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(express.json())

app.get("/hello",(req,res)=>{
    res.send("<h1>hello</h1>")
})

app.get("/hi",(req,res)=>{
    let counter = ""
    for(let i=0;i <= 100;i++){
        counter += i +" - "
    }
    // res.sendFile(__dirname + "/views/numbers.html")
    res.render("numbers.ejs",{
        name : "Hamid",
        numbers : counter
    })
})

app.get("/sayHello",(req,res)=>{
    
    // res.send(`hello ${req.body.name}, age is: ${req.query.age}`)
    res.json({
        name: req.body.name,
        age: req.query.age,
        language: "arabic"
    })
})

app.get("/",(req,res)=>{
    res.send("hello in node project")
})

app.post("/addComment",(req,res)=>{
    res.send("post request on add comment")
})

app.delete("/deletetest",(req,res)=>{
    res.send("visiting delete request")
})

// -----Articles endpoint
app.post("/articles",async (req,res)=>{
    const newArticle = new Article();

    const artTitle = req.body.articleTitle
    const artBody = req.body.articleBody
    

    newArticle.title = artTitle;
    newArticle.body = artBody;
    newArticle.numberOfLikes = 0;
    await newArticle.save();

    res.json(newArticle)
})

app.get("/articles",async (req,res)=>{
    const articles = await Article.find();
    console.log("the article", articles)
    res.json(articles);

})

app.get("/articles/:articleId",async(req,res)=>{
    const id =  req.params.articleId
    const article =await Article.findById(id)
    res.json(article)
})

app.delete("/articles/:articleId",async(req,res)=>{
    const id =  req.params.articleId
    try{
        const article =await Article.findByIdAndDelete(id)
        res.json(article)
        return;
    }catch{
        console.log("error while reading article of id",id)
        return res.send(error)
    }
    
})

app.get("/showArticles",async(req,res)=>{
    const articles = await Article.find()
    res.render("article.ejs",{
        Allarticles : articles
    })
})

app.listen(3001,() =>{
    console.log("i am listening in port 3001");
})