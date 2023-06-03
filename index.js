const bodyparser=require('body-parser');
const axios = require("axios");
const express=require("express");
const app=express();
const router=express.Router();
const port=3000;
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('./assets'));
app.use(bodyparser.json());
app.set('view engine','ejs');
app.set('views','./views');
app.get('/',function(req,res){
    res.render("hello");
});
app.post("/city",async function(req,res){
    // console.log(req.body)

    try{
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=2e5b4ee9ae0dd89e0b9b814459ea93f8`)
  .then(response => {
    // console.log(response)
    res.render("data",{
        city:req.body.city,
        temp:(response.data.main.temp-273.15)
    })
  })
  .catch(error => {
    res.send("city not found");
    return;
  });
    }catch(err){
        res.send("request not found")
    }
});
app.listen(port,function(){
    console.log("app running at");
});