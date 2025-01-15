import { AppDataSource } from "../config/database";
import { Grocery } from "../entities/Grocery"

const groceryRepository = AppDataSource.getRepository(Grocery);


export {
    getAllGroceries,
    createGrocery,
    getGroceryById,
    updateGrocery,
    deleteGrocery
}

const getAllGroceries = async (page: number, pageSize: number) => {
    try {
        const skip = (page - 1) * pageSize;
        const groceryList = await groceryRepository.find({
            skip: skip,
            take: pageSize
        });
        return groceryList;
    } catch (error) {
    }
}

const createGrocery = async (groceryDetails: Grocery) => {
    const newGrocery = groceryRepository.create(groceryDetails);
    await groceryRepository.save(newGrocery);

}

const getGroceryById = async (groceryId: string) => {
    const groceryDetailsById: Grocery | null = await groceryRepository.findOneBy({ id: Number(groceryId) });
    return groceryDetailsById;
}

const updateGrocery = async (groceryId: string, groceryDetails: Grocery) => {
    const groceryDetailsById: Grocery | null = await groceryRepository.findOneBy({ id: Number(groceryId) });
    if (!groceryDetailsById) {
        return null;
    }
    Object.assign(groceryDetailsById, groceryDetails);
    await groceryRepository.save(groceryDetailsById);
    return groceryDetailsById;

}

const deleteGrocery = async (groceryId: string) => {
    await groceryRepository.delete(Number(groceryId));
}