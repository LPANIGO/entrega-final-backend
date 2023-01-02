import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const register = async(req, res) => {
    res.send({status:"Success", payload:req.user._id});
}

export default {
    register
}