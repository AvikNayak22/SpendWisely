import { useMemo } from "react";

const useTransactionStats = (allTransaction) => {
  const stats = useMemo(() => {
    const totalTransaction = allTransaction.length;
    const totalIncomeTransactions = allTransaction.filter(
      (transaction) => transaction.type === "income"
    );
    const totalExpenseTransactions = allTransaction.filter(
      (transaction) => transaction.type === "expense"
    );

    const totalIncomePercent =
      (totalIncomeTransactions.length / totalTransaction) * 100;
    const totalExpensePercent =
      (totalExpenseTransactions.length / totalTransaction) * 100;

    const totalTurnover = allTransaction.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const totalIncomeTurnover = totalIncomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const totalExpenseTurnover = totalExpenseTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    const totalIncomeTurnoverPercent =
      (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent =
      (totalExpenseTurnover / totalTurnover) * 100;

    return {
      totalTransaction,
      totalIncomeTransactions,
      totalIncomePercent,
      totalExpenseTransactions,
      totalExpensePercent,
      totalTurnover,
      totalIncomeTurnover,
      totalExpenseTurnover,
      totalIncomeTurnoverPercent,
      totalExpenseTurnoverPercent,
    };
  }, [allTransaction]);

  return stats;
};

export default useTransactionStats;
