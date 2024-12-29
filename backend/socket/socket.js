import { Server } from "socket.io";		// Socket.IO, gerçek zamanlı web uygulamaları için kullanılan bir kütüphanedir.
import http from "http";	// HTTP sunucusu oluşturmak için kullanılır.
import express from "express";

const app = express();		// Yeni bir Express uygulaması oluşturulur.

const server = http.createServer(app);	// Express uygulamasını temel alan bir HTTP sunucusu oluşturulur.
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],	// Hangi alan adlarının bu sunucuya erişebileceğini tanımlar.
		methods: ["GET", "POST"],	// İzin verilen HTTP metodları.
	},
});

// Kullanıcı kimliğine bağlı olarak socket ID'sini almak için bir fonksiyon
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];	// Kullanıcının socket ID'sini döner.
};

const userSocketMap = {}; // Kullanıcı-Socket eşleşmesini tutar. Yapı: {userId: socketId}

// Socket.IO bağlantı olayları
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);	// Yeni bir kullanıcı bağlandığında konsola log yazılır.

	const userId = socket.handshake.query.userId;	// Kullanıcı kimliği bağlantı isteğinden alınır.
	if (userId != "undefined") userSocketMap[userId] = socket.id;	// Kullanıcı kimliği eşleşmesi yapılır.

	// Tüm bağlı kullanıcılara çevrimiçi kullanıcıları gönderir
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// Kullanıcı bağlantısını kestiğinde çalışır
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);	// Kullanıcı ayrıldığında log yazılır.
		delete userSocketMap[userId];	// Kullanıcı-Socket eşleşmesi silinir.
		io.emit("getOnlineUsers", Object.keys(userSocketMap));	// Güncel çevrimiçi kullanıcılar listesi gönderilir.
	});
});

export { app, io, server };		// Sunucu, Socket.IO nesnesi ve uygulama dışa aktarılır.
