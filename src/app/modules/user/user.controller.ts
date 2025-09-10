import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'User is registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is logged-in successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};
