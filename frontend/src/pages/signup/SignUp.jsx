import { Link } from "react-router-dom";			// Sayfalar arası geçiş için kullanılan React Router modülü.
import GenderCheckbox from "./GenderCheckbox";		// Cinsiyet seçim bileşeni.
import { useState } from "react";					// React hook, bileşen durumlarını yönetmek için kullanılır.
import useSignup from "../../hooks/useSignup";		// Kullanıcı kayıt işlemleri için özel hook.

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();		// Kayıt işlemi ve yükleme durumu için özel hook.

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });			// Cinsiyet seçimindeki değişiklikleri yönetir.
	};

	const handleSubmit = async (e) => {
		e.preventDefault();			// Formun varsayılan yenileme davranışını engeller.
		await signup(inputs);		// Kullanıcı kayıt işlemini başlatır.
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>	{/* Ana kapsayıcı div */}
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>	{/* Başlık */}
				</h1>

				<form onSubmit={handleSubmit}>		{/* Kayıt formu */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>		 {/* Kullanıcının tam adı etiketi */}
						</label>
						<input
							type='text'
							placeholder='Name'
							className='w-full input input-bordered  h-10'	// Stil sınıfları.
							value={inputs.fullName}	// Kullanıcı tam adı değerini kontrol eder.
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}	// Değişiklikleri yönetir.
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>	{/* Kullanıcı adı etiketi */}
						</label>
						<input
							type='text'
							placeholder='Username'
							className='w-full input input-bordered h-10'
							value={inputs.username}	// Kullanıcı adı değerini kontrol eder.
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}	// Değişiklikleri yönetir.	
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
							value={inputs.password}	// Şifre değerini kontrol eder.
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}	// Değişiklikleri yönetir.
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>	{/* Şifre onay etiketi */}
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}	// Şifre onay değerini kontrol eder.
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}	// Değişiklikleri yönetir.
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />	{/* Cinsiyet seçim bileşeni */}

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?	{/* Giriş sayfasına yönlendiren bağlantı */}
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>	{/* Kayıt butonu */}
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}	{/* Yükleme durumu */}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;		// Bileşeni dışa aktarır.