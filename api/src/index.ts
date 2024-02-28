import express from "express";
import diaryRoutes from "./routes/diaries";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); //middleware
const PORT = 3000;

app.get("/", (_, res) => {
  console.log("Hello Worldaoe" + new Date());
  res.send("Hello Worldaoe");
});

app.use("/api/diaries", diaryRoutes);

app.listen(PORT, () => {
  console.log(`Server is aoe at http://localhost:${PORT}`);
});
