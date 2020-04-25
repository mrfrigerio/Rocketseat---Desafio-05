import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance()
      if (balance.total - value < 0) {
        throw new Error(
          "You don't have enought money to make this transaction!"
        )
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })
    return transaction
  }
}

export default CreateTransactionService
