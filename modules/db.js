const mongoose = require("mongoose");

mongoose
   .connect(
      "mongodb+srv://giaminh16092003:7rN6UlGBcmZm2Czu@mongotest.hdbc0el.mongodb.net/ASM_MOB402?retryWrites=true&w=majority"
   )
   .then(console.log("✅ Connected database successfully!"))
   .catch((err) =>
      console.error(`❌ Connect database is failed with error which is ${err}`)
   );

module.exports = mongoose;
