import { Constants } from "../helpers/constants";
import { AppDataSource } from "../config/database";
import { Grocery } from "../entities/Grocery"
import { OrderEntity } from "../entities/Order";
import { User } from "../entities/User"

const orderRepository = AppDataSource.getRepository(OrderEntity);
export {
    createOrder,
    getOrderHistory
}

const createOrder = async (userDetails: User, orderDetails: any[]) => {

    const groceryRepository = await AppDataSource.getRepository(Grocery)

    await Promise.all(orderDetails.map(async (grocery: any) => {
        const groceryDetails = await groceryRepository.findOne({ where: { id: grocery.id } });
        if (!groceryDetails) {
            throw new Error(Constants.GROCERY_NOT_FOUND);
        }
        if (groceryDetails.quantity < grocery.quantity) {
            throw new Error(Constants.ERROR_INSUFFICIENT_QUANTITY);
        }

        const orderDetails = orderRepository.create({
            user: userDetails,
            grocery: groceryDetails,
            quantity: grocery.quantity
        });
        console.log({ orderDetails })
        await orderRepository.save(orderDetails);

        groceryDetails.quantity = groceryDetails.quantity - grocery.quantity;
        await groceryRepository.save(groceryDetails);

    }));

}

const getOrderHistory = async (userId: number) => {
    const orderDetails = await orderRepository.createQueryBuilder
        ('order')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('order.grocery', 'grocery')
        .select([
            "user.id",
            "user.firstName",
            "user.lastName",
            "user.email",
            "order.id",
            "order.quantity",
            "order.createdAt",
            "grocery.id",
            "grocery.name",
            "grocery.description",
            "grocery.price"
        ]).where('user.id = :userId', { userId })
        .getMany();

    return orderDetails;
}