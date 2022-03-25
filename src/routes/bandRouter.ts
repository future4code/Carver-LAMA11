import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.get("/band/:id", bandController.getBandById)
bandRouter.post("/bands", bandController.createBand)