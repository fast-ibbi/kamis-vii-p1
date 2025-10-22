---
title: Struktur Proyek React Native dan Komponen Dasar
version: 1.0.0
header: Struktur Proyek React Native dan Komponen Dasar
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Struktur Proyek React Native dan Komponen Dasar**

---

## Pengenalan Expo & Setup

---

## **Apa itu Expo dan Keunggulannya**

Expo adalah framework dan platform untuk membuat aplikasi React Native dengan lebih cepat dan mudah. Expo menyediakan tools, libraries, dan services yang sudah terintegrasi.

---

Keunggulan Expo:

- Setup mudah tanpa konfigurasi native code
- Preview langsung di device dengan Expo Go
- Akses API device tanpa setup kompleks
- OTA (Over-The-Air) updates
- Build service cloud untuk compile aplikasi

---

## **Expo CLI vs React Native CLI**

Expo CLI:

- Tidak perlu Android Studio/Xcode untuk development
- Library terbatas pada Expo SDK
- Ukuran aplikasi lebih besar
- Cocok untuk pemula dan rapid prototyping

---

React Native CLI:

- Akses penuh ke native code
- Bisa install library native custom
- Perlu setup Android Studio/Xcode
- Ukuran aplikasi lebih kecil
- Cocok untuk aplikasi kompleks dengan kebutuhan native

---

## **Instalasi Expo CLI**

Instalasi Expo CLI menggunakan npm:

```bash
npm install -g expo-cli
```

Verifikasi instalasi:

```bash
expo --version
```

Install Expo Go di smartphone (Android/iOS) dari Play Store/App Store untuk testing.

---

## **Membuat Project Baru dengan Expo**

Perintah membuat project baru:

```bash
expo init NamaProject
```

Atau dengan npx (tanpa install global):

```bash
npx create-expo-app NamaProject
```

Pilih template blank untuk project kosong:

```bash
cd NamaProject
```

---

## **Menjalankan Aplikasi di Expo Go**

Jalankan development server:

```bash
npm start
```

Atau:

```bash
expo start
```

Scan QR code dengan:

- Camera app (iOS)
- Expo Go app (Android)

Aplikasi akan reload otomatis setiap ada perubahan code.

---

## Struktur Project React Native

---

## **Struktur Folder Expo Project**

Struktur folder default Expo project:

```
NamaProject/
├── .expo/
├── assets/
│   ├── icon.png
│   └── splash.png
├── node_modules/
├── App.js
├── app.json
├── package.json
└── babel.config.js
```

---

- `.expo/`: Cache dan konfigurasi Expo
- `assets/`: Gambar, font, dan resource
- `node_modules/`: Dependencies
- `App.js`: File utama aplikasi
- `app.json`: Konfigurasi aplikasi
- `package.json`: Dependencies dan scripts

---

## **File App.js sebagai Entry Point**

App.js adalah file pertama yang dijalankan:

```javascript
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

---

## **File package.json dan Dependencies**

package.json berisi informasi project dan dependencies:

```json
{
  "name": "namaproject",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.0"
  }
}
```

---

## **Folder assets untuk Resource**

Folder assets menyimpan gambar, icon, dan splash screen:

```javascript
import { Image } from "react-native";

export default function App() {
  return <Image source={require("./assets/icon.png")} />;
}
```

---

## **File app.json untuk Konfigurasi**

app.json mengatur konfigurasi aplikasi:

```json
{
  "expo": {
    "name": "NamaProject",
    "slug": "namaproject",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "android": {
      "package": "com.yourcompany.namaproject"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.namaproject"
    }
  }
}
```

---

## Konsep Dasar React Native

---

## **Perbedaan React Native dengan React Web**

React Web menggunakan HTML tags:

```javascript
// React Web
<div>
  <h1>Hello World</h1>
  <p>Welcome</p>
  <button>Click Me</button>
