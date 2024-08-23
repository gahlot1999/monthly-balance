import mongoose from 'mongoose';
const monthlyBalanceSchema = new mongoose.Schema({
  monthYear: {
    type: String,
    required: [true, 'MonthYear is a mandatory field'],
  },
  balance: {
    type: Number,
    required: [true, 'Balance is a mandatory field'],
    min: [0, 'Balance must be a positive number'],
  },
  postSalaryBalance: {
    type: Number,
    required: [true, 'PostSalaryBalance is a mandatory field'],
    min: [0, 'PostSalaryBalance must be a positive number'],
  },
  postDeductionBalance: {
    type: Number,
    required: [true, 'PostDeductionBalance is a mandatory field'],
    min: [0, 'PostDeductionBalance must be a positive number'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

monthlyBalanceSchema.index({ monthYear: 1 }, { unique: true });

const MonthlyBalance = mongoose.model('MonthlyBalance', monthlyBalanceSchema);

export default MonthlyBalance;
