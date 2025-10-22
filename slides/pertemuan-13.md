---
title: Multimedia dan Device API (Camera, Location, Notification)
version: 1.0.0
header: Multimedia dan Device API (Camera, Location, Notification)
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Multimedia dan Device API (Camera, Location, Notification)**

---

### Slide 1: Judul: Multimedia dan Device API dengan Expo

Pertemuan 13 membahas integrasi fitur multimedia dan device API dalam aplikasi React Native menggunakan Expo. Materi mencakup akses kamera, galeri foto, lokasi GPS, dan notifikasi untuk menciptakan aplikasi mobile yang lebih interaktif.

### Slide 2: Tujuan Pembelajaran Pertemuan 13

Mahasiswa mampu mengintegrasikan fitur device native seperti kamera, galeri, GPS, dan notifikasi dalam aplikasi React Native. Mahasiswa memahami cara menangani permission secara proper dan mengimplementasikan best practices dalam penggunaan device API.

### Slide 3: Mengapa Multimedia Penting dalam Aplikasi Mobile?

Fitur multimedia meningkatkan user experience dan interaktivitas aplikasi. Aplikasi modern seperti Instagram, WhatsApp, dan Gojek sangat bergantung pada akses kamera, lokasi, dan media library. Kemampuan mengakses hardware device membuat aplikasi lebih powerful dan sesuai kebutuhan user.

### Slide 4: Overview Device API yang Akan Dipelajari

API yang akan dipelajari meliputi:

- Camera: Mengambil foto dan video
- Image Picker: Akses galeri dan kamera
- Location: Mendapatkan koordinat GPS
- Notifications: Mengirim notifikasi lokal
- Media Library: Mengakses file media device

### Slide 5: Perbedaan Expo CLI vs React Native CLI untuk Device Access

Expo menyediakan pre-built modules yang mudah digunakan tanpa konfigurasi native code. React Native CLI memerlukan linking manual dan konfigurasi platform-specific. Expo cocok untuk rapid development, sedangkan RN CLI memberikan kontrol lebih detail namun kompleks.

```javascript
// Expo - Mudah dan langsung
import * as Camera from "expo-camera";

// React Native CLI - Perlu instalasi tambahan
import { RNCamera } from "react-native-camera";
```

### Slide 6: Pengenalan Expo Camera

Expo Camera adalah library untuk mengakses kamera device dengan mudah. Mendukung foto, video, barcode scanning, dan face detection. Tersedia untuk iOS dan Android dengan API yang konsisten.

### Slide 7: Instalasi dan Konfigurasi expo-camera

Instalasi menggunakan npm atau yarn, kemudian import ke dalam project.

```javascript
// Instalasi via terminal
npx expo install expo-camera

// Import di file komponen
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
```

### Slide 8: Permission Handling untuk Kamera

Permission harus diminta sebelum mengakses kamera untuk keamanan dan privacy user.

```javascript
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Meminta permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Akses kamera ditolak</Text>;
  }

  return <Camera style={{ flex: 1 }} />;
};
```

### Slide 9: Struktur Dasar Komponen Camera

Komponen Camera memerlukan style dengan flex untuk menampilkan preview kamera.

```javascript
import { Camera, CameraType } from "expo-camera";
import { StyleSheet, View } from "react-native";

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        {/* UI overlay di sini */}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
```

### Slide 10: Props dan Methods Camera API

Camera component memiliki berbagai props untuk konfigurasi dan methods untuk kontrol.

```javascript
<Camera
  type={CameraType.back} // back atau front
  flashMode={FlashMode.off} // on, off, auto
  zoom={0} // 0 sampai 1
  ratio="16:9" // aspect ratio
  onCameraReady={() => console.log("Camera ready")}
  onMountError={(error) => console.log(error)}
/>
```

### Slide 11: Capture Photo: Konsep dan Implementasi

Menggunakan ref untuk mengakses camera instance dan method takePictureAsync untuk capture.

```javascript
import { Camera } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image } from "react-native";

const CameraScreen = () => {
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
      console.log("Photo URI:", data.uri);
    }
  };

  return (
    <>
      <Camera style={{ flex: 1 }} ref={cameraRef} />
      <Button title="Take Photo" onPress={takePicture} />
      {photo && (
        <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
      )}
    </>
  );
};
```

### Slide 12: Camera Types: Front vs Back Camera

Toggle antara kamera depan dan belakang menggunakan state.

```javascript
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button } from "react-native";

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <>
      <Camera style={{ flex: 1 }} type={type} />
      <Button title="Flip Camera" onPress={toggleCameraType} />
    </>
  );
};
```

