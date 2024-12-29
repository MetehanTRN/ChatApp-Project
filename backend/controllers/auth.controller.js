import User from '../models/user.model.js';                             // Kullanıcı modelini içeri aktar
import bcryptjs from 'bcryptjs';                                        // Şifreleme için kullanılan kütüphane
import generateTokenAndSetCookie from '../utils/generateToken.js';      // Token oluşturup çerezlere ayarlayan bir yardımcı işlev.

// Kullanıcı kayıt işlemi
export const signup = async (req, res) => {
    try {
        // Kullanıcıdan gelen bilgileri alır.
        const {fullName, username, password, confirmPassword, gender} = req.body;

        // Şifrelerin eşleşip eşleşmediğini kontrol eder.
        if (password!==confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Kullanıcı adının daha önce kullanılıp kullanılmadığını kontrol eder.
        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Şifreyi hashlemek (şifrelemek) için bir tuz oluşturur.

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        // Kullanıcı profil resmi için varsayılan avatar linklerini belirler.
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        // Yeni bir kullanıcı nesnesi oluşturur.
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,   // Şifrelenmiş şifreyi kaydeder.
            gender,
            profilePic: gender === "male"? boyProfilePic : girlProfilePic   // Cinsiyete göre profil resmi belirler.
        })

        if(newUser){

            // Kullanıcı için token oluşturur ve çerezlere ekler.
            generateTokenAndSetCookie(newUser._id, res);
            
            // Yeni kullanıcıyı veritabanına kaydeder.
            await newUser.save();
            
            // Başarılı bir yanıt döner.
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else{
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ error:"Internal Server Error"});
    }
};

// Kullanıcı giriş işlemi
export const login = async (req, res) => {
    try {

        // Kullanıcıdan gelen giriş bilgilerini alır.
        const {username, password}= req.body;

        // Kullanıcıyı kullanıcı adına göre arar.
        const user = await User.findOne({username});
        
        // Şifrenin doğruluğunu kontrol eder.
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Kullanıcı için token oluşturur ve çerezlere ekler.
        generateTokenAndSetCookie(user._id, res);

        // Başarılı bir yanıt döner ve kullanıcı bilgilerini yanıt olarak gönderir.
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ error:"Internal Server Error"});
    }
};

// Kullanıcı çıkış işlemi
export const logout = async (req, res) => {
    try {
        // Çıkış yapmak için mevcut token çerezini sıfırlar.
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {

        // Hata oluştuysa hata mesajı gönderir.
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({ error:"Internal Server Error"});
    }
};

