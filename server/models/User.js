const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    packages: [{ type: String }],
    bills: [{ month: String, amount: Number }]
});

module.exports = mongoose.model("User", UserSchema);
