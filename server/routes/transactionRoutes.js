const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
//add transaction
router.post("/add-transaction", addTransaction);

//Edit transaction
router.post("/edit-transaction", editTransaction);

//Delete transaction
router.post("/delete-transaction", deleteTransaction);

//get transaction
router.post("/get-transaction", getAllTransaction);

module.exports = router;