</div>
```

---

React Native menggunakan Native Components:

```javascript
// React Native
<View>
  <Text>Hello World</Text>
  <Text>Welcome</Text>
  <Button title="Click Me" onPress={() => {}} />
</View>
```

---

## **Konsep Component-Based Development**

Component adalah building block aplikasi yang reusable:

```javascript
import { View, Text } from "react-native";

// Component sederhana
function Header() {
  return (
    <View>
      <Text>My App</Text>
    </View>
  );
}
```

---

```javascript
export default function App() {
  return (
    <View>
      <Header />
      <Text>Content goes here</Text>
    </View>
  );
}
```

---

## **Native Components vs Custom Components**

Native Components (built-in):

```javascript
import { View, Text, Image, Button } from "react-native";

<View>
  <Text>Native Component</Text>
  <Image source={require("./image.png")} />
  <Button title="Press" onPress={() => {}} />
</View>;
```

---

Custom Components (buatan sendiri):

```javascript
function Card({ title, content }) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{content}</Text>
    </View>
  );
}

// Penggunaan
<Card title="Judul" content="Isi konten" />;
```

---

## **Import dan Export Component**

Export Default:

```javascript
// components/Header.js
import { View, Text } from "react-native";

export default function Header() {
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
}

// App.js
import Header from "./components/Header";
```

---

Named Export:

```javascript
// components/Cards.js
export function Card1() {
  return (
    <View>
      <Text>Card 1</Text>
    </View>
  );
}

export function Card2() {
  return (
    <View>
      <Text>Card 2</Text>
    </View>
  );
}

// App.js
import { Card1, Card2 } from "./components/Cards";
```

---

## Core Components Dasar

---

## **View Component sebagai Container**

View adalah container dasar untuk layout:

```javascript
import { View } from "react-native";

export default function App() {
  return (
    <View>
      <View>{/* Konten di dalam box */}</View>
    </View>
  );
}
```

---

## **Text Component untuk Menampilkan Teks**

Text digunakan untuk semua teks di aplikasi:

```javascript
import { Text, View } from "react-native";

<View>
  <Text>Judul Besar</Text>
  <Text>Sub judul</Text>
  <Text>Paragraf normal</Text>
  <Text numberOfLines={2}>
    Teks panjang yang akan dipotong setelah 2 baris...
  </Text>
</View>;
```

---

## **Image Component dan Cara Penggunaannya**

Image untuk menampilkan gambar:

```javascript
import { Image } from "react-native";

// Gambar lokal
<Image source={require("./assets/logo.png")} />;

// Gambar dari URL
<Image source={{ uri: "https://picsum.photos/200" }} />;

// Dengan placeholder
<Image
  source={{ uri: "https://example.com/image.jpg" }}
  defaultSource={require("./assets/placeholder.png")}
/>;
```

---

## **ScrollView untuk Konten Panjang**

ScrollView untuk konten yang bisa di-scroll:

```javascript
import { ScrollView, View, Text } from "react-native";

