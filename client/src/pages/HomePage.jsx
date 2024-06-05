import { useState } from "react";

import Layout from "../components/Layout/Layout";
import Analytics from "../components/Analytics";
import TableData from "../components/TableData";
import TransactionModal from "../components/TransactionModal";

import {
  Spinner,
  Box,
  Button,
  Select,
  useToast,
  IconButton,
  HStack,
  Flex,
  Divider,
} from "@chakra-ui/react";

import { BsTable, BsBarChartFill } from "react-icons/bs";
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from "../redux/apiSlice";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("user"));

  const { data: allTransaction = [], isLoading: loading } =
    useGetTransactionsQuery({
      userid: user._id,
      frequency,
      type,
    });

  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDelete = async (record) => {
    try {
      await deleteTransaction(record._id).unwrap();
      toast({
        title: "Transaction Deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting transaction.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      {loading && (
        <Flex justifyContent="center">
          <Spinner thickness="4px" size="md" color="black" />
        </Flex>
      )}
      <Box p="4">
        <Flex justifyContent="space-between">
          <HStack spacing="24px">
            <Box id="frequency">
              <Select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="7" disabled hidden>
                  Select Frequency
                </option>
                <option value="7">Last 1 Week</option>
                <option value="30">Last 1 Month</option>
                <option value="180">Last 6 Month</option>
                <option value="365">Last 1 Year</option>
              </Select>
            </Box>
            <Box id="type">
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all" disabled hidden>
                  {" "}
                  Select Type
                </option>
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
            </Box>
            <HStack
              spacing="10px"
              border="1px solid"
              borderColor="#CBD5E0"
              borderRadius={4}
            >
              <IconButton
                icon={<BsTable />}
                aria-label="Table View"
                onClick={() => setViewData("table")}
                color={viewData === "table" ? "blue" : "gray"}
                backgroundColor="transparent"
                _hover={{ backgroundColor: "transparent" }}
              />
              <IconButton
                icon={<BsBarChartFill />}
                aria-label="Analytics View"
                onClick={() => setViewData("analytics")}
                color={viewData === "analytics" ? "blue" : "gray"}
                backgroundColor="transparent"
                _hover={{ backgroundColor: "transparent" }}
              />
            </HStack>
          </HStack>
          <Button
            padding={4}
            onClick={() => setShowModal(true)}
            colorScheme="blue"
          >
            Add New
          </Button>
        </Flex>
        <Divider />
        <Box mt="4">
          {viewData === "table" ? (
            <TableData
              allTransaction={allTransaction}
              setEditable={setEditable}
              setShowModal={setShowModal}
              handleDelete={handleDelete}
            />
          ) : (
            <Analytics allTransaction={allTransaction} />
          )}
        </Box>
      </Box>
      <TransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        editable={editable}
        setEditable={setEditable}
      />
    </Layout>
  );
};

export default HomePage;
