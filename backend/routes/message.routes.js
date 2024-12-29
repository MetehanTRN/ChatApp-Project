import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";     // Mesaj işlemleri için kullanılan controller fonksiyonları.
import protectRoute from "../middleware/protectRoute.js";   // Kimlik doğrulama ve yetkilendirme için kullanılan middleware.

// Router nesnesi oluşturulur.
const router = express.Router();

// Belirli bir kullanıcıyla olan mesajları getirmek için rota
router.get("/:id", protectRoute, getMessages);  // GET isteği ile "/:id" rotasına gelen isteklerde protectRoute middleware'i ve ardından getMessages fonksiyonu çağrılır.

// Belirli bir kullanıcıya mesaj göndermek için rota
router.post('/send/:id', protectRoute, sendMessage);    // POST isteği ile "/send/:id" rotasına gelen isteklerde protectRoute middleware'i ve ardından sendMessage fonksiyonu çağrılır.

export default router;  // Router dışa aktarılır ve diğer dosyalarda kullanılabilir.