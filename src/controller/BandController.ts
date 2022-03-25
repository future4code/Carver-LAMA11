import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";
import { BaseError } from "../error/BaseError";

export class BandController {
    async createBand(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string
            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness();
            const newBand = await bandBusiness.createBand(input, token);

            res.status(200).send({ message: "Banda cadastrada com sucesso" });

        } catch (error) {
            const err = error as BaseError
            res.status(400).send({ err: err.message });
        }

        await BaseDatabase.destroyConnection();
    }


    getBandById = async (req: Request, res: Response) => {

        const { id } = req.params
        const token = req.headers.authorization as string

        try {

            const bandBusiness = new BandBusiness();
            const bandById = await bandBusiness.getBandById(id, token)

            res.status(201).send({ band: bandById })
        } catch (error) {
            const err = error as BaseError
            res.status(400).send(err.message || err.sqlMessage)
        }
    }

}