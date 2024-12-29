import mongoose from "mongoose";

// MongoDB'ye bağlanmayı sağlayan fonksiyon
const connectToMongoDB = async () => {
    try {
        // .env dosyasında tanımlı olan MongoDB URI'sine bağlanır.
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

export default connectToMongoDB;    // İşlevi diğer dosyalarda kullanıma sunar.