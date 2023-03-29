import ProductManager from "./productManager.js";
import express from 'express';

const app = express();
const productManager = new ProductManager();

app.get  ('/products', async(req, res ) =>{
    const limit = req.query.limit;
    const products = await productManager.getProduct(limit);
    res.send (products);
});

app.get  ('/products/:pid', async(req, res ) =>{
    try 
    {
        const pId = parseInt(req.params.pid);
        const product = await productManager.getProductById(pId);
        res.send (product);
    }
    catch(error)
    {
        res.json ({error: error.message});
    }
});

app.listen(8081, () => {
    console.log('el server no correee.. VUELAA!',8081);
});

