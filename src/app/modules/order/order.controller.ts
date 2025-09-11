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
  const result = await OrderServices.getAllOrders(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All orders are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
