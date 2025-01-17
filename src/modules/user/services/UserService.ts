import ErrorHandler from "../../../shared/utils/ErrorHandler";
import User from "../../../types/User";
import UserRepository from "../repositories/UserRepository";

export default class UserService {

    private _userRepository:UserRepository
    constructor() {
        this._userRepository =  new UserRepository();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this._userRepository.findByEmail(email);
    }

    async register(userData: User): Promise<User> {
        if(!userData.email || !userData.password || !userData.name){
            throw new ErrorHandler('All Fields are mandatory', 400)
        }
        return this._userRepository.create(userData);
    }

    async getAllUsers(): Promise<User[]>{
        return this._userRepository.findAll();
    }

}