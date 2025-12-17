---
title: Database Lokal (AsyncStorage / SQLite)
version: 1.0.0
header: Database Lokal (AsyncStorage / SQLite)
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Database Lokal (AsyncStorage / SQLite)**

---

## Database Lokal dalam React Native

Pertemuan ini membahas teknik penyimpanan data lokal di perangkat mobile menggunakan React Native. Mahasiswa akan mempelajari dua pendekatan utama: AsyncStorage untuk data sederhana dan SQLite untuk data kompleks dengan relasi.

---

## Mengapa Perlu Penyimpanan Lokal?

Penyimpanan lokal memungkinkan aplikasi menyimpan data di perangkat pengguna tanpa koneksi internet. Keuntungannya meliputi:

- Akses data lebih cepat (tidak perlu request ke server)
- Aplikasi tetap berfungsi offline
- Mengurangi beban server dan biaya bandwidth
- Menyimpan preferensi pengguna dan cache data

Contoh use case: menyimpan token autentikasi, pengaturan aplikasi, data favorit, atau history pencarian.

---

## Perbandingan Penyimpanan Lokal vs Cloud

**Penyimpanan Lokal:**

- Data tersimpan di perangkat
- Akses cepat tanpa internet
- Kapasitas terbatas
- Data hilang jika aplikasi dihapus

--- 

**Penyimpanan Cloud:**

- Data tersimpan di server
- Memerlukan koneksi internet
- Kapasitas lebih besar
- Data persisten lintas perangkat

Solusi terbaik: kombinasi keduanya (local storage untuk cache, cloud untuk data utama).

---

## Jenis-jenis Storage di React Native

React Native menyediakan beberapa opsi penyimpanan:

**AsyncStorage:** Key-value storage sederhana untuk data kecil
**SQLite:** Database relasional untuk data terstruktur kompleks
**Realm:** Database object-oriented alternatif
**MMKV:** Storage super cepat untuk key-value
**File System:** Menyimpan file langsung (gambar, dokumen)

Pemilihan bergantung pada kompleksitas dan volume data aplikasi.

---

## AsyncStorage vs SQLite: Kapan Menggunakan?

**Gunakan AsyncStorage untuk:**

- Data sederhana (string, number, boolean)
- Pengaturan aplikasi
- Token autentikasi
- Data yang tidak saling berhubungan
- Jumlah data < 6MB

---

**Gunakan SQLite untuk:**

- Data terstruktur dengan relasi
- Query kompleks (JOIN, filtering)
- Volume data besar
- Memerlukan indexing
- Transaksi data yang kompleks

---

## Apa itu AsyncStorage?

AsyncStorage adalah sistem penyimpanan key-value asinkron yang sederhana dan tidak terenkripsi. Data disimpan dalam format string, sehingga objek harus dikonversi terlebih dahulu.

Karakteristik utama:

- Berbasis Promise (async/await)
- Global untuk seluruh aplikasi
- Persistent (data tetap ada setelah aplikasi ditutup)
- Tidak terenkripsi (jangan simpan data sensitif)

---

## Karakteristik AsyncStorage (Key-Value Storage)

AsyncStorage bekerja seperti dictionary/map dengan pasangan key-value:

```javascript
// Konsep key-value
key: "username" → value: "johndoe"
key: "theme" → value: "dark"
key: "isLoggedIn" → value: "true"
```

Setiap data diidentifikasi dengan key unik bertipe string. Value juga harus string, sehingga tipe data lain perlu dikonversi.

---

## Instalasi @react-native-async-storage/async-storage

Instalasi menggunakan npm atau yarn:

```bash
npm install @react-native-async-storage/async-storage
```

Untuk Expo:

```bash
npx expo install @react-native-async-storage/async-storage
```

Import dalam komponen:

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";
```

Tidak perlu konfigurasi tambahan, langsung siap digunakan.

---

## Metode Dasar AsyncStorage

AsyncStorage memiliki beberapa metode utama:

```javascript
// Menyimpan data
await AsyncStorage.setItem(key, value);

// Mengambil data
const value = await AsyncStorage.getItem(key);

