---
title: Navigasi pada React Native (Stack, Tab, Drawer)
version: 1.0.0
header: Navigasi pada React Native (Stack, Tab, Drawer)
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Navigasi pada React Native (Stack, Tab, Drawer)**

---

### Pengenalan Navigasi

**1. Pentingnya Navigasi dalam Aplikasi Mobile**

Navigasi adalah komponen fundamental dalam aplikasi mobile yang memungkinkan pengguna berpindah antar layar. Tanpa navigasi yang baik, aplikasi akan sulit digunakan dan memberikan pengalaman pengguna yang buruk. Navigasi yang intuitif meningkatkan user experience dan membuat aplikasi lebih profesional.

**2. Perbedaan Navigasi Web vs Mobile**

Navigasi web menggunakan URL dan browser history, sedangkan mobile menggunakan stack of screens. Di web, navigasi bersifat linear dengan back button browser. Di mobile, navigasi lebih kompleks dengan gesture-based navigation (swipe, tap) dan tidak memiliki address bar. Mobile juga memiliki pola navigasi khusus seperti tab bar dan drawer menu.

**3. Library Navigasi di React Native**

Beberapa library navigasi populer untuk React Native:

- React Navigation (paling populer, community-driven)
- React Native Navigation (Wix, native performance)
- React Router Native (mirip React Router untuk web)

React Navigation dipilih karena pure JavaScript, mudah dikustomisasi, dan memiliki dokumentasi lengkap.

**4. Mengapa React Navigation?**

React Navigation adalah pilihan terbaik karena:

- Mudah diimplementasikan dan dikustomisasi
- Performa baik dengan optimasi built-in
- Mendukung berbagai pola navigasi (stack, tab, drawer)
- Dokumentasi lengkap dan komunitas besar
- Terus diupdate dan di-maintain
- Kompatibel dengan Expo dan bare React Native

**5. Instalasi React Navigation dan Dependencies**

```bash
# Install core library
npm install @react-navigation/native

# Install dependencies untuk Expo
npx expo install react-native-screens react-native-safe-area-context

# Atau untuk bare React Native
npm install react-native-screens react-native-safe-area-context
```

Kemudian wrap aplikasi dengan NavigationContainer di App.js:

```javascript
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      {/* Navigator akan diletakkan di sini */}
    </NavigationContainer>
  );
}
```

---

### Stack Navigation

**6. Konsep Stack Navigation**

Stack Navigation bekerja seperti tumpukan kartu. Setiap screen baru ditambahkan di atas stack. Ketika back, screen teratas dihapus dan kembali ke screen sebelumnya. Ini adalah pola navigasi paling umum di mobile apps, mirip dengan history browser tetapi lebih visual dengan animasi transisi.

**7. Instalasi @react-navigation/native-stack**

```bash
npm install @react-navigation/native-stack
```

Native Stack Navigator menggunakan native navigation APIs untuk performa optimal.

**8. Struktur Dasar Stack Navigator**

```javascript
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**9. Membuat Screen Pertama**

```javascript
import { View, Text, StyleSheet } from "react-native";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text>Ini adalah halaman utama aplikasi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
```

**10. Navigasi Antar Screen dengan navigation.navigate()**

```javascript
import { View, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
```

Prop `navigation` otomatis tersedia di setiap screen component.

**11. Passing Parameters Antar Screen**

```javascript
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            itemName: "React Native Course",
            price: 150000,
          })
        }
      />
    </View>
  );
}
```

**12. Mengakses Parameter di Screen Tujuan**

```javascript
function DetailsScreen({ route, navigation }) {
  const { itemId, itemName, price } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Item Name: {itemName}</Text>
      <Text>Price: Rp {price.toLocaleString()}</Text>
    </View>
  );
}
```

**13. Navigasi Kembali dengan navigation.goBack()**

```javascript
function DetailsScreen({ route, navigation }) {
  const { itemName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{itemName}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
```

**14. Kustomisasi Header Stack Navigator**

```javascript
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: "#6200ee",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  }}
>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ title: "Beranda" }}
  />
  <Stack.Screen
    name="Details"
    component={DetailsScreen}
    options={{ title: "Detail Produk" }}
  />
</Stack.Navigator>
```

**15. Menambahkan Button pada Header**

```javascript
function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => alert("Button clicked!")}
          title="Info"
          color="#fff"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}
```

**16. Styling Header (Background, Tint Color)**

```javascript
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: "Profil Saya",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
    },
    headerShadowVisible: false, // Remove shadow
  }}
