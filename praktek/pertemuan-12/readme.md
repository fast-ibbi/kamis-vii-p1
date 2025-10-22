# Latihan Praktek Pertemuan 12

## Database Lokal (AsyncStorage / SQLite)

---

## Soal 1: AsyncStorage - Menyimpan dan Membaca User Profile

Buatlah aplikasi sederhana untuk menyimpan profil pengguna menggunakan AsyncStorage:

- Form input untuk: nama, email, nomor telepon, dan alamat
- Tombol "Simpan" untuk menyimpan data ke AsyncStorage
- Tampilkan data profil yang tersimpan di layar
- Tombol "Edit" untuk mengubah data profil
- Tombol "Hapus" untuk menghapus data profil

**Petunjuk:**

- Gunakan `JSON.stringify()` untuk menyimpan object
- Gunakan `JSON.parse()` untuk membaca object
- Key storage: `@user_profile`
- Gunakan `useEffect` untuk load data saat aplikasi dibuka

---

## Soal 2: AsyncStorage - Pengaturan Tema Aplikasi

Implementasikan fitur pengaturan tema (light/dark mode) yang persisten:

- Toggle switch untuk mengubah tema
- Simpan preferensi tema ke AsyncStorage
- Background dan text color berubah sesuai tema
- Tema tetap tersimpan setelah aplikasi ditutup dan dibuka kembali
- Tambahkan pilihan ukuran font (kecil, sedang, besar)

**Petunjuk:**

- Key untuk tema: `@app_theme`
- Key untuk font: `@app_font_size`
- Gunakan conditional styling berdasarkan state
- Load preferensi di useEffect saat aplikasi start

---

## Soal 3: AsyncStorage - History Pencarian

Buatlah fitur history pencarian dengan AsyncStorage:

- Input field untuk memasukkan kata pencarian
- Tombol "Search" untuk menyimpan ke history
- Tampilkan 10 history pencarian terakhir
- Tap pada history untuk menggunakan kata tersebut
- Tombol "Clear History" untuk menghapus semua history

**Petunjuk:**

- Simpan history sebagai array
- Batasi maksimal 10 item (hapus yang paling lama)
- Cek duplikasi sebelum menambah ke history
- Gunakan FlatList untuk menampilkan history

---

## Soal 4: AsyncStorage - Shopping Cart

Implementasikan shopping cart sederhana dengan AsyncStorage:

- Daftar produk (minimal 8 produk dengan gambar, nama, dan harga)
- Tombol "Add to Cart" untuk setiap produk
- Badge counter di icon cart menampilkan jumlah item
- Halaman Cart menampilkan semua item dengan quantity
- Tombol +/- untuk mengubah quantity
- Tombol "Remove" untuk menghapus item
- Tampilkan total harga
- Data cart persisten setelah aplikasi ditutup

**Petunjuk:**

- Key storage: `@shopping_cart`
- Cart item: `{ id, name, price, quantity, image }`
- Hitung total dengan reduce

---

## Soal 5: SQLite - Aplikasi Kontak

Buatlah aplikasi kontak menggunakan SQLite:

- Tabel contacts dengan kolom: id, name, phone, email, address
- Form untuk menambah kontak baru
- List menampilkan semua kontak (sortir berdasarkan nama)
- Fitur search kontak berdasarkan nama atau nomor
- Edit kontak dengan tap item di list
- Delete kontak dengan swipe atau tombol delete
- Tampilkan total jumlah kontak

**Petunjuk:**

```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

---

## Soal 6: SQLite - Aplikasi Catatan (Notes)

Implementasikan aplikasi catatan dengan fitur lengkap:

- Tabel notes dengan: id, title, content, category, is_favorite, created_at
- CRUD operations (Create, Read, Update, Delete)
- Filter berdasarkan kategori (Personal, Work, Important)
- Fitur pencarian berdasarkan title atau content
- Toggle favorite untuk menandai catatan penting
- Tampilkan catatan favorite di tab terpisah
- Sortir berdasarkan tanggal (terbaru/terlama)

**Petunjuk:**

```sql
CREATE TABLE notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  is_favorite INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

---

## Soal 7: SQLite - Aplikasi To-Do List dengan Kategori

Buatlah aplikasi to-do list dengan relasi antar tabel:

