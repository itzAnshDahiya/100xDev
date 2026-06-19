// Transaction ka type define kar rahe hain
interface Transaction {
  type: "deposit" | "withdraw"; // sirf ye 2 allowed hain
  amount: number;
  date: Date;
}

// Base BankAccount class
class BankAccount {

  // private balance ko directly bahar se access nahi kar sakte
  private balance: number = 0;

  // protected transactions child class use kar sakti hai
  protected transactions: Transaction[] = [];

  constructor(public accountHolder: string, public accountNumber: number) {}

  // Deposit method
  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount valid hona chahiye");
      return;
    }

    this.balance += amount;

    this.transactions.push({
      type: "deposit",
      amount,
      date: new Date()
    });

    console.log(`₹${amount} deposited successfully`);
  }

  // Withdraw method
  withdraw(amount: number): void {
    if (amount > this.balance) {
      console.log("Insufficient balance");
      return;
    }

    this.balance -= amount;

    this.transactions.push({
      type: "withdraw",
      amount,
      date: new Date()
    });

    console.log(`₹${amount} withdrawn successfully`);
  }

  // Current balance check karne ke liye
  getBalance(): number {
    return this.balance;
  }

  // Transaction history
  getTransactions(): Transaction[] {
    return this.transactions;
  }
}

// SavingsAccount child class (Inheritance use kar rahe hain)
class SavingsAccount extends BankAccount {

  constructor(
    accountHolder: string,
    accountNumber: number,
    private interestRate: number
  ) {
    super(accountHolder, accountNumber);
  }

  // Interest add karne ka method
  addInterest(): void {
    const interest = this.getBalance() * this.interestRate / 100;
    this.deposit(interest);
    console.log(`Interest added: ₹${interest}`);
  }
}

// ---------------- Usage ----------------

const myAccount = new SavingsAccount("Rahul", 123456, 5);

myAccount.deposit(10000);
myAccount.withdraw(2000);
myAccount.addInterest();

console.log("Current Balance:", myAccount.getBalance());
console.log("Transactions:", myAccount.getTransactions());