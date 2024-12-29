import { useState } from "react";	 // React hook, durumları yönetmek için kullanılır.
import { useAuthContext } from "../context/AuthContext";	// Kimlik doğrulama bağlamını kullanır.
import toast from "react-hot-toast";	// Kullanıcıya bildirim göstermek için kullanılan kütüphane.

const useLogout = () => {
	const [loading, setLoading] = useState(false);		// Yükleme durumunu izler.
	const { setAuthUser } = useAuthContext();			// Kullanıcı bilgisini sıfırlamak için bağlam.

	const logout = async () => {
		setLoading(true);		// Yükleme durumunu başlatır.
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",	 // HTTP POST isteği.
				headers: { "Content-Type": "application/json" },	// İstek başlıkları.
			});
			const data = await res.json();		// API'den dönen yanıtı JSON olarak ayrıştırır.
			if (data.error) {
				throw new Error(data.error);	// Eğer hata varsa bir hata fırlatır.
			}

			localStorage.removeItem("chat-user");	// Yerel depodaki kullanıcı bilgisini kaldırır.
			setAuthUser(null);	// Kullanıcı bilgisini sıfırlar.
		} catch (error) {
			toast.error(error.message);		// Hata durumunda kullanıcıya bir bildirim gösterir.
		} finally {
			setLoading(false);		// Yükleme durumunu sonlandırır.
		}
	};

	return { loading, logout };		 // Yükleme durumu ve çıkış fonksiyonunu döner.
};
export default useLogout;
