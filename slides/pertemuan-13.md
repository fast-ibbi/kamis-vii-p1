# QR Code Reader App 📱

Tutorial lengkap membuat aplikasi pembaca QR Code dengan React Native dan Expo. Aplikasi ini dapat memindai QR code, mendeteksi URL, dan mengirim nama pengguna ke URL yang dipindai melalui HTTP POST request.

## 📋 Daftar Isi

- [Fitur Aplikasi](#fitur-aplikasi)
- [Prerequisites](#prerequisites)
- [Tutorial Pembuatan](#tutorial-pembuatan)
  - [Langkah 1: Setup Project](#langkah-1-setup-project)
  - [Langkah 2: Install Dependencies](#langkah-2-install-dependencies)
  - [Langkah 3: Konfigurasi Root Layout](#langkah-3-konfigurasi-root-layout)
  - [Langkah 4: Membuat QR Scanner Screen](#langkah-4-membuat-qr-scanner-screen)
  - [Langkah 5: Testing Aplikasi](#langkah-5-testing-aplikasi)
- [Cara Kerja](#cara-kerja)
- [Troubleshooting](#troubleshooting)

## ✨ Fitur Aplikasi

- 📷 Akses kamera untuk memindai QR code
- 🔍 Deteksi otomatis QR code dan barcode PDF417
- 🌐 Deteksi URL otomatis dari QR code
- 👤 Input nama pengguna via modal
- 📤 Kirim data via HTTP POST ke URL yang dipindai
- 🔄 Fitur scan ulang
- 🎯 Visual guide untuk scanning
- 📱 Cross-platform (iOS & Android)

## 🔧 Prerequisites

Pastikan Anda sudah menginstall:

- Node.js (versi 18 atau lebih tinggi)
- npm atau yarn
- Expo CLI
- Aplikasi Expo Go di smartphone (untuk testing)
- Text editor (VS Code recommended)

---

## 📖 Tutorial Pembuatan

### Langkah 1: Setup Project

#### 1.1 Buat Project Expo Baru

Buka terminal dan jalankan perintah berikut:

```bash
npx create-expo-app qr-code-reader
cd qr-code-reader
```

Perintah ini akan membuat project Expo baru dengan nama `qr-code-reader` menggunakan template default.

#### 1.2 Bersihkan File Default (Opsional)

Jika ingin memulai dari awal tanpa example code:

```bash
npm run reset-project
```

Atau hapus manual folder `app-example` dan isi folder `app` jika sudah ada.

---

### Langkah 2: Install Dependencies

#### 2.1 Install Package yang Diperlukan

Jalankan perintah berikut untuk menginstall dependencies:

```bash
npm install expo-camera
```

**Penjelasan Dependencies:**
- `expo-camera`: Library untuk akses kamera dan scanning barcode/QR code

#### 2.2 Verifikasi Instalasi

Pastikan `package.json` sudah berisi dependencies berikut:

```json
{
  "dependencies": {
    "expo": "~54.0.31",
    "expo-camera": "^17.0.10",
    "react": "19.1.0",
    "react-native": "0.81.5"
  }
}
```

---

### Langkah 3: Konfigurasi Root Layout

#### 3.1 Buat File `app/_layout.tsx`

Buat folder `app` (jika belum ada) dan file `_layout.tsx` di dalamnya:

```bash
mkdir -p app
touch app/_layout.tsx
```

#### 3.2 Isi File `app/_layout.tsx`

Buka file `app/_layout.tsx` dan masukkan kode berikut:

```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "QR Code Reader",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
```

**Penjelasan Kode:**
- `Stack`: Komponen navigasi dari expo-router untuk stack navigation
- `Stack.Screen`: Mendefinisikan screen dalam stack
- `name="index"`: Merujuk ke file `index.tsx` di folder yang sama
- `headerShown: false`: Menyembunyikan header untuk tampilan fullscreen

---

### Langkah 4: Membuat QR Scanner Screen

#### 4.1 Buat File `app/index.tsx`

```bash
touch app/index.tsx
```

#### 4.2 Import Dependencies

Buka file `app/index.tsx` dan mulai dengan import yang diperlukan:

```tsx
// Import Camera dan CameraView dari expo-camera untuk akses kamera
import { Camera, CameraView } from "expo-camera";
// Import React hooks untuk state management dan side effects
import { useEffect, useState } from "react";
// Import komponen React Native UI
import {
  Alert,
  Button,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
```

#### 4.3 Buat Component dan State Management

Lanjutkan dengan membuat component dan state:

```tsx
export default function Index() {
  // State untuk status izin kamera (null = requesting, true = granted, false = denied)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  // State untuk tracking apakah QR code sudah dipindai
  const [scanned, setScanned] = useState(false);
  
  // State untuk menyimpan data QR code yang dipindai
  const [scannedData, setScannedData] = useState<string>("");
  
  // State untuk menandai apakah data adalah URL
  const [isUrl, setIsUrl] = useState(false);
  
  // State untuk menyimpan nama user
  const [userName, setUserName] = useState<string>("");
  
  // State untuk mengontrol visibility modal input nama
  const [showNameInput, setShowNameInput] = useState(false);
  
  // State untuk menyimpan URL yang menunggu POST request
  const [pendingUrl, setPendingUrl] = useState<string>("");
```

#### 4.4 Buat Fungsi Validasi URL

Tambahkan fungsi untuk memvalidasi apakah string adalah URL valid:

```tsx
  // Fungsi untuk validasi URL
  const isValidUrl = (string: string) => {
    try {
      // Coba parse string sebagai URL
      const url = new URL(string);
      // Return true hanya jika protokol http atau https
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      // Jika parsing gagal, bukan URL valid
      return false;
    }
  };
```

**Penjelasan:**
- Menggunakan constructor `URL()` untuk parsing
- Hanya menerima URL dengan protokol `http://` atau `https://`
- Return `false` jika parsing error (bukan URL)

#### 4.5 Buat Fungsi untuk Mengirim POST Request

Tambahkan fungsi untuk mengirim nama ke URL:

```tsx
  // Fungsi async untuk mengirim POST request
  const sendNameToUrl = async (url: string, name: string) => {
    try {
      // Kirim POST request dengan fetch API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      // Cek apakah request berhasil
      if (response.ok) {
        Alert.alert(
          "Success",
          `Nama "${name}" berhasil dikirim ke:\n${url}`
        );
      } else {
        Alert.alert(
          "Error",
          `Gagal mengirim nama.\nStatus: ${response.status}`
        );
      }
    } catch (error) {
      // Tangani error jika request gagal
      Alert.alert("Error", `Tidak dapat mengirim data ke:\n${url}`);
    }
  };
```

**Penjelasan:**
- Menggunakan `fetch()` API untuk HTTP request
- Method: `POST`
- Header: `Content-Type: application/json`
- Body: JSON dengan format `{ "name": "nama user" }`
- Menampilkan alert success atau error

#### 4.6 Buat Fungsi untuk Menampilkan Modal Input

Tambahkan fungsi untuk menampilkan dan handle modal:

```tsx
  // Fungsi untuk menampilkan modal input nama
  const promptForNameAndSend = (url: string) => {
    setPendingUrl(url);
    setUserName("");
    setShowNameInput(true);
  };

  // Fungsi untuk handle pengiriman nama
  const handleSendName = () => {
    if (userName && userName.trim() !== "") {
      Keyboard.dismiss();
      setShowNameInput(false);
      sendNameToUrl(pendingUrl, userName.trim());
    } else {
      Alert.alert("Error", "Silakan masukkan nama yang valid");
    }
  };

  // Fungsi untuk cancel input nama
  const handleCancelNameInput = () => {
    Keyboard.dismiss();
    setShowNameInput(false);
    setUserName("");
  };
```

**Penjelasan:**
- `promptForNameAndSend`: Menyimpan URL dan menampilkan modal
- `handleSendName`: Validasi input dan kirim POST request
- `handleCancelNameInput`: Tutup modal dan reset input

#### 4.7 Request Permission Kamera

Tambahkan `useEffect` untuk meminta izin kamera:

```tsx
  // useEffect dijalankan sekali saat component mount
  useEffect(() => {
    const getCameraPermissions = async () => {
      // Request permission kamera
      const { status } = await Camera.requestCameraPermissionsAsync();
      // Update state permission
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []); // Empty array = hanya run sekali
```

**Penjelasan:**
- `useEffect` dengan dependency array kosong `[]` = run sekali saat mount
- `requestCameraPermissionsAsync()`: Meminta izin kamera dari sistem
- Status disimpan di state `hasPermission`

#### 4.8 Buat Handler untuk Scan Barcode

Tambahkan fungsi yang dipanggil saat QR code terdeteksi:

```tsx
  // Handler yang dipanggil saat barcode terdeteksi
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    // Tandai sebagai sudah scan
    setScanned(true);
    // Simpan data yang dipindai
    setScannedData(data);
    // Cek apakah data adalah URL
    const urlDetected = isValidUrl(data);
    setIsUrl(urlDetected);

    // Jika URL, tanya user apakah mau kirim nama
    if (urlDetected) {
      Alert.alert(
        "QR Code Berhasil Dipindai!",
        `URL Terdeteksi: ${data}\n\nApakah Anda ingin mengirim nama Anda ke URL ini?`,
        [
          { text: "Batal", style: "cancel" },
          { text: "Kirim Nama", onPress: () => promptForNameAndSend(data) },
        ]
      );
    } else {
      // Jika bukan URL, tampilkan data saja
      Alert.alert("QR Code Berhasil Dipindai!", `Tipe: ${type}\nData: ${data}`, [
        { text: "OK" },
      ]);
    }
  };
```

**Penjelasan:**
- Fungsi ini otomatis dipanggil oleh `CameraView` saat QR code terdeteksi
- Parameter `type`: jenis barcode (qr, pdf417, dll)
- Parameter `data`: isi dari QR code
- Menampilkan alert berbeda untuk URL dan non-URL

#### 4.9 Render UI - Permission States

Tambahkan conditional render untuk status permission:

```tsx
  // Tampilkan loading jika masih requesting permission
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Meminta izin kamera...</Text>
      </View>
    );
  }

  // Tampilkan error jika permission ditolak
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tidak ada akses ke kamera</Text>
      </View>
    );
  }
```

#### 4.10 Render UI - Main Screen

Tambahkan render untuk main screen dengan camera:

```tsx
  // Main render - tampilkan camera dan UI
  return (
    <View style={styles.container}>
      {/* Camera View - fullscreen */}
      <CameraView
        // Disable scanning jika sudah scan (undefined = disabled)
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        // Setting untuk tipe barcode yang di-scan
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        // Style untuk fullscreen
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay - UI di atas camera */}
      <View style={styles.overlay}>
        {/* Kotak putih sebagai guide scanning */}
        <View style={styles.scanArea} />
        {/* Text instruksi */}
        <Text style={styles.instructionText}>
          Arahkan kamera ke QR code
        </Text>
      </View>

      {/* Result Container - tampil setelah scan */}
      {scanned && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Data yang Dipindai:</Text>
          <Text style={styles.resultText}>{scannedData}</Text>

          {/* Tombol kirim nama - hanya untuk URL */}
          {isUrl && (
            <Button
              title="Kirim Nama ke URL"
              onPress={() => promptForNameAndSend(scannedData)}
              color="#4CAF50"
            />
          )}

          {/* Tombol scan ulang */}
          <View style={{ marginTop: 10 }}>
            <Button
              title="Pindai Lagi"
              onPress={() => setScanned(false)}
              color="#2196F3"
            />
          </View>
        </View>
      )}

      {/* Modal untuk input nama */}
      <Modal
        visible={showNameInput}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelNameInput}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCancelNameInput}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Masukkan Nama Anda</Text>
              <Text style={styles.modalSubtitle}>
                Silakan masukkan nama Anda untuk dikirim ke server:
              </Text>
              <TextInput
                style={styles.nameInput}
                placeholder="Nama Anda"
                value={userName}
                onChangeText={setUserName}
                autoFocus={true}
                onSubmitEditing={handleSendName}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={handleCancelNameInput}
                >
                  <Text style={styles.cancelButtonText}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.sendButton]}
                  onPress={handleSendName}
                >
                  <Text style={styles.sendButtonText}>Kirim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
```

**Penjelasan Komponen:**
- `CameraView`: Komponen kamera dari expo-camera
- `onBarcodeScanned`: Callback saat barcode terdeteksi
- `barcodeTypes`: Tipe barcode yang akan di-detect
- `overlay`: Layer UI di atas kamera
- `resultContainer`: Card hasil scan (conditional)
- `Modal`: Modal custom untuk input nama (cross-platform)

#### 4.11 Tambahkan Styling

Terakhir, tambahkan styles untuk semua komponen:

```tsx
// Definisi styles dengan StyleSheet
const styles = StyleSheet.create({
  // Container utama - fullscreen hitam
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  // Style untuk text
  text: {
    color: "#fff",
    fontSize: 16,
  },
  // Overlay di atas camera
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  // Kotak putih guide scanning
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  // Text instruksi
  instructionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  // Container hasil scan di bawah
  resultContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  // Label "Data yang Dipindai:"
  resultLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  // Text data hasil scan
  resultText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  // Overlay modal - background semi-transparan
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Container konten modal
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: 300,
    alignItems: "stretch",
  },
  // Title modal
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  // Subtitle modal
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  // Input field nama
  nameInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  // Container tombol modal
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  // Base style tombol
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  // Tombol batal
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  // Tombol kirim
  sendButton: {
    backgroundColor: "#4CAF50",
  },
  // Text tombol batal
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  // Text tombol kirim
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
```

**Penjelasan Styles:**
- Menggunakan `StyleSheet.create()` untuk performa lebih baik
- `flex: 1`: Mengisi seluruh space yang tersedia
- `position: "absolute"`: Positioning absolut untuk overlay
- `rgba()`: Warna dengan transparency
- Responsive dengan menggunakan relative units

---

### Langkah 5: Testing Aplikasi

#### 5.1 Jalankan Development Server

Di terminal, jalankan:

```bash
npx expo start
```

Atau:

```bash
npm start
```

#### 5.2 Pilih Platform Testing

Setelah server running, Anda akan melihat QR code dan opsi:

**Untuk Android:**
```
› Press a │ open Android
```
Tekan `a` untuk membuka di Android emulator/device

**Untuk iOS:**
```
› Press i │ open iOS simulator
```
Tekan `i` untuk membuka di iOS simulator

**Untuk Physical Device:**
1. Install aplikasi **Expo Go** dari Play Store (Android) atau App Store (iOS)
2. Scan QR code yang muncul di terminal dengan Expo Go

#### 5.3 Grant Camera Permission

Saat aplikasi pertama kali dibuka:
1. Popup permission akan muncul
2. Tap **"Allow"** atau **"Izinkan"**
3. Kamera akan langsung aktif

#### 5.4 Test Scanning QR Code

**Test dengan QR Code Non-URL:**
1. Arahkan kamera ke QR code biasa
2. Alert akan muncul menampilkan data
3. Tap "OK"
4. Tap "Pindai Lagi" untuk scan ulang

**Test dengan QR Code URL:**
1. Buat QR code yang berisi URL (contoh: `https://example.com/api/submit`)
2. Arahkan kamera ke QR code tersebut
3. Alert akan muncul: "Apakah Anda ingin mengirim nama Anda ke URL ini?"
4. Tap "Kirim Nama"
5. Modal input akan muncul
6. Masukkan nama Anda
7. Tap "Kirim"
8. POST request akan dikirim ke URL tersebut
9. Alert success/error akan muncul

#### 5.5 Verifikasi POST Request

Untuk memverifikasi bahwa POST request berhasil dikirim, Anda bisa:

**Opsi 1: Menggunakan Server Test**
Buat QR code dengan URL test endpoint seperti:
- `https://webhook.site` (dapat melihat request yang masuk)
- `https://httpbin.org/post` (echo POST request)

**Opsi 2: Buat Server Sendiri**
Buat simple server untuk testing:

```javascript
// server.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/submit', (req, res) => {
  console.log('Received POST request:');
  console.log('Body:', req.body);
  res.json({ success: true, received: req.body });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Jalankan: `node server.js`

Buat QR code dengan: `http://YOUR_IP:3000/api/submit`

---

## 🎯 Cara Kerja

1. **Berikan Izin Kamera**: Aplikasi meminta akses kamera saat pertama kali dibuka
2. **Pindai QR Code**: Arahkan kamera Anda ke QR code
3. **Deteksi Otomatis**: Aplikasi otomatis mendeteksi dan memindai QR code
4. **Cek URL**: Jika data yang dipindai adalah URL valid:
   - Menampilkan alert menanyakan apakah Anda ingin mengirim nama Anda
   - Membuka modal untuk input nama
   - Mengirim POST request dengan nama Anda ke URL yang dipindai
5. **Data Non-URL**: Jika bukan URL, menampilkan data dalam alert
6. **Scan Ulang**: Tekan tombol "Tap to Scan Again" untuk memindai QR code lain

### Format API Request

Ketika URL dipindai dan nama dimasukkan, aplikasi mengirim:

**Method**: `POST`  
**Headers**: `Content-Type: application/json`  
**Body**:
```json
{
  "name": "Nama User"
}
```

## 📁 Struktur Project


```
qr-code-reader/
├── app/
│   ├── _layout.tsx        # Root layout dengan navigasi
│   └── index.tsx          # Screen utama QR scanner
├── app-example/           # Contoh code dari template Expo
├── assets/                # Gambar dan aset statis
├── package.json           # Dependencies project
├── tsconfig.json          # Konfigurasi TypeScript
└── README.md              # File ini
```

## 🛠 Teknologi yang Digunakan

- **React Native**: Pengembangan aplikasi mobile cross-platform
- **Expo**: Framework dan tools pengembangan
- **TypeScript**: JavaScript dengan type-safe
- **expo-camera**: Akses kamera dan scanning barcode
- **expo-router**: Routing berbasis file
- **Fetch API**: HTTP POST requests

## 💡 Komponen Utama

### State Management
- `hasPermission`: Status izin kamera
- `scanned`: Melacak apakah QR code sudah dipindai
- `scannedData`: Menyimpan data QR code yang dipindai
- `isUrl`: Menandai apakah data yang dipindai adalah URL valid
- `userName`: Menyimpan input nama pengguna
- `showNameInput`: Mengontrol visibilitas modal
- `pendingUrl`: Menyimpan URL yang menunggu POST request

### Fungsi Utama
- `isValidUrl()`: Memvalidasi apakah data yang dipindai adalah URL HTTP/HTTPS yang valid
- `sendNameToUrl()`: Mengirim POST request dengan nama pengguna
- `promptForNameAndSend()`: Menampilkan modal input nama
- `handleBarCodeScanned()`: Memproses data barcode yang dipindai

## 📝 Struktur Code

Seluruh aplikasi terdapat dalam `app/index.tsx` dengan:
- **Imports**: Komponen React Native dan library Expo
- **Component**: Komponen fungsional utama dengan hooks
- **State**: Multiple useState hooks untuk state aplikasi
- **Functions**: Helper functions untuk validasi URL dan HTTP requests
- **Effects**: useEffect untuk request izin kamera
- **Render**: Conditional rendering berdasarkan permissions dan state scan
- **Styles**: StyleSheet untuk semua komponen UI

## 🔒 Permissions

Aplikasi memerlukan:
- **Izin Kamera**: Diperlukan untuk memindai QR codes
- Permission diminta secara otomatis saat pertama kali dibuka
- Jika ditolak, aplikasi menampilkan pesan error

## 🤝 Contributing

Silakan fork project ini dan submit pull request untuk perbaikan apapun.

## 📄 License

Project ini adalah open source dan tersedia di bawah MIT License.

## 👨‍💻 Catatan Development

- Aplikasi menggunakan alternatif `Alert.prompt()` (custom modal) untuk kompatibilitas cross-platform
- Mendukung QR codes dan barcode PDF417
- Hanya URL HTTP dan HTTPS yang dianggap valid
- Camera view mengisi seluruh layar untuk UX yang lebih baik
- Scanning dinonaktifkan setelah scan pertama sampai tombol "Scan Again" ditekan

## 🐛 Troubleshooting

**Kamera tidak berfungsi:**
- Periksa izin kamera di pengaturan device
- Pastikan Anda testing di physical device (kamera mungkin tidak berfungsi di simulator)

**POST request gagal:**
- Verifikasi QR code berisi URL HTTP/HTTPS yang valid
- Cek apakah server dapat diakses
- Pastikan server menerima POST requests dengan JSON body

**Modal tidak muncul:**
- Masalah ini sudah diperbaiki untuk berfungsi di iOS dan Android
- Menggunakan custom modal sebagai pengganti Alert.prompt()

---

**Selamat Coding! 🎉**

Dibuat dengan ❤️ menggunakan Expo dan React Native