// Menghapus satu item
await AsyncStorage.removeItem(key);
```

---

```javascript
// Menghapus semua data
await AsyncStorage.clear();

// Mengambil semua keys
const keys = await AsyncStorage.getAllKeys();

// Operasi multiple
await AsyncStorage.multiSet([
  [key1, value1],
  [key2, value2],
]);
```

Semua metode bersifat asinkron dan mengembalikan Promise.

---

## Menyimpan Data Sederhana dengan setItem

Metode setItem menyimpan data dengan key tertentu:

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fungsi menyimpan data
const saveUserData = async () => {
  try {
    await AsyncStorage.setItem("username", "johndoe");
    await AsyncStorage.setItem("email", "john@example.com");
    console.log("Data berhasil disimpan");
  } catch (error) {
    console.error("Error menyimpan data:", error);
  }
};
```
---
```javascript
// Penggunaan dalam komponen
const handleSave = () => {
  saveUserData();
};
```

Selalu gunakan try-catch untuk menangani error.

---

## Mengambil Data dengan getItem

Metode getItem mengambil data berdasarkan key:

```javascript
const getUserData = async () => {
  try {
    const username = await AsyncStorage.getItem("username");
    const email = await AsyncStorage.getItem("email");

    if (username !== null && email !== null) {
      console.log("Username:", username);
      console.log("Email:", email);
      return { username, email };
    } else {
      console.log("Data tidak ditemukan");
      return null;
    }
  } catch (error) {
    console.error("Error mengambil data:", error);
  }
};
```

---

```javascript
// Dalam komponen
const [userData, setUserData] = useState(null);

useEffect(() => {
  const loadData = async () => {
    const data = await getUserData();
    setUserData(data);
  };
  loadData();
}, []);
```

Periksa null untuk memastikan data ada.

---

## Menghapus Data dengan removeItem dan clear

Menghapus data spesifik atau seluruh data:

```javascript
// Menghapus satu item
const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("username");
    console.log("Username dihapus");
  } catch (error) {
    console.error("Error menghapus:", error);
  }
};
```

---

```javascript
// Menghapus beberapa item
const removeMultiple = async () => {
  try {
    const keys = ["username", "email", "token"];
    await AsyncStorage.multiRemove(keys);
    console.log("Data dihapus");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Menghapus semua data (hati-hati!)
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Semua data dihapus");
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## Menyimpan Objek dan Array (JSON.stringify)

AsyncStorage hanya menerima string, gunakan JSON.stringify untuk objek:

```javascript
const saveUserProfile = async () => {
  try {
    const userProfile = {
      id: 1,
      name: "John Doe",
      age: 25,
      hobbies: ["reading", "coding", "gaming"],
    };

    // Konversi objek ke string JSON
    const jsonValue = JSON.stringify(userProfile);
    await AsyncStorage.setItem("userProfile", jsonValue);
    console.log("Profile disimpan");
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

```javascript
// Menyimpan array
const saveFavorites = async (favorites) => {
  try {
    const jsonArray = JSON.stringify(favorites);
    await AsyncStorage.setItem("favorites", jsonArray);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## Membaca Objek dan Array (JSON.parse)

Gunakan JSON.parse untuk mengkonversi kembali string JSON:

```javascript
const getUserProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("userProfile");

    // Parse JSON string ke objek
    const profile = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (profile) {
      console.log("Name:", profile.name);
      console.log("Hobbies:", profile.hobbies);
      return profile;
    }
  } catch (error) {
    console.error("Error parsing:", error);
  }
};
```

---

```javascript
// Membaca array
const getFavorites = async () => {
  try {
    const jsonArray = await AsyncStorage.getItem("favorites");
    return jsonArray != null ? JSON.parse(jsonArray) : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
```

---

## Best Practices AsyncStorage

Praktik terbaik menggunakan AsyncStorage:

```javascript
// 1. Buat helper functions
const storage = {
  save: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Save error:", e);
    }
  },

  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Get error:", e);
      return null;
    }
  },
```

---

```javascript
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Remove error:", e);
    }
  },
};

// 2. Gunakan konstanta untuk keys
const STORAGE_KEYS = {
  USER_TOKEN: "@user_token",
  USER_PROFILE: "@user_profile",
  SETTINGS: "@app_settings",
};

