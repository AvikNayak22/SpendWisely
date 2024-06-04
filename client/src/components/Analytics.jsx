/* eslint-disable react/prop-types */
import {
  Box,
  Text,
  Progress,
  Flex,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

const Analytics = ({ allTransaction }) => {
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

  //total transactions
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type == "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type == "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={8} fontWeight="700">
        Website Analytics
      </Text>
      <Flex wrap="wrap" justifyContent="space-between">
        <Box w="100%" maxW="300px" mb={4}>
          <Text
            fontSize="lg"
            mb={2}
            mx={2}
            p={3}
            color="blue.600"
            backgroundColor="blue.100"
            borderColor="blue.600"
            borderRadius="md"
            borderWidth="1px"
          >
            Total Transactions: {totalTransaction}
          </Text>
          <Box
            backgroundColor="white"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            mx={2}
          >
            <Flex justifyContent="center" mb={4} gap={4}>
              <Text fontSize="lg" color="green.500">
                Income: {totalIncomeTransactions.length}
              </Text>
              <Text fontSize="lg" color="red.500">
                Expense: {totalExpenseTransactions.length}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <CircularProgress
                size={110}
                value={totalIncomePercent}
                color="green.400"
              >
                <CircularProgressLabel>
                  {totalIncomePercent.toFixed(0)}%
                </CircularProgressLabel>
              </CircularProgress>
              <CircularProgress
                size={110}
                value={totalExpensePercent}
                color="red.400"
              >
                <CircularProgressLabel>
                  {totalExpensePercent.toFixed(0)}%
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </Box>
        </Box>

        <Box w="100%" maxW="300px" mb={4}>
          <Text
            fontSize="lg"
            mb={2}
            mx={2}
            p={3}
            color="purple.600"
            backgroundColor="purple.100"
            borderColor="purple.600"
            borderRadius="md"
            borderWidth="1px"
          >
            Total Turnover: {totalTurnover}
          </Text>
          <Box
            backgroundColor="white"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            mx={2}
          >
            <Flex justifyContent="center" mb={4} gap={4}>
              <Text fontSize="lg" color="green.500">
                Income: {totalIncomeTurnover}
              </Text>
              <Text fontSize="lg" color="red.500">
                Expense: {totalExpenseTurnover}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" gap={4}>
              <CircularProgress
                value={totalIncomeTurnoverPercent}
                color="green.400"
                size={110}
              >
                <CircularProgressLabel>
                  {totalIncomeTurnoverPercent.toFixed(0)}%
                </CircularProgressLabel>
              </CircularProgress>
              <CircularProgress
                value={totalExpenseTurnoverPercent}
                color="red.400"
                size={110}
              >
                <CircularProgressLabel>
                  {totalExpenseTurnoverPercent.toFixed(0)}%
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </Box>
        </Box>

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
