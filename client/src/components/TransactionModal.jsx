/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import {
  useAddTransactionMutation,
  useEditTransactionMutation,
} from "../redux/apiSlice";

const TransactionModal = ({
  showModal,
  setShowModal,
  editable,
  setEditable,
}) => {
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));

  const [editTransaction] = useEditTransactionMutation();
  const [addTransaction] = useAddTransactionMutation();

  const validationSchema = Yup.object({
    amount: Yup.number().required("Amount is required"),
    type: Yup.string().required("Type is required"),
    category: Yup.string().required("Category is required"),
    date: Yup.date().required("Date is required"),
    reference: Yup.string(),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      amount: editable?.amount || "",
      type: editable?.type || "income",
      category: editable?.category || "salary",
      date: editable ? moment(editable.date).format("YYYY-MM-DD") : "",
      reference: editable?.reference || "",
      description: editable?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (editable) {
          await editTransaction({
            payload: {
              ...values,
              userid: user.userid,
            },
            transactionId: editable._id,
          }).unwrap();
          toast({
            title: "Transaction updated successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          await addTransaction({
            ...values,
            userid: user.userid,
          }).unwrap();
          toast({
            title: "Transaction added successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
        setShowModal(false);
        setEditable(null);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error adding transaction.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {editable ? "Edit Transaction" : "Add Transaction"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing="12px">
              <FormControl
                id="amount"
                isInvalid={formik.errors.amount && formik.touched.amount}
              >
                <FormLabel>Amount</FormLabel>
                <Input
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                />
                {formik.errors.amount && formik.touched.amount ? (
                  <div>{formik.errors.amount}</div>
                ) : null}
              </FormControl>
              <FormControl
                id="type"
                isInvalid={formik.errors.type && formik.touched.type}
              >
                <FormLabel>Type</FormLabel>
                <Select
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Select>
                {formik.errors.type && formik.touched.type ? (
                  <div>{formik.errors.type}</div>
                ) : null}
              </FormControl>
              <FormControl
                id="category"
                isInvalid={formik.errors.category && formik.touched.category}
              >
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  <option value="salary">Salary</option>
                  <option value="rent">Rent</option>
                  <option value="groceries">Groceries</option>
                  <option value="bills">Bills</option>
                  <option value="medical">Medical expenses</option>
                  <option value="subscriptions">Subscriptions</option>
                  <option value="tax">Tax</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </Select>
                {formik.errors.category && formik.touched.category ? (
                  <div>{formik.errors.category}</div>
                ) : null}
              </FormControl>
              <FormControl
                id="date"
                isInvalid={formik.errors.date && formik.touched.date}
              >
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  type="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                />
                {formik.errors.date && formik.touched.date ? (
                  <div>{formik.errors.date}</div>
                ) : null}
              </FormControl>
              <FormControl id="reference">
                <FormLabel>Reference</FormLabel>
                <Input
                  name="reference"
                  value={formik.values.reference}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
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
  );
};

export default TransactionModal;
