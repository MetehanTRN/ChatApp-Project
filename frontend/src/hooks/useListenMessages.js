import { useEffect } from "react";	// React hook, yan etkileri yönetmek için kullanılır.

import { useSocketContext } from "../context/SocketContext";	// Socket.IO bağlamını kullanır.
import useConversation from "../zustand/useConversation";		// Konuşma yönetimi için Zustand store kullanımı.

import notificationSound from "../assets/sounds/notification.mp3";	// Yeni mesaj bildirimi için kullanılan ses dosyası.

const useListenMessages = () => {
	const { socket } = useSocketContext();						// Socket.IO nesnesini alır.
	const { messages, setMessages } = useConversation();		// Mesajları ve mesaj güncelleme fonksiyonunu alır.

	useEffect(() => {
		// Yeni mesajları dinlemek için bir Socket.IO olay dinleyicisi ekler.
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;					// Yeni mesajın titreme efekti almasını ayarlar.
			const sound = new Audio(notificationSound);		// Yeni mesaj sesi oluşturur.
			sound.play();									// Sesi çalar.
			setMessages([...messages, newMessage]);			// Yeni mesajı mevcut mesaj listesine ekler.
		});

		// Bileşen kaldırıldığında (unmount), olay dinleyicisini temizler.
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);	// Bağımlılıklar değiştiğinde efekt yeniden çalışır.
};
export default useListenMessages;