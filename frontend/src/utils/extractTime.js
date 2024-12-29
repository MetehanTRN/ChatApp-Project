
// Tarih saat bilgisini saat:dakika formatında döndüren fonksiyon
export function extractTime(dateString) {
	const date = new Date(dateString);				// Tarih stringini Date nesnesine dönüştürür
	const hours = padZero(date.getHours());			// Saat bilgisini alır ve tek haneli ise sıfır ekler	
	const minutes = padZero(date.getMinutes());		// Dakika bilgisini alır ve tek haneli ise sıfır ekler
	return `${hours}:${minutes}`;					// Saat ve dakikayı birleştirerek döner
}

// Tek haneli sayıları başına sıfır ekleyerek iki haneli hale getiren yardımcı fonksiyon
function padZero(number) {
	return number.toString().padStart(2, "0");	// Sayıyı stringe dönüştürür ve gerekirse başına sıfır ekler
}
