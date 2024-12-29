import { useEffect, useRef } from "react";						// React hook, bileşen yan etkilerini ve referansları yönetmek için kullanılır.
import useGetMessages from "../../hooks/useGetMessages";		// Mesajları almak için özel bir hook.
import MessageSkeleton from "../skeletons/MessageSkeleton";		// Yükleme sırasında gösterilen iskelet ekran bileşeni.
import Message from "./Message";								// Tekil mesaj bileşeni.
import useListenMessages from "../../hooks/useListenMessages";	// Yeni mesajları dinlemek için özel bir hook.

const Messages = () => {
	const { messages, loading } = useGetMessages();		// Mesajları ve yükleme durumunu almak için hook kullanımı.
	useListenMessages();	// Yeni gelen mesajları dinler
	const lastMessageRef = useRef();	// Son mesajın referansını tutar.

	useEffect(() => {
		// Yeni mesaj geldiğinde veya mesaj listesi değiştiğinde, son mesaja kaydırma yapar.
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });		// Yumuşak kaydırma efekti.
		}, 100);
	}, [messages]);		// Mesajlar değiştiğinde çalışır.

	return (
		<div className='px-4 flex-1 overflow-auto'>		{/* Mesajlar konteyneri */}
			{/* Mesajlar yüklenmemişse ve yükleme tamamlanmışsa */}
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>	{/* Her mesajın referansı */}
						<Message message={message} />	{/* Mesaj bileşeni */}
					</div>
				))}

			{/* Yüklenme sırasında gösterilen iskelet ekran */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			
			{/* Mesaj yoksa gösterilen metin */}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;