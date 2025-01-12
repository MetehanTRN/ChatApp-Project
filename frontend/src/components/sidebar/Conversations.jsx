import useGetConversations from "../../hooks/useGetConversations";		// Konuşmaları almak için özel bir hook.
import { getRandomEmoji } from "../../utils/emojis";					// Rastgele emoji seçmek için yardımcı işlev.
import Conversation from "./Conversation";								// Tekil konuşma bileşeni.

const Conversations = () => {
	const { loading, conversations } = useGetConversations();			// Konuşmaları ve yükleme durumunu almak için hook kullanımı.
	
	console.log("Conversations List:", conversations); // Buraya ekleyin
	return (
		<div className='py-2 flex flex-col overflow-auto'>				{/* Konuşmaların kapsayıcı konteyneri */}
			
			{/* Konuşmalar listesini iteratif olarak render eder */}
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}			// Her konuşmaya benzersiz bir anahtar atanır.
					conversation={conversation}		// Konuşma bilgileri bileşene aktarılır.
					emoji={getRandomEmoji()}		// Her konuşma için rastgele bir emoji atanır.
					lastIdx={idx === conversations.length - 1}		// Son konuşmayı belirler.
				/>
			))}

			{/* Yükleme sırasında spinner gösterir */}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;