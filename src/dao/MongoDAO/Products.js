import productModel from "../models/product.dao.js";
import MongoDBContainer from "./MongoDBContainer.js";
import { v4 as uuidv4 } from 'uuid';

export default class Products extends MongoDBContainer{
    constructor() {
        super(productModel);
    }

    save = async(document, filename) => {
        document.thumbnail = filename;
        document.code = uuidv4();
        let results = await this.model.create(document);
        return results;
    }

    checkAndReduceStock =async(pid, pQuantity) => {
        let product = await this.model.find({_id:pid},{stock:1});
        if(product[0].stock >= pQuantity) {
            let aux = product[0].stock - pQuantity;
            await this.model.updateOne({_id:pid},{$set:{stock:aux}});
            return true;
        } else {
            return false;
        }
    }
}