import cartModel from '../models/cart.dao.js'
import MongoDBContainer from "./MongoDBContainer.js";



export default class Carts extends MongoDBContainer{
    constructor() {
        super(cartModel);
    }

    getByIdAndPopulate = async (id) => {
        let result = await this.model.findOne({_id:id}).lean().populate('products.product')
        return result;
    }

    getProducts = async (id) => {
        let result = await this.model.find({_id:id},{_id:0, 'products.product':1, 'products.quantity':1})
        return result; 
    }

    save = async() => {
        let result = this.model.create({products:[]});
        return result;
    }

    update = async(id, cart) => {
        let result = await this.model.findByIdAndUpdate(id, {$set:{products:cart.products}})
        //agregar funcion restock si se reduce
        return result;
    }

    addProductById = async(cid, pid, pQuantity) => {
        let pFilter = await this.model.findById(cid,{products:{$elemMatch:{product:pid}}})
        
        
        if (pFilter.products.length > 0) {
            let aux = pFilter.products[0].quantity + pQuantity;
            let result = await this.model.updateOne({_id:cid,'products.product':pid},{$set:{'products.$.quantity':aux} })
            return result;
        } else {
            let result = await this.model.findByIdAndUpdate(cid,{$push:{products:{product:pid, quantity:pQuantity}}});
            return result;
        }
    }

    emptyCartById = async(id) => {
        let result = await this.model.updateOne({_id:id},{$set:{products:[]}});
        //agregar funcion restock
        return result;
    }

    deleteProduct = async(cid, pid) => {
        let result = await this.model.updateOne({_id:cid},{$pull:{'products':{ 'product': pid }}});
        //agregar funcion restock
        return result;
    }
}