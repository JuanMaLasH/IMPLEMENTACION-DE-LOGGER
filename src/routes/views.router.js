import { Router } from "express";
const router = Router();
import { ViewsManager } from "../controllers/ViewManager.js";
const viewsManager = new ViewsManager();
import checkUserRole from "../middleware/checkrole.js";
import passport from "passport"; 

router.get("/products", checkUserRole(['usuario']),passport.authenticate('jwt', { session: false }), viewsManager.renderProducts);

router.get("/carts/:cid", viewsManager.renderCart);
router.get("/login", viewsManager.renderLogin);
router.get("/register", viewsManager.renderRegister);
router.get("/realtimeproducts", checkUserRole(['admin']), viewsManager.renderRealTimeProducts);
router.get("/chat", checkUserRole(['usuario']) ,viewsManager.renderChat);
router.get("/", viewsManager.renderHome);

export default router;