- Tabel categories: id, name, color
- Tabel todos: id, text, category_id, completed, due_date
- Tambah/edit/delete kategori
- Tambah todo dengan pilihan kategori
- Toggle status completed
- Filter todo berdasarkan kategori
- Filter todo: All, Active, Completed
- Tampilkan todo yang mendekati deadline
- Query JOIN untuk menampilkan todo dengan nama kategori

**Petunjuk:**

```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT
);

CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  category_id INTEGER,
  completed INTEGER DEFAULT 0,
  due_date DATE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

---

## Soal 8: SQLite - Expense Tracker (Pencatat Keuangan)

Implementasikan aplikasi pencatat keuangan:

- Tabel transactions: id, type (income/expense), amount, category, description, date
- Form input dengan pilihan type (Pemasukan/Pengeluaran)
- Kategori: Food, Transport, Shopping, Salary, dll
- Tampilkan list semua transaksi (sortir berdasarkan tanggal)
- Hitung total pemasukan dan pengeluaran
- Tampilkan saldo (income - expense)
- Filter berdasarkan tanggal (hari ini, minggu ini, bulan ini)
- Filter berdasarkan kategori
- Statistik sederhana (total per kategori)

**Petunjuk:**

```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'income' atau 'expense'
  amount REAL NOT NULL,
  category TEXT,
  description TEXT,
  date DATE DEFAULT (date('now'))
);
```

---

## Soal 9: Hybrid Storage - Aplikasi Resep Masakan

Kombinasikan AsyncStorage dan SQLite:

- SQLite untuk menyimpan resep: id, name, ingredients, instructions, cook_time
- AsyncStorage untuk menyimpan:
  - Resep favorit (array of IDs)
  - History resep yang dilihat (array of IDs)
  - Pengaturan (show_images, text_size)
- CRUD resep di SQLite
- Toggle favorite (sync dengan AsyncStorage)
- Tampilkan "Recently Viewed" dari history
- Filter resep favorit
- Search resep berdasarkan nama atau bahan

**Petunjuk:**

- SQLite untuk data struktural
- AsyncStorage untuk preferensi user
- Sync state antara keduanya

---

## Soal 10: SQLite Advanced - Aplikasi Inventory Barang

Buatlah aplikasi inventory dengan fitur kompleks:

- Tabel categories: id, name
- Tabel products: id, name, category_id, stock, price, min_stock, image_url
- Tabel transactions: id, product_id, type (in/out), quantity, date, notes
- Dashboard dengan statistik:
  - Total produk
  - Total nilai stok
  - Produk dengan stok < min_stock (alert)
  - 5 produk paling banyak keluar
- CRUD produk dan kategori
- Input transaksi masuk/keluar dengan update stok otomatis
- History transaksi dengan JOIN ke products
- Filter dan search produk
- Export data (optional: CSV atau JSON)

**Petunjuk:**

```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER,
  stock INTEGER DEFAULT 0,
  price REAL,
  min_stock INTEGER DEFAULT 5,
  image_url TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  type TEXT NOT NULL, -- 'in' atau 'out'
  quantity INTEGER NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

**Fitur Tambahan:**

- Gunakan Transaction untuk memastikan stok update bersamaan dengan insert transaction
- Implementasi soft delete untuk produk
- Backup/restore database

---

## Kriteria Penilaian

- ✅ Implementasi storage yang benar (AsyncStorage/SQLite) (30%)
- ✅ Fungsionalitas CRUD lengkap dan berfungsi (30%)
- ✅ UI/UX yang baik dan user-friendly (20%)
- ✅ Error handling yang proper (10%)
- ✅ Code quality dan best practices (10%)

---

## Catatan Pengerjaan

1. **AsyncStorage (Soal 1-4):**

   - Gunakan try-catch untuk semua operasi
   - Selalu parse/stringify untuk object
   - Buat helper functions untuk reusability

2. **SQLite (Soal 5-8):**

   - Inisialisasi database di useEffect pertama kali
   - Gunakan parameterized query (?) untuk mencegah SQL injection
   - Reload data setelah insert/update/delete
   - Gunakan transaction untuk operasi kompleks

3. **Testing:**

   - Test semua CRUD operations
   - Test dengan data kosong
   - Test error scenarios
   - Test persistensi data (tutup dan buka aplikasi)

4. **Best Practices:**
   - Pisahkan database logic ke file terpisah
   - Gunakan konstanta untuk storage keys
   - Implementasi loading state
   - Berikan feedback ke user (success/error messages)

**Selamat mengerjakan! 🚀**
