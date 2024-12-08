import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import FileUpload from "express-fileupload";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js"; 
import AsesorRoute from "./routes/AsesorRoute.js";
import InfoRoute from "./routes/InfoRoute.js";  
import BeritaRoute from "./routes/BeritaRoute.js";  
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(ProductRoute); // Ensure correct case
app.use(UserRoute);
app.use(InfoRoute);  // Ensure correct case
app.use(AsesorRoute);
app.use(BeritaRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});
