# Soal Latihan Praktek - Pertemuan 14

## Optimasi Kinerja dan Debugging

---

## Soal 1: Debugging dengan Console Logging

Buatlah sebuah aplikasi React Native sederhana yang menampilkan daftar produk. Implementasikan console logging dengan best practices untuk:

- Log data produk saat komponen mount
- Log setiap kali user menekan tombol produk
- Gunakan console.group untuk mengelompokkan log API call
- Implementasikan conditional logging yang hanya aktif di development mode

**Kriteria:**

- Gunakan useState untuk menyimpan daftar produk
- Minimal 5 produk dengan struktur: {id, name, price, stock}
- Console log harus memiliki label yang jelas
- Implementasikan logging saat fetch data (simulasi dengan setTimeout)

---

## Soal 2: Error Boundary Implementation

Buatlah komponen Error Boundary yang dapat menangkap error dari child components. Aplikasi harus memiliki:

- Error Boundary class component dengan lifecycle methods yang sesuai
- Komponen yang sengaja throw error (misalnya saat button diklik)
- UI fallback yang user-friendly saat terjadi error
- Tombol "Try Again" untuk reset error state
- Log error ke console dengan format yang informatif

**Kriteria:**

- Gunakan componentDidCatch dan getDerivedStateFromError
- Tampilkan error message yang jelas
- Style UI fallback dengan baik
- Test dengan membuat komponen yang throw error

---

## Soal 3: Optimasi dengan React.memo

Buatlah aplikasi counter dengan parent dan child component. Optimasi aplikasi agar child component tidak re-render saat parent state berubah (jika props child tidak berubah):

- Parent component memiliki state counter
- Child component menampilkan data user yang static
- Gunakan React.memo untuk optimasi child component
- Tambahkan console.log untuk membuktikan optimasi berhasil
- Tambahkan tombol increment counter di parent

**Kriteria:**

- Child component harus wrapped dengan React.memo
- Buktikan dengan console.log bahwa child tidak re-render
- Parent harus bisa increment counter tanpa trigger child re-render
- Tampilkan counter value di parent

---

## Soal 4: useMemo untuk Expensive Computation

Buatlah aplikasi yang menampilkan daftar angka dan menghitung:

- Total dari semua angka
- Rata-rata
- Angka terbesar dan terkecil
- Filter angka genap saja

Gunakan useMemo untuk mengoptimasi perhitungan yang expensive. Tambahkan state lain (misalnya theme color) yang tidak mempengaruhi perhitungan untuk membuktikan useMemo bekerja.

**Kriteria:**

- Gunakan useMemo untuk setiap perhitungan
- Array minimal 20 angka random
- Tambahkan console.log untuk track kapan computation dijalankan
- Tombol untuk toggle theme (dark/light) tanpa re-compute data
- Tombol untuk regenerate angka random

---

## Soal 5: useCallback untuk Memoize Functions

Buatlah aplikasi search dengan input field dan result list. Implementasikan useCallback untuk:

- Function handleSearch yang dipanggil saat user mengetik
- Function handleItemPress untuk setiap item di result list
- Function handleClearSearch untuk clear input

**Kriteria:**

- Gunakan useCallback untuk semua event handlers
- Child component (SearchInput, ResultItem) wrapped dengan React.memo
- Console.log untuk membuktikan function tidak recreated
- Minimal 10 items dalam data list
- Search case-insensitive

---

## Soal 6: FlatList Optimization

Buatlah daftar produk menggunakan FlatList dengan optimasi penuh:

- Minimal 50 produk (generate dengan loop)
- Gunakan semua props optimasi: initialNumToRender, maxToRenderPerBatch, windowSize, removeClippedSubviews
- Implementasikan getItemLayout untuk better performance
- renderItem dan keyExtractor dimemoize dengan useCallback
- Setiap item card menampilkan: image (gunakan placeholder URI), nama, harga, dan tombol "Add to Cart"

**Kriteria:**

- Item component wrapped dengan React.memo
- Fixed item height untuk getItemLayout
- ItemSeparatorComponent untuk pemisah
- ListEmptyComponent untuk empty state
- ListHeaderComponent untuk judul list

---

## Soal 7: Memory Leak Prevention

Buatlah aplikasi timer/stopwatch yang demonstrates proper cleanup untuk mencegah memory leak:

- Timer yang berjalan setiap detik
- Tombol Start, Stop, dan Reset
- Cleanup timer saat komponen unmount
- Tambahkan navigation untuk pindah screen (simulasi unmount)
- Console warning jika ada setState setelah unmount

**Kriteria:**

