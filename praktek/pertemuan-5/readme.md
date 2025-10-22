# Latihan Praktek Pertemuan 5: Styling dalam React Native (Flexbox & StyleSheet)

## Petunjuk Umum

- Setiap soal dibuat dalam file terpisah dengan nama `soal1.js`, `soal2.js`, dst.
- Pastikan menggunakan `StyleSheet.create()` untuk membuat styles
- Test setiap komponen untuk memastikan tampilannya sesuai dengan deskripsi
- Gunakan Expo Snack atau Android/iOS simulator untuk melihat hasil

---

## Soal 1: Card Profil Sederhana

Buatlah sebuah komponen card profil yang menampilkan:

- Container dengan background putih dan border radius 15
- Area untuk foto (gunakan View dengan background color abu-abu dan text "FOTO")
- Nama pengguna (font bold, size 22)
- Email (font size 14, warna abu)
- Tombol "Follow" dengan background biru

**Spesifikasi:**

- Gunakan flexbox untuk centering
- Padding 20 pada card content
- Shadow untuk efek elevasi
- Margin 20 pada container utama

---

## Soal 2: Layout Header dengan Flexbox

Buatlah header aplikasi dengan layout berikut:

- Container dengan tinggi 80px dan background color biru (#3498db)
- Icon menu di kiri (gunakan Text "☰")
- Judul "My App" di tengah
- Icon search di kanan (gunakan Text "🔍")
- Semua item aligned vertical center

**Spesifikasi:**

- Gunakan `flexDirection: 'row'`
- Gunakan `justifyContent: 'space-between'`
- Icon dan text berwarna putih
- Padding horizontal 20

---

## Soal 3: Grid Layout 2 Kolom

Buatlah sebuah grid layout dengan 6 item yang tersusun dalam 2 kolom:

- Setiap item berbentuk kotak dengan height 150
- Setiap item memiliki warna background berbeda
- Item memiliki border radius 12
- Terdapat text nomor di tengah setiap item
- Spacing antar item 10px

**Spesifikasi:**

- Gunakan `flexWrap: 'wrap'`
- Gunakan `justifyContent: 'space-between'`
- Width setiap item 48% untuk membuat 2 kolom
- Gunakan array untuk render multiple items dengan `.map()`

---

## Soal 4: Login Form Layout

Buatlah layout login form dengan:

- Logo area di atas (tinggi 150, background gradient bisa simulasi dengan warna solid)
- Input field untuk email (gunakan TextInput)
- Input field untuk password (gunakan TextInput)
- Tombol "Login" dengan background hijau
- Text "Forgot Password?" di bawah tombol
- Text "Sign Up" di paling bawah

**Spesifikasi:**

- Gunakan flex untuk vertical centering form
- Input fields dengan border, padding 15, border radius 8
- Spacing konsisten (gunakan margin 15)
- Button dengan padding vertical 15, border radius 8

---

## Soal 5: Bottom Navigation Bar

Buatlah bottom navigation bar dengan 4 menu:

- Home (gunakan emoji 🏠)
- Search (gunakan emoji 🔍)
- Favorites (gunakan emoji ❤️)
- Profile (gunakan emoji 👤)

**Spesifikasi:**

- Position fixed di bagian bawah (gunakan absolute positioning)
- Height 70
- Background putih dengan shadow
- 4 item dengan spacing merata (`justifyContent: 'space-around'`)
- Icon dan label di bawahnya (gunakan flexDirection column pada setiap item)
- Font size icon 24, label 12

---

## Soal 6: Product Card dengan Badge

Buatlah product card dengan fitur:

- Image placeholder (tinggi 200)
- Badge "NEW" atau "SALE" di corner atas kanan (position absolute)
- Nama produk (bold, size 18)
- Harga (bold, size 20, warna hijau)
- Rating dengan bintang (gunakan emoji ⭐) dan jumlah review
- Tombol "Add to Cart"

**Spesifikasi:**

- Card dengan shadow dan border radius
- Badge dengan background merah, padding 5, border radius 5
- Gunakan position absolute untuk badge positioning
- Footer dengan flexDirection row, space between untuk harga dan tombol

---

## Soal 7: Dashboard Layout dengan Cards

Buatlah dashboard layout dengan:

- Header section (Welcome message dan nama user)
- 4 statistics cards dalam 2x2 grid
- Setiap card menampilkan: icon (emoji), label, dan angka
- Cards dengan warna background berbeda

**Spesifikasi:**

- Gunakan flexWrap untuk grid
- Setiap card width 48%, height 120
- Centering content di dalam card
- Spacing konsisten
- Font size angka 32, bold

Contoh cards: 📦 Orders (120), 💰 Revenue ($5,420), 👥 Customers (89), ⭐ Reviews (45)

---

## Soal 8: Notification Item List

Buatlah komponen notification item dengan layout:

- Icon di kiri (gunakan View dengan background color dan emoji)
- Content area di tengah (title dan timestamp)
- Dot indicator di kanan untuk unread notification

**Spesifikasi:**

- Gunakan flexDirection row
- Icon container: width 50, height 50, border radius 25 (circle)
- Content area flex: 1 untuk mengisi ruang
- Timestamp dengan font size 12, warna abu
- Unread dot: width 10, height 10, border radius 5, background biru
- Border bottom untuk separator

Buat 3 notification items dengan data berbeda.

---

## Soal 9: Tab Navigation dengan Active State

Buatlah tab navigation dengan 3 tabs:

- Timeline
- Photos
- About

**Spesifikasi:**

- Tab yang active memiliki border bottom warna biru (width 3)
- Tab yang active text berwarna biru
- Tab yang inactive text berwarna abu
- Gunakan flexDirection row dengan space around
- Height container 50
- Gunakan state untuk track active tab (useState)

**Bonus:** Tambahkan onPress untuk switch tab

---

## Soal 10: Profile Header dengan Overlay

Buatlah profile header dengan:

- Background image placeholder (tinggi 250, gunakan LinearGradient atau solid color)
- Profile picture di tengah bawah (overlap dengan background)
- Nama user di bawah profile picture
- Bio text
- Stats row: Followers, Following, Posts (3 kolom)

**Spesifikasi:**

- Profile picture position absolute dengan bottom negative untuk overlay effect
- Profile picture: width 120, height 120, border radius 60
- Border putih pada profile picture (borderWidth 5, borderColor white)
- Stats dengan flexDirection row, justifyContent space-around
- Setiap stat: number (bold, size 20) dan label (size 12)

---

## Tips Pengerjaan

1. **Gunakan StyleSheet.create()** untuk semua styling
2. **Ekspor component** dengan `export default` agar bisa digunakan
3. **Test responsiveness** dengan mengubah ukuran container
4. **Konsisten dengan spacing** - gunakan kelipatan 4 atau 8
5. **Color palette** - definisikan konstanta warna di awal
6. **Beri komentar** pada code yang kompleks
7. **Validation** - pastikan tidak ada error di console

## Kriteria Penilaian

- **Fungsionalitas (40%)**: Component bekerja sesuai spesifikasi
- **Styling (30%)**: Tampilan rapi, spacing konsisten, color scheme baik
- **Code Quality (20%)**: Clean code, organized, proper naming
- **Kreativitas (10%)**: Penambahan fitur atau styling ekstra

---

## Submission

- Simpan semua file dalam folder `praktek/pertemuan-5/`
- File naming: `soal1.js`, `soal2.js`, ..., `soal10.js`
- Tambahkan screenshot hasil (optional) dalam folder `screenshots/`
- Push ke repository Git masing-masing

**Deadline:** [Sesuaikan dengan jadwal kelas]

**Selamat Mengerjakan! 🚀**
