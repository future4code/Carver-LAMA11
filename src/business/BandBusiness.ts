import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";
import { BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";

export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase,
        private bandBusiness: BandBusiness
    ) { }

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

        const newBand = await this.bandBusiness.selectBandByName(band.name)
        if (newBand) {
            throw new Error("Banda já registrada!")
        }

        const id = this.idGenerator.generate();

        await this.bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

        const tokenData = this.authenticator.getData(token);

        return tokenData;
    }

    async getBandById(id: string, token: string) {

        // if (!token) {
        //     throw new Error("Token inválido ou não passado nos headers")
        // }

        if (!id) {
            throw new Error("Id inválido ou não passado nos params")
        }

        const result = await this.bandDatabase.getBandById(id);

        // const tokenData = this.authenticator.getData(token);

        if (!result) {
            throw new Error("Id inválido ou Post não encontrado")
        }

        return result;
    }

    async selectBandByName(name: string) {

        const bandFromDB = await this.bandDatabase.selectBandByName(name);

        return bandFromDB;
    }
}