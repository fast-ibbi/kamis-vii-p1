# Latihan Praktek Pertemuan 11

## State Management dengan Redux/Context API

---

## Soal 1: Context API - Theme Switcher

Buatlah aplikasi sederhana dengan Context API yang memiliki fitur:

- Context untuk menyimpan tema (light/dark)
- Provider component yang membungkus aplikasi
- Tombol untuk toggle antara light dan dark theme
- Background dan text color berubah sesuai tema yang dipilih

**Petunjuk:**

- Gunakan `createContext()` untuk membuat ThemeContext
- Buat ThemeProvider dengan state untuk theme
- Gunakan `useContext()` untuk mengakses theme di komponen

---

## Soal 2: Context API - User Authentication

Implementasikan sistem autentikasi sederhana menggunakan Context API:

- Buat AuthContext dengan state user (null atau object user)
- Sediakan fungsi login dan logout
- Tampilkan form login dengan input username dan email
- Setelah login, tampilkan informasi user dan tombol logout
- Jika belum login, tampilkan form login

**Petunjuk:**

- User object: `{ username: "", email: "" }`
- Fungsi login menerima parameter userData
- Fungsi logout set user menjadi null

---

## Soal 3: Redux - Counter Sederhana

Buatlah aplikasi counter menggunakan Redux dengan fitur:

- Tombol increment (tambah 1)
- Tombol decrement (kurang 1)
- Tombol reset (kembali ke 0)
- Tombol untuk increment by 5
- Tampilkan nilai counter di layar

**Petunjuk:**

- Buat counterReducer dengan initial state 0
- Buat action types: INCREMENT, DECREMENT, RESET, INCREMENT_BY_AMOUNT
- Gunakan useSelector untuk mengakses count
- Gunakan useDispatch untuk dispatch actions

---

## Soal 4: Redux - Todo List

Implementasikan aplikasi Todo List menggunakan Redux Toolkit dengan fitur:

- Input untuk menambah todo baru
- List menampilkan semua todo
- Checkbox untuk toggle status completed
- Tombol delete untuk menghapus todo
- Tampilkan jumlah total todo dan todo yang sudah selesai

**Petunjuk:**

- Gunakan `createSlice` dari Redux Toolkit
- Reducers: addTodo, toggleTodo, deleteTodo
- Todo object: `{ id, text, completed }`
- Gunakan FlatList atau ScrollView untuk menampilkan list

---

## Soal 5: Redux - Shopping Cart

Buatlah aplikasi shopping cart sederhana dengan fitur:

- Daftar produk (minimal 5 produk dengan nama dan harga)
- Tombol "Add to Cart" untuk setiap produk
- Tampilkan items di cart
- Tombol untuk remove item dari cart
- Tampilkan total harga semua items di cart

**Petunjuk:**

- Buat cartSlice dengan reducers: addItem, removeItem
- Cart item: `{ id, name, price, quantity }`
- Hitung total dengan reduce atau map

---

## Soal 6: Context API + Local Storage

Buat aplikasi catatan (notes) menggunakan Context API dengan persistensi data:

- Form untuk menambah catatan baru (title dan content)
- Tampilkan list semua catatan
- Tombol delete untuk setiap catatan
- Simpan data ke AsyncStorage/localStorage
- Load data dari storage saat aplikasi dibuka

**Petunjuk:**

- Gunakan useEffect untuk load/save data
- Notes object: `{ id, title, content, date }`
- Gunakan AsyncStorage.setItem dan getItem

---

## Soal 7: Redux - Multiple Reducers

Implementasikan aplikasi dengan multiple reducers menggunakan combineReducers:

- User reducer (login/logout)
- Counter reducer (increment/decrement)
- Todos reducer (add/delete/toggle)
- Tampilkan semua informasi di satu screen

**Petunjuk:**

- Gunakan combineReducers untuk menggabungkan reducers
- Buat 3 slice terpisah
- State structure: `{ user, counter, todos }`
- Akses nested state dengan useSelector

---

## Soal 8: Context API - Language/i18n

Buatlah aplikasi multi-bahasa sederhana:

- Context untuk menyimpan bahasa aktif (Indonesia/English)
- Object translations untuk kedua bahasa
- Tombol untuk switch bahasa
- Minimal 5 text yang berubah sesuai bahasa (title, button, label, dll)

**Petunjuk:**

```javascript
const translations = {
  id: { welcome: "Selamat Datang", button: "Tombol" },
  en: { welcome: "Welcome", button: "Button" },
};
```

---

## Soal 9: Redux - Async Actions (Fetch Data)

Implementasikan aplikasi yang fetch data dari API menggunakan Redux:

- Fetch data user dari API (https://jsonplaceholder.typicode.com/users)
- Tampilkan loading state saat fetch
- Tampilkan list users dengan nama dan email
- Handle error jika fetch gagal
- Tombol refresh untuk fetch ulang

**Petunjuk:**

- Gunakan createAsyncThunk atau manual async dispatch
- States: loading, data, error
- Gunakan useEffect untuk fetch pertama kali

---

## Soal 10: Context API vs Redux - Hybrid App

Buatlah aplikasi yang menggabungkan Context API dan Redux:

- Context API untuk theme (light/dark)
- Redux untuk shopping cart
- Tampilkan list produk dengan tema yang bisa diubah
- Tambah produk ke cart dengan tombol
- Tampilkan cart items dengan total harga
- Theme mempengaruhi warna background dan text

**Petunjuk:**

- Provider untuk Context API
- Provider untuk Redux store
- Nested providers di App.js
- Gunakan useContext untuk theme, useSelector untuk cart

---

## Kriteria Penilaian

- ✅ Fungsionalitas sesuai requirement (40%)
- ✅ State management implementation yang benar (30%)
- ✅ UI/UX yang baik dan responsif (20%)
- ✅ Clean code dan best practices (10%)

---

## Catatan Pengerjaan

1. Setiap soal dikerjakan dalam project terpisah atau dalam folder terpisah
2. Pastikan Redux/Context sudah disetup dengan benar
3. Test semua fitur sebelum submit
4. Gunakan Redux DevTools untuk debugging (optional)
5. Komentar code untuk penjelasan logika penting

**Selamat mengerjakan! 🚀**
