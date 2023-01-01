import mongoose from "mongoose";

const collection = 'products'

const productsSchema = mongoose.Schema({
    code: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
        max:50
    },
    description:  {
        type:String,
        required:true,
    },
    thumbnail:  {
        type:String,
        required:true,
    },
    category:  {
        type:String,
        required:true,
    },
    brand:  {
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock: {
        type:Number,
        required:true,
    }
}, {timestamps:true})

const productModel = mongoose.model(collection,productsSchema);
export default productModel;