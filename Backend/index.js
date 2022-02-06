const express = require('express');
const cors= require('cors')
const users = require('./db/users');
const products = require('./db/products');
const { enabled } = require('express/lib/application');
const app = express();
require('./db/config')
require('./db/users')


app.use(express.json())
app.use(cors())

app.post('/register', async(req,res)=>{
     const Users = users(req.body);
     let result =  await Users.save();
     res.send(result)
     console.log(result)
})

app.post('/login',async(req,res)=>{

     if( req.body.password&&req.body.email)
     {
          let data = await users.findOne(req.body).select("-password");
          if(data)
          {
               res.send(data)
          }
          else{
               res.send({result:"no data found"})
          }
     }
})

app.get('/get-users',async(req,res)=>{
 
     let  result = await users.find()
     res.send(result)

})

// Product Collection Api Starts.....
app.post('/add-product', async(req,res)=>{
     let Products = new products(req.body);
     let result =  await Products.save();
     res.send(result)
     console.log(result)
})

app.get('/get-product',async(req,res)=>{
 
     let  result = await products.find()
     res.send(result)

})
app.delete('/delete-product/:id',async(req,res)=>{

     let result =  await products.deleteOne({_id:req.params.id});
     res.send(result);
     console.log(result);

})
app.put('/update/:id',async(req,res)=>{

     let result= await products.updateOne(
          {_id:req.params.id},
          {$set:req.body}
     );
     res.send(result);
     console.log(result);

})


app.get('/get-product/:id',async(req,res)=>{
 
     let  result = await products.findOne({_id:req.params.id});
     if(result)
     {
          res.send(result);
     }     
     else{
          res.send({result :'No data found'});
     }

})


app.listen(5000);