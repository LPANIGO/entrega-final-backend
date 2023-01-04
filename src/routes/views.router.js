import {Router} from 'express';
import services from '../dao/index.js';
import { executePolicies, privateValidation, publicValidation } from '../middlewares/auth.js';
import { ROUTES } from '../constants/routes.js'

const router = Router();

router.get('/', privateValidation, async (req, res) => {
    const routes = ROUTES[req.user.role];
    const products = await services.productsService.getAll();
    res.render('home', {
        user:req.user,
        routes:routes
    });
});

router.get('/register', publicValidation, async (req, res) => {
    res.render('register');
});

router.get('/login', publicValidation, (req, res) => {
    res.render('login');
});

router.get('/createProduct', privateValidation, executePolicies(['ADMIN']), (req, res) => {
    res.render('createProduct');
})

router.get('/products', privateValidation, async (req,res) => {
    let products = await services.productsService.getAll();
    res.render('products', {products})
})

router.get('/cart', privateValidation, executePolicies(['USER']), async (req, res) => {
    let cart = await services.cartsService.getByIdAndPopulate(req.user.cart);
    console.log(cart);
    console.log(req.user)
    res.render('cart', {cart})
});

router.get('/profile', privateValidation, executePolicies(['USER']), async (req, res) => {
    let user = await services.usersService.getById(req.user.id);
    console.log(user);
    res.render('profile', {user});
});

export default router;