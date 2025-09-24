import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartServices } from "./cart.service";

const createCart = catchAsync(async (req, res) => {
const result = await CartServices.createCartIntoDB(req.body);

sendResponse(res, {
       statusCode: status.CREATED,
       success: true,
       message: "Cart is created successfully",
       data: result
})
});

const getAllCarts = catchAsync(async (req , res) => {
const result = await CartServices.getAllCartsFromDB(req.query);

sendResponse(res, {
       statusCode: status.OK,
       success: true,
       message: "All Carts are retrieved successfully",
       meta: result.meta,
       data: result.result
})
});

const getSingleCart = catchAsync(async(req , res) => {

       const {cartId} = req.params;

       const result = await CartServices.getSingleCartFromDB(cartId);

       sendResponse(res, {
       statusCode: status.OK,
       success: true,
       message: "Cart is retrieved successfully",
       data: result,
})
})

const deleteCart = catchAsync(async(req, res) => {
       const {cartId} = req.params;
const result = await CartServices.deleteCartFromDB(cartId);

sendResponse(res, {
       statusCode: status.OK,
       success: true,
       message: "Cart is deleted successfully",
       data: result,
})
})

export const CartControllers = {
       createCart,
       getAllCarts,
       getSingleCart,
       deleteCart
}