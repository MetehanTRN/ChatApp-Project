# Proje Dosyaları Açıklaması

Bu README, proje dosyalarının işlevlerini ve kullanım amaçlarını kısa bir şekilde açıklamaktadır. Aşağıdaki listede her bir dosyanın ne işe yaradığı özetlenmiştir.

### Frontend Dosyaları

### 1. `App.jsx`
Uygulamanın ana bileşeni. Sayfalar arası yönlendirme işlemleri için React Router kullanır ve kimlik doğrulama ile Socket.IO bağlamlarını sağlar.

### 2. `main.jsx`
Uygulamanın giriş noktası. `App.jsx` bileşenini DOM'a bağlar ve uygulamayı başlatır. Ayrıca bağlamlar ve yönlendirme yapılandırmaları burada tanımlanır.

### 3. `index.css`
Tailwind CSS ve özelleştirilmiş stilleri içerir. Projenin genel stil düzenlemeleri bu dosyada tanımlanır.

### 4. `emojis.js`
Eğlenceli emojilerin bir listesini ve bu emojilerden rastgele bir tanesini seçmek için bir yardımcı fonksiyon içerir.

### 5. `extractTime.js`
Bir tarih stringini alıp "saat:dakika" formatına dönüştürmek için kullanılan bir yardımcı fonksiyon.

### 6. `useConversation.js`
Zustand kullanılarak oluşturulan bir durum yönetim dosyası. Seçili konuşmayı ve mesajları yönetmek için kullanılır.

### 7. `SignUp.jsx`
Kullanıcı kayıt işlemleri için oluşturulmuş bir React bileşeni. Form girişi ve doğrulama işlemlerini içerir.

### 8. `GenderCheckbox.jsx`
Cinsiyet seçimi için kullanılan bir özel bileşen. Kullanıcıdan "Male" veya "Female" seçmesini ister.

### 9. `useSignup.js`
Kullanıcı kayıt işlemini gerçekleştiren özel bir hook. API ile iletişim kurarak kayıt işlemini tamamlar.

### 10. `Login.jsx`
Kullanıcı giriş işlemleri için oluşturulmuş bir React bileşeni. Kullanıcı adı ve şifre ile giriş yapılmasını sağlar.

### 11. `useLogin.js`
Kullanıcı giriş işlemini gerçekleştiren özel bir hook. API ile iletişim kurarak oturum açar.

### 12. `useLogout.js`
Kullanıcı çıkış işlemini gerçekleştiren özel bir hook. Kullanıcı oturumunu sonlandırır ve yerel depolamayı temizler.

### 13. `useSendMessage.js`
Mesaj gönderme işlemini gerçekleştiren özel bir hook. API ile iletişim kurarak mesajları gönderir ve günceller.

### 14. `useGetMessages.js`
Belirli bir konuşmanın mesajlarını almak için kullanılan özel bir hook. API'den mesajları çeker ve durumu günceller.

### 15. `useListenMessages.js`
Socket.IO kullanarak gerçek zamanlı gelen mesajları dinleyen özel bir hook. Yeni mesajları duruma ekler ve kullanıcıya bildirim verir.

### 16. `useGetConversations.js`
Kullanıcının konuşmalarını almak için kullanılan özel bir hook. API'den konuşmaları çeker ve durumu günceller.

### 17. `AuthContext.jsx`
Kullanıcı kimlik doğrulama işlemleri için bir bağlam. Kullanıcının oturum açma durumunu yönetir.

### 18. `SocketContext.jsx`
Socket.IO işlemleri için bir bağlam. Çevrimiçi kullanıcıları ve socket bağlantısını yönetir.

### 19. `vite.config.js`
Vite yapılandırma dosyası. Sunucu ayarları ve API proxy yapılandırmalarını içerir.

### 20. `tailwind.config.js`
Tailwind CSS yapılandırma dosyası. Tailwind'in kullanılacağı dosyalar ve özel tema ayarları tanımlanır.

---

## Backend Dosyaları

### 21. `auth.controller.js`
Kullanıcı kimlik doğrulama işlemlerini (giriş, kayıt, çıkış) gerçekleştiren backend kontrol dosyası.

### 22. `message.controller.js`
Mesaj gönderme, alma ve yönetme işlemlerini gerçekleştiren backend kontrol dosyası.

### 23. `user.controller.js`
Kullanıcılarla ilgili işlemleri (kullanıcı bilgileri alma, güncelleme) gerçekleştiren backend kontrol dosyası.

### 24. `connectToMongoDB.js`
MongoDB veritabanına bağlantıyı gerçekleştiren yardımcı dosya.

### 25. `protectRoute.js`
Kimlik doğrulama gerektiren rotaları koruyan middleware dosyası.

### 26. `conversation.model.js`
Konuşma veritabanı şeması ve modeli.

### 27. `message.model.js`
Mesaj veritabanı şeması ve modeli.

### 28. `user.model.js`
Kullanıcı veritabanı şeması ve modeli.

### 29. `auth.routes.js`
Kimlik doğrulama işlemleri için API rotalarını tanımlar.

### 30. `message.routes.js`
Mesaj işlemleri için API rotalarını tanımlar.

### 31. `user.routes.js`
Kullanıcı işlemleri için API rotalarını tanımlar.

### 32. `socket.js`
Gerçek zamanlı mesajlaşma işlemleri için Socket.IO yapılandırmasını içerir.

### 33. `generateToken.js`
JWT token oluşturma işlemini gerçekleştiren yardımcı dosya.

### 34. `server.js`
Backend sunucusunu başlatan ve API rotalarını yöneten ana dosya.