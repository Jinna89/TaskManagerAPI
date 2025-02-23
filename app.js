import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { DATABASE, MAX_JSON_SIZE,PORT,REQUEST_NUMBER,REQUEST_TIME,URL_ENCODE,WEB_CACHE } from "./app/config/config.js";
import router from "./routes/api.js";

const app = express();

// App Use Default Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODE}));

// App use Limiter
const limiter = rateLimit({windowMs: REQUEST_TIME, max:REQUEST_NUMBER})
app.use(limiter);

// Cache
app.set('etag', WEB_CACHE)

// Connect to MongoDB
mongoose.connect(DATABASE, {autoIndex:true}).then(() => {
    console.log("MongoDB Connected...")
}).catch((err) => {
    console.log(err, 'MongoDB disconnected')
});

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});