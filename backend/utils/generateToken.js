import jwt from 'jsonwebtoken'  // JSON Web Token (JWT) işlemleri için kullanılan kütüphane.

// Kullanıcı için token oluşturur ve çerezlere ekler
const generateTokenAndSetCookie = (userId, res) => {
    // Kullanıcı kimliğini içeren bir JWT token oluşturur
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });   // Token 15 gün geçerli olacak şekilde ayarlanır.

    // Oluşturulan token'ı HTTP çerezine ekler
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,                   // Çerez süresi 15 gün olarak ayarlanır (milisaniye cinsinden).
        httpOnly: true,                                     // Çerez sadece HTTP istekleri üzerinden erişilebilir (XSS saldırılarını önler).
        sameSite: "strict",                                 // Çerez sadece aynı site içinde gönderilir (CSRF saldırılarını önler).
        secure: process.env.NODE_ENV !== "development",     // Çerez sadece HTTPS üzerinde gönderilir (geliştirme ortamı hariç).
    });

    return token;
};

export default generateTokenAndSetCookie;   // Fonksiyon dışa aktarılır ve diğer dosyalarda kullanılabilir.