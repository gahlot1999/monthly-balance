import MonthlyBalance from '../model/monthlyBalance.js';
import { catchAsync } from '../helpers/utils.js';
import AppError from '../helpers/appError.js';
import sendResponse from '../helpers/sendResponse.js';

const getMonthlyBalance = catchAsync(async (req, res, next) => {
  const result = await MonthlyBalance.find();
  sendResponse(
    req,
    res,
    200,
    'Monthly balance retrieved successfully.',
    result,
  );
});

const createMonthlyBalance = catchAsync(async (req, res, next) => {
  const monthlyBalance = await MonthlyBalance.create(req.body);
  sendResponse(
    req,
    res,
    201,
    'Monthly balance created successfully.',
    monthlyBalance,
  );
});

const deleteMonthlyBalance = catchAsync(async (req, res, next) => {
  const result = await MonthlyBalance.findByIdAndDelete(req.params.id);

  if (!result) return next(new AppError('No Monthly Balance found.', 404));

  sendResponse(req, res, 204, '', null);
});

const updateMonthlyBalance = catchAsync(async (req, res, next) => {
  const result = await MonthlyBalance.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) return next(new AppError('No monthly balance found', 404));

  sendResponse(req, res, 200, 'Monthly balance updated successfully.', result);
});

export {
  createMonthlyBalance,
  getMonthlyBalance,
  deleteMonthlyBalance,
  updateMonthlyBalance,
};
