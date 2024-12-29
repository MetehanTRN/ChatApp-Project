import { createContext, useContext, useState } from "react";	// React context ve durum yönetimi için kullanılan modüller.

export const AuthContext = createContext();		// Kimlik doğrulama bilgilerini paylaşmak için bir bağlam oluşturur.

// AuthContext'i kullanmak için özel bir hook
export const useAuthContext = () => {
	return useContext(AuthContext);		// AuthContext'in değerlerine erişir.
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);	// Kullanıcı bilgisini yerel depodan alır ve durum olarak saklar.

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;	{/* Bağlamın değerlerini sağlar. */}	{/* children: Bağlamın tüm alt bileşenleri */}
};
