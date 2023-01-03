import passport from 'passport';
import local from 'passport-local';
import userService from '../dao/models/user.dao.js';
import services from '../dao/index.js';
import { creatHash, isValidPassword } from '../utils.js';
import config from '../config/config.js';

const LocalStrategy = local.Strategy;

const initializeCustomPassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:"email", session:false}, 
    async(req, email, password, done) => {
        try {
            const {first_name, last_name, age, phone} = req.body;
            if (!first_name || !email || !password) return done(null, false, {message:"Incomplete values"});
            const exists = await userService.findOne({email:email});
            if(exists) return done(null, false, {message:"User already exists"});
            //Anexar carrito
            const cart = await services.cartsService.save();
            console.log(cart);
            const newUser = {
                first_name,
                last_name,
                email,
                password: creatHash(password),
                age,
                phone,
                cart:cart._id
            }
            let result = await userService.create(newUser);
            return done(null,result);
        } catch (error) {
            done(error);
        }
    }))

    passport.use('login', new LocalStrategy({usernameField:"email", session:false}, async(email,password, done) => {
    if (!email || !password) return done(null, false, {message:"Incomplete values"});
    if( email===config.session.ADMIN_EMAIL && parseInt(password)===config.session.ADMIN_PWD) {
        const user = {
            name:"Admin",
            role:"admin",
            id:'0'
        }
        return done(null,user);   
    }

    const user = await userService.findOne({email:email});
    if(!user) return done(null, false, {message:"Incorrect credentials."})
    if(!isValidPassword(user,password)) return done(null, false, {message:"Incorrect password"});
    return done(null,user);
    }))

    passport.serializeUser((user, done) => { 
        done(null, user._id);
    })
    passport.deserializeUser(async(id,done)=>{ 
        let result = await userService.findOne({_id:id});
        return done(null,result);
    })
}

export default initializeCustomPassport;