import BaseRepository from "../../../shared/Repositories/BaseRepository";
import User from "../../../types/User";
import UserModel from "../models/UserModel";

/**
 * UserRepository class
 * 
 * This class extends the BaseRepository and provides CRUD operations for the `IUser` model.
 * By inheriting from the BaseRepository, it inherits all base CRUD functionality and can
 * be customized with additional user-specific methods.
 */
export default class UserRepository extends BaseRepository<User> {
  
  /**
   * Initializes the repository with the `UserModel` for CRUD operations.
   */
  constructor() {
    super(UserModel);
  }

  /**
   * Finds a user by email.
   * 
   * @param {string} email - The email address of the user.
   * @returns {Promise<User | null>} - A promise that resolves to the user if found, or null if not.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this._model.findOne({ email });
  }
}