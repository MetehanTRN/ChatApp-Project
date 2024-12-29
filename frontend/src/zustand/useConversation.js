import { create } from "zustand";		// Zustand, React uygulamaları için durum yönetim kütüphanesi.

// Zustand kullanılarak oluşturulan bir mağaza (store)
const useConversation = create((set) => ({
	// Seçili konuşmayı tutar.
	selectedConversation: null,
	// Seçili konuşmayı güncelleyen işlev.
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	// Mesajları tutar.
	messages: [],
	// Mesajları güncelleyen işlev.
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;	// Hook'u dışa aktarır.