### Slide 13: Pengenalan expo-image-picker

Image Picker memungkinkan user memilih foto/video dari galeri atau mengambil foto baru tanpa membuat komponen kamera sendiri.

### Slide 14: Mengakses Galeri vs Kamera Langsung

Image Picker menyediakan dua metode utama: launchImageLibraryAsync untuk galeri dan launchCameraAsync untuk kamera.

```javascript
import * as ImagePicker from "expo-image-picker";

// Akses Galeri
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
};

// Akses Kamera
const takePhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
};
```

### Slide 15: Permission untuk Media Library

Request permission sebelum mengakses galeri atau kamera melalui Image Picker.

```javascript
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission ditolak!");
      }

      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        alert("Camera permission ditolak!");
      }
    })();
  }, []);
};
```

### Slide 16: ImagePicker Options dan Konfigurasi

Berbagai opsi untuk mengkustomisasi behavior image picker.

```javascript
const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.All, // All, Images, Videos
  allowsEditing: true, // Enable crop/edit
  aspect: [16, 9], // Aspect ratio untuk editing
  quality: 0.8, // 0 sampai 1
  allowsMultipleSelection: false, // Multiple selection
  selectionLimit: 3, // Limit jika multiple
  base64: false, // Include base64 data
  exif: false, // Include EXIF metadata
};

const result = await ImagePicker.launchImageLibraryAsync(options);
```

### Slide 17: Image Compression dan Quality Control

Mengatur kualitas gambar untuk menghemat storage dan bandwidth.

```javascript
const pickImageWithCompression = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.5, // 50% quality - file lebih kecil
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.canceled) {
    const asset = result.assets[0];
    console.log("Original size:", asset.fileSize);
    console.log("URI:", asset.uri);
    console.log("Width:", asset.width);
    console.log("Height:", asset.height);
  }
};
```

### Slide 18: Handling Selected Images

Menyimpan dan menampilkan gambar yang dipilih user.

```javascript
import { useState } from "react";
import { Image, Button, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerExample = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title="Pilih Gambar" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 300, height: 300 }}
        />
      )}
    </View>
  );
};
```

### Slide 19: Pengenalan Expo Location

Expo Location API menyediakan akses ke GPS device untuk mendapatkan koordinat, tracking posisi, dan geocoding.

### Slide 20: Permission Handling untuk Lokasi

Request location permission dengan granularity yang berbeda.

```javascript
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission ditolak");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return <Text>{errorMsg ? errorMsg : JSON.stringify(location)}</Text>;
};
```

### Slide 21: getCurrentPositionAsync: Mendapatkan Lokasi Saat Ini

Method untuk mendapatkan posisi device satu kali.

```javascript
import * as Location from "expo-location";

const getLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission ditolak");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    console.log("Latitude:", location.coords.latitude);
    console.log("Longitude:", location.coords.longitude);
    console.log("Altitude:", location.coords.altitude);
    console.log("Speed:", location.coords.speed);
    console.log("Heading:", location.coords.heading);
  } catch (error) {
    console.error(error);
  }
};
```

### Slide 22: watchPositionAsync: Tracking Real-time Location

Monitoring perubahan lokasi secara real-time untuk aplikasi tracking.

```javascript
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const LocationTracker = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let subscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update setiap 5 detik
          distanceInterval: 10, // atau setiap 10 meter
        },
        (newLocation) => {
          setLocation(newLocation);
          console.log("Updated:", newLocation.coords);
        }
      );
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <Text>
      {location
        ? `Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`
        : "Loading..."}
    </Text>
  );
};
```

### Slide 23: Accuracy Levels pada Location API

Berbagai level akurasi untuk menyeimbangkan presisi dan battery consumption.

```javascript
import * as Location from "expo-location";

// Level akurasi yang tersedia:
const accuracyLevels = {
  lowest: Location.Accuracy.Lowest, // ~3000m
  low: Location.Accuracy.Low, // ~1000m
  balanced: Location.Accuracy.Balanced, // ~100m
  high: Location.Accuracy.High, // ~10m
  highest: Location.Accuracy.Highest, // <10m
  bestForNavigation: Location.Accuracy.BestForNavigation, // optimal untuk navigasi
};

// Contoh penggunaan
const getAccurateLocation = async () => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation,
  });
  console.log(location);
};
```

### Slide 24: Reverse Geocoding dengan Expo Location

Mengkonversi koordinat GPS menjadi alamat yang dapat dibaca manusia.

