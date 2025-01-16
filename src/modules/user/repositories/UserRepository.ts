import BaseRepository from "../../../shared/Repositories/BaseRepository";
import User from "../../../types/User";
import UserModel from "../models/UserModel";

export default class UserRepository extends BaseRepository<User> {

  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._model.findOne({ email });
  }
}