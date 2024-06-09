import { useState } from "react";

import Layout from "../components/Layout/Layout";
import Analytics from "../components/Analytics";
import TableData from "../components/TableData";
import TransactionModal from "../components/TransactionModal";

import {
  Spinner,
  Box,
  Button,
  useToast,
  Flex,
  Divider,
} from "@chakra-ui/react";

import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from "../redux/apiSlice";
import Filters from "../components/Filters";

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
      userid: user.userid,
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
      <Box p="4" overflowX="scroll">
        <Flex justifyContent="space-between" width={["660px", "100%"]}>
          <Filters
            frequency={frequency}
            setFrequency={setFrequency}
            type={type}
            setType={setType}
            viewData={viewData}
            setViewData={setViewData}
          />
          <Button
            padding={4}
            marginLeft={2}
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
