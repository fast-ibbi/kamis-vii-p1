# Latihan Praktek Pertemuan 9

## Handling Event, Input, dan Form Validation

---

## Soal 1: Event Handler Sederhana

Buatlah sebuah aplikasi React Native sederhana yang memiliki:

- Satu tombol dengan text "Klik Saya"
- Ketika tombol diklik, tampilkan Alert dengan pesan "Tombol berhasil diklik!"
- Gunakan event handler `onPress`

**Tujuan:** Memahami penggunaan event handler dasar pada komponen Button.

---

## Soal 2: Controlled TextInput

Buatlah sebuah form sederhana dengan:

- Satu TextInput dengan placeholder "Masukkan nama Anda"
- Satu Text component yang menampilkan nilai dari TextInput secara real-time
- Gunakan useState untuk mengelola state
- Implementasikan controlled component

**Tujuan:** Memahami konsep controlled component dan state management pada TextInput.

---

## Soal 3: Multiple Input Form

Buatlah form registrasi dengan field berikut:

- Nama Lengkap (TextInput)
- Email (TextInput dengan keyboardType="email-address")
- Nomor Telepon (TextInput dengan keyboardType="phone-pad")
- Gunakan satu object state untuk mengelola semua input
- Tampilkan semua data dalam Text component di bawah form

**Tujuan:** Mengelola multiple input dalam satu state object.

---

## Soal 4: Password Input dengan Toggle Visibility

Buatlah input password yang memiliki:

- TextInput dengan secureTextEntry
- Tombol/icon untuk show/hide password
- State untuk mengontrol visibility password
- Placeholder "Masukkan password Anda"

**Tujuan:** Implementasi secure text entry dengan toggle visibility.

---

## Soal 5: Real-time Email Validation

Buatlah form email dengan validasi real-time:

- TextInput untuk email dengan keyboardType="email-address"
- Validasi format email menggunakan regex saat user mengetik
- Tampilkan pesan error jika format email tidak valid
- Ubah border color menjadi merah jika ada error, hijau jika valid
- Gunakan regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**Tujuan:** Implementasi real-time validation dengan feedback visual.

---

## Soal 6: Password Strength Validator

Buatlah form password dengan validasi:

- TextInput password dengan secureTextEntry
- Validasi minimal 8 karakter
- Validasi harus mengandung huruf (a-z atau A-Z)
- Validasi harus mengandung angka (0-9)
- Tampilkan pesan error spesifik untuk setiap kriteria yang tidak terpenuhi
- Tampilkan indikator kekuatan password (Lemah/Sedang/Kuat)

**Tujuan:** Implementasi validasi kompleks dengan multiple kriteria.

---

## Soal 7: Form dengan Required Field Validation

Buatlah form login dengan:

- TextInput untuk email (required)
- TextInput untuk password (required)
- Button "Login"
- Validasi on-submit: pastikan semua field tidak kosong
- Tampilkan Alert jika ada field yang kosong
- Disable button jika ada field yang kosong
- Jika valid, tampilkan Alert "Login berhasil!"

**Tujuan:** Implementasi required field validation dan disable state pada button.

---

## Soal 8: Form Registrasi Lengkap dengan Validasi

Buatlah form registrasi dengan field dan validasi berikut:

- Nama Lengkap (required, minimal 3 karakter)
- Email (required, format email valid)
- Password (required, minimal 8 karakter, harus ada huruf dan angka)
- Konfirmasi Password (required, harus sama dengan password)
- Nomor Telepon (required, hanya angka, minimal 10 digit)
- Tampilkan error message untuk setiap field yang tidak valid
- Button "Daftar" disabled jika ada field yang error atau kosong
- Validasi dilakukan on-submit dan real-time

**Tujuan:** Membuat form kompleks dengan multiple validasi.

---

## Soal 9: Auto-format Input Nomor Telepon

Buatlah form nomor telepon dengan fitur:

- TextInput dengan keyboardType="phone-pad"
- Placeholder "Nomor Telepon"
- Auto-format nomor telepon dengan pola: 0812-3456-7890 (dengan tanda strip)
- Maksimal 15 karakter (termasuk tanda strip)
- Hanya menerima input angka
- Tampilkan nomor yang sudah diformat di Text component

**Contoh:**

- Input: 081234567890
- Tampilan: 0812-3456-7890

**Tujuan:** Manipulasi input text dengan formatting otomatis.

---

## Soal 10: Form Survey dengan Validasi Kompleks

Buatlah form survey dengan field berikut:

- Nama (required, minimal 3 karakter, maksimal 50 karakter)
- Usia (required, hanya angka, range 17-100)
- Email (required, format email valid)
- Website (optional, jika diisi harus format URL valid dengan http:// atau https://)
- Bio (required, minimal 20 karakter, multiline, maxLength 200)
- Button "Kirim Survey"

**Fitur tambahan:**

- Tampilkan character counter untuk Bio (contoh: 45/200)
- Real-time validation untuk semua field
- Error message yang jelas dan spesifik
- Button disabled jika ada field yang invalid
- Setelah submit berhasil, reset semua field dan tampilkan Alert "Survey berhasil dikirim!"

**Tujuan:** Membuat form kompleks dengan berbagai jenis validasi dan fitur UX.

---

## Tips Pengerjaan:

1. **Mulai dari yang sederhana**: Kerjakan soal berurutan dari nomor 1
2. **Gunakan useState**: Untuk mengelola state form dan error
3. **Destructuring**: Gunakan destructuring untuk props yang banyak
4. **Styling**: Beri styling yang baik untuk UX (border, padding, margin, warna)
5. **Console.log**: Gunakan untuk debugging nilai state
6. **Component reusable**: Untuk soal kompleks, buat custom component untuk input dengan error handling
7. **Regex testing**: Test regex pattern di console terlebih dahulu
8. **Alert**: Gunakan Alert.alert() untuk feedback ke user

---

## Kriteria Penilaian:

- **Fungsionalitas** (40%): Aplikasi berjalan sesuai requirement
- **Validasi** (30%): Validasi bekerja dengan benar dan lengkap
- **UI/UX** (20%): Tampilan rapi, error message jelas, feedback visual baik
- **Code Quality** (10%): Code bersih, terstruktur, menggunakan best practices

---

## Bonus Challenge:

Jika sudah selesai semua soal, coba implementasikan:

- Dark mode toggle untuk form
- Animasi pada error message (fade in/out)
- Loading state pada button saat submit
- Success animation setelah form berhasil disubmit
- Implementasi library validasi seperti Yup atau React Hook Form

---

**Selamat mengerjakan! 🚀**
