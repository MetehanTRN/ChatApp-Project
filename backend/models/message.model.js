import mongoose from "mongoose";

// Mesaj şeması tanımı
const messageSchema = new mongoose.Schema({
    // Mesajı gönderen kullanıcının kimliği
    senderId:{
        type: mongoose.Schema.Types.ObjectId,   // Gönderen, User modelindeki benzersiz kimliktir.
        ref: "User",    
        required: true  
    },
    
    // Mesajın alıcısı olan kullanıcının kimliği
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Mesaj içeriği
    message:{
        type: String,   // Mesaj metni string türündedir.
        required: true
    }

}, {timestamps: true});

// Mesaj modeli oluşturma
const Message = mongoose.model("Message", messageSchema);

export default Message;