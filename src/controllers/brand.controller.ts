import { Request, Response } from "express";

export default class BrandController {
    async getAllBrands(req: Request, res: Response): Promise<unknown> {
        return res.status(200).json({ message: "Fetched all brands successfully" });
    }
}