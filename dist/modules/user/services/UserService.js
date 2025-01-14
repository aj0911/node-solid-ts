"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("../../../shared/services/BaseService"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class UserService extends BaseService_1.default {
    constructor() {
        const userRepo = new UserRepository_1.default();
        super(userRepo);
        this._userRepository = userRepo;
    }
    /**
     * Finds a user by email.
     *
     * @param {string} email - The email of the user.
     * @returns {Promise<User | null>} - A promise that resolves to the user if found, or null if not.
     */
    async findByEmail(email) {
        return this._userRepository.findByEmail(email);
    }
    /**
     * Custom user registration logic.
     *
     * @param {User} userData - The user data for registration.
     * @returns {Promise<User>} - A promise that resolves to the created user.
     */
    async register(userData) {
        // Add logic here to check if the user already exists, for example:
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        return this.create(userData);
    }
}
exports.default = UserService;
