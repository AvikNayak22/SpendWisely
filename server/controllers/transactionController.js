const transactionModel = require("../models/transactionModel");
const moment = require("moment");
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, type } = req.body;
    const transaction = await transactionModel.find({
      date: {
        $gt: moment().subtract(Number(frequency), "d").toDate(),
      },
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).json("Transaction created");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );

    res.status(200).json("Edited Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).json("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
