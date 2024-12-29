import { useEffect, useState } from "react";	// React hook'ları, yan etkileri ve durumları yönetmek için kullanılır.
import toast from "react-hot-toast";			// Kullanıcıya bildirim göstermek için kullanılan kütüphane.

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);		// Yükleme durumunu izler.
	const [conversations, setConversations] = useState([]);		// Konuşmaları saklar.

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);		// Yükleme durumunu başlatır.
			try {
				const res = await fetch("/api/users");		// Konuşmaları almak için API çağrısı yapar.
				const data = await res.json();				// API'den dönen yanıtı JSON olarak ayrıştırır.
				if (data.error) {
					throw new Error(data.error);	// Eğer hata varsa bir hata fırlatır.
				}
				setConversations(data);		// Alınan konuşmaları duruma kaydeder.
			} catch (error) {
				toast.error(error.message);		 // Hata durumunda kullanıcıya bir bildirim gösterir.
			} finally {
				setLoading(false);		// Yükleme durumunu sonlandırır.
			}
		};

		getConversations();		// API çağrısını başlatır.
	}, []);		// Bileşen yüklendiğinde bir kez çalışır.

	return { loading, conversations };		// Yükleme durumu ve konuşmaları döner.
};
export default useGetConversations;			// Hook'u dışa aktarır.
