import mongoose from "mongoose";

let uri_link = process.env.MONGO;

mongoose.connect(uri_link)
   .then(() => {
      console.log(' --> Database connected successfully <-- ');
   })
   .catch((err) => {
      console.log(err)
   })

