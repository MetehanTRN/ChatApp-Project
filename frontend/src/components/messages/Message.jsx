import { useAuthContext } from "../../context/AuthContext";		// Kullanıcı kimlik doğrulama bağlamını kullanır.
import { extractTime } from "../../utils/extractTime";			// Mesajın oluşturulma zamanını biçimlendirmek için yardımcı işlev.
import useConversation from "../../zustand/useConversation";	// Seçili konuşmayı yönetmek için Zustand store.

const Message = ({ message }) => {
	const { authUser } = useAuthContext();						// Şu anki oturum açmış kullanıcı bilgileri.
	const { selectedConversation } = useConversation();			// Seçili konuşma bilgileri.
	const fromMe = message.senderId === authUser._id;			// Mesajın kullanıcı tarafından gönderilip gönderilmediğini kontrol eder.
	const formattedTime = extractTime(message.createdAt);		// Mesajın zamanını biçimlendirir.	
	const chatClassName = fromMe ? "chat-end" : "chat-start";	// Mesaj balonunun pozisyonunu belirler.
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;		// Göndericinin profil resmini belirler.
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";	// Mesaj balonu rengi (kullanıcı mesajıysa mavi).	

	const shakeClass = message.shouldShake ? "shake" : "";		// Mesaj titremesi için animasyon sınıfı.

	return (
		<div className={`chat ${chatClassName}`}>	 {/* Mesaj balonunun ana sınıfı */}
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />	{/* Göndericinin profil resmi */}
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>		{/* Mesaj içeriği */}
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>				{/* Mesaj zamanı */}		
		</div>
	);
};
export default Message;		// Bileşeni dışa aktarır.
