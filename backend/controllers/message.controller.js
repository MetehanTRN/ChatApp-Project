import Conversation from "../models/conversation.model.js";		// Konuşma modelini içeri aktarır
import Message from "../models/message.model.js";				// Mesaj modelini içe aktarır.
import { getReceiverSocketId, io } from "../socket/socket.js";	// Socket.io işlevlerini içe aktarır.

// Mesaj gönderme işlemi
export const sendMessage = async (req, res) => {
	try {

		// İstemciden gelen mesaj ve alıcı kimliğini alır.
		const { message } = req.body;
		const { id: receiverId } = req.params;

		// Gönderenin kimliği, doğrulanmış kullanıcıdan alınır.
		const senderId = req.user._id;

		// Gönderen ve alıcı arasında mevcut bir konuşma olup olmadığını kontrol eder.
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },	// Hem gönderen hem de alıcıyı içeren bir konuşma arar.
		});

		// Eğer konuşma yoksa, yeni bir konuşma oluşturur.
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],	// Katılımcıları belirler.
			});
		}

		// Yeni bir mesaj nesnesi oluşturur.
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		// Eğer mesaj başarılı bir şekilde oluşturulmuşsa, konuşmaya ekler.
		if (newMessage) {
			conversation.messages.push(newMessage._id);	// Mesaj kimliğini konuşmaya ekler.
		}

		// Konuşma ve mesajı eş zamanlı olarak kaydeder.
		await Promise.all([conversation.save(), newMessage.save()]);

		// Socket.io ile alıcıya gerçek zamanlı mesaj gönderme işlemi
		const receiverSocketId = getReceiverSocketId(receiverId);
		
		if (receiverSocketId) {

			// Belirli bir socket kimliğine yeni mesaj olayını gönderir.
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		// Yeni mesaj bilgilerini istemciye döner.
		res.status(201).json(newMessage);

	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Mesajları alma işlemi
export const getMessages = async (req, res) => {
	try {
		// İstemciden konuşulacak kişinin kimliğini alır.
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;	// Gönderenin kimliği, doğrulanmış kullanıcıdan alınır.

		// Gönderen ve konuşulan kişi arasında bir konuşma arar ve mesajları yükler.
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // Mesaj kimliklerini değil, gerçek mesaj içeriklerini getirir.

		// Eğer konuşma yoksa boş bir dizi döner.
		if (!conversation) return res.status(200).json([]);

		// Konuşmadaki mesajları alır.
		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