export default function App() {
  return (
    <ScrollView>
      <Text>Daftar Item</Text>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <View key={item}>
          <Text>Item {item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
```

---

## **Button Component untuk Interaksi**

Button untuk tombol sederhana:

```javascript
import { View, Button, Alert } from "react-native";

export default function App() {
  const handlePress = () => {
    Alert.alert("Button", "Tombol ditekan!");
  };

  return (
    <View>
      <Button title="Tekan Saya" onPress={handlePress} color="#841584" />
      <Button title="Tombol Disabled" onPress={handlePress} disabled={true} />
    </View>
  );
}
```

---

## Props pada Component

---

## **Apa itu Props dan Fungsinya**

Props adalah cara passing data ke component:

```javascript
// Component dengan props
function Greeting(props) {
  return (
    <View>
      <Text>Hello, {props.name}!</Text>
      <Text>Umur: {props.age} tahun</Text>
    </View>
  );
}
```

---

```javascript
// Penggunaan
export default function App() {
  return (
    <View>
      <Greeting name="Budi" age={25} />
      <Greeting name="Ani" age={23} />
    </View>
  );
}
```

---

## **Passing Props ke Component**

Berbagai cara passing props:

```javascript
// Destructuring props
function UserCard({ name, email, avatar }) {
  return (
    <View>
      <Image source={{ uri: avatar }} />
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  );
}
```

---

```javascript
// Penggunaan dengan berbagai cara
<UserCard
  name="John Doe"
  email="john@example.com"
  avatar="https://picsum.photos/50"
/>;

// Props dengan default value
function Button({ title = "Click", onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

---

## **Props untuk Data Component**

Passing data sebagai props:

```javascript
function UserInfo({ name, age, city }) {
  return (
    <View>
      <Text>Nama: {name}</Text>
      <Text>Umur: {age}</Text>
      <Text>Kota: {city}</Text>
    </View>
  );
}

// Penggunaan
export default function App() {
  return (
    <View>
      <UserInfo name="Budi" age={25} city="Jakarta" />
      <UserInfo name="Ani" age={23} city="Bandung" />
    </View>
  );
}
```

---

## **Props Khusus pada Core Components**

Setiap component memiliki props khusus:

```javascript
// Text Component Props
<Text
  numberOfLines={2}
  ellipsizeMode="tail"
  onPress={() => console.log("Text pressed")}
>
  Teks panjang...
</Text>
```

---

```javascript
// Image Component Props
<Image
  source={require("./image.png")}
  resizeMode="cover"
/>

// ScrollView Props
<ScrollView
  horizontal={true}
  showsHorizontalScrollIndicator={false}
  pagingEnabled={true}
>
  {/* Konten */}
</ScrollView>
```

---

```javascript
// Button Props
<Button
  title="Submit"
  onPress={handleSubmit}
  color="#007AFF"
  disabled={false}
/>
```

---

## SafeAreaView & Platform Specific

---

## **SafeAreaView untuk Notch Handling**

SafeAreaView menghindari area notch/status bar:

```javascript
import { SafeAreaView, View, Text } from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Text>Konten aman dari notch</Text>
      </View>
    </SafeAreaView>
  );
}
```

---

Alternatif dengan library:

```javascript
import { SafeAreaView } from "react-native-safe-area-context";

<SafeAreaView>
  <Text>Content</Text>
</SafeAreaView>;
```

---

## **Platform Module untuk iOS dan Android**

Deteksi platform dan conditional rendering:

```javascript
import { Platform, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View>
      <Text>Platform: {Platform.OS}</Text>
      <Text>Version: {Platform.Version}</Text>

      {Platform.OS === "ios" && <Text>Ini tampil di iOS saja</Text>}

      {Platform.OS === "android" && <Text>Ini tampil di Android saja</Text>}
    </View>
  );
}
```

---

```javascript
// Platform-specific value
const fontFamily = Platform.select({
  ios: "System",
  android: "Roboto",
});

console.log("Font Family:", fontFamily);
```

---

## **Perbedaan Behavior iOS vs Android**

Contoh perbedaan behavior:

```javascript
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
} from "react-native";
```

---

```javascript
// Button dengan feedback berbeda
function CustomButton({ title, onPress }) {
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View>
          <Text>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
```

---

## Best Practices

---

## **Penamaan Component yang Baik**

Konvensi penamaan component:

```javascript
// ✅ PascalCase untuk component
function UserProfile() {}
function ProductCard() {}
function NavigationHeader() {}

// ✅ camelCase untuk function biasa
function handleSubmit() {}
function fetchUserData() {}

// ✅ UPPERCASE untuk constants
const API_URL = "https://api.example.com";
const MAX_ITEMS = 100;
```

---

```javascript
// ❌ Hindari nama generic
function Component1() {} // Buruk
function MyComponent() {} // Buruk

// ✅ Nama yang descriptive
function LoginForm() {} // Baik
function ProductList() {} // Baik
```

---

## **Organisasi Folder untuk Scalability**

Struktur folder yang terorganisir:

```
src/
├── components/
│   ├── common/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   └── Input.js
│   └── layout/
│       ├── Header.js
│       └── Footer.js
├── screens/
│   ├── HomeScreen.js
│   ├── ProfileScreen.js
│   └── SettingsScreen.js
```

---

```
├── navigation/
│   └── AppNavigator.js
├── services/
│   └── api.js
├── utils/
│   └── helpers.js
└── constants/
    └── colors.js
```

---

Contoh penggunaan:

```javascript
// App.js
import HomeScreen from "./src/screens/HomeScreen";
import { Button } from "./src/components/common/Button";
import { COLORS } from "./src/constants/colors";
```

---

## **Tips Debugging dengan Expo**

Teknik debugging di Expo:

```javascript
// Console log
console.log("Value:", value);
console.warn("Warning message");
console.error("Error message");

// Debug dengan React DevTools
// Tekan 'm' di terminal untuk membuka menu
// Pilih "Open React DevTools"
```

---

```javascript
// Error Boundary
import React from "react";
import { View, Text } from "react-native";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
```

---

```javascript
  componentDidCatch(error, errorInfo) {
    console.log("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong!</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
// Penggunaan
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

<!--
_class: lead
-->

# **QUIZ**

---

## **Soal 1**

**Apa keunggulan utama menggunakan Expo dibandingkan React Native CLI?**

A. Ukuran aplikasi lebih kecil  
B. Setup mudah tanpa perlu Android Studio/Xcode untuk development  
C. Akses penuh ke native code  
D. Hanya bisa digunakan untuk aplikasi web

---

## **Soal 2**

**Komponen mana yang digunakan sebagai container dasar untuk layout di React Native?**

A. `<div>`  
B. `<View>`  
C. `<Container>`  
D. `<Layout>`

---

## **Soal 3**

**Bagaimana cara menampilkan gambar dari URL di React Native?**

A. `<Image src="https://example.com/image.jpg" />`  
B. `<Image source="https://example.com/image.jpg" />`  
C. `<Image source={{ uri: "https://example.com/image.jpg" }} />`  
D. `<Img url="https://example.com/image.jpg" />`

---

## **Soal 4**

**Apa fungsi dari SafeAreaView di React Native?**

A. Membuat aplikasi lebih aman dari hacker  
B. Menghindari area notch/status bar pada device  
C. Menyimpan data dengan aman  
D. Membuat animasi yang smooth

---

## **Soal 5**

**File mana yang menjadi entry point utama dalam Expo project?**

A. `index.js`  
B. `main.js`  
C. `App.js`  
D. `app.json`

---

## **Soal 6**

**Bagaimana cara yang benar untuk passing props dengan destructuring?**

A. `function Card(props) { return <View>{props.title}</View> }`  
B. `function Card({ title }) { return <View>{title}</View> }`  
C. `function Card[title] { return <View>{title}</View> }`  
D. `function Card(title) { return <View>{title}</View> }`

---

## **Soal 7**

**Komponen mana yang harus digunakan untuk menampilkan konten yang panjang dan dapat di-scroll?**

A. `<View>`  
B. `<Text>`  
C. `<ScrollView>`  
D. `<ListView>`

---

## **Soal 8**

**Bagaimana cara mendeteksi platform yang sedang digunakan (iOS atau Android)?**

A. `Platform.name`  
B. `Platform.OS`  
C. `Platform.type`  
D. `Platform.device`

---

## **Soal 9**

**Apa perbedaan utama antara React Native dan React Web?**

A. React Native menggunakan HTML tags, React Web menggunakan Native Components  
B. React Native menggunakan Native Components, React Web menggunakan HTML tags  
C. Keduanya sama persis  
D. React Native hanya untuk iOS

---

## **Soal 10**

**Perintah mana yang digunakan untuk menjalankan development server Expo?**

A. `expo run`  
B. `npm run`  
C. `expo start` atau `npm start`  
D. `react-native start`
