import { Router } from "express";
const router = Router();
import passport from "passport"; 
import { UserManager } from "../controllers/UserManager.js";
const userManager = new UserManager();


router.post("/register", userManager.register);
router.post("/login", userManager.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), userManager.profile);
router.post("/logout", userManager.logout.bind(userManager));
router.get("/admin", passport.authenticate("jwt", { session: false }), userManager.admin);

export default router;