import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectToDB from "./config/db.js";
import productRouter from "./routes/product.route.js";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

dotenv.config();

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
};

app.listen(PORT, () => {
    connectToDB();
    console.log("Server started at http://localhost:" + PORT);
});

