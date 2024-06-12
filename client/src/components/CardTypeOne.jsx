/* eslint-disable react/prop-types */
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from "@chakra-ui/react";

const CardTypeOne = ({ cardTitle, cardTitleColor, cardInfo, progressInfo }) => {
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
      <Box
        backgroundColor="white"
        p={4}
        borderRadius="md"
        borderWidth="1px"
        mx={2}
      >
        <Flex justifyContent="center" mb={4} gap={4}>
          <Text fontSize="lg" color="green.500">
            {cardInfo[0]}
          </Text>
          <Text fontSize="lg" color="red.500">
            {cardInfo[1]}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <CircularProgress
            size={110}
            value={progressInfo[0]}
            color="green.400"
          >
            <CircularProgressLabel>
              {progressInfo[0].toFixed(0)}%
            </CircularProgressLabel>
          </CircularProgress>
          <CircularProgress size={110} value={progressInfo[1]} color="red.400">
            <CircularProgressLabel>
              {progressInfo[1].toFixed(0)}%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </Box>
    </Box>
  );
};

export default CardTypeOne;
