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
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th fontSize="0.9em" key={col.title}>
                {col.title}
              </Th>
            ))}
            <Th fontSize="0.9em">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentTransactions.map((record) => (
            <Tr key={record._id}>
              <Td>{moment(record.date).format("YYYY-MM-DD")}</Td>
              <Td>{record.amount}</Td>
              <Td>
                {" "}
                <Badge
                  ml="1"
                  fontSize="0.8em"
                  px={2}
                  py={1}
                  colorScheme={record.type === "expense" ? "red" : "green"}
                  borderRadius="5px"
                >
                  {record.type}
                </Badge>
              </Td>
              <Td>{record.category}</Td>
              <Td>{record.reference}</Td>
              <Td>
                <HStack spacing="12px">
                  <IconButton
                    icon={<MdModeEdit />}
                    onClick={() => {
                      setEditable(record);
                      setShowModal(true);
                    }}
                    colorScheme="blue"
                    color="white"
                  />
                  <IconButton
                    icon={<MdDelete />}
                    onClick={() => handleDelete(record)}
                    colorScheme="red"
                    color="white"
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
