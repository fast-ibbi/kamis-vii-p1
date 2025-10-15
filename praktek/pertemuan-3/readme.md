# Latihan Praktek - Pertemuan 3: Pengenalan React (Komponen & JSX)

## Petunjuk Umum

- Buatlah project React baru atau gunakan CodeSandbox/StackBlitz untuk latihan
- Setiap soal dibuat sebagai komponen terpisah
- Pastikan kode berjalan tanpa error
- Perhatikan best practices seperti penggunaan key, props, dan state

---

## Soal 1: Komponen Greeting Sederhana

**Tingkat: Mudah**

Buatlah functional component bernama `Greeting` yang menerima props `name` dan menampilkan pesan sapaan.

**Contoh output:**

```
Hello, Budi!
Welcome to React
```

**Hints:**

- Gunakan functional component
- Terima props `name`
- Return JSX dengan h1 dan p

---

## Soal 2: Komponen Profile Card

**Tingkat: Mudah**

Buatlah komponen `ProfileCard` yang menerima props:

- `name` (string)
- `age` (number)
- `hobby` (string)

Tampilkan informasi tersebut dalam card yang rapi.

**Contoh output:**

```
Name: Ani
Age: 22 years old
Hobby: Reading
```

---

## Soal 3: Button dengan Event Handler

**Tingkat: Mudah**

Buatlah komponen `AlertButton` yang:

- Menerima props `message` dan `label`
- Ketika diklik, menampilkan alert dengan pesan dari props
- Label button sesuai dengan props `label`

**Contoh:**

```jsx
<AlertButton label="Click Me" message="Hello from React!" />
```

---

## Soal 4: Counter dengan State

**Tingkat: Sedang**

Buatlah komponen `Counter` yang memiliki:

- State untuk menyimpan angka counter
- Tombol `+` untuk increment
- Tombol `-` untuk decrement
- Tombol `Reset` untuk kembali ke 0
- Tampilkan nilai counter saat ini

**Fitur tambahan:** Counter tidak boleh negatif (minimal 0)

---

## Soal 5: Toggle Visibility

**Tingkat: Sedang**

Buatlah komponen `ToggleText` yang:

- Memiliki state boolean untuk show/hide
- Button untuk toggle visibility
- Ketika visible, tampilkan teks "This is a secret message!"
- Label button berubah: "Show" atau "Hide"

**Contoh:**

```
[Show Message] atau [Hide Message]
This is a secret message! (jika visible)
```

---

## Soal 6: List Rendering - Daftar Buah

**Tingkat: Sedang**

Buatlah komponen `FruitList` yang:

- Memiliki array buah: `["Apple", "Banana", "Cherry", "Durian", "Elderberry"]`
- Render list menggunakan `map()`
- Gunakan `key` dengan benar
- Tampilkan dalam `<ul>` dan `<li>`

**Bonus:** Tambahkan emoji buah di setiap item

---

## Soal 7: Form Input dengan State

**Tingkat: Sedang**

Buatlah komponen `NameForm` yang:

- Memiliki input text untuk nama
- State untuk menyimpan nilai input
- Tampilkan preview: "Hello, [nama]!" di bawah input
- Update real-time saat user mengetik

**Contoh:**

```
Input: [____Budi____]
Preview: Hello, Budi!
```

---

## Soal 8: Komponen Reusable - Product Card

**Tingkat: Sedang - Sulit**

Buatlah komponen `ProductCard` yang reusable dengan props:

- `name` (nama produk)
- `price` (harga)
- `image` (URL gambar)
- `inStock` (boolean)

Tampilkan:

- Gambar produk
- Nama produk
- Harga dengan format "Rp [harga]"
- Badge "In Stock" atau "Out of Stock" (warna berbeda)

Lalu buat komponen `ProductList` yang me-render 3-5 ProductCard dengan data berbeda.

---

## Soal 9: Todo List Sederhana

**Tingkat: Sulit**

Buatlah komponen `TodoList` dengan fitur:

- Input untuk menambah todo baru
- Button "Add" untuk submit
- List menampilkan semua todo
- Button "Delete" di setiap item untuk menghapus
- Gunakan state array untuk menyimpan todos

**Struktur data:**

```javascript
[
  { id: 1, text: "Belajar React" },
  { id: 2, text: "Buat project" },
];
```

---

## Soal 10: User List dengan Filter

**Tingkat: Sulit**

Buatlah komponen `UserDirectory` dengan fitur:

**Data awal:**

```javascript
const users = [
  { id: 1, name: "Budi", age: 25, city: "Jakarta" },
  { id: 2, name: "Ani", age: 22, city: "Bandung" },
  { id: 3, name: "Citra", age: 28, city: "Jakarta" },
  { id: 4, name: "Doni", age: 24, city: "Surabaya" },
  { id: 5, name: "Eka", age: 26, city: "Bandung" },
];
```

**Fitur:**

- Tampilkan semua user dalam card/list
- Input search untuk filter berdasarkan nama (case-insensitive)
- Dropdown select untuk filter berdasarkan kota
- Tampilkan jumlah user yang ditampilkan

**Bonus:**

- Kombinasi filter search dan city
- Tombol "Reset Filter"

---

## Tips Pengerjaan

1. **Mulai dari yang mudah** - Kerjakan soal 1-3 terlebih dahulu
2. **Gunakan console.log** - Debug dengan mencetak state/props
3. **Baca dokumentasi** - React docs sangat membantu
4. **Coba dulu, baru tanya** - Eksplorasi sendiri meningkatkan pemahaman
5. **Perhatikan error** - Browser console akan memberikan petunjuk

## Resources

- [React Official Docs](https://react.dev/)
- [React useState Hook](https://react.dev/reference/react/useState)
- [Lists and Keys](https://react.dev/learn/rendering-lists)
- [Handling Events](https://react.dev/learn/responding-to-events)

---

## Submission

Simpan hasil pengerjaan Anda dalam folder `pertemuan-3/solutions/` dengan nama file:

- `Soal1.jsx`
- `Soal2.jsx`
- dst...

Atau buat 1 file `App.jsx` yang berisi semua komponen dengan comment yang jelas.

**Selamat Mengerjakan! 🚀**
