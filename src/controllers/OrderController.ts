import { User } from "../entities/User";
import { Request, Response } from "express";
import * as OrderService from "../services/OrderService";
import { Grocery } from "../entities/Grocery";
import { Constants } from "../helpers/constants";
export {
    createOrder,
    getOrderHistory
}

const createOrder = async (req: any, res: Response) => {
    try {
        console.log("here")
        const userDetails = req.user as User;
        const orderDetails = req.body;

        await OrderService.createOrder(userDetails, orderDetails);
        res.status(Constants.RESOURCE_CREATED_CODE).json({ message: Constants.SUCCESS_CREATING_ORDER });
    } catch (error: any) {
        return res.status(Constants.ERROR_CODE).json({ message: error.message });
    }
}

const getOrderHistory = async (req: any, res: Response) => {
    try {
        const orders = await OrderService.getOrderHistory(req.user.id);
        res.json(orders);
    } catch (error: any) {
        return res.status(Constants.ERROR_CODE).json({
            message: Constants.ERRORFETCHING_ORDER_HISTORY
        });
    }
};