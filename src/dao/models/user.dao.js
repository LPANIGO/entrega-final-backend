import mongoose from 'mongoose';

const collection = "Users";

const usersSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    age:Number,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phone:String,
    cart:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'carts'
    }
})

const userModel = mongoose.model(collection,usersSchema);
export default userModel;