import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { publicValidation } from '../middlewares/auth.js';

const router = Router();

router.post('/register', publicValidation, passport.authenticate('register', {session:false}),  async (req,res) => {
    res.send({status:"success", payload:req.user._id});
})

router.post('/login', passport.authenticate('login', {session:false}), async (req, res) => {

    if(req.user.role === 'administrator' ) {
        const admin = {
            name:req.user.name,
            role:req.user.role,
            id:req.user.id
        }
        const token = jwt.sign(admin, config.jwt.SECRET, {expiresIn:'1h'});
        return res.cookie(config.jwt.COOKIE, token, {maxAge:3600000}).send({status:"success", message:"Admin logged in."});
    } 
    
    const loginUser = {
        role: req.user.role,
        email: req.user.email,
        name: `${req.user.first_name} ${req.user.last_name}`,
        id: req.user._id,
        cart: req.user.cart
    }
    const token = jwt.sign(loginUser, config.jwt.SECRET, {expiresIn:'1h'});//el usuario va al front en el token.
    res.cookie(config.jwt.COOKIE, token, {maxAge:3600000, httpOnly: true}).send({status:"success", message:"User logged in"})
});

router.get('/current', async (req, res) => {
    try {
        const token = req.cookies[config.jwt.COOKIE];
        if(!token) return res.redirect('/login'); //checkeo si exite la cookie. Pero el token puede expirar aun con la cookie activa.
        const user = jwt.verify(token, config.jwt.SECRET);
        res.send({status:"success", user});
    } catch (error) {
        if(error.expiredAt) { //El token expiró
            res.send({status:"error", error:"token expirado"});
        }
    }
});

export default router;