/* eslint-disable react/prop-types */
import { Button, Flex, HStack } from "@chakra-ui/react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <Flex justifyContent="center">
      <HStack spacing="12px" mt="8" width="max-content">
        <Button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          variant="outline"
          colorScheme="blue"
        >
          First
        </Button>
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {/* Page Index Buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
            variant={currentPage === index + 1 ? "solid" : "outline"}
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        <Button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          variant="outline"
          colorScheme="blue"
        >
          Last
        </Button>
      </HStack>
    </Flex>
  );
};

export default Pagination;
