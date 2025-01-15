import { Request, Response } from 'express';
import * as GroceryService from '../services/GroceryService';
import { GroceryResponse } from '@/interfaces/grocery.interface';
import { Constants } from '../helpers/constants';

export {
    getAllGroceries,
    createGrocery,
    getGroceryById,
    updateGrocery,
    deleteGrocery
}

const getAllGroceries = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.query.page) || Constants.DEFAULT_PAGE;
        const pageSize: number = Number(req.query.pageSize) || Constants.PAGE_SIZE;
        const groceryList: GroceryResponse[] | undefined = await GroceryService.getAllGroceries(page, pageSize);
        res.status(Constants.SUCCESS_CODE).json(groceryList);
    } catch (error) {
        res.status(Constants.ERROR_CODE).json({ message: Constants.ERROR_FETCHING_GROCERIES, error });
    }
}

const createGrocery = async (req: Request, res: Response) => {
    try {
        await GroceryService.createGrocery(req.body);
        res.status(Constants.SUCCESS_CODE).json({ message: Constants.SUCCESS_CREATING_GROCERY });
    } catch (error) {
        res.status(Constants.ERROR_CODE).json({ message: Constants.ERROR_CREATING_GROCERY, error });
    }
}

const getGroceryById = async (req: Request, res: Response) => {
    try {
        const groceryDetailsById: GroceryResponse | null = await GroceryService.getGroceryById(req.params.id);
        res.status(Constants.SUCCESS_CODE).json(groceryDetailsById);
    } catch (error) {
        res.status(Constants.ERROR_CODE).json({ message: Constants.ERROR_FETCHING_GROCERY, error });
    }
}

const updateGrocery = async (req: Request, res: Response) => {
    try {
        await GroceryService.updateGrocery(req.params.id, req.body);
        res.status(Constants.SUCCESS_CODE).json({ message: Constants.SUCCESS_UPDATING_GROCERY });
    } catch (error) {
        res.status(Constants.ERROR_CODE).json({ message: Constants.ERROR_UPDATING_GROCERY, error });
    }
}

const deleteGrocery = async (req: Request, res: Response) => {
    try {
        await GroceryService.deleteGrocery(req.params.id);
        res.status(Constants.SUCCESS_CODE).json({ message: Constants.SUCCESS_DELETING_GROCERY });
    } catch (error) {
        res.status(Constants.ERROR_CODE).json({ message: Constants.ERROR_DELETING_GROCERY, error });
    }
}