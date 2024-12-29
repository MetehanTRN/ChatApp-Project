import jwt from 'jsonwebtoken';     // JSON Web Token (JWT) işlemleri için kütüphane.
import User from '../models/user.model.js';

// Route koruma middleware'i
const protectRoute = async (req, res, next) => {
    try {
        // İstekle birlikte gelen çerezlerden JWT token'ını alır.
        const token = req.cookies.jwt;
        
        // Eğer token yoksa, yetkilendirme hatası döner.
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided"});
        }

        // Token'ı çözümleyerek kullanıcı bilgilerini alır.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Eğer token geçersizse, yetkilendirme hatası döner.
        if(!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token"});
        }

        // Token'dan alınan userId'yi kullanarak kullanıcıyı veritabanında arar.
        const user = await User.findById(decoded.userId).select("-password");

        // Kullanıcı bulunamazsa hata döner.
        if(!user) {
            return res.status(404).json({ error: "User not found"});
        }

        // Kullanıcı bilgilerini istek nesnesine ekler ve bir sonraki middleware'e devam eder.
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export default protectRoute;    // Middleware'i dışa aktarır.