import { useState } from "react";				// React hook, durumları yönetmek için kullanılır.
import { Link } from "react-router-dom";		// React Router, sayfalar arası geçiş için kullanılır.
import useLogin from "../../hooks/useLogin";	// Kullanıcı giriş işlemi için özel hook.

const Login = () => {
	const [username, setUsername] = useState("");	// Kullanıcı adı durumu.
	const [password, setPassword] = useState("");	// Şifre durumu.

	const { loading, login } = useLogin();	// Giriş işlemi ve yükleme durumu için özel hook.

	const handleSubmit = async (e) => {
		e.preventDefault();					// Formun varsayılan yenileme davranışını engeller.
		await login(username, password);	// Kullanıcı giriş işlemini başlatır.
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>	{/* Login sayfasının ana kapsayıcısı */}
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> CampusChat</span>		{/* Uygulama başlığı */}
				</h1>

				<form onSubmit={handleSubmit}>		{/* Giriş formu */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>	{/* Kullanıcı adı etiketi */}
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={username}								// Kullanıcı adı değerini kontrol eder.
							onChange={(e) => setUsername(e.target.value)}	// Kullanıcı adı değişikliklerini yönetir.
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>	{/* Şifre etiketi */}
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}		// Şifre değerini kontrol eder.
							onChange={(e) => setPassword(e.target.value)}	 // Şifre değişikliklerini yönetir.
						/>
					</div>
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?		{/* Kayıt sayfasına yönlendiren bağlantı */}
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>	{/* Giriş butonu */}
							{loading ? <span className='loading loading-spinner '></span> : "Login"}	{/* Yükleme durumu */}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;	// Bileşeni dışa aktarır.