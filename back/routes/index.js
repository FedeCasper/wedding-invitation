import express from "express";
import guestsRoutes from "./guestsRouter.js";

const indexRouter = express.Router()

indexRouter.get("/", (req, res) => {
     res.send("api invitatio")
})

indexRouter.use( "/guests",  guestsRoutes )

export default indexRouter;