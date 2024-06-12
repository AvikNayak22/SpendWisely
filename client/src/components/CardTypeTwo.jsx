/* eslint-disable react/prop-types */
import { Box, Progress, Text } from "@chakra-ui/react";

const CardTypeTwo = ({
  cardTitle,
  cardTitleColor,
  allTransaction,
  transactionType,
  totalTransactionTurnover,
}) => {
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
    <Box w="100%" maxW="300px" mb={4}>
      <Text
        fontSize="lg"
        mb={2}
        mx={2}
        p={3}
        color={`${cardTitleColor}.600`}
        backgroundColor={`${cardTitleColor}.100`}
        borderColor={`${cardTitleColor}.600`}
        borderRadius="md"
        borderWidth="1px"
      >
        {cardTitle}
      </Text>
      {categories.map((category) => {
        const amount = allTransaction
          .filter(
            (transaction) =>
              transaction.type === transactionType &&
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
              <Progress value={(amount / totalTransactionTurnover) * 100} />
            </Box>
          )
        );
      })}
    </Box>
  );
};

export default CardTypeTwo;
