import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (balanceObj, transaction: Transaction) => {
        if (transaction.type === 'income') {
          return {
            ...balanceObj,
            income: balanceObj.income + transaction.value
          }
        }
        return {
          ...balanceObj,
          outcome: balanceObj.outcome + transaction.value
        }
      },
      { income: 0, outcome: 0 }
    )
    return { ...balance, total: balance.income - balance.outcome }
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository
