"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = __importDefault(require("../../../shared/Repositories/BaseRepository"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
/**
 * UserRepository class
 *
 * This class extends the BaseRepository and provides CRUD operations for the `IUser` model.
 * By inheriting from the BaseRepository, it inherits all base CRUD functionality and can
 * be customized with additional user-specific methods.
 */
class UserRepository extends BaseRepository_1.default {
    /**
     * Initializes the repository with the `UserModel` for CRUD operations.
     */
    constructor() {
        super(UserModel_1.default);
    }
    /**
     * Finds a user by email.
     *
     * @param {string} email - The email address of the user.
     * @returns {Promise<User | null>} - A promise that resolves to the user if found, or null if not.
     */
    async findByEmail(email) {
        return this._model.findOne({ email });
    }
}
exports.default = UserRepository;
