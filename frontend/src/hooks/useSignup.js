import { useState } from "react";		// React hook, durumları yönetmek için kullanılır.
import toast from "react-hot-toast";	// Kullanıcıya bildirim göstermek için kullanılan kütüphane.	
import { useAuthContext } from "../context/AuthContext";	// Kimlik doğrulama bağlamını kullanır.

const useSignup = () => {
	const [loading, setLoading] = useState(false);	// Yükleme durumunu izler.
	const { setAuthUser } = useAuthContext();		// Kullanıcı bilgisini bağlama kaydetmek için fonksiyon.

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {	
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });		// Giriş alanlarını kontrol eder.
		if (!success) return;	// Alanlar eksik veya hatalıysa işlemi sonlandırır.

		setLoading(true);	// Yükleme durumunu başlatır.
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",	// HTTP POST isteği.
				headers: { "Content-Type": "application/json" },	 // İstek başlıkları.
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),	 // Kullanıcı kayıt bilgileri.
			});

			const data = await res.json();	// API'den dönen yanıtı JSON olarak ayrıştırır.
			if (data.error) {
				throw new Error(data.error);	// Eğer hata varsa bir hata fırlatır.
			}
			localStorage.setItem("chat-user", JSON.stringify(data));	// Kullanıcı bilgisini yerel depoya kaydeder.
			setAuthUser(data);		// Kullanıcı bilgisini bağlama kaydeder.
		} catch (error) {
			toast.error(error.message);		// Hata durumunda kullanıcıya bir bildirim gösterir.
		} finally {
			setLoading(false);		// Yükleme durumunu sonlandırır.
		}
	};

	return { loading, signup };		// Yükleme durumu ve kayıt fonksiyonunu döner.
};
export default useSignup;		// Hook'u dışa aktarır.

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");	// Alanlar eksikse hata bildirimi gösterir.
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");		// Şifreler eşleşmiyorsa hata bildirimi gösterir.
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");		// Şifre çok kısaysa hata bildirimi gösterir.
		return false;
	}

	return true;	// Alanlar geçerliyse işlemi devam ettirir.
}
