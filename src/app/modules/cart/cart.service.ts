import QueryBuilder from "../../builder/QueryBuilder";
import { TCart } from "./cart.interface";
import { Cart } from "./cart.model";

const createCartIntoDB = async (payload: TCart) => {
const result = await Cart.create(payload);
return result;
};

const getAllCartsFromDB = async(query: Record<string, unknown>) => {
const cartQuery = new QueryBuilder(Cart.find(), query).filter().sort().paginate().fieldLimiting();

const result = await cartQuery.modelQuery;
const meta = await cartQuery.countTotal();

return {
       meta,
       result
}

}

const getSingleCartFromDB = async(cartId: string) => {
const result = await Cart.findById(cartId);
return result;
};

const deleteCartFromDB = async(cartId: string) => {
       const result = await Cart.findByIdAndDelete(cartId);
       return result;
}

export const CartServices = {
       createCartIntoDB,
       getAllCartsFromDB,
       getSingleCartFromDB,
       deleteCartFromDB
}