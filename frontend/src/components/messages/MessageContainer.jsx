import { useEffect } from "react";			// React hook, bileşenlerin yan etkilerini yönetmek için kullanılır.
import useConversation from "../../zustand/useConversation";		// Zustand store, konuşmaları yönetmek için kullanılır.
import MessageInput from "./MessageInput";		// Mesaj giriş bileşeni.	
import Messages from "./Messages";				// Mesajları gösteren bileşen.
import { TiMessages } from "react-icons/ti";	// Mesaj ikonları için kullanılan kütüphane.
import { useAuthContext } from "../../context/AuthContext";		// Kimlik doğrulama bağlamını kullanır.

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();	// Seçili konuşma ve konuşma ayarlama fonksiyonu.

	useEffect(() => {
		// Bileşen kaldırıldığında (unmount) seçili konuşmayı sıfırlar.
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);	// Cleanup işlemi.

	console.log("Selected Conversation:", selectedConversation?._id);
	
	return (
		<div className='md:min-w-[450px] flex flex-col'>	{/* Konteyner ana bileşeni */}
			{!selectedConversation ? (
				<NoChatSelected />		// Eğer seçili bir konuşma yoksa bu bileşeni gösterir.
			) : (
				<>
					{/* Başlık */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />		{/* Mesajları gösterir. */}
					<MessageInput />	{/* Mesaj giriş bileşeni. */}
				</>
			)}
		</div>
	);
};
export default MessageContainer;	// Bileşeni dışa aktarır.

const NoChatSelected = () => {
	const { authUser } = useAuthContext();	// Şu anki oturum açmış kullanıcı bilgilerini alır.
	return (
		<div className='flex items-center justify-center w-full h-full'>	{/* Merkezlenmiş içerik */}
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>	{/* Kullanıcıya hoş geldiniz mesajı */}
				<p>Select a chat to start messaging</p>		{/* Kullanıcıya bir konuşma seçmesini önerir. */}
				<TiMessages className='text-3xl md:text-6xl text-center' />	{/* Mesaj simgesi */}
			</div>
		</div>
	);
};
