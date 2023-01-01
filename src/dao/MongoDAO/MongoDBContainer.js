
export default class MongoDBContainer {
    constructor(model) {
        this.model = model;
    }

    getAll = async() => {
        let results = await this.model.find().lean();
        return results;
    }

    getById = async(_id) => {
        let result = await this.model.findById(_id).lean();
        return result;
    }

    save = async(document) => {
        let result = await this.model.create(document);
        return result;
    }

    update = async (document) => {
        let result = await this.model.updateOne({"_id": document._id },{$set: {name:document.name}});
        return result;
    }

    delete = async (_id) => {
        let result = await this.model.deleteOne({"_id": _id });
        return result
    }
}