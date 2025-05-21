export interface Transaction {
  amount: number;
  type: 'income' | 'expense';
}

export function calculateIncomes(transactions: Transaction[]): number {
  return transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
}

export function calculateExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
}

export function sumTotalAssets(incomes: number, expenses: number): number {
  return incomes - expenses;
}
