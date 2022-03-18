import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/bands", bandController.createBand)
bandRouter.get("/band/:id", bandController.getBandById)