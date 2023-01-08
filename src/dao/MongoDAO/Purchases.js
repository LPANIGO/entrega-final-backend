import purchaseModel from "../models/purchase.dao.js";
import MongoDBContainer from "./MongoDBContainer.js";



export default class Purchases extends MongoDBContainer{
    constructor() {
        super(purchaseModel);
    }

    save = async(uid,products) => {
        let purchases = await this.model.count();
        
        let document = {};
        
        if ( purchases < 1) {
            document.code = 1;            
        } else {
            let lastPurchase = await this.model.find({},{_id:0, code:1}).sort({code:-1}).limit(1);
            document.code = lastPurchase[0].code + 1;
        }

        document.user = uid
        document.products = products
        let result = this.model.create(document);
        return result;
    }
}