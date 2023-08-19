const mongoose = require("mongoose");

//?------------------------------------------
// TODO : function for database connection
//?------------------------------------------
const DataBaseCon = async () => {
  try {
    const db_url = "mongodb://127.0.0.1:27017/Assignment_Provoke";
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DataBaseCon;
