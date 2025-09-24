import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Order is created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All orders are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const  getSingleOrder = catchAsync(async (req, res) => {
  const {orderId} = req.params;

  const result = await OrderServices.getSingleFromDB(orderId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Order is retrieved successfully',
    data: result,
  });

})

const updateOrder = catchAsync(async (req , res ) => {
  const {orderId} = req.params;

  const result = await OrderServices.updateOrderIntoDB(orderId, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Order is updated successfully',
    data: result,
  });

})

const deleteOrder = catchAsync(async (req , res) => {
const {orderId} = req.params;

const result = await OrderServices.deleteOrderFromDB(orderId);

sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Order is deleted successfully',
    data: result,
  });
})

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder
};
