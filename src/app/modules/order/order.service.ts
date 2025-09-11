import QueryBuilder from '../../builder/QueryBuilder';
import { ORDER_SEARCHABLE_FIELDS } from './order.constant';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);

  return result;
};

const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
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

export const OrderServices = {
  createOrderIntoDB,
  getAllOrders,
};
