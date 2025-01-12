import { createContext, useState, useEffect, useContext } from "react";		// React bağlamı ve durum yönetimi için kullanılan modüller.
import { useAuthContext } from "./AuthContext";		// Kimlik doğrulama bağlamını kullanır.
import io from "socket.io-client";		// Socket.IO istemcisi.

const SocketContext = createContext();	// Socket.IO bilgilerini paylaşmak için bir bağlam oluşturur.	

// SocketContext'i kullanmak için özel bir hook
export const useSocketContext = () => {
	return useContext(SocketContext);	// SocketContext'in değerlerine erişir.
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);				// Socket nesnesini saklar.
	const [onlineUsers, setOnlineUsers] = useState([]);		// Çevrimiçi kullanıcıların listesini saklar.
	const { authUser } = useAuthContext();					// Oturum açmış kullanıcının bilgilerini alır.

	useEffect(() => {
		if (authUser) {
			// Kullanıcı oturum açtıysa Socket.IO bağlantısını başlatır.
			const socket = io("http://localhost:5000", {
				query: {
					userId: authUser._id,	// Socket.IO bağlantısına kullanıcı kimliğini ekler.
				},
			});

			setSocket(socket);		// Socket nesnesini duruma kaydeder.

			// Çevrimiçi kullanıcıların listesini almak için olay dinleyicisi ekler.
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);		// Çevrimiçi kullanıcıları günceller.
			});

			// Temizlik fonksiyonu: Bileşen kaldırıldığında socket bağlantısını kapatır.
			return () => socket.close();
		} else {
			// Kullanıcı oturum açmadıysa socket'i kapatır ve sıfırlar.
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);	// authUser değiştiğinde efekt yeniden çalışır.

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;	{/* Bağlam değerlerini sağlar. */}	{/* children: Bağlamın tüm alt bileşenleri */}
};