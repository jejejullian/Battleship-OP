# 🚢 Battleship Game

Game strategi klasik **Battleship** yang dibangun menggunakan Vanilla JavaScript dengan pendekatan *Object-Oriented Programming* (OOP) dan *Test-Driven Development* (TDD).

Mainkan game ini melawan Komputer yang cerdas!

🔗 **[Lihat Live Demo Disini](https://battleship-op.vercel.app/)**

## ✨ Fitur Utama

* **Smart Computer AI:** Komputer tidak hanya menembak secara acak, tetapi akan memburu kapal di sekitarnya jika berhasil mengenai sasaran (*hunting mode*).
* **Drag & Drop:** Penempatan kapal yang interaktif. Pemain bisa menyeret kapal dari galangan (*dock*) ke papan permainan.
* **Rotasi Kapal:** Klik tombol rotasi untuk mengubah orientasi kapal (Horizontal/Vertikal).
* **Turn Chaining:** Jika tembakan mengenai sasaran, penembak mendapat giliran tambahan (mekanik *streak*).
* **Game Loop Lengkap:** Deteksi otomatis kondisi menang/kalah dan opsi untuk bermain ulang.

## 🛠️ Teknologi yang Digunakan

* **JavaScript (ES6+):** Logika permainan yang modular (Factory Functions & Module Pattern).
* **HTML5 & CSS3:** Struktur dan tampilan (menggunakan Tailwind CSS untuk styling).
* **Jest:** Framework testing untuk memastikan logika *Gameboard*, *Ship*, dan *Player* berjalan benar.
* **Vite/Webpack:** Module bundler (sesuaikan dengan yang kamu pakai).

## 🚀 Cara Menjalankan di Lokal

Jika Anda ingin melihat kodenya di komputer Anda sendiri:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/username-kamu/battleship-game.git](https://github.com/username-kamu/battleship-game.git)
    ```
2.  **Masuk ke folder:**
    ```bash
    cd battleship-game
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Jalankan aplikasi:**
    ```bash
    npm run dev
    ```
    (Atau `npm start` tergantung konfigurasi `package.json` kamu).

5.  **Jalankan Test:**
    ```bash
    npm test
    ```

## 📝 Aturan Main

1.  Atur posisi ke-5 kapal Anda di papan kiri (Drag & Drop).
2.  Klik tombol "Start Game".
3.  Tembak papan lawan (kanan) dengan mengklik kotak-kotaknya.
4.  Jika tembakan kena (Merah), Anda boleh menembak lagi. Jika meleset (Biru), giliran Komputer.
5.  Tenggelamkan semua kapal musuh untuk menang!

---
*Dibuat sebagai bagian dari kurikulum The Odin Project.*
