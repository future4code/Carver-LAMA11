import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";
import { BandInputDTO } from "../model/Band";

export class BandBusiness {

    async createBand(band: BandInputDTO, token: string) {

        if(!band.name || !band.music_genre || !band.responsible ){
            throw new Error ("Preencha todos os campos")
        } 

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const bandDatabase = new BandDatabase();
        await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

        const authenticator = new Authenticator();
        const tokenData = authenticator.getData(token);

        return tokenData;
    }

    async getBandById(id: string) {

        const bandDatabase = new BandDatabase();
        const bandFromDB = await bandDatabase.getBandById(id);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: bandFromDB.getId() });

        return accessToken;
    }

    async selectBandByName(name: string) {

        const bandDatabase = new BandDatabase();
        const bandFromDB = await bandDatabase.selectBandByName(name);

        return bandFromDB;
    }
}