import React from "react";												// React kütüphanesi, bileşen oluşturmak için kullanılır.
import ReactDOM from "react-dom/client";								// React uygulamasını DOM'a bağlamak için kullanılır.
import App from "./App.jsx";											// Uygulamanın ana bileşeni.
import "./index.css";													// Uygulama genelindeki stil dosyası.
import { BrowserRouter } from "react-router-dom";						// React Router, uygulamada yönlendirme işlemleri için kullanılır.
import { AuthContextProvider } from "./context/AuthContext.jsx";		// Kimlik doğrulama bağlamı.
import { SocketContextProvider } from "./context/SocketContext.jsx";	// Socket.IO bağlamı.

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>							{/* React uygulamasında potansiyel sorunları yakalamak için sıkı mod. */}
		<BrowserRouter>							{/* Sayfalar arası yönlendirme işlemleri için tarayıcı yönlendirme kapsayıcısı. */}
			<AuthContextProvider>				{/* Kimlik doğrulama bağlamı sağlayıcısı. */}
				<SocketContextProvider>			{/* Socket.IO bağlamı sağlayıcısı. */}
					<App />						{/* Uygulamanın ana bileşeni çağrılır. */}
				</SocketContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
