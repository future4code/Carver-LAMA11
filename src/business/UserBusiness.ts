import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private userDatabase: UserDatabase
    ) { }

    async createUser(user: UserInputDTO) {

        if(!user.name || !user.email || !user.password || !user.role){
            throw new Error("Preencha todos os campos")
        }

        if (user.password.length < 6){
            throw new Error ("Senha deve conter o mínimo de 6 caracteres")
        }

        if(user.email.indexOf("@") === -1){
            throw new Error("Email inválido");
        }

    
        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

    
        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

    
        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

     
        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Senha inválida!");
        }

        return accessToken;
    }
}