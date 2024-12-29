import mongoose from "mongoose";

// Konuşma şeması tanımı
const conversationSchema = mongoose.Schema({
    // Konuşmaya katılan kullanıcılar
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,   // Katılımcılar, User modelindeki benzersiz kimliklerdir.
            ref: "User",    // Referans alınan modelin adı.
        },
    ],

    // Konuşmadaki mesajlar
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,   // Mesajlar, Message modelindeki benzersiz kimliklerdir.
            ref: "Message",     // Referans alınan modelin adı.
            default: [],        // Varsayılan olarak boş bir dizi.
        },
    ],
}, {timestamps: true});         // timestamps, oluşturulma ve güncellenme tarihlerini otomatik olarak ekler.

// Konuşma modeli oluşturma
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;    // Modeli dışa aktarır.