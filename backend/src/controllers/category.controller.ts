import { Request, Response } from "express";
import { getCategories } from "../services/category.service";

export const listCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getCategories()
        res.json({ categories })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to fetch categories' })
    }
}