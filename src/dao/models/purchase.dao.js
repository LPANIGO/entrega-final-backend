import mongoose from "mongoose";

const collection = "purchase";

const purchaseSchema = new mongoose.Schema({
    code: Number,
    user: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'users'
    },
    products: [
        {
            product: {
                type:mongoose.SchemaTypes.ObjectId,
                ref:'products'
            },
            quantity: {
                type:Number,
                default:1
            }
        } ]
})

const purchaseModel = mongoose.model(collection,purchaseSchema);
export default purchaseModel;