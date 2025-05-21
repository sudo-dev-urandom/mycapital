import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  calculateIncomes,
  calculateExpenses,
  sumTotalAssets,
  Transaction,
} from './utils/calculations';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const transactions: Transaction[] = [
      { amount: 1000, type: 'income' },
      { amount: 500, type: 'expense' },
      { amount: 2000, type: 'income' },
    ];

    const totalIncome = calculateIncomes(transactions); // 3000
    const totalExpense = calculateExpenses(transactions); // 500
    const totalAssets = sumTotalAssets(totalIncome, totalExpense); // 2500

    console.log({ totalIncome, totalExpense, totalAssets });
    return this.appService.getHello();
  }
}
