import status from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ORDER_SEARCHABLE_FIELDS } from './order.constant';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);

  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find({ isDeleted: { $ne: true } }),
    query,
  )
    .search(ORDER_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fieldLimiting();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleFromDB = async (orderId: string) => {
  const result = await Order.findOne({
    _id: orderId,
    isDeleted: { $ne: true },
  });
  return result;
};

const updateOrderIntoDB = async (
  orderId: string,
  payload: Record<string, unknown>,
) => {
  const isOrderAvailable = Order.findById(orderId);
  if (!isOrderAvailable) {
    throw new AppError(status.NOT_FOUND, 'Order is not found');
  }

  const { items, status: orderStatus } = payload;

  // Update the total price if items are updated
  let total = undefined;
  if (Array.isArray(items)) {
    total = items.reduce(
      (sum: number, item: { price: number; quantity: number }): number =>
        sum + item.price * item.quantity,
      0,
    );
  }

  const result = await Order.findByIdAndUpdate(
    orderId,
    {
      ...(items ? { items } : {}),
      ...(total !== undefined ? { total } : {}),
      ...(orderStatus ? { orderStatus } : {}),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const deleteOrderFromDB = async (orderId: string) => {
  const isOrderExists = await Order.findById(orderId);
  if (!isOrderExists) {
    throw new AppError(status.NOT_FOUND, 'Order is not found');
  }

  const result = await Order.findByIdAndUpdate(
    orderId,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
