---
title: Pengenalan Pemrograman Mobile dan React Native
version: 1.0.0
header: Pengenalan Pemrograman Mobile dan React Native
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Pengenalan Pemrograman Mobile dan React Native**

---

## **Tujuan Pembelajaran**

- Mahasiswa memahami konsep dasar pemrograman mobile
- Mahasiswa mengenal posisi React Native dalam ekosistem pemrograman mobile
- Mahasiswa mampu menyiapkan environment pengembangan

---

## **Apa itu Pemrograman Mobile?**

- Pemrograman aplikasi untuk perangkat bergerak (smartphone, tablet)
- Memanfaatkan bahasa pemrograman tertentu untuk platform Android/iOS
- Bisa menggunakan _framework_ atau platform pengembangan

---

## **Jenis Aplikasi Mobile**

- Native: dibuat khusus untuk Android/iOS
- Hybrid: berbasis web, dibungkus dalam aplikasi
- Cross-platform: satu kode berjalan di banyak platform

---

## **Tren Pasar Mobile Apps**

- 80% waktu penggunaan ponsel dihabiskan pada aplikasi
- Jutaan aplikasi terdaftar di Play Store & App Store
- Indonesia salah satu pasar mobile terbesar

---

## **Kelebihan & Kekurangan Native Development**

Kelebihan:

- performa optimal
- akses penuh ke hardware

Kekurangan:

- butuh tim terpisah (Android/iOS)
- biaya tinggi

---

## **Konsep Cross-Platform**

- Framework yang memungkinkan satu basis kode → multi platform
- Mempercepat development dan hemat biaya
- Populer: React Native, Flutter, Xamarin

---

## **Keuntungan Cross-Platform**

- Efisiensi waktu & biaya
- Perawatan kode lebih mudah
- Konsistensi pengalaman pengguna

---

## **Kekurangan Cross-Platform**

- Performa tidak seoptimal native
- Keterbatasan fitur perangkat tertentu
- Ketergantungan pada framework

---

## **Kebutuhan Mobile Developer**

- Peningkatan kebutuhan developer mobile global
- Banyak perusahaan beralih ke mobile-first apps
- Developer dengan keahlian cross-platform sangat dicari

---

## **Apa itu React Native?**

- Framework open-source dari Facebook (2015)
- Menggunakan JavaScript & React
- Membuat aplikasi mobile lintas platform
- https://reactnative.dev/

---

## **Apa itu Expo?**

- Platform dan toolchain untuk React Native
- Mempermudah development, build, dan deploy
- Menyediakan SDK dengan banyak API bawaan
- Managed workflow vs bare workflow
- https://expo.dev/

---

## **Keunggulan React Native dengan Expo**

- Hot reload & fast refresh → produktivitas tinggi
- Komponen UI reusable
- Komunitas & ekosistem luas
- Setup mudah tanpa konfigurasi native yang kompleks
- Testing langsung di device dengan Expo Go

---

## **Arsitektur React Native**

- JavaScript thread
- Native bridge
- Native modules

---

### Ilustrasi sederhana alurnya:

```
JavaScript Code (UI, Logic)
    ↓
JavaScript Thread
    ↓
Native Bridge
    ↓
Native Modules (UI, Camera, Storage, dll)
    ↓
Android / iOS APIs
```

---

## **Perusahaan yang Menggunakan React Native**

- Facebook
- Instagram
- Tesla
- Uber Eats

---

## **React Native vs Flutter vs Xamarin**

- RN: JavaScript, komunitas besar
- Flutter: Dart, performa lebih tinggi
- Xamarin: C#, integrasi Visual Studio

---

## **Bahasa dalam React Native**

- JavaScript ES6+
- JSX (JavaScript XML)
- Basic konsep React (components, props, state)

---

## **Workflow Pengembangan dengan Expo**

1. Menulis kode (JS/JSX) di editor
2. Run dengan `expo start`
3. Scan QR code dengan Expo Go app
4. Debug & perbaikan dengan hot reload

---

## **Persiapan Environment**

- Node.js & npm/yarn
- Expo CLI
- Expo Go app (untuk testing di device)
- Android Studio & SDK (opsional untuk development)

---

## **Setup Development Environment**

Langkah instalasi singkat:

- Install Node.js
- `npm install -g @expo/cli` (atau gunakan `npx`)
- Download Expo Go app di smartphone
- Install Expo Dev Tools (opsional)

---

## **Membuat Project Pertama**

Command:

```
npx create-expo-app HelloWorld
```

---

## **Struktur Proyek Expo**

- /assets
- /node_modules
- /src (opsional)
- App.js/App.tsx
- app.json
- package.json

---

## **Menjalankan Aplikasi**

- Development server: `npx expo start`
- Scan QR code dengan Expo Go app
- Tekan 'a' untuk Android emulator, 'i' untuk iOS simulator

---

## **Kode Hello World (contoh)**

```jsx
import { Text, View } from "react-native";
export default function App() {
  return (
    <View>
      <Text>Hello World!</Text>
    </View>
  );
}
```

---

## **Penjelasan Kode Hello World**

- `import`: memanggil komponen bawaan
- `View` seperti div di HTML
- `Text` untuk menampilkan tulisan

---

## **Hot Reload & Fast Refresh**

- Update tampilan aplikasi tanpa rebuild penuh
- Hemat waktu development

---

## **Tugas Pertemuan 1**

- Install Expo CLI dan setup environment
- Buat proyek Expo pertama dengan `npx create-expo-app`
- Jalankan dengan Expo Go app dan tampilkan "Belajar React Native"
