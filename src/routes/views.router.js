import {Router} from 'express';
import services from '../dao/index.js';
import { privateValidation, publicValidation } from '../middlewares/auth.js';

const router = Router();

router.get('/', privateValidation, (req, res) => {
    res.render('home');
});

router.get('/register', publicValidation, async (req, res) => {
    res.render('register');
});

router.get('/login', publicValidation, (req, res) => {
    res.render('login');
});

router.get('/data', (req, res) => {
    if(!req.session.user) return res.render('/login');
    res.render('data', {user: req.user});
});

router.get('/createProduct', (req, res) => {
    res.render('createProduct');
})

router.get('/products', privateValidation, async (req,res) => {
    let products = await services.productsService.getAll();
    res.render('products', {products})
})

export default router;