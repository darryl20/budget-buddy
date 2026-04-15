export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
  account: string;
};

export type Account = {
  id: string;
  name: string;
  bank: string;
  accountNumber: string;
  balance: number;
  type: "savings" | "checking" | "credit";
  lastUpdated: string;
  color: string;
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
};

export const accounts: Account[] = [
  { id: "1", name: "Primary Checking", bank: "Chase", accountNumber: "****4521", balance: 12450.80, type: "checking", lastUpdated: "2026-04-15", color: "#22c55e" },
  { id: "2", name: "High Yield Savings", bank: "Marcus", accountNumber: "****7832", balance: 34200.50, type: "savings", lastUpdated: "2026-04-14", color: "#3b82f6" },
  { id: "3", name: "Savings Account", bank: "Ally", accountNumber: "****9104", balance: 18750.00, type: "savings", lastUpdated: "2026-04-13", color: "#8b5cf6" },
  { id: "4", name: "Credit Card", bank: "Amex", accountNumber: "****3367", balance: -2340.20, type: "credit", lastUpdated: "2026-04-15", color: "#f59e0b" },
];

export const transactions: Transaction[] = [
  { id: "1", date: "2026-04-15", description: "Salary Deposit", amount: 5200, type: "credit", category: "Income", account: "Primary Checking" },
  { id: "2", date: "2026-04-14", description: "Whole Foods Market", amount: 127.43, type: "debit", category: "Groceries", account: "Primary Checking" },
  { id: "3", date: "2026-04-14", description: "Netflix Subscription", amount: 15.99, type: "debit", category: "Entertainment", account: "Credit Card" },
  { id: "4", date: "2026-04-13", description: "Electric Bill", amount: 89.50, type: "debit", category: "Utilities", account: "Primary Checking" },
  { id: "5", date: "2026-04-13", description: "Freelance Payment", amount: 1200, type: "credit", category: "Income", account: "Primary Checking" },
  { id: "6", date: "2026-04-12", description: "Uber Ride", amount: 24.30, type: "debit", category: "Transport", account: "Credit Card" },
  { id: "7", date: "2026-04-12", description: "Amazon Purchase", amount: 67.89, type: "debit", category: "Shopping", account: "Credit Card" },
  { id: "8", date: "2026-04-11", description: "Gym Membership", amount: 49.99, type: "debit", category: "Health", account: "Primary Checking" },
  { id: "9", date: "2026-04-11", description: "Interest Payment", amount: 12.50, type: "credit", category: "Interest", account: "High Yield Savings" },
  { id: "10", date: "2026-04-10", description: "Restaurant - Dinner", amount: 85.40, type: "debit", category: "Dining", account: "Credit Card" },
  { id: "11", date: "2026-04-10", description: "Gas Station", amount: 52.00, type: "debit", category: "Transport", account: "Primary Checking" },
  { id: "12", date: "2026-04-09", description: "Phone Bill", amount: 75.00, type: "debit", category: "Utilities", account: "Primary Checking" },
  { id: "13", date: "2026-04-08", description: "Spotify", amount: 9.99, type: "debit", category: "Entertainment", account: "Credit Card" },
  { id: "14", date: "2026-04-07", description: "Transfer from Savings", amount: 500, type: "credit", category: "Transfer", account: "Primary Checking" },
  { id: "15", date: "2026-04-06", description: "Rent Payment", amount: 1800, type: "debit", category: "Housing", account: "Primary Checking" },
];

export const budgets: Budget[] = [
  { id: "1", category: "Groceries", limit: 500, spent: 327.43 },
  { id: "2", category: "Entertainment", limit: 150, spent: 125.98 },
  { id: "3", category: "Transport", limit: 200, spent: 76.30 },
  { id: "4", category: "Dining", limit: 300, spent: 185.40 },
  { id: "5", category: "Utilities", limit: 250, spent: 164.50 },
  { id: "6", category: "Shopping", limit: 200, spent: 167.89 },
  { id: "7", category: "Housing", limit: 1800, spent: 1800 },
  { id: "8", category: "Health", limit: 100, spent: 49.99 },
];

export const monthlyData = [
  { month: "Nov", income: 6200, expenses: 4100 },
  { month: "Dec", income: 6800, expenses: 5200 },
  { month: "Jan", income: 6400, expenses: 4300 },
  { month: "Feb", income: 6200, expenses: 3900 },
  { month: "Mar", income: 7100, expenses: 4800 },
  { month: "Apr", income: 6900, expenses: 3200 },
];

export const categoryData = [
  { name: "Housing", value: 1800, fill: "oklch(0.72 0.19 160)" },
  { name: "Groceries", value: 327, fill: "oklch(0.65 0.2 250)" },
  { name: "Transport", value: 76, fill: "oklch(0.8 0.16 80)" },
  { name: "Dining", value: 185, fill: "oklch(0.7 0.2 310)" },
  { name: "Entertainment", value: 126, fill: "oklch(0.65 0.18 30)" },
  { name: "Utilities", value: 165, fill: "oklch(0.6 0.15 200)" },
];
