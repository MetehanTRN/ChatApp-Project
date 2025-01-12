import { useState } from "react";										// React hook, bileşen durumlarını yönetmek için kullanılır.
import { IoSearchSharp } from "react-icons/io5";						// Arama butonu için kullanılan ikon kütüphanesi.
import useConversation from "../../zustand/useConversation";			// Konuşma yönetimi için Zustand store.
import useGetConversations from "../../hooks/useGetConversations";		// Konuşmaları almak için özel bir hook.
import toast from "react-hot-toast";									// Kullanıcıya bildirim göstermek için kullanılan kütüphane.

const SearchInput = () => {
	const [search, setSearch] = useState("");			// Arama terimini yönetmek için durum tanımı.
	const { setSelectedConversation } = useConversation();		// Seçili konuşmayı ayarlamak için hook.
	const { conversations } = useGetConversations();	// Mevcut konuşmaları almak için hook.

	const handleSubmit = (e) => {
		e.preventDefault();			// Formun varsayılan yenileme davranışını engeller.
		console.log("Search value:", search);
		if (!search) return;		// Arama terimi boşsa işlem yapılmaz.
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");	// Arama terimi çok kısaysa hata mesajı gösterir.
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));	// Arama terimi ile eşleşen konuşmayı bulur.
		console.log("Searched Conversation:", searchedConversation); 
		
		if (conversation) {
			setSelectedConversation(conversation);	// Eşleşen konuşmayı seçer.
			setSearch("");		// Arama kutusunu sıfırlar.
		} else toast.error("No such user found!");		// Kullanıcı bulunamazsa hata mesajı gösterir.
	};
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>		{/* Arama formu */}
			<input
				type='text'
				placeholder='Search…'		// Arama kutusunun yer tutucusu.
				className='input input-bordered rounded-full'		// Stil sınıfları.
				value={search}	// Input değeri arama durumundan alınır.
				onChange={(e) => setSearch(e.target.value)}		// Input değişikliklerini yönetir.
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>	{/* Arama butonu */}
				<IoSearchSharp className='w-6 h-6 outline-none' />	{/* Arama ikonunu gösterir. */}
			</button>
		</form>
	);
};
export default SearchInput;