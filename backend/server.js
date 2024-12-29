import path from "path";										// Dosya ve dizin yollarını çalıştırmak için kullanılan Node.js modülü.
import express from "express";									// Express.js, web uygulamaları için kullanılan bir çerçevedir.
import dotenv from "dotenv";									// Ortam değişkenlerini kullanmak için kullanılan bir modül.
import cookieParser from "cookie-parser";						// HTTP çerezlerini ayrıştırmak için kullanılan bir middleware.

import authRoutes from "./routes/auth.routes.js";				// Kimlik doğrulama rotalarını içe aktarır.
import messageRoutes from "./routes/message.routes.js";			// Mesaj rotalarını içe aktarır.
import userRoutes from "./routes/user.routes.js";				// Kullanıcı rotalarını içe aktarır.

import connectToMongoDB from "./db/connectToMongoDB.js";		// MongoDB bağlantısını başlatmak için bir işlev.
import { app, server } from "./socket/socket.js";				// Socket.IO sunucusu ve uygulamasını içe aktarır.

dotenv.config();	// Ortam değişkenlerini .env dosyasından yükler.

const __dirname = path.resolve();		// __dirname kullanımı için path.resolve() kullanılır.

// PORT tanımı, dotenv.config() çağrıldıktan sonra yapılmalıdır.
const PORT = process.env.PORT || 5000;	// PORT değeri ortam değişkenlerinden alınır, yoksa 5000 olarak ayarlanır.

// JSON verilerini ayrıştırmak için middleware
app.use(express.json()); 	// Gelen isteklerdeki JSON yüklerini ayrıştırır (req.body ile erişim sağlar).
app.use(cookieParser());	// Çerezleri ayrıştırır.

// Uygulama rotalarını tanımlar
app.use("/api/auth", authRoutes);			// Kimlik doğrulama rotaları.
app.use("/api/messages", messageRoutes);	// Mesaj rotaları.
app.use("/api/users", userRoutes);			// Kullanıcı rotaları.

// Statik dosyaları sunar
app.use(express.static(path.join(__dirname, "/frontend/dist")));	// "frontend/dist" dizinindeki dosyaları statik olarak sunar.

// Tüm GET istekleri için tek sayfa uygulaması desteği
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));	 // Ana HTML dosyasını döner.
});

// Sunucuyu başlatır
server.listen(PORT, () => {
	connectToMongoDB();		// MongoDB'ye bağlanır.
	console.log(`Server Running on port ${PORT}`);
});
