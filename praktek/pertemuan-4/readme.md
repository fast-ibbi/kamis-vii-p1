# Soal Latihan Praktek - Pertemuan 4

## Struktur Proyek React Native dan Komponen Dasar

---

## Soal 1: Membuat Component Sederhana dengan View dan Text

Buatlah sebuah aplikasi React Native sederhana yang menampilkan profil pribadi Anda menggunakan komponen `View` dan `Text`.

**Kriteria:**

- Gunakan komponen `View` sebagai container utama
- Tampilkan informasi berikut menggunakan komponen `Text`:
  - Nama lengkap
  - NIM/NPM
  - Jurusan
  - Email
  - Hobi (minimal 3)
- Setiap informasi harus dalam `View` terpisah
- Tidak perlu styling, fokus pada struktur component

**Contoh Output:**

```
Nama: John Doe
NIM: 123456789
Jurusan: Teknik Informatika
Email: john@example.com
Hobi:
- Membaca
- Coding
- Gaming
```

---

## Soal 2: Bekerja dengan Image Component

Buatlah aplikasi yang menampilkan gallery sederhana menggunakan komponen `Image`.

**Kriteria:**

- Gunakan `ScrollView` sebagai container utama
- Tampilkan minimal 5 gambar
- Gunakan gambar dari URL (https://picsum.photos/)
- Setiap gambar harus memiliki ukuran yang sama
- Tampilkan caption/deskripsi di bawah setiap gambar menggunakan `Text`
- Tidak perlu styling

**Hint:**

```javascript
<Image source={{ uri: "https://picsum.photos/200/300" }} />
```

---

## Soal 3: Custom Component dengan Props

Buatlah custom component `ProductCard` yang menerima props dan dapat digunakan berulang kali.

**Kriteria:**

- Buat component `ProductCard` dalam file terpisah
- Component menerima props: `name`, `price`, `description`, `imageUrl`
- Gunakan destructuring untuk props
- Export component menggunakan `export default`
- Di App.js, import dan gunakan component minimal 3 kali dengan data berbeda
- Tampilkan semua ProductCard dalam ScrollView

**Struktur File:**

```
├── components/
│   └── ProductCard.js
└── App.js
```

**Data Produk (contoh):**

- Laptop: Rp 10.000.000
- Mouse: Rp 150.000
- Keyboard: Rp 500.000

---

## Soal 4: Button dengan Interaksi Alert

Buatlah aplikasi kalkulator sederhana menggunakan komponen `Button` dan `Alert`.

**Kriteria:**

- Gunakan `View` sebagai container
- Buat 4 tombol dengan judul: "Tambah", "Kurang", "Kali", "Bagi"
- Setiap tombol ketika ditekan akan menampilkan `Alert` dengan pesan:
  - "Operasi Penjumlahan"
  - "Operasi Pengurangan"
  - "Operasi Perkalian"
  - "Operasi Pembagian"
- Gunakan fungsi handler terpisah untuk setiap operasi
- Tidak perlu implementasi kalkulasi, hanya tampilkan Alert

**Hint:**

```javascript
import { Alert } from "react-native";
Alert.alert("Judul", "Pesan");
```

---

## Soal 5: ScrollView dengan List Data

Buatlah aplikasi daftar mahasiswa menggunakan `ScrollView` yang menampilkan data dari array.

**Kriteria:**

- Buat array berisi minimal 10 data mahasiswa dengan struktur:
  ```javascript
  { id: 1, name: "Budi", nim: "123456", major: "Teknik Informatika" }
  ```
- Gunakan `ScrollView` untuk menampilkan semua data
- Gunakan method `.map()` untuk render data
- Setiap item mahasiswa tampilkan dalam `View` dengan key yang unik
- Tampilkan nomor urut, nama, NIM, dan jurusan
- Tidak perlu styling

**Contoh Output:**

```
1. Budi (123456) - Teknik Informatika
2. Ani (123457) - Sistem Informasi
...
```

---

## Soal 6: Multiple Components dengan Export/Import

Buatlah aplikasi dengan struktur component yang terorganisir menggunakan multiple components.

**Kriteria:**

- Buat folder `components/`
- Buat 3 custom components terpisah:
  - `Header.js` - menampilkan judul aplikasi
  - `Content.js` - menampilkan konten utama (bebas)
  - `Footer.js` - menampilkan copyright/info
- Setiap component export dengan `export default`
- Di `App.js`, import semua component dan susun dengan urutan: Header, Content, Footer
- Gunakan `SafeAreaView` sebagai container utama
- Tidak perlu styling

**Struktur File:**

```
├── components/
│   ├── Header.js
│   ├── Content.js
│   └── Footer.js
└── App.js
```

---

## Soal 7: Props dengan Default Values

Buatlah custom component `UserCard` yang menggunakan props dengan default values.

**Kriteria:**

- Buat component `UserCard` yang menerima props: `name`, `age`, `city`, `avatar`
- Berikan default value untuk setiap props:
  - name: "Anonymous"
  - age: 0
  - city: "Unknown"
  - avatar: URL placeholder image
- Gunakan destructuring dengan default values
- Buat 4 UserCard dengan variasi:
  1. Semua props lengkap
  2. Tanpa props age
  3. Tanpa props city dan avatar
  4. Tanpa props sama sekali (gunakan semua default)
- Tampilkan dalam ScrollView

---

## Soal 8: Platform Specific Component

Buatlah aplikasi yang menampilkan informasi berbeda berdasarkan platform (iOS/Android).

**Kriteria:**

- Import `Platform` dari react-native
- Tampilkan informasi platform saat ini: `Platform.OS` dan `Platform.Version`
- Buat 2 `Text` component dengan conditional rendering:
  - Satu hanya tampil di iOS dengan pesan "Anda menggunakan iOS"
  - Satu hanya tampil di Android dengan pesan "Anda menggunakan Android"
- Buat component `PlatformButton` yang menggunakan:
  - `TouchableOpacity` untuk iOS
  - `TouchableNativeFeedback` untuk Android (wrap dengan View)
- Tampilkan Alert ketika button ditekan dengan info platform

**Hint:**

```javascript
{
  Platform.OS === "ios" && <Text>iOS Only</Text>;
}
{
  Platform.OS === "android" && <Text>Android Only</Text>;
}
```

---

## Soal 9: Named Export dan Multiple Components

Buatlah file yang mengexport multiple components menggunakan named export.

**Kriteria:**

- Buat file `components/Cards.js`
- Buat 3 components dalam 1 file:
  - `InfoCard` - menampilkan informasi umum
  - `WarningCard` - menampilkan peringatan
  - `SuccessCard` - menampilkan pesan sukses
- Export semua component menggunakan named export (bukan default)
- Di App.js, import ketiga component sekaligus
- Gunakan ketiga component dengan props `message` yang berbeda
- Tidak perlu styling, hanya struktur component

**Contoh Export:**

```javascript
export function InfoCard({ message }) { ... }
export function WarningCard({ message }) { ... }
export function SuccessCard({ message }) { ... }
```

**Contoh Import:**

```javascript
import { InfoCard, WarningCard, SuccessCard } from "./components/Cards";
```

---

## Soal 10: Complete App - Contact List

Buatlah aplikasi Contact List yang lengkap menggunakan semua konsep yang telah dipelajari.

**Kriteria:**

- Buat struktur folder yang terorganisir:
  ```
  ├── components/
  │   ├── Header.js
  │   └── ContactCard.js
  └── App.js
  ```

**Component Header:**

- Menerima props `title`
- Default value title: "My Contacts"
- Gunakan SafeAreaView

**Component ContactCard:**

- Menerima props: `name`, `phone`, `email`, `avatar`
- Tampilkan semua informasi dalam View
- Gunakan Image untuk avatar
- Buat Button "Call" yang menampilkan Alert dengan info nama dan nomor telepon

**App.js:**

- Import semua components
- Buat array minimal 5 contacts dengan data lengkap
- Gunakan ScrollView untuk menampilkan semua ContactCard
- Gunakan method .map() untuk render
- Tambahkan Text untuk menampilkan total contacts
- Tambahkan Button "Add Contact" di bawah yang menampilkan Alert "Fitur dalam pengembangan"

**Data Contact (contoh):**

```javascript
[
  {
    id: 1,
    name: "John Doe",
    phone: "08123456789",
    email: "john@example.com",
    avatar: "https://picsum.photos/50",
  },
  // ... 4 data lainnya
];
```

**Platform Specific:**

- Gunakan Platform.select untuk menentukan style behavior yang berbeda (optional)
- Tampilkan info platform di Footer

**Tidak perlu styling**, fokus pada:

- Struktur component yang baik
- Penggunaan props dengan benar
- Export/Import yang proper
- Component reusability
- Data handling dengan array dan map

---

## Submission Guidelines

Untuk setiap soal:

1. **Struktur File:**

   ```
   soal-X/
   ├── components/ (jika diperlukan)
   ├── App.js
   └── package.json (jika perlu)
   ```

2. **Format Code:**

   - Gunakan indentasi yang konsisten (2 atau 4 spasi)
   - Berikan comment untuk bagian penting
   - Gunakan naming convention yang baik (PascalCase untuk component)

3. **Testing:**

   - Test di Expo Go
   - Pastikan tidak ada error di console
   - Screenshot hasil jika perlu

4. **Checklist:**
   - ✅ Component berjalan tanpa error
   - ✅ Props berfungsi dengan benar
   - ✅ Import/Export bekerja
   - ✅ Struktur folder sesuai (jika ada)
   - ✅ Code readable dan rapi

---

## Tips Pengerjaan

1. **Mulai dari yang Simple:**

   - Kerjakan soal 1-3 terlebih dahulu
   - Pahami konsep dasar sebelum ke soal kompleks

2. **Fokus pada Core Components:**

   - Soal ini fokus pada View, Text, Image, Button, ScrollView
   - Belum ada styling (akan dipelajari di pertemuan selanjutnya)

3. **Pahami Props:**

   - Props adalah cara passing data ke component
   - Gunakan destructuring untuk code yang lebih clean
   - Default values berguna untuk optional props

4. **Organisasi File:**

   - Pisahkan component ke file berbeda untuk reusability
   - Gunakan folder `components/` untuk custom components
   - Import dan export dengan benar

5. **Testing:**

   - Gunakan console.log untuk debugging
   - Test dengan data berbeda
   - Pastikan component reusable

6. **Common Errors:**
   - Lupa import component dari react-native
   - Salah path saat import custom component
   - Lupa export component
   - Key tidak unik saat mapping array

---

## Resources

- [React Native Documentation - Core Components](https://reactnative.dev/docs/components-and-apis)
- [React Native - View](https://reactnative.dev/docs/view)
- [React Native - Text](https://reactnative.dev/docs/text)
- [React Native - Image](https://reactnative.dev/docs/image)
- [React Native - Button](https://reactnative.dev/docs/button)
- [React Native - ScrollView](https://reactnative.dev/docs/scrollview)
- [React - Components and Props](https://react.dev/learn/passing-props-to-a-component)
- [Expo Documentation](https://docs.expo.dev/)

---

## Catatan Penting

⚠️ **Soal-soal ini TIDAK menggunakan:**

- StyleSheet atau styling apapun (akan dipelajari di pertemuan selanjutnya)
- State management (useState, useEffect, dll - akan dipelajari di pertemuan selanjutnya)
- Navigation
- API calls
- Database

✅ **Focus pada:**

- Struktur component yang benar
- Penggunaan core components (View, Text, Image, Button, ScrollView)
- Props dan data passing
- Import/Export components
- Organisasi file dan folder
- Platform detection (Platform.OS)

---

**Selamat Mengerjakan! 🚀**

_Ingat: Kualitas code lebih penting daripada kuantitas. Pastikan code Anda clean, readable, dan mengikuti best practices!_
