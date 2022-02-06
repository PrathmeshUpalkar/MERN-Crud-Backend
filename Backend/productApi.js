const express= require('express');
const app= express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.post('/registar',(req,res)=>{
    res.send("Api Works...")
})

