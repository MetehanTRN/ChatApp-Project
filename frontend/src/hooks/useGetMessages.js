import { useEffect, useState } from "react";				// React hook'ları, yan etkileri ve durumları yönetmek için kullanılır.
import useConversation from "../zustand/useConversation";	// Konuşma yönetimi için Zustand store kullanımı.
import toast from "react-hot-toast";						// Kullanıcıya bildirim göstermek için kullanılan kütüphane.

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);			// Yükleme durumunu izler.
	const { messages, setMessages, selectedConversation } = useConversation();	// Konuşma bilgileri ve mesajları yönetir.

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);		// Yükleme durumunu başlatır.
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);		// Seçili konuşmanın mesajlarını almak için API çağrısı yapar.
				const data = await res.json();	// API'den dönen yanıtı JSON olarak ayrıştırır.
				if (data.error) throw new Error(data.error);	// Eğer hata varsa bir hata fırlatır.
				setMessages(data);		// Alınan mesajları duruma kaydeder.
			} catch (error) {
				toast.error(error.message);		// Hata durumunda kullanıcıya bir bildirim gösterir.
			} finally {
				setLoading(false);		// Yükleme durumunu sonlandırır.
			}
		};

		if (selectedConversation?._id) getMessages();	// Eğer bir konuşma seçiliyse mesajları getirir.
	}, [selectedConversation?._id, setMessages]);		// Seçili konuşma veya mesajları güncelleme fonksiyonu değiştiğinde çalışır.

	return { messages, loading };		// Mesajlar ve yükleme durumunu döner.
};
export default useGetMessages;
