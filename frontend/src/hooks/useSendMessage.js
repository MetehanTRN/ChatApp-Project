import { useState } from "react";								// React hook, durumları yönetmek için kullanılır.
import useConversation from "../zustand/useConversation";		// Konuşma yönetimi için Zustand store kullanımı.
import toast from "react-hot-toast";							// Kullanıcıya bildirim göstermek için kullanılan kütüphane.

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);		// Yükleme durumunu izler.
	const { messages, setMessages, selectedConversation } = useConversation();		// Mesajları ve seçili konuşmayı yönetir.

	const sendMessage = async (message) => {
		setLoading(true);		// Yükleme durumunu başlatır.
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",		// HTTP POST isteği.
				headers: {
					"Content-Type": "application/json",
				},	// İstek başlıkları.
				body: JSON.stringify({ message }),	// Mesaj içeriği.
			});
			const data = await res.json();		// API'den dönen yanıtı JSON olarak ayrıştırır.
			if (data.error) throw new Error(data.error);	// Eğer hata varsa bir hata fırlatır.

			setMessages([...messages, data]);	// Yeni mesajı mevcut mesaj listesine ekler.
		} catch (error) {
			toast.error(error.message);		// Hata durumunda kullanıcıya bir bildirim gösterir.
		} finally {
			setLoading(false);		 // Yükleme durumunu sonlandırır.
		}
	};

	return { sendMessage, loading };	// Mesaj gönderme fonksiyonu ve yükleme durumunu döner.
};
export default useSendMessage;	// Hook'u dışa aktarır.