- Gunakan useEffect dengan cleanup function
- Return clearInterval di cleanup
- State untuk track waktu
- Implementasikan check isMounted untuk setState
- Minimal 2 screen untuk test unmount

---

## Soal 8: Image Optimization Strategy

Buatlah gallery aplikasi yang menampilkan grid images dengan optimasi:

- Gunakan placeholder image saat loading
- Implementasikan progressive image loading dengan loading indicator
- onLoadEnd untuk hide loading indicator
- resizeMode yang sesuai (cover/contain)
- Grid layout 2 kolom menggunakan FlatList dengan numColumns

**Kriteria:**

- Minimal 20 images (gunakan placeholder URL seperti picsum.photos)
- ActivityIndicator saat image loading
- Component ProgressiveImage reusable
- Aspect ratio maintained
- Error handling jika image gagal load

---

## Soal 9: Performance Profiling

Buatlah aplikasi dengan Performance Monitoring menggunakan performance API:

- Track waktu render component
- Measure API call duration (simulasi dengan fetch ke JSONPlaceholder)
- Track navigation time antar screen
- Display performance metrics di UI (render time, API time)
- Implementasikan performance.mark dan performance.measure

**Kriteria:**

- Custom metrics object untuk tracking
- Show performance data di Text component
- Format duration dalam ms dengan 2 decimal
- Button untuk trigger API call dan measure time
- Navigation antar minimal 2 screens dengan time tracking

---

## Soal 10: Complete Optimization - Todo App

Buatlah Todo App lengkap dengan semua optimasi yang telah dipelajari:

**Features:**

- Add todo (input + button)
- List todos dengan FlatList
- Mark todo as completed (toggle)
- Delete todo
- Filter: All, Active, Completed
- Todo counter

**Optimizations yang harus diimplementasikan:**

1. React.memo untuk TodoItem component
2. useMemo untuk filtered todo list
3. useCallback untuk semua event handlers (addTodo, toggleTodo, deleteTodo, setFilter)
4. FlatList dengan props optimasi lengkap
5. Error Boundary wrapper
6. Proper cleanup (jika ada timer/subscription)
7. Console.log dengan proper labeling di development mode
8. AsyncStorage untuk persist data (optional bonus)

**Kriteria:**

- Clean code structure
- Proper component separation (TodoInput, TodoList, TodoItem, FilterButtons)
- Smooth performance dengan 50+ todos
- Professional UI/UX
- Loading state saat fetch dari AsyncStorage (jika implemented)

---

## Bonus Challenge: Performance Comparison

Untuk Soal 10, buatlah 2 versi:

- **Version 1**: Tanpa optimasi (ScrollView, inline functions, no memoization)
- **Version 2**: Dengan semua optimasi

Tambahkan performance counter yang menampilkan:

- Render count untuk setiap component
- Total render time
- Memory usage estimation (manual tracking)

Dokumentasikan perbedaan performa antara kedua versi dalam komentar kode atau separate README.

---

## Submission Guidelines

Untuk setiap soal:

1. Buat folder terpisah: `soal-1`, `soal-2`, dst
2. File struktur:

   ```
   soal-X/
   ├── App.js (atau nama component utama)
   ├── components/ (jika ada)
   └── README.md (penjelasan singkat dan screenshot jika perlu)
   ```

3. Pastikan code:

   - Rapi dan readable
   - Memiliki comment untuk logic penting
   - Tidak ada console.error atau warning
   - Tested dan berjalan dengan baik

4. Testing checklist:
   - ✅ Tidak ada memory leak
   - ✅ Smooth scrolling (jika ada list)
   - ✅ Proper error handling
   - ✅ Clean console (no unnecessary logs)
   - ✅ Sesuai dengan kriteria soal

---

## Tips Pengerjaan

1. **Mulai dari yang simple**: Kerjakan soal 1-3 dulu untuk memahami dasar
2. **Console.log adalah teman**: Gunakan untuk debugging dan validasi optimasi
3. **Test di real device**: Jika memungkinkan, test performa di device fisik
4. **Read the docs**: React Native dan React documentation sangat helpful
5. **Experiment**: Coba dengan dan tanpa optimasi untuk lihat perbedaannya

---

## Resources

- [React Native Performance](https://reactnative.dev/docs/performance)
- [React Optimization](https://react.dev/learn/render-and-commit)
- [React.memo](https://react.dev/reference/react/memo)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [FlatList](https://reactnative.dev/docs/flatlist)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)

---

**Selamat Mengerjakan! 🚀**

_Remember: Premature optimization is the root of all evil. Measure first, optimize later._
