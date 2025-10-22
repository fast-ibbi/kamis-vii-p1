# Latihan Praktek Pertemuan 13

## Multimedia dan Device API (Camera, Location, Notification)

---

## Soal 1: Camera - Photo Capture App

Buatlah aplikasi sederhana untuk mengambil foto menggunakan Camera API:

- Request permission kamera saat aplikasi dibuka
- Tampilkan preview kamera fullscreen
- Tombol untuk capture foto
- Tombol untuk flip antara front dan back camera
- Tampilkan foto yang diambil di layar baru atau modal
- Tombol untuk retake photo
- Simpan foto ke state

**Petunjuk:**

```javascript
import { Camera, CameraType } from "expo-camera";
// Gunakan useRef untuk camera reference
// Gunakan takePictureAsync() untuk capture
```

---

## Soal 2: Image Picker - Profile Picture Upload

Implementasikan fitur upload foto profil dengan pilihan galeri atau kamera:

- Form profil dengan nama, email, dan foto
- Tombol "Pilih Foto" yang menampilkan action sheet:
  - Ambil dari Galeri
  - Ambil dari Kamera
  - Batal
- Tampilkan preview foto yang dipilih (circular avatar)
- Foto bisa di-edit (crop) sebelum dipilih
- Set aspect ratio 1:1 untuk foto profil
- Quality 0.7 untuk menghemat storage
- Tombol "Simpan Profil"

**Petunjuk:**

```javascript
import * as ImagePicker from "expo-image-picker";
// launchImageLibraryAsync untuk galeri
// launchCameraAsync untuk kamera
// allowsEditing: true, aspect: [1, 1]
```

---

## Soal 3: Location - Current Location Finder

Buatlah aplikasi untuk menampilkan lokasi pengguna saat ini:

- Request location permission
- Tombol "Dapatkan Lokasi Saya"
- Tampilkan koordinat (latitude, longitude)
- Tampilkan altitude, speed, dan heading (jika tersedia)
- Tampilkan accuracy dalam meter
- Loading indicator saat mendapatkan lokasi
- Error handling jika GPS tidak aktif atau permission ditolak
- Tombol "Refresh" untuk update lokasi

**Petunjuk:**

```javascript
import * as Location from "expo-location";
// requestForegroundPermissionsAsync()
// getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
```

---

## Soal 4: Location - Reverse Geocoding App

Implementasikan aplikasi yang menampilkan alamat lengkap dari koordinat GPS:

- Dapatkan lokasi current user
- Tampilkan koordinat latitude dan longitude
- Lakukan reverse geocoding untuk mendapatkan alamat
- Tampilkan informasi alamat lengkap:
  - Street / Jalan
  - City / Kota
  - Region / Provinsi
  - Country / Negara
  - Postal Code
- Copy koordinat atau alamat ke clipboard
- Share location via social media atau app lain

**Petunjuk:**

```javascript
import * as Location from "expo-location";
// reverseGeocodeAsync({ latitude, longitude })
// Gunakan Clipboard.setStringAsync() untuk copy
```

---

## Soal 5: Location - Real-time Location Tracker

Buatlah aplikasi tracking lokasi real-time:

- Request foreground location permission
- Tombol "Mulai Tracking" dan "Stop Tracking"
- Tampilkan koordinat yang terus update
- Hitung dan tampilkan:
  - Jarak tempuh (dalam km)
  - Kecepatan saat ini (km/h)
  - Waktu tracking
- List history lokasi (minimal 10 point terakhir)
- Update setiap 5 detik atau 10 meter
- Visualisasi dengan map (optional, bisa menggunakan react-native-maps)

**Petunjuk:**

```javascript
import * as Location from "expo-location";
// watchPositionAsync({ accuracy, timeInterval, distanceInterval })
// Jangan lupa remove subscription di cleanup
```

---

## Soal 6: Notifications - Reminder App

Buatlah aplikasi pengingat (reminder) dengan local notifications:

- Form input untuk:
  - Judul reminder
  - Deskripsi
  - Waktu pengingat (date & time picker)
- Tombol "Set Reminder"
- List semua reminder yang dijadwalkan
- Tampilkan countdown sampai reminder
- Tombol delete untuk setiap reminder
- Tombol "Cancel All Reminders"
- Notifikasi muncul dengan sound dan vibration
- Handle notifikasi saat app di foreground dan background

**Petunjuk:**

```javascript
import * as Notifications from "expo-notifications";
// scheduleNotificationAsync({ content, trigger })
// getAllScheduledNotificationsAsync()
// cancelScheduledNotificationAsync(id)
```

---

## Soal 7: Notifications - Daily Habit Tracker

Implementasikan aplikasi habit tracker dengan notifikasi harian:

- Daftar habit yang bisa ditambah user (minum air, olahraga, baca buku, dll)
- Setiap habit punya waktu notifikasi (misal: 09:00, 15:00, 21:00)
- Toggle untuk enable/disable notifikasi per habit
- Notifikasi berulang setiap hari di waktu yang sama
- Checklist untuk menandai habit sudah dilakukan hari ini
- Streak counter (berapa hari berturut-turut)
- History habit per hari/minggu
- Badge notification count

**Petunjuk:**

```javascript
import * as Notifications from "expo-notifications";
// trigger: { hour: 9, minute: 0, repeats: true }
// setNotificationHandler untuk konfigurasi
// Gunakan AsyncStorage untuk menyimpan history
```

---

## Soal 8: Multi-Feature - Photo Journal with Location

Buatlah aplikasi journal foto dengan metadata lokasi:

- Halaman utama menampilkan list semua journal entries
- Tombol "Add Entry" untuk membuat journal baru:
  - Ambil foto (dari kamera atau galeri)
  - Otomatis capture lokasi saat foto diambil
  - Input title dan description
  - Timestamp otomatis
