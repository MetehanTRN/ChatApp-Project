import mongoose from "mongoose";

// Kullanıcı şeması tanımı
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },

    // Kullanıcı adı
    username: {
        type: String,
        required: true,
        unique: true
    },

    // Şifre
    password:{
        type: String,
        required: true,
        minlenght: 6
    },

    // Kullanıcının cinsiyeti
    gender:{
        type: String,
        required: true,
        enum: ['male', 'female']
    },

    // Kullanıcı profil resmi
    profilePic:{
        type: String,
        default: ""
    }
}, {timestamps: true});

// Kullanıcı modeli oluşturma
const User = mongoose.model("User", userSchema);

export default User;