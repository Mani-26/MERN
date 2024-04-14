const mongoose=require("mongoose")
const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required:true,
  },
});

const collection = mongoose.model("Credential", newSchema);

module.exports = collection;
