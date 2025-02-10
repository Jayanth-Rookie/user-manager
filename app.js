const express = require('express');
const app = express();
const path = require('path');
const usermodel = require('./models/user');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/read', async (req,res)=>{
    let allusers = await usermodel.find()
    res.render("read",{users:allusers});
})

app.get('/delete/:id', async (req,res)=>{
    let allusers = await usermodel.findOneAndDelete({
      _id: req.params.id  
    })
    res.redirect("/read");
})

app.post('/create', async(req,res)=>{
    let {name,email,img} = req.body;
    let createdUser = await usermodel.create({
        name,
        email,
        img
    });
    res.redirect("/read")
})


app.listen(3000);