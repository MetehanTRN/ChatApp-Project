import { defineConfig } from "vite";				// Vite yapılandırma fonksiyonunu içe aktarır.
import react from "@vitejs/plugin-react";			// React uygulamaları için Vite eklentisini içe aktarır.

// Vite yapılandırma dosyası
// https://vitejs.dev/config/

// Bu dosya, Vite ile projeyi yapılandırmak için kullanılır.
export default defineConfig({
	plugins: [react()],			// React desteğini etkinleştiren eklenti.
	server: {
		port: 3000,				// Geliştirme sunucusunun çalışacağı port numarası.
		proxy: {
			"/api": {			// "/api" ile başlayan istekler için bir vekil sunucu yapılandırması.
				target: "http://localhost:5000",		// Hedef sunucu URL'si (örneğin, bir backend sunucusu).
				// "/api" isteklerini bu adrese yönlendirir.
			},
		},
	},
});
