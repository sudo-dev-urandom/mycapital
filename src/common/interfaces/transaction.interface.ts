export interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  description?: string;
  date: Date;
  userId: number;
}
