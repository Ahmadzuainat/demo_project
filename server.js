import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import connectDB from "./src/config/db.js";
import NotesRoutes from "./src/routes/NotesRoutes.js";
// import AIRoutes from "./src/routes/AIRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use("/api/auth", AuthRoutes);
app.use("/api/notes", NotesRoutes);
// app.use("/api/ai", AIRoutes);


connectDB();

app.listen(PORT, () => {
    console.log(`http//localhost:${PORT}`);
});