```javascript
import * as Location from "expo-location";

const reverseGeocode = async (latitude, longitude) => {
  try {
    const address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (address.length > 0) {
      const location = address[0];
      console.log("Street:", location.street);
      console.log("City:", location.city);
      console.log("Region:", location.region);
      console.log("Country:", location.country);
      console.log("Postal Code:", location.postalCode);

      return `${location.street}, ${location.city}, ${location.country}`;
    }
  } catch (error) {
    console.error(error);
  }
};

// Contoh penggunaan
const fullAddress = await reverseGeocode(-6.2088, 106.8456); // Jakarta
```

### Slide 25: Pengenalan Expo Notifications

Expo Notifications memungkinkan pengiriman notifikasi lokal dan push notifications ke device user.

### Slide 26: Local Notifications vs Push Notifications

Local notifications dijadwalkan dari aplikasi itu sendiri, sedangkan push notifications dikirim dari server eksternal.

```javascript
import * as Notifications from "expo-notifications";

// Local Notification - dari aplikasi sendiri
const scheduleLocalNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Local Notification",
      body: "Ini notifikasi dari aplikasi lokal",
    },
    trigger: { seconds: 5 },
  });
};

// Push Notification - dari server (perlu token)
const getPushToken = async () => {
  const token = await Notifications.getExpoPushTokenAsync();
  console.log("Push Token:", token.data);
  // Kirim token ini ke server
};
```

### Slide 27: Scheduling Notifications

Menjadwalkan notifikasi untuk waktu tertentu atau berulang.

```javascript
import * as Notifications from "expo-notifications";

// Konfigurasi handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Notifikasi dalam 10 detik
const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: "Jangan lupa minum air!",
      data: { userId: 123 },
    },
    trigger: { seconds: 10 },
  });
};

// Notifikasi berulang setiap hari jam 9 pagi
const scheduleDailyNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Good Morning!",
      body: "Waktunya memulai hari",
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
};

// Cancel notifikasi
const cancelNotification = async (notificationId) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};

// Cancel semua
const cancelAll = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
```

### Slide 28: Expo Media Library: Akses File Media Device

Media Library memberikan akses ke foto dan video yang tersimpan di device.

```javascript
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

const MediaLibraryExample = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission ditolak");
        return;
      }

      // Ambil album
      const albumList = await MediaLibrary.getAlbumsAsync();
      setAlbums(albumList);

      // Ambil 20 foto terbaru
      const media = await MediaLibrary.getAssetsAsync({
        first: 20,
        mediaType: "photo",
        sortBy: "creationTime",
      });
      setPhotos(media.assets);
    })();
  }, []);

  return (
    <View>
      <Text>Total Albums: {albums.length}</Text>
      <Text>Recent Photos: {photos.length}</Text>
    </View>
  );
};

// Simpan foto ke galeri
const saveToGallery = async (uri) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync("My App Photos", asset, false);
    console.log("Saved to gallery");
  } catch (error) {
    console.error(error);
  }
};
```

### Slide 29: Best Practices Permission Handling

Strategi menangani permission dengan user experience yang baik.

```javascript
import * as Location from "expo-location";
import { Alert } from "react-native";

const requestLocationWithFallback = async () => {
  // 1. Cek status permission saat ini
  const { status: existingStatus } =
    await Location.getForegroundPermissionsAsync();

  let finalStatus = existingStatus;

  // 2. Request jika belum granted
  if (existingStatus !== "granted") {
    const { status } = await Location.requestForegroundPermissionsAsync();
    finalStatus = status;
  }

  // 3. Handle rejection dengan informasi jelas
  if (finalStatus !== "granted") {
    Alert.alert(
      "Permission Diperlukan",
      "Aplikasi memerlukan akses lokasi untuk fitur ini. Silakan aktifkan di Settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
    return false;
  }

  return true;
};

// Best practice: Request permission saat dibutuhkan, bukan di awal
const handleLocationFeature = async () => {
  const hasPermission = await requestLocationWithFallback();
  if (hasPermission) {
    // Lanjutkan fitur lokasi
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
  }
};
```

### Slide 30: Studi Kasus: Aplikasi dengan Multiple Device Features

Contoh aplikasi lengkap yang mengintegrasikan kamera, lokasi, dan notifikasi.