- Tampilkan setiap entry dengan:
  - Foto thumbnail
  - Title
  - Lokasi (city, country)
  - Tanggal
- Detail page menampilkan:
  - Foto fullscreen
  - Full description
  - Koordinat GPS
  - Full address
  - Map location (optional)
- Simpan data ke SQLite atau AsyncStorage
- Filter berdasarkan lokasi atau tanggal

**Petunjuk:**

- Kombinasi ImagePicker + Location API
- Gunakan reverseGeocodeAsync untuk alamat
- Simpan URI foto dan koordinat ke database

---

## Soal 9: Multi-Feature - Attendance App dengan Geofencing

Implementasikan aplikasi absensi dengan validasi lokasi:

- User harus berada dalam radius tertentu dari lokasi kantor/kampus
- Fitur Clock In dan Clock Out
- Saat Clock In:
  - Ambil foto selfie
  - Dapatkan lokasi current
  - Validasi jarak dari lokasi target (max 100 meter)
  - Simpan timestamp, foto, dan koordinat
- Saat Clock Out:
  - Sama seperti Clock In
  - Hitung durasi kerja
- History absensi:
  - Tanggal
  - Waktu masuk & keluar
  - Durasi
  - Lokasi
  - Foto
- Notifikasi reminder jika belum clock in jam 9 pagi
- Dashboard dengan statistik kehadiran

**Petunjuk:**

```javascript
// Hitung jarak antara 2 koordinat (Haversine formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
  // Implementation
};

// Lokasi target (kampus/kantor)
const targetLocation = {
  latitude: -6.2088,
  longitude: 106.8456,
  radius: 100, // meter
};
```

---

## Soal 10: Advanced - Tourist Guide App

Buatlah aplikasi panduan wisata lengkap dengan semua fitur:

- **Home Page:**
  - List destinasi wisata populer
  - Search dan filter destinasi
  - Map dengan marker lokasi wisata
- **Detail Destinasi:**
  - Foto-foto (carousel/gallery)
  - Deskripsi lengkap
  - Rating dan review
  - Jam operasional
  - Harga tiket
  - Koordinat GPS
  - Tombol "Get Direction" (calculate distance dari lokasi user)
- **Camera Feature:**
  - Ambil foto di lokasi wisata
  - Otomatis tag lokasi
  - Simpan ke gallery "My Travel Photos"
- **Check-in Feature:**
  - User bisa check-in di destinasi
  - Validasi user berada di lokasi (radius 50m)
  - Ambil foto untuk membuktikan kunjungan
  - Badge/achievement untuk setiap check-in
- **Notifications:**
  - Notifikasi saat user mendekati destinasi wisata (geofencing)
  - Reminder untuk review tempat yang sudah dikunjungi
  - Daily notification untuk rekomendasi tempat baru
- **Profile:**
  - Foto profil (upload from gallery/camera)
  - List destinasi yang sudah dikunjungi
  - Badges yang sudah dikumpulkan
  - Total jarak perjalanan

**Fitur Advanced (Optional):**

- Offline mode (save data ke local storage)
- Share foto ke social media
- AR Camera untuk informasi destinasi
- Real-time weather info untuk setiap destinasi
- Itinerary planner

**Petunjuk:**

- Gunakan kombinasi Camera, ImagePicker, Location, Notifications
- Database SQLite untuk menyimpan destinasi dan check-in history
- AsyncStorage untuk user preferences dan cache
- React Navigation untuk multi-screen
- State management dengan Context API atau Redux

---

## Kriteria Penilaian

- ✅ **Implementasi API yang Benar (30%)**
  - Camera/ImagePicker works properly
  - Location tracking akurat
  - Notifications scheduled correctly
- ✅ **Permission Handling (20%)**

  - Request permission dengan benar
  - Handling rejection dengan baik
  - User feedback yang jelas

- ✅ **Fungsionalitas Lengkap (25%)**

  - Semua fitur berjalan sesuai requirement
  - Error handling yang proper
  - Data persistence

- ✅ **UI/UX (15%)**

  - Interface yang intuitif
  - Loading states
  - Error messages yang informatif

- ✅ **Code Quality (10%)**
  - Clean code
  - Best practices
  - Comments untuk code penting

---

## Catatan Pengerjaan

### 1. Setup Project Expo

```bash
npx create-expo-app@latest nama-project
cd nama-project
npx expo install expo-camera expo-image-picker expo-location expo-notifications
```

### 2. Konfigurasi app.json

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera"
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]
  }
}
```

### 3. Best Practices Permission

- Request permission hanya saat dibutuhkan (lazy request)
- Berikan penjelasan mengapa permission diperlukan
- Handle rejection dengan informasi yang jelas
- Provide fallback jika permission ditolak

### 4. Testing

- Test di device fisik untuk GPS dan kamera (emulator terbatas)
- Test permission flow (grant, deny, ask again)
- Test notifikasi di background dan foreground
- Test dengan GPS/internet off untuk error handling

### 5. Common Issues & Solutions

- **Camera tidak muncul:** Pastikan permission granted dan component mounted
- **Location tidak update:** Check GPS aktif dan permission granted
- **Notification tidak muncul:** Check notification handler configuration
- **Image quality rendah:** Sesuaikan quality parameter di ImagePicker options

---

## Resources

- [Expo Camera Docs](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Expo ImagePicker Docs](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [Expo Location Docs](https://docs.expo.dev/versions/latest/sdk/location/)
- [Expo Notifications Docs](https://docs.expo.dev/versions/latest/sdk/notifications/)

**Selamat mengerjakan! 📸📍🔔**
