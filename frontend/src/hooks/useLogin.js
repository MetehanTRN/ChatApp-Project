import { useState } from "react";		// React hook, durumları yönetmek için kullanılır.
import toast from "react-hot-toast";	// Kullanıcıya bildirim göstermek için kullanılan kütüphane.
import { useAuthContext } from "../context/AuthContext";	// Kimlik doğrulama bağlamını kullanır.

const useLogin = () => {
	const [loading, setLoading] = useState(false);	// Yükleme durumunu izler.
	const { setAuthUser } = useAuthContext();		// Kimlik doğrulama kullanıcı bilgisini ayarlamak için bağlam.

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);	// Giriş alanlarını kontrol eder.
		if (!success) return;	// Alanlar eksikse işlemi sonlandırır.
		setLoading(true);		// Yükleme durumunu başlatır.
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",		// HTTP POST isteği.
				headers: { "Content-Type": "application/json" },	// İstek başlıkları.
				body: JSON.stringify({ username, password }),		// Kullanıcı adı ve şifre.
			});

			const data = await res.json();		// API'den dönen yanıtı JSON olarak ayrıştırır.
			if (data.error) {
				throw new Error(data.error);	// Eğer hata varsa bir hata fırlatır.
			}

			localStorage.setItem("chat-user", JSON.stringify(data));		// Kullanıcı bilgisini yerel depoya kaydeder.
			setAuthUser(data);		// Kullanıcı bilgisini bağlama kaydeder.
		} catch (error) {
			toast.error(error.message);		// Hata durumunda kullanıcıya bir bildirim gösterir.
		} finally {
			setLoading(false);		// Yükleme durumunu sonlandırır.
		}
	};

	return { loading, login };		// Yükleme durumu ve giriş fonksiyonunu döner.
};
export default useLogin;	// Hook'u dışa aktarır.

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");	// Alanlar eksikse hata bildirimi gösterir.
		return false;
	}

	return true;	// Alanlar doluysa işlemi devam ettirir.
}