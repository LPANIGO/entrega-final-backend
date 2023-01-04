import {Router} from 'express';
import services from '../dao/index.js';
import { executePolicies, privateValidation } from '../middlewares/auth.js';

const router = Router();


router.get('/:cid/products', async (req, res) => { //Al solicitar este get buscar si el cid existe, y populate el objeto. 
    let cart = await services.cartsService.getById(req.params.cid);
    res.send({status:"Success", payload:cart});
});

router.post('/', async (req, res) => { //creal el carrito con products vacio
    let createdCart = await services.cartsService.save();
    res.send({status:"Success", cartID:createdCart});
});

router.post('/product', privateValidation, executePolicies(['USER']), async (req, res) => { //incorporar el producto a partir del id de producto
    try {
        const {pid, pQuantity} = req.body;
        if(!pid||!pQuantity) res.status(400).send({message:"Incomplete values."})
        if(parseInt(pQuantity) < 1) return res.status(400).send({message:"Quantity must be higher than 0."})

        let stockControl = await services.productsService.checkAndReduceStock(req.body.pid, req.body.pQuantity); //true or false
        if (stockControl === true) {
            let addedProduct = await services.cartsService.addProductById(req.user.cart, req.body.pid, parseInt(req.body.pQuantity))
            return res.send({status:"Success", payload:addedProduct});
        } else if (stockControl === false) {
            return res.status(400).send({message:"Stock insuficiente para el pedido."})
        }
        res.send({status:"error",payload:"error"});
    } catch (error) {
        res.send({status:"error",payload:error});
    }
    
});

router.delete('/:cid', async (req, res) => { //vaciar el carrito y lo elimina
    let result = services.cartsService.emptyCartById(req.params.cid);
    res.send(result);
});


router.delete('/:cid/products/:pid', async (req, res) => { //elimina un producto por id de cart y product
    let result = services.cartsService.deleteProduct(req.params.cid, req.params.pid);
    res.send({status:"success",payload:result});
});

export default router;