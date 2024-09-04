/* eslint-disable react/prop-types */
import {
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Badge,
} from "@chakra-ui/react";

import { MdDelete, MdModeEdit } from "react-icons/md";
import moment from "moment";

const columns = [
  { title: "Date", dataIndex: "date" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Type", dataIndex: "type" },
  { title: "Category", dataIndex: "category" },
  { title: "Reference", dataIndex: "reference" },
];

const TableData = ({
  setEditable,
  setShowModal,
  handleDelete,
  currentTransactions,
}) => {
  return (
    <Box
      overflowX={{ base: "auto", md: "visible" }}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
    >
      <Table variant="simple" w={{ base: "max-content", md: "100%" }}>
        <Thead bg="gray.100">
          <Tr>
            {columns.map((col) => (
              <Th fontSize="0.9em" key={col.title} textAlign="center">
                {col.title}
              </Th>
            ))}
            <Th fontSize="0.9em" textAlign="center">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentTransactions.map((record) => (
            <Tr key={record._id} _hover={{ bg: "gray.100" }}>
              <Td textAlign="center">
                {moment(record.date).format("YYYY-MM-DD")}
              </Td>
              <Td textAlign="center">{record.amount}</Td>
              <Td textAlign="center">
                <Badge
                  fontSize="0.8em"
                  px={3}
                  py={1}
                  colorScheme={record.type === "expense" ? "red" : "green"}
                  borderRadius="full"
                >
                  {record.type}
                </Badge>
              </Td>
              <Td textAlign="center">{record.category}</Td>
              <Td textAlign="center">{record.reference}</Td>
              <Td textAlign="center">
                <HStack spacing="12px" justify="center">
                  <IconButton
                    icon={<MdModeEdit />}
                    onClick={() => {
                      setEditable(record);
                      setShowModal(true);
                    }}
                    colorScheme="blue"
                    color="white"
                    size="md"
                    _hover={{ bg: "blue.500" }}
                    borderRadius="full"
                    aria-label="Edit"
                  />
                  <IconButton
                    icon={<MdDelete />}
                    onClick={() => handleDelete(record)}
                    colorScheme="red"
                    color="white"
                    size="md"
                    _hover={{ bg: "red.500" }}
                    borderRadius="full"
                    aria-label="Delete"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableData;
