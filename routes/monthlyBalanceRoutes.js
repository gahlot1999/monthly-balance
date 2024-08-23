import express from 'express';
import {
  createMonthlyBalance,
  getMonthlyBalance,
  deleteMonthlyBalance,
  updateMonthlyBalance,
} from '../controllers/monthlyBalanceController.js';

const router = express.Router();

router.route('/').get(getMonthlyBalance).post(createMonthlyBalance);
router.route('/:id').delete(deleteMonthlyBalance).put(updateMonthlyBalance);

export { router };
