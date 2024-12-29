import { useState } from "react";								// React hook, bileşen durumlarını yönetmek için kullanılır.
import { BsSend } from "react-icons/bs";						// Mesaj gönderme simgesi için kullanılan kütüphane.
import useSendMessage from "../../hooks/useSendMessage";		// Mesaj gönderme işlevselliği için özel bir hook.

const MessageInput = () => {
	const [message, setMessage] = useState("");				// Mesaj metnini yönetmek için durum tanımı.
	const { loading, sendMessage } = useSendMessage();		// Mesaj gönderme işlemini ve yükleme durumunu sağlayan hook.

	const handleSubmit = async (e) => {
		e.preventDefault();				// Formun varsayılan yenileme davranışını engeller.
		if (!message) return;			// Mesaj boşsa hiçbir işlem yapılmaz.
		await sendMessage(message);		// Mesaj gönderilir.
		setMessage("");					// Mesaj kutusu sıfırlanır.
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>		{/* Mesaj giriş formu */}
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'		// Yer tutucu metin.
					value={message}						// Input değeri mesaj durumundan alınır.
					onChange={(e) => setMessage(e.target.value)}		// Input değişikliklerini yönetir.
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}	{/* Yükleniyorsa spinner, değilse gönderme simgesi */}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;	// Bileşeni dışa aktarır.