/>
```

**17. Menyembunyikan Header pada Screen Tertentu**

```javascript
<Stack.Navigator>
  <Stack.Screen
    name="Splash"
    component={SplashScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Login"
    component={LoginScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>
```

---

### Tab Navigation

**18. Konsep Bottom Tab Navigation**

Bottom Tab Navigation menampilkan menu navigasi di bagian bawah layar, memungkinkan akses cepat ke section utama aplikasi. Pola ini umum digunakan untuk aplikasi dengan 3-5 fitur utama seperti Home, Search, Favorites, Profile. Tab tetap visible di semua screen dalam tab navigator tersebut.

**19. Instalasi @react-navigation/bottom-tabs**

```bash
npm install @react-navigation/bottom-tabs
```

Untuk icons, install icon library:

```bash
npx expo install @expo/vector-icons
```

**20. Membuat Bottom Tab Navigator**

```javascript
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
```

**21. Menambahkan Icons pada Tab**

```javascript
import { Ionicons } from "@expo/vector-icons";

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

**22. Kustomisasi Tab Bar (Warna, Style)**

```javascript
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: "#6200ee",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
      backgroundColor: "#ffffff",
      borderTopWidth: 1,
      borderTopColor: "#e0e0e0",
      height: 60,
      paddingBottom: 5,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "600",
    },
  }}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Search" component={SearchScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

**23. Badge pada Tab Icons**

```javascript
<Tab.Navigator>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarBadge: 3,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="Notifications"
    component={NotificationsScreen}
    options={{
      tabBarBadge: 10,
      tabBarBadgeStyle: { backgroundColor: "red" },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="notifications" size={size} color={color} />
      ),
    }}
  />
</Tab.Navigator>
```

**24. Tab Navigator dengan Stack Navigator**

```javascript
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

### Drawer Navigation

**25. Konsep Drawer Navigation (Side Menu)**

Drawer Navigation adalah side menu yang muncul dari samping (biasanya kiri) ketika di-swipe atau tombol menu ditekan. Cocok untuk aplikasi dengan banyak menu navigasi yang tidak perlu akses cepat. Drawer dapat menampilkan profil user, menu navigasi, dan action buttons.

**26. Instalasi @react-navigation/drawer**

```bash
npm install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated
```

Tambahkan plugin di babel.config.js:

```javascript
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: ["react-native-reanimated/plugin"],
};
```

**27. Membuat Drawer Navigator**

```javascript
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
```

**28. Kustomisasi Drawer Content**

```javascript
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john@example.com</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.drawerFooter}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: "#6200ee",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#fff",
    fontSize: 14,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  version: {
    color: "gray",
    fontSize: 12,
  },
});

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
```

**29. Kombinasi Stack, Tab, dan Drawer Navigation**

```javascript
// Stack Navigators
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="MainApp"
          component={TabNavigator}
          options={{ title: "My App" }}
        />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

**30. Best Practices Struktur Navigasi Aplikasi**

Struktur file yang direkomendasikan:

```
src/
├── navigation/
│   ├── AppNavigator.js       // Root navigator
│   ├── StackNavigator.js     // Stack navigators
│   ├── TabNavigator.js       // Tab navigator
│   └── DrawerNavigator.js    // Drawer navigator
├── screens/
│   ├── HomeScreen.js
│   ├── DetailsScreen.js
│   ├── ProfileScreen.js
│   └── SettingsScreen.js
└── components/
    └── CustomDrawerContent.js
```

Contoh AppNavigator.js:

```javascript
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./DrawerNavigator";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainDrawer />
    </NavigationContainer>
  );
}
```

Best practices:

- Pisahkan navigator berdasarkan tipe (Stack, Tab, Drawer)
- Gunakan lazy loading untuk screen yang jarang diakses
- Hindari nesting navigator terlalu dalam (max 3 level)
- Gunakan TypeScript untuk type safety pada params
- Simpan navigation state untuk deep linking
- Test navigasi flow secara menyeluruh

---

## Quiz Pilihan Berganda

---

## Soal 1

Library navigasi mana yang paling populer dan direkomendasikan untuk React Native?

A. React Router Native
B. React Native Navigation (Wix)
C. React Navigation
D. Native Navigator

**Jawaban: C**

---

## Soal 2

Apa fungsi dari `NavigationContainer` dalam React Navigation?

A. Untuk membuat tab navigation
B. Untuk membungkus seluruh struktur navigasi aplikasi
C. Untuk styling navigation bar
D. Untuk membuat drawer menu

**Jawaban: B**

---

## Soal 3

Bagaimana cara mengirim parameter dari satu screen ke screen lain menggunakan Stack Navigation?

A. `navigation.navigate('Details', { id: 1 })`
B. `navigation.send('Details', id: 1)`
C. `navigation.push({ screen: 'Details', params: { id: 1 } })`
D. `navigation.goto('Details', id: 1)`

**Jawaban: A**

---

## Soal 4

Bagaimana cara mengakses parameter yang dikirim ke sebuah screen?

A. `navigation.params.itemId`
B. `route.params.itemId`
C. `props.params.itemId`
D. `screen.params.itemId`

**Jawaban: B**

---

## Soal 5

Apa fungsi dari `navigation.goBack()` pada Stack Navigation?

A. Kembali ke screen pertama
B. Menutup aplikasi
C. Kembali ke screen sebelumnya dalam stack
D. Refresh screen saat ini

**Jawaban: C**

---

## Soal 6

Berapa jumlah tab yang ideal untuk Bottom Tab Navigation?

A. 1-2 tab
B. 3-5 tab
C. 6-8 tab
D. Tidak terbatas

**Jawaban: B**

---

## Soal 7

Library apa yang digunakan untuk menambahkan icons pada Tab Navigator?

A. react-native-icons
B. @expo/vector-icons
C. react-icons
D. icon-library

**Jawaban: B**

---

## Soal 8

Bagaimana cara menyembunyikan header pada screen tertentu dalam Stack Navigator?

A. `options={{ hideHeader: true }}`
B. `options={{ header: false }}`
C. `options={{ headerShown: false }}`
D. `options={{ showHeader: false }}`

**Jawaban: C**

---

## Soal 9

Apa yang harus ditambahkan di babel.config.js untuk menggunakan Drawer Navigation?

A. `react-navigation/plugin`
B. `react-native-reanimated/plugin`
C. `drawer-navigation/plugin`
D. `gesture-handler/plugin`

**Jawaban: B**

---

## Soal 10

Berapa level maksimum nesting navigator yang direkomendasikan sebagai best practice?

A. 1 level
B. 2 level
C. 3 level
D. 5 level

**Jawaban: C**

---

**Selamat! Anda telah menyelesaikan materi Navigasi pada React Native** 🎉
