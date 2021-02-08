const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    createdAt: Number,
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    organizationName: String,
<<<<<<< HEAD
    access: Array,
=======
>>>>>>> 255642b7009ecc961249f811b55aa76ef8ce79e5
  })
);

module.exports = User;
