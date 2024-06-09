/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from "../redux/apiSlice";

import Layout from "../components/Layout/Layout";
import Analytics from "../components/Analytics";
import Filters from "../components/Filters";
import TableData from "../components/TableData";
import TransactionModal from "../components/TransactionModal";
import Pagination from "../components/Pagination";

import {
  Spinner,
  Box,
  Button,
  useToast,
  Flex,
  Divider,
} from "@chakra-ui/react";

const HomePage = ({ validUser, setValidUser }) => {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: allTransaction = [], isLoading: loading } =
    useGetTransactionsQuery({
      userid: validUser._id,
      frequency,
      type,
    });

  const totalPages = Math.ceil(allTransaction.length / itemsPerPage);
  const currentTransactions = allTransaction.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <Layout validUser={validUser} setValidUser={setValidUser}>
      {loading && (
        <Flex justifyContent="center">
          <Spinner thickness="4px" size="md" color="black" />
        </Flex>
      )}
      <Box p="4">
        <Box overflowX={{ base: "auto", md: "visible" }}>
          <Flex
            w={{ base: "max-content", md: "auto" }}
            justifyContent="space-between"
          >
            <Filters
              frequency={frequency}
              setFrequency={setFrequency}
              type={type}
              setType={setType}
              viewData={viewData}
              setViewData={setViewData}
            />
            <Button
              ml={6}
              padding={4}
              onClick={() => setShowModal(true)}
              colorScheme="blue"
            >
              Add New
            </Button>
          </Flex>
        </Box>

        <Divider />
        <Box mt="4">
          {viewData === "table" ? (
            <>
              <TableData
                allTransaction={allTransaction}
                setEditable={setEditable}
                setShowModal={setShowModal}
                handleDelete={handleDelete}
                currentTransactions={currentTransactions}
              />
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </>
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
        validUser={validUser}
        setValidUser={setValidUser}
      />
    </Layout>
  );
};

export default HomePage;
