/** @type {import('tailwindcss').Config} */
// Tailwind CSS için yapılandırma dosyası.
// Bu dosya, Tailwind CSS'in nasıl çalışacağını ve hangi dosyalarda kullanılacağını tanımlar.
export default {
  content: [
    "./index.html",                 // Tailwind CSS'in kullanılacağı HTML dosyası.
    "./src/**/*.{js,ts,jsx,tsx}",   // `src` klasöründeki tüm JavaScript, TypeScript, JSX ve TSX dosyalarını tarar.
  ],
  theme: {
    extend: {},                     // Varsayılan tema ayarlarını genişletmek için kullanılır. Buraya özel tasarım ekleyebilirsiniz.
  },
  plugins: [
    require('daisyui'),             // DaisyUI, Tailwind CSS tabanlı bileşen kütüphanesi.
  ],
}