```javascript
import { useState, useEffect } from "react";
import { View, Button, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

const TravelJournalApp = () => {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Setup notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Request permissions
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      await Notifications.requestPermissionsAsync();
    })();
  }, []);

  const takePhotoWithLocation = async () => {
    // 1. Ambil foto
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
    });

    if (result.canceled) return;

    // 2. Dapatkan lokasi
    const currentLocation = await Location.getCurrentPositionAsync({});

    // 3. Reverse geocode untuk alamat
    const address = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    // 4. Simpan data
    setPhoto(result.assets[0].uri);
    setLocation({
      coords: currentLocation.coords,
      address: address[0],
    });

    // 5. Kirim notifikasi sukses
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Foto Tersimpan!",
        body: `Lokasi: ${address[0].city}, ${address[0].country}`,
      },
      trigger: { seconds: 1 },
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Ambil Foto dengan Lokasi"
        onPress={takePhotoWithLocation}
      />

      {photo && (
        <>
          <Image
            source={{ uri: photo }}
            style={{ width: 300, height: 300, marginTop: 20 }}
          />
          {location && (
            <View style={{ marginTop: 10 }}>
              <Text>Latitude: {location.coords.latitude.toFixed(4)}</Text>
              <Text>Longitude: {location.coords.longitude.toFixed(4)}</Text>
              <Text>Lokasi: {location.address.street}</Text>
              <Text>
                {location.address.city}, {location.address.country}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default TravelJournalApp;
```

---

## Quiz Pilihan Berganda

---

## Soal 1

Apa method yang digunakan untuk meminta permission kamera di Expo?

A. `Camera.getPermission()`
B. `Camera.requestCameraPermissionsAsync()`
C. `Camera.askPermission()`
D. `Camera.requestPermission()`

**Jawaban: B**

---

## Soal 2

Apa perbedaan utama antara `launchImageLibraryAsync` dan `launchCameraAsync` pada ImagePicker?

A. Keduanya sama saja
B. `launchImageLibraryAsync` membuka galeri, `launchCameraAsync` membuka kamera
C. `launchImageLibraryAsync` untuk video, `launchCameraAsync` untuk foto
D. `launchImageLibraryAsync` lebih cepat daripada `launchCameraAsync`

**Jawaban: B**

---

## Soal 3

Apa fungsi dari property `quality` pada ImagePicker options?

A. Mengatur resolusi layar
B. Mengatur kecepatan loading gambar
C. Mengatur kompresi gambar dari 0 (terkompresi maksimal) sampai 1 (kualitas penuh)
D. Mengatur filter warna gambar

**Jawaban: C**

---

## Soal 4

Method apa yang digunakan untuk mendapatkan lokasi GPS device satu kali?

A. `Location.getLocationAsync()`
B. `Location.getCurrentPositionAsync()`
C. `Location.fetchLocation()`
D. `Location.getPosition()`

**Jawaban: B**

---

## Soal 5

Apa perbedaan antara `getCurrentPositionAsync` dan `watchPositionAsync`?

A. Tidak ada perbedaan, keduanya sama
B. `getCurrentPositionAsync` mendapatkan lokasi sekali, `watchPositionAsync` memantau lokasi secara real-time
C. `watchPositionAsync` lebih akurat daripada `getCurrentPositionAsync`
D. `getCurrentPositionAsync` hanya untuk Android, `watchPositionAsync` untuk iOS

**Jawaban: B**

---

## Soal 6

Apa fungsi dari Reverse Geocoding pada Location API?

A. Mengubah alamat menjadi koordinat GPS
B. Mengubah koordinat GPS menjadi alamat yang dapat dibaca manusia
C. Menghitung jarak antara dua titik
D. Mengecek apakah GPS aktif atau tidak

**Jawaban: B**

---

## Soal 7

Apa perbedaan antara Local Notifications dan Push Notifications?

A. Local notifications dari aplikasi lokal, push notifications dari server eksternal
B. Local notifications untuk iOS, push notifications untuk Android
C. Push notifications lebih cepat daripada local notifications
D. Tidak ada perbedaan signifikan

**Jawaban: A**

---

## Soal 8

Bagaimana cara menjadwalkan notifikasi yang berulang setiap hari?

A. Menggunakan `trigger: { seconds: 86400 }`
B. Menggunakan `trigger: { hour: 9, minute: 0, repeats: true }`
C. Menggunakan `trigger: { daily: true }`
D. Menggunakan `trigger: { interval: 'daily' }`

**Jawaban: B**

---

## Soal 9

Apa level akurasi tertinggi pada Location API?

A. `Location.Accuracy.High`
B. `Location.Accuracy.Maximum`
C. `Location.Accuracy.BestForNavigation`
D. `Location.Accuracy.Perfect`

**Jawaban: C**

---

## Soal 10

Kapan waktu yang tepat untuk request permission menurut best practices?

A. Saat aplikasi pertama kali dibuka
B. Saat aplikasi di-install
C. Saat fitur yang memerlukan permission akan digunakan
D. Setelah user login

**Jawaban: C**

---

**Selamat! Anda telah menyelesaikan materi Multimedia dan Device API** 🎉

````
```
````
