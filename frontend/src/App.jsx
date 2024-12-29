import { Navigate, Route, Routes } from "react-router-dom";		// React Router ile sayfalar arası yönlendirme.
import "./App.css";		// Uygulama genelindeki stil dosyası.
import Home from "./pages/home/Home";	// Ana sayfa bileşeni.
import Login from "./pages/login/Login";	// Giriş sayfası bileşeni.
import SignUp from "./pages/signup/SignUp";	// Kayıt sayfası bileşeni.
import { Toaster } from "react-hot-toast";	// Bildirim göstermek için kullanılan kütüphane.
import { useAuthContext } from "./context/AuthContext";	// Kullanıcı kimlik doğrulama bağlamı.

function App() {
	const { authUser } = useAuthContext();	// Oturum açmış kullanıcı bilgilerini alır.
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />	{/* Ana sayfa rotası */}
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />	{/* Giriş sayfası rotası */}
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />	{/* Kayıt sayfası rotası */}
			</Routes>
			<Toaster />	{/* Bildirim bileşeni */}
		</div>
	);
}

export default App;
