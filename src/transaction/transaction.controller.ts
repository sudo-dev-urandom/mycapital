import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('income')
  async addIncome(
    @Req() req,
    @Body() body: { amount: number; description?: string },
  ) {
    const userId = req.user.userId; // Get user ID from JWT token
    return this.transactionService.addIncome(
      userId,
      body.amount,
      body.description,
    );
  }

  @Post('expense')
  async addExpense(
    @Req() req,
    @Body() body: { amount: number; description?: string },
  ) {
    const userId = req.user.userId; // Get user ID from JWT token
    return this.transactionService.addExpense(
      userId,
      body.amount,
      body.description,
    );
  }

  @Get()
  async getUserTransactions(@Req() req) {
    const userId = req.user.userId;
    return this.transactionService.getUserTransactions(userId);
  }
}
