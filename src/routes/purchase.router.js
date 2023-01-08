import { Router } from 'express';
import services from '../dao/index.js';
import { executePolicies, privateValidation } from '../middlewares/auth.js';

const router = Router();

router.post('/purchase', privateValidation,executePolicies(['USER']), async (req, res) => {
    try {
        
        let products = await services.cartsService.getProducts(req.user.cart)
        let result;
        if (products[0].products.length > 0) {
            result = await services.purchasesService.save(req.user.id, products[0].products);
        }
        
        await services.cartsService.emptyCartById(req.user.cart);

        res.send({status:"Success"});
    } catch (error) {
        res.send({status:"error",payload:error});
    }
});

export default router;