// 3. Jangan simpan data sensitif tanpa enkripsi
// 4. Batasi ukuran data (maksimal 6MB)
// 5. Gunakan try-catch di semua operasi
```

---


## Quiz Pilihan Berganda

---

## Soal 1

Apa keuntungan utama menggunakan penyimpanan lokal dibandingkan penyimpanan cloud dalam aplikasi mobile?

A. Data tersimpan permanen di server
B. Akses data lebih cepat tanpa perlu koneksi internet
C. Kapasitas penyimpanan tidak terbatas
D. Data dapat diakses dari berbagai perangkat

<!-- **Jawaban: B** -->

---

## Soal 2

Di antara jenis storage berikut, mana yang paling cocok untuk menyimpan data volume besar dengan relasi kompleks?

A. AsyncStorage
B. MMKV
C. SQLite
D. File System

<!-- **Jawaban: C** -->

---

## Soal 3

Kapan sebaiknya menggunakan AsyncStorage dalam aplikasi React Native?

A. Untuk data terstruktur dengan relasi antar tabel
B. Untuk data sederhana seperti token autentikasi dan pengaturan aplikasi
C. Untuk menyimpan file gambar dan video
D. Untuk data yang memerlukan query JOIN kompleks

<!-- **Jawaban: B** -->

---

## Soal 4

Apa batasan utama dari AsyncStorage yang perlu diperhatikan developer?

A. Hanya dapat menyimpan data numerik
B. Tidak dapat digunakan di platform iOS
C. Hanya menerima data bertipe string dan memiliki batasan ukuran ~6MB
D. Memerlukan koneksi internet untuk berfungsi

<!-- **Jawaban: C** -->

---

## Soal 5

Bagaimana cara yang benar untuk menyimpan objek JavaScript ke AsyncStorage?

A. Langsung menggunakan `setItem(key, object)`
B. Mengkonversi dengan `JSON.stringify()` lalu `setItem(key, jsonString)`
C. Menggunakan method `toString()` pada objek
D. Menyimpan setiap property objek sebagai key terpisah

<!-- **Jawaban: B** -->

---

## Soal 6

Ketika mengambil data dari AsyncStorage, apa yang harus dilakukan jika data berupa objek yang telah disimpan?

A. Langsung menggunakan `getItem()` tanpa konversi
B. Menggunakan `JSON.parse()` untuk mengkonversi string JSON kembali ke objek
C. Menggunakan `eval()` untuk mengeksekusi string
D. Menggunakan `parseInt()` untuk konversi

<!-- **Jawaban: B** -->

---

## Soal 7

Mana pernyataan yang benar tentang karakteristik AsyncStorage?

A. Bersifat sinkron dan blocking
B. Data otomatis terenkripsi untuk keamanan
C. Berbasis Promise dan bersifat asinkron
D. Hanya dapat menyimpan data sementara (session-based)

<!-- **Jawaban: C** -->

---

## Soal 8

Apa fungsi dari metode `AsyncStorage.multiSet()` dan `AsyncStorage.multiRemove()`?

A. Menyimpan dan menghapus multiple key-value sekaligus untuk efisiensi
B. Membuat backup data ke multiple lokasi
C. Mengatur permission untuk multiple user
D. Melakukan validasi data pada multiple field

<!-- **Jawaban: A** -->

---

## Soal 9

Dalam best practices AsyncStorage, mengapa disarankan menggunakan konstanta untuk storage keys?

A. Untuk meningkatkan performa aplikasi
B. Untuk menghindari typo dan memudahkan maintenance
C. Untuk mengaktifkan fitur enkripsi otomatis
D. Untuk mengurangi penggunaan memori

<!-- **Jawaban: B** -->

---

## Soal 10

Metode mana yang paling aman untuk menangani operasi AsyncStorage?

A. Langsung menggunakan method tanpa error handling
B. Menggunakan callback function untuk menangani hasil
C. Menggunakan try-catch block dengan async/await
D. Menggunakan setTimeout untuk delay operasi

<!-- **Jawaban: C** -->

