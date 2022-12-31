import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const router = Router();


router.post('/register', passport.authenticate('register', {session:false}), async (req,res) => {
    res.send({status:"Success", payload:req.user._id});
})

router.post('/login', passport.authenticate('login', {session:false}), async (req, res) => {
    console.log(req.user);
    const loginUser = {
        role: req.user.role,
        email: req.user.email,
        name: req.user.name
    }
    const token = jwt.sign(loginUser, config.jwt.SECRET, {expiresIn:30000});//el usuario va al front en el token.
    res.cookie(config.jwt.COOKIE, token, {maxAge:30000, httpOnly: true}).send({status:"logged in"})
});

router.get('/current', async (req, res) => {
    try {
        const token = req.cookies[config.jwt.COOKIE];
        if(!token) return res.redirect('/'); //checkeo si exite la cookie. Pero el token puede expirar aun con la cookie activa.
        const user = jwt.verify(token, config.jwt.SECRET);
        res.send({status:"Success", user});
    } catch (error) {
        if(error.expiredAt) { //El token expiró
            res.send({status:"error", error:"token expirado"});
        }
    }
});

export default router;