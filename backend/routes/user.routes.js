import express from "express";
import protectRoute from "../middleware/protectRoute.js";   // Kimlik doğrulama ve yetkilendirme için kullanılan middleware.
import { getUsersForSidebar } from "../controllers/user.controller.js";     // Kullanıcı işlemleri için kullanılan controller fonksiyonu.


const router = express.Router();

// Yan menü için kullanıcıları getirmek üzere rota
router.get('/', protectRoute, getUsersForSidebar);  // GET isteği ile "/" rotasına gelen isteklerde protectRoute middleware'i ve ardından getUsersForSidebar fonksiyonu çağrılır.

export default router;