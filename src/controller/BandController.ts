import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";
import { BaseError } from "../error/BaseError";

export class BandController {
    async createBand(req: Request, res: Response) {
        try {

            const input: BandInputDTO = {
                music_genre: req.body.music_genre,
                name: req.body.name,
                responsible: req.body.responsible,
            }

            const bandBusiness = new BandBusiness();
            const token = await bandBusiness.createBand(input);

            res.status(200).send({ token });

        } catch (error) {
            if (error instanceof BaseError)
                res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}