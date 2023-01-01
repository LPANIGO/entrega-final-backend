import userModel from "../models/user.dao.js";

export default class UsersDao { 

    getAll = async() => {
        let results = await userModel.find().lean();
        return results;
    }

    getById = async(_id) => {
        let result = await userModel.findById(_id);
        return result;
    }

    getByEmail = async (email) => {
        let result = await userModel.findOne({email});
        return result;
    }
}