import express from 'express';
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from 'passport';
import { initializePassport  } from "./config/passport.config.js";
import cors from "cors";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from"./routes/user.router.js";
import fakerRouter from "./routes/faker.router.js";
import addLogger from "./utils/logger.js";
import { __dirname } from './utils/hashbcrypt.js';
import manejadorError from "./middleware/error.js";
import './db/database.js';

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(addLogger);

//PASSPORT
app.use(passport.initialize());
initializePassport(); 
app.use(cookieParser());

//AUTHMIDDLEWARE
import authMiddleware from "./middleware/authmiddleware.js";
app.use(authMiddleware);

//HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//ROUTES
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/api", fakerRouter);
app.use("/", viewsRouter);
app.use(manejadorError);

//ROUTE OF TEST WINSTON: 
app.get("/loggertest", (req, res) => {
    req.logger.debug("Mensaje DEBUG");
    req.logger.http("Mensaje HTTP"); 
    req.logger.info("Mensaje INFO"); 
    req.logger.warning("Mensaje WARNING"); 
    req.logger.error("Mensaje ERROR");
    req.logger.fatal("Mensaje FATAL");

    res.send("Logs generados");
});

//LISTEN
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`SERVER UP ON PORT ${PORT}`);
});

//WEBSOCKETS
import SocketManager from "./sockets/socketmanager.js";
new SocketManager(httpServer);