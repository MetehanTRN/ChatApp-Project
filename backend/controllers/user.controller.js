import User from '../models/user.model.js';

// Yan menü için kullanıcı listesini getirme işlemi
export const getUsersForSidebar = async (req, res) => {
    try {
        // Şu an oturum açmış olan kullanıcının kimliğini alır.
        const loggedInUserId = req.user._id;

        // Oturum açmış kullanıcı hariç tüm kullanıcıları getirir ve şifre alanını hariç tutar.
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId}}).select("-password");

        // Kullanıcı listesini istemciye döner.
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};