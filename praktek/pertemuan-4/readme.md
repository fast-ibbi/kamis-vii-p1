# Latihan Praktek - Pertemuan 4: Struktur Proyek React Native dan Komponen Dasar

## Petunjuk Umum

- Buatlah project React Native baru menggunakan Expo
- Gunakan Expo Go di smartphone untuk testing
- Setiap soal dibuat sebagai komponen atau screen terpisah
- Pastikan kode berjalan tanpa error di device
- Perhatikan struktur folder dan penamaan component

---

## Soal 1: Setup Project dan Hello World

**Tingkat: Mudah**

Buatlah project Expo baru dengan nama "MyFirstApp" dan modifikasi App.js untuk menampilkan:

- Text "Hello React Native!"
- Text "Nama: [Nama Anda]"
- Text "NIM: [NIM Anda]"
- Gunakan styling yang rapi (centered, font size berbeda)

**Langkah:**

```bash
npx create-expo-app MyFirstApp
cd MyFirstApp
npm start
```

**Hints:**

- Gunakan View sebagai container
- Gunakan Text untuk menampilkan teks
- Gunakan StyleSheet untuk styling

---

## Soal 2: Profile Card dengan Image

**Tingkat: Mudah**

Buatlah komponen `ProfileCard` yang menampilkan:

- Avatar/foto profile (gunakan gambar dari URL atau local)
- Nama lengkap
- Status/bio singkat
- Email

Gunakan styling yang menarik dengan border, padding, dan background color.

**Contoh struktur:**

```
┌─────────────────────┐
│   [Avatar Image]    │
│   Nama Lengkap      │
│   Software Engineer │
│   email@example.com │
└─────────────────────┘
```

**Hints:**

- Gunakan Image component dengan source={{ uri: "..." }}
- Gunakan borderRadius untuk rounded image
- Props: name, bio, email, avatar

---

## Soal 3: List Item dengan ScrollView

**Tingkat: Mudah**

Buatlah daftar 10 buah-buahan menggunakan ScrollView. Setiap item menampilkan:

- Emoji buah
- Nama buah
- Background color berbeda untuk setiap item (alternating)

**Data:**

```javascript
const fruits = [
  { id: 1, name: "Apel", emoji: "🍎" },
  { id: 2, name: "Pisang", emoji: "🍌" },
  { id: 3, name: "Jeruk", emoji: "🍊" },
  // ... tambahkan 7 buah lainnya
];
```

**Hints:**

- Gunakan map() untuk render list
- Gunakan key prop dengan id
- Styling dengan marginVertical untuk spacing

---

## Soal 4: Button Counter

**Tingkat: Sedang**

Buatlah aplikasi counter dengan fitur:

- Display angka counter
- Button "+" (increment)
- Button "-" (decrement)
- Button "Reset" (kembali ke 0)
- Button "×2" (double)
- Button "÷2" (half, gunakan Math.floor untuk hasil integer)

**Tambahan:**

- Counter tidak boleh negatif
- Styling button dengan warna berbeda untuk setiap fungsi

**Hints:**

- Gunakan useState untuk state management
- Import dari 'react'
- Buat custom button component untuk reusability

---

## Soal 5: Image Gallery dengan ScrollView Horizontal

**Tingkat: Sedang**

Buatlah image gallery horizontal yang dapat di-scroll ke samping dengan:

- Minimal 5 gambar (gunakan picsum.photos atau unsplash)
- ScrollView horizontal
- Indicator tidak ditampilkan (showsHorizontalScrollIndicator={false})
- Setiap image memiliki ukuran 300x200
- Spacing antar gambar

**Contoh:**

```
[IMG1] [IMG2] [IMG3] [IMG4] [IMG5] →
```

**Hints:**

- Prop horizontal={true} pada ScrollView
- Gunakan flexDirection: 'row'
- marginHorizontal untuk spacing

---

## Soal 6: Input Form Sederhana

**Tingkat: Sedang**

Buatlah form input dengan:

- TextInput untuk "Nama"
- TextInput untuk "Email"
- TextInput untuk "Password" (dengan secureTextEntry)
- Button "Submit"
- Ketika submit, tampilkan data dalam Alert atau Text di bawah form

**Validasi:**

- Semua field harus diisi
- Tampilkan peringatan jika ada yang kosong

**Hints:**

- Import TextInput dari 'react-native'
- Gunakan useState untuk setiap input
- Gunakan Alert.alert() untuk notifikasi

---

## Soal 7: Card Component Reusable

**Tingkat: Sedang**

Buatlah komponen `Card` yang reusable dengan props:

