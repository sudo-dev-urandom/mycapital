import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async addIncome(
    userId: number,
    amount: number,
    description?: string,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      userId,
      amount,
      type: 'income',
      description,
      date: new Date(),
    });

    return this.transactionRepository.save(transaction);
  }

  async addExpense(
    userId: number,
    amount: number,
    description?: string,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      userId,
      amount,
      type: 'expense',
      description,
      date: new Date(),
    });

    return this.transactionRepository.save(transaction);
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { userId },
      order: { date: 'DESC' },
    });
  }
}
