import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js';
import Product from '../models/productModel.js';
const productRouter=express.Router();

productRouter.get('/seed',expressAsyncHandler(async(req,res)=>
{
    const createdProducts=await Product.insertMany(data.products);
    res.send({createdProducts});
}))
productRouter.get('/',async(req,res)=>
{
    const products=await Product.find({});
    res.send(products)
})
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>
{
    const product=await Product.findById(req.params.id);
    if(product)
    {
        res.status(200).send(product);
    }
    else{
        res.status(400).send({message:'product Not found'});
    }
}))
export default productRouter;