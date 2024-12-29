import { BiLogOut } from "react-icons/bi";			// Çıkış butonu için kullanılan ikon kütüphanesi.
import useLogout from "../../hooks/useLogout";		// Çıkış işlemini yönetmek için özel bir hook.

const LogoutButton = () => {
	const { loading, logout } = useLogout();		// Çıkış işlemini ve yükleme durumunu almak için hook kullanımı.

	return (
		<div className='mt-auto'>					{/* Butonu konteynerin altına hizalar */}
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />		// Çıkış ikonu
			) : (
				<span className='loading loading-spinner'></span>	// Yükleme sırasında spinner
			)}
		</div>
	);
};
export default LogoutButton;
