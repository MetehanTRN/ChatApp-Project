import { useSocketContext } from "../../context/SocketContext";			// Socket bağlamını kullanarak çevrimiçi kullanıcı bilgilerini alır.
import useConversation from "../../zustand/useConversation";			// Konuşma yönetimi için Zustand store kullanımı.

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();		// Seçili konuşmayı yönetir.

	const isSelected = selectedConversation?._id === conversation._id;		// Konuşmanın seçili olup olmadığını kontrol eder.
	const { onlineUsers } = useSocketContext();								// Çevrimiçi kullanıcıları almak için socket bağlamı.
	const isOnline = onlineUsers.includes(conversation._id);				// Kullanıcının çevrimiçi olup olmadığını kontrol eder.

	console.log("Conversation Props:", conversation);
	
	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}		// Konuşma seçildiğinde çağrılır.
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>		{/* Çevrimiçi durumu gösteren avatar */}
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />		{/* Kullanıcı avatarı */}
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>	{/* Kullanıcı adı */}
						<span className='text-xl'>{emoji}</span>	{/* Konuşmaya özel emoji */}
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}	{/* Konuşmalar arasında ayırıcı */}
		</>
	);
};
export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;
