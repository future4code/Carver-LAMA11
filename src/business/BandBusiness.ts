import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";
import { BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";

export class BandBusiness {

    async createBand(band: BandInputDTO, token: string) {

        if (!band.name || !band.music_genre || !band.responsible) {
            throw new Error("Preencha todos os campos")
        }

        if (UserRole.ADMIN !== "ADMIN") {
            throw new Error("Usuário não permitido")
        }

        if (!token) {
            throw new Error("Token inválido ou não passado nos headers")
        }

        const bandBusiness = new BandBusiness();
        const newBand = await bandBusiness.selectBandByName(band.name)
        if (newBand) {
            throw new Error("Banda já registrada!")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const bandDatabase = new BandDatabase();
        await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

        const authenticator = new Authenticator();
        const tokenData = authenticator.getData(token);

        return tokenData;
    }

    async getBandById(id: string, token: string) {

        if (!id) {
            throw new Error("Id inválido ou não passado nos params")
        }

        if (!token) {
            throw new Error("Token inválido ou não passado nos headers")
        }

        const bandDatabase = new BandDatabase();
        const result = await bandDatabase.getBandById(id);

        if (!result) {
            throw new Error("Id inválido ou Post não encontrado")
        }

        const authenticator = new Authenticator();
        const tokenData = authenticator.getData(token);

        return result;
    }

    async selectBandByName(name: string) {

        const bandDatabase = new BandDatabase();
        const bandFromDB = await bandDatabase.selectBandByName(name);

        return bandFromDB;
    }
}