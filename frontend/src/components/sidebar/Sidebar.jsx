import Conversations from "./Conversations";	// Konuşmaları listeleyen bileşen.
import LogoutButton from "./LogoutButton";		// Çıkış işlemini gerçekleştiren bileşen.
import SearchInput from "./SearchInput";		// Konuşmalar arasında arama yapmayı sağlayan bileşen.

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>		{/* Yan panelin ana kapsayıcısı */}
			<SearchInput />		{/* Arama bileşeni */}
			<div className='divider px-3'></div>	{/* Görsel bir ayırıcı */}	
			<Conversations />	{/* Konuşmaları listeleyen bileşen */}
			<LogoutButton />	{/* Çıkış butonu */}
		</div>
	);
};
export default Sidebar;