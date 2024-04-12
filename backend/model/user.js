const { default: mongoose } = require("mongoose")

const userSchema = mongoose.Schema({ firstName: String, lastName: String, userName: String, phoneNumber: Number, email: String, address: String, password: String }, { timestamps: true })

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;