- title (string)
- description (string)
- image (uri)
- buttonText (string)
- onPress (function)

Lalu buat screen yang menampilkan 3-4 Card dengan data berbeda.

**Fitur Card:**

- Image di atas
- Title dengan font bold
- Description
- Button di bawah
- Shadow/elevation effect

**Contoh penggunaan:**

```jsx
<Card
  title="React Native"
  description="Learn mobile development"
  image="https://picsum.photos/200"
  buttonText="Learn More"
  onPress={() => Alert.alert("Pressed!")}
/>
```

---

## Soal 8: Platform-Specific Styling

**Tingkat: Sedang - Sulit**

Buatlah komponen yang memiliki styling berbeda untuk iOS dan Android:

- Tampilkan text "Platform: [iOS/Android]"
- Tampilkan version platform
- Card dengan shadow (gunakan shadowColor untuk iOS, elevation untuk Android)
- Button dengan feedback berbeda (TouchableOpacity untuk iOS, TouchableNativeFeedback untuk Android)

**Hints:**

- Import Platform dari 'react-native'
- Gunakan Platform.OS
- Gunakan Platform.select() untuk conditional styling

---

## Soal 9: Todo List dengan Add & Delete

**Tingkat: Sulit**

Buatlah aplikasi Todo List dengan fitur:

- TextInput untuk input todo baru
- Button "Add" untuk menambah todo
- List menampilkan semua todo dengan:
  - Nomor urut
  - Text todo
  - Button "Delete" untuk menghapus
- Empty state ketika belum ada todo

**Struktur data:**

```javascript
[
  { id: 1, text: "Belajar React Native", completed: false },
  { id: 2, text: "Buat project", completed: false },
];
```

**Bonus:**

- Checkbox untuk mark as completed
- Strike-through text untuk completed todo
- Counter jumlah todo

**Hints:**

- Gunakan array state
- Gunakan filter() untuk delete
- Gunakan Date.now() atau uuid untuk unique id

---

## Soal 10: Product Catalog dengan Filter

**Tingkat: Sulit**

Buatlah aplikasi katalog produk dengan fitur:

**Data produk:**

```javascript
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 15000000,
    category: "Electronics",
    image: "url",
  },
  {
    id: 2,
    name: "Mouse",
    price: 150000,
    category: "Electronics",
    image: "url",
  },
  { id: 3, name: "Desk", price: 2000000, category: "Furniture", image: "url" },
  { id: 4, name: "Chair", price: 1500000, category: "Furniture", image: "url" },
  {
    id: 5,
    name: "Keyboard",
    price: 500000,
    category: "Electronics",
    image: "url",
  },
  // tambahkan 5 produk lagi
];
```

**Fitur:**

- Tampilkan semua produk dalam card (ScrollView)
- Search input untuk filter berdasarkan nama
- Buttons filter kategori: "All", "Electronics", "Furniture"
- Tampilkan harga dengan format Rupiah (Rp 1.500.000)
- Tampilkan jumlah produk yang ditampilkan

**Komponen yang harus dibuat:**

- ProductCard (reusable)
- SearchBar
- FilterButtons
- ProductList

**Bonus:**

- Sort by price (ascending/descending)
- Tampilkan "No products found" jika hasil filter kosong
- Button "Clear Filter"

---

## Tips Pengerjaan

1. **Setup dulu, koding kemudian** - Pastikan Expo berjalan dengan baik
2. **Component kecil dulu** - Mulai dari View dan Text sederhana
3. **Test di device** - Gunakan Expo Go untuk testing real-time
4. **Console.log adalah teman** - Debug dengan console.log
5. **Baca error message** - React Native error message sangat informatif
6. **Screenshot progress** - Dokumentasikan hasil setiap soal

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Components](https://reactnative.dev/docs/components-and-apis)
- [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
- [React Hooks](https://react.dev/reference/react)

## Testing Checklist

Untuk setiap soal, pastikan:

- ✅ Berjalan tanpa error
- ✅ Tampil dengan baik di device
- ✅ Responsive terhadap interaksi user
- ✅ Code rapi dan terorganisir
- ✅ Ada comments untuk code yang kompleks

---

## Submission

Simpan hasil pengerjaan dalam folder `praktek/pertemuan-4/solutions/` dengan struktur:

```
solutions/
├── soal-1/
│   └── App.js
├── soal-2/
│   ├── App.js
│   └── components/
│       └── ProfileCard.js
├── soal-3/
│   └── App.js
...
```

Atau buat 1 repository Git dengan branch terpisah untuk setiap soal.

**Selamat Mengerjakan! 📱🚀**
