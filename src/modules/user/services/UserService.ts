import BaseService from "../../../shared/services/BaseService";
import User from "../../../types/User";
import UserRepository from "../repositories/UserRepository";

export default class UserService extends BaseService<User> {

    private _userRepository:UserRepository
    constructor() {
        const userRepo:UserRepository = new UserRepository();
        super(userRepo);
        this. _userRepository = userRepo;
    }

    /**
     * Finds a user by email.
     * 
     * @param {string} email - The email of the user.
     * @returns {Promise<User | null>} - A promise that resolves to the user if found, or null if not.
     */
    async findByEmail(email: string): Promise<User | null> {
        return this._userRepository.findByEmail(email);
    }

    /**
     * Custom user registration logic.
     * 
     * @param {User} userData - The user data for registration.
     * @returns {Promise<User>} - A promise that resolves to the created user.
     */
    async register(userData: User): Promise<User> {
        // Add logic here to check if the user already exists, for example:
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        return this.create(userData);
    }
}