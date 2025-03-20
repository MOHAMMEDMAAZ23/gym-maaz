const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    month: String,
    amount: Number
});

module.exports = mongoose.model("Bill", BillSchema);
