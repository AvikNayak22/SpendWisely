/* eslint-disable react/prop-types */
import { Box, Text, Flex } from "@chakra-ui/react";
import useTransactionStats from "../hooks/useTransactionStats";
import CardTypeOne from "./CardTypeOne";
import CardTypeTwo from "./CardTypeTwo";

const Analytics = ({ allTransaction }) => {
  const {
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
  } = useTransactionStats(allTransaction);

  const cardTypeOneData = [
    {
      cardIndex: 1,
      cardTitle: `Total Transactions: ${totalTransaction}`,
      cardTitleColor: "blue",
      cardInfo: [
        `Income: ${totalIncomeTransactions.length}`,
        `Expense: ${totalExpenseTransactions.length}`,
      ],
      progressInfo: [totalIncomePercent, totalExpensePercent],
    },
    {
      cardIndex: 2,
      cardTitle: `Total Turnover: ${totalTurnover}`,
      cardTitleColor: "purple",
      cardInfo: [
        `Income: ${totalIncomeTurnover}`,
        `Expense: ${totalExpenseTurnover}`,
      ],
      progressInfo: [totalIncomeTurnoverPercent, totalExpenseTurnoverPercent],
    },
  ];

  const cardTypeTwoData = [
    {
      cardIndex: 1,
      cardTitle: "Category-wise Income",
      cardTitleColor: "green",
      transactionType: "income",
      allTransaction: allTransaction,
      totalTransactionTurnover: totalIncomeTurnover,
    },
    {
      cardIndex: 2,
      cardTitle: "Category-wise Expense",
      cardTitleColor: "orange",
      transactionType: "expense",
      allTransaction: allTransaction,
      totalTransactionTurnover: totalExpenseTurnover,
    },
  ];

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={8} fontWeight="700">
        Website Analytics
      </Text>
      <Flex wrap="wrap" justifyContent="space-between">
        {cardTypeOneData.map((data) => (
          <CardTypeOne
            key={data.cardIndex}
            cardTitle={data.cardTitle}
            cardTitleColor={data.cardTitleColor}
            cardInfo={data.cardInfo}
            progressInfo={data.progressInfo}
          />
        ))}

        {cardTypeTwoData.map((data) => (
          <CardTypeTwo
            key={data.cardIndex}
            cardTitle={data.cardTitle}
            cardTitleColor={data.cardTitleColor}
            transactionType={data.transactionType}
            allTransaction={data.allTransaction}
            totalTransactionTurnover={data.totalTransactionTurnover}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Analytics;
