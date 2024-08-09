import { UserModel } from "../models/user.model.js";

export class UserRepository {
    async findByEmail(email) {
        return UserModel.findOne({ email });
    }
}