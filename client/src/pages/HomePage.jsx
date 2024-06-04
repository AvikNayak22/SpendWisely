import { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../components/Layout/Layout";
import Analytics from "../components/Analytics";

import {
  Spinner,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  VStack,
  Flex,
  Divider,
} from "@chakra-ui/react";

import { MdDelete, MdModeEdit } from "react-icons/md";
import { BsTable, BsBarChartFill } from "react-icons/bs";

import moment from "moment";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const toast = useToast();

  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Type", dataIndex: "type" },
    { title: "Category", dataIndex: "category" },
    { title: "Reference", dataIndex: "reference" },
  ];

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("api/v1/transactions/get-transaction", {
          userid: user._id,
          frequency,
          type,
        });
        setLoading(false);
        setAllTransaction(res.data);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error fetching transactions.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    getAllTransaction();
  }, [frequency, type]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("api/v1/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      toast({
        title: "Transaction Deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error deleting transaction.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("api/v1/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        toast({
          title: "Transaction updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        await axios.post("api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        toast({
          title: "Transaction added successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      setShowModal(false);
      setEditable(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error adding transaction.",
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
            <Table variant="simple">
              <Thead>
                <Tr>
                  {columns.map((col) => (
                    <Th key={col.title}>{col.title}</Th>
                  ))}
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allTransaction.map((record) => (
                  <Tr key={record._id}>
                    <Td>{moment(record.date).format("YYYY-MM-DD")}</Td>
                    <Td>{record.amount}</Td>
                    <Td>{record.type}</Td>
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
          ) : (
            <Analytics allTransaction={allTransaction} />
          )}
        </Box>
      </Box>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editable ? "Edit Transaction" : "Add Transaction"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const values = Object.fromEntries(formData.entries());
                handleSubmit(values);
              }}
            >
              <VStack spacing="12px">
                <FormControl id="amount">
                  <FormLabel>Amount</FormLabel>
                  <Input name="amount" defaultValue={editable?.amount} />
                </FormControl>
                <FormControl id="type">
                  <FormLabel>Type</FormLabel>
                  <Select name="type" defaultValue={editable?.type}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </Select>
                </FormControl>
                <FormControl id="category">
                  <FormLabel>Category</FormLabel>
                  <Select name="category" defaultValue={editable?.category}>
                    <option value="salary">Salary</option>
                    <option value="rent">Rent</option>
                    <option value="groceries">Groceries</option>
                    <option value="bills">Bills</option>
                    <option value="medical">Medical expenses</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="tax">Tax</option>
                    <option value="miscellaneous">Miscellaneous</option>
                  </Select>
                </FormControl>
                <FormControl id="date">
                  <FormLabel>Date</FormLabel>
                  <Input
                    name="date"
                    type="date"
                    defaultValue={
                      editable ? moment(editable.date).format("YYYY-MM-DD") : ""
                    }
                  />
                </FormControl>
                <FormControl id="reference">
                  <FormLabel>Reference</FormLabel>
                  <Input name="reference" defaultValue={editable?.reference} />
                </FormControl>
                <FormControl id="description">
                  <FormLabel>Description</FormLabel>
                  <Input
                    name="description"
                    defaultValue={editable?.description}
                  />
                </FormControl>
                <Flex gap={2} my={3}>
                  <Button colorScheme="blue" type="submit" justifyContent="end">
                    Save
                  </Button>
                  <Button ml={1} onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </Flex>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default HomePage;
