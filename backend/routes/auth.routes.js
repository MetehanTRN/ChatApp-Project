import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";  // Kimlik doğrulama işlemleri için kullanılan controller fonksiyonları.

const router = express.Router();    // Router nesnesi oluşturulur.

// Kullanıcı kayıt işlemi için rota
router.post("/signup", signup);         // POST isteği ile "/signup" rotasına gelen istekler için signup fonksiyonu çağrılır.

// Kullanıcı giriş işlemi için rota
router.post("/login", login);           // POST isteği ile "/login" rotasına gelen istekler için login fonksiyonu çağrılır.

// Kullanıcı çıkış işlemi için rota
router.post("/logout", logout);         // POST isteği ile "/logout" rotasına gelen istekler için logout fonksiyonu çağrılır.

export default router;  // Router dışa aktarılır ve diğer dosyalarda kullanılabilir.