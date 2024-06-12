/* eslint-disable react/prop-types */
import { Box, Text, Progress, Flex } from "@chakra-ui/react";
import useTransactionStats from "../hooks/useTransactionStats";
import CardTypeOne from "./CardTypeOne";

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

  //category
  const categories = [
    "salary",
    "rent",
    "groceries",
    "bills",
    "medical",
    "subscriptions",
    "tax",
    "miscellaneous",
  ];

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={8} fontWeight="700">
        Website Analytics
      </Text>
      <Flex wrap="wrap" justifyContent="space-between">
        <CardTypeOne
          cardTitle={`Total Transactions: ${totalTransaction}`}
          cardTitleColor={"blue"}
          cardBodyColors={["green", "red"]}
          cardInfo={[
            `Income: ${totalIncomeTransactions.length}`,
            `Expense: ${totalExpenseTransactions.length}`,
          ]}
          progressInfo={[totalIncomePercent, totalExpensePercent]}
        ></CardTypeOne>
        <CardTypeOne
          cardTitle={`Total Turnover: ${totalTurnover}`}
          cardTitleColor={"purple"}
          cardBodyColors={["green", "red"]}
          cardInfo={[
            `Income: ${totalIncomeTurnover}`,
            `Expense: ${totalExpenseTurnover}`,
          ]}
          progressInfo={[
            totalIncomeTurnoverPercent,
            totalExpenseTurnoverPercent,
          ]}
        ></CardTypeOne>

        <Box w="100%" maxW="300px" mb={4}>
          <Text
            fontSize="lg"
            mb={2}
            mx={2}
            p={3}
            color="green.600"
            backgroundColor="green.100"
            borderColor="green.600"
            borderRadius="md"
            borderWidth="1px"
          >
            Category-wise Income
          </Text>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);

            return (
              amount > 0 && (
                <Box
                  backgroundColor="white"
                  p={4}
                  borderRadius="md"
                  borderWidth="1px"
                  mx={2}
                  mb={2}
                  key={category}
                >
                  <Text mb={2}>{category}</Text>
                  <Progress value={(amount / totalIncomeTurnover) * 100} />
                </Box>
              )
            );
          })}
        </Box>

        <Box w="100%" maxW="300px" mb={4}>
          <Text
            fontSize="lg"
            mb={2}
            p={3}
            backgroundColor="orange.100"
            color="orange.600"
            borderRadius="md"
            borderWidth="1px"
            borderColor="orange.600"
            mx={2}
          >
            Category-wise Expense
          </Text>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);

            return (
              amount > 0 && (
                <Box
                  backgroundColor="white"
                  p={4}
                  borderRadius="md"
                  borderWidth="1px"
                  mb={2}
                  mx={2}
                  key={category}
                >
                  <Text mb={2}>{category}</Text>
                  <Progress value={(amount / totalExpenseTurnover) * 100} />
                </Box>
              )
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default Analytics;
