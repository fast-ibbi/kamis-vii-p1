---
title: Navigasi dengan Expo Router (File-based Routing)
version: 1.0.0
header: Navigasi dengan Expo Router (File-based Routing)
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Navigasi dengan Expo Router (File-based Routing)**

---

# Pengenalan Expo Router

---

## **Apa itu Expo Router?**

Expo Router adalah sistem navigasi berbasis file (file-based routing) untuk React Native. Mirip dengan Next.js untuk web, Expo Router menggunakan struktur folder sebagai routing system. Setiap file dalam folder `app` otomatis menjadi route/halaman. Ini membuat navigasi lebih intuitif dan mudah dipahami.

---

## **Keunggulan File-based Routing**

- **Intuitif**: Struktur folder = struktur navigasi
- **Auto-completion**: IDE dapat autocomplete route names
- **Type-safe**: TypeScript support untuk routing
- **Deep linking**: Built-in support untuk universal links
- **SEO Friendly**: Mendukung web dengan URL yang baik
- **Less boilerplate**: Tidak perlu setup navigator secara manual

---

## **Perbandingan dengan React Navigation**

| Feature        | Expo Router    | React Navigation     |
| -------------- | -------------- | -------------------- |
| Setup          | File structure | Manual configuration |
| Routes         | Auto-generated | Manual definition    |
| Deep linking   | Built-in       | Requires setup       |
| Web support    | Native         | Requires config      |
| Learning curve | Mudah          | Sedang               |
| Flexibility    | Tinggi         | Sangat tinggi        |

---

## **Struktur Folder App Directory**

```
app/
├── _layout.tsx        # Root layout
├── index.tsx          # Home screen (/)
├── about.tsx          # About screen (/about)
├── (tabs)/            # Tab navigation group
│   ├── _layout.tsx
│   ├── index.tsx      # Tab home
│   └── profile.tsx    # Tab profile
└── [id].tsx           # Dynamic route (/123)
```

Setiap file dalam folder `app` adalah sebuah screen/route.

---

## **Root Layout (\_layout.tsx)**

```typescript
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
    </Stack>
  );
}
```

Root layout mengatur navigasi untuk seluruh aplikasi.

---

# Stack Navigation dengan Expo Router

---

## **Stack Navigation secara Default**

Expo Router menggunakan Stack Navigation sebagai default. Setiap file di root `app` directory otomatis menjadi stack screen. Tidak perlu import atau setup Stack Navigator secara manual seperti di React Navigation.

---

## **Membuat Screen Pertama (app/index.tsx)**

```typescript
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text>Selamat datang di aplikasi Expo Router</Text>

      <Link href="/about" style={styles.link}>
        <Text style={styles.linkText}>Go to About</Text>
      </Link>
    </View>
  );
}
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#6200ee",
    borderRadius: 5,
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
```

---

## **Navigasi dengan Link Component**

```typescript
import { Link } from "expo-router";

// Navigasi sederhana
<Link href="/about">Go to About</Link>

// Dengan style
<Link href="/profile" style={styles.link}>
  <Text style={styles.linkText}>View Profile</Text>
</Link>

// Dengan parameter
<Link href={{ pathname: "/details", params: { id: "123" } }}>
  View Details
</Link>
```

---

## **Navigasi Programmatic dengan useRouter**

```typescript
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Go to Details" onPress={() => router.push("/details")} />

      <Button title="Go to Profile" onPress={() => router.push("/profile")} />

      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
```

---

## **Dynamic Routes (app/[id].tsx)**

Buat file dengan nama dalam kurung siku untuk dynamic route:

```typescript
// File: app/user/[id].tsx
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Detail</Text>
      <Text>User ID: {id}</Text>
    </View>
  );
}
```

Akses route: `/user/123` akan menampilkan User ID: 123

---

## **Passing dan Mengakses Parameters**

```typescript
// Mengirim parameter menggunakan router.push
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const goToDetails = () => {
    router.push({
      pathname: "/details",
      params: {
        id: "123",
        name: "React Native Course",
        price: "150000",
      },
    });
  };

  return <Button title="View Details" onPress={goToDetails} />;
}
```

---

```typescript
// Menerima parameter menggunakan useLocalSearchParams
// File: app/details.tsx
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { id, name, price } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Item ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Text>Price: Rp {price}</Text>
    </View>
  );
}
```

---

## **Kustomisasi Header di \_layout.tsx**

```typescript
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
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
      <Stack.Screen name="index" options={{ title: "Beranda" }} />
      <Stack.Screen name="details" options={{ title: "Detail Produk" }} />
      <Stack.Screen
        name="about"
        options={{
          title: "Tentang",
          headerShown: false, // Sembunyikan header
        }}
      />
    </Stack>
  );
}
```

---

## **Header dengan Action Buttons**

```typescript
import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/settings")}>
              <Text style={{ color: "#fff", marginRight: 10 }}>Settings</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
```

---

# Tab Navigation dengan Expo Router

---

## **Tab Navigation menggunakan Groups**

Expo Router menggunakan folder dengan tanda kurung untuk membuat tab navigation. Folder `(tabs)` akan otomatis menjadi tab navigator.

```
app/
├── _layout.tsx
├── (tabs)/
│   ├── _layout.tsx    # Tab configuration
│   ├── index.tsx      # Tab 1: Home
│   ├── search.tsx     # Tab 2: Search
│   └── profile.tsx    # Tab 3: Profile
```

---

## **Membuat Tab Layout (app/(tabs)/\_layout.tsx)**

```typescript
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## **Tab Screen (app/(tabs)/index.tsx)**

```typescript
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Tab</Text>
      <Text>This is the home tab</Text>

      <Link href="/details" style={styles.link}>
        <Text style={styles.linkText}>Go to Details</Text>
      </Link>
    </View>
  );
}
```

---

```javascript
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
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#6200ee",
    borderRadius: 5,
  },
  linkText: {
    color: "#fff",
  },
});
```

---

## **Kustomisasi Tab Bar**

```typescript
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
      }}
    >
      {/* Tab screens */}
    </Tabs>
  );
}
```

---

## **Badge pada Tab Icons**

```typescript
<Tabs.Screen
  name="notifications"
  options={{
    title: "Notifications",
    tabBarBadge: 3,
    tabBarBadgeStyle: { backgroundColor: "red" },
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="notifications" size={size} color={color} />
    ),
  }}
/>
```

---

## **Nested Navigation: Tab dengan Stack**

```
app/
├── _layout.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx          # Home tab
│   ├── home/
│   │   ├── details.tsx    # Stack inside home tab
│   │   └── settings.tsx
│   └── profile.tsx
```

---

```typescript
// File: app/(tabs)/home/details.tsx
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function HomeDetails() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Home Details (dalam tab)</Text>
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}
```

---

# Drawer Navigation dengan Expo Router

---

## **Drawer Navigation menggunakan Groups**

Drawer navigation dibuat menggunakan folder dengan prefix `+html`, atau dengan Drawer component dari expo-router. Struktur folder:

```
app/
├── _layout.tsx
├── +not-found.tsx
└── (drawer)/
    ├── _layout.tsx     # Drawer configuration
    ├── index.tsx       # Home
    ├── settings.tsx    # Settings
    └── about.tsx       # About
```

---

## **Instalasi Dependencies untuk Drawer**

```bash
npx expo install react-native-gesture-handler react-native-reanimated
```

Update `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

---

## **Membuat Drawer Layout**

```typescript
// File: app/(drawer)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: "#6200ee",
        drawerInactiveTintColor: "gray",
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "About",
          title: "About",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}
```

---

## **Custom Drawer Content**

```typescript
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";

function CustomDrawerContent(props: any) {
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
```

---

```javascript
const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: "#6200ee",
    alignItems: "center",
    marginBottom: 10,
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
    marginTop: 10,
  },
  version: {
    color: "gray",
    fontSize: 12,
  },
});
```

---

## **Menggunakan Custom Drawer**

```typescript
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#6200ee",
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
```

---

## **Membuka Drawer Secara Programmatic**

```typescript
import { View, Button } from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      <Button title="Open Drawer" onPress={openDrawer} />
      <Button title="Close Drawer" onPress={closeDrawer} />
      <Button title="Toggle Drawer" onPress={toggleDrawer} />
    </View>
  );
}
```

---

# Kombinasi Navigation Patterns

---

## **Struktur Folder untuk Kombinasi Tab + Stack + Drawer**

```
app/
├── _layout.tsx              # Root layout (Drawer)
├── (drawer)/
│   ├── _layout.tsx          # Drawer config
│   ├── (tabs)/              # Tab navigation
│   │   ├── _layout.tsx      # Tab config
│   │   ├── index.tsx        # Home tab
│   │   ├── search.tsx       # Search tab
│   │   ├── profile/         # Profile stack
│   │   │   ├── index.tsx
│   │   │   └── edit.tsx
│   ├── settings.tsx         # Settings (drawer item)
│   └── about.tsx            # About (drawer item)
```

---

## **Root Layout dengan Drawer**

```typescript
// File: app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}
```

---

## **Drawer Layout**

```typescript
// File: app/(drawer)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Main App",
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="apps" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
```

---

## **Tab Layout di dalam Drawer**

```typescript
// File: app/(drawer)/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
```

---

## Quiz

---

## Soal 1

Apa keunggulan utama dari Expo Router dibandingkan React Navigation tradisional?

A. Lebih cepat dalam rendering
B. File-based routing yang lebih intuitif
C. Ukuran bundle yang lebih kecil
D. Support lebih banyak platform

<!-- **Jawaban: B** -->

---

## Soal 2

Di mana file-file screen/route ditempatkan dalam Expo Router?

A. Di folder `src`
B. Di folder `screens`
C. Di folder `app`
D. Di folder `routes`

<!-- **Jawaban: C** -->

---

## Soal 3

Bagaimana cara membuat dynamic route di Expo Router?

A. Membuat file dengan nama `dynamic.tsx`
B. Membuat file dengan nama `[id].tsx`
C. Membuat file dengan nama `{id}.tsx`
D. Membuat file dengan nama `<id>.tsx`

<!-- **Jawaban: B** -->

---

## Soal 4

Component apa yang digunakan untuk navigasi deklaratif di Expo Router?

A. `<Navigate>`
B. `<Router>`
C. `<Link>`
D. `<Navigation>`

<!-- **Jawaban: C** -->

---

## Soal 5

Hook apa yang digunakan untuk navigasi programmatic di Expo Router?

A. `useNavigation()`
B. `useRouter()`
C. `useRoute()`
D. `useNavigate()`

<!-- **Jawaban: B** -->

---

## Soal 6

Bagaimana cara membuat tab navigation di Expo Router?

A. Menggunakan file `tabs.tsx`
B. Menggunakan folder dengan nama `(tabs)`
C. Menggunakan component `<Tabs>`
D. Import dari `@react-navigation/tabs`

<!-- **Jawaban: B** -->

---

## Soal 7

Hook apa yang digunakan untuk mengakses parameter route di Expo Router?

A. `useParams()`
B. `useRouteParams()`
C. `useLocalSearchParams()`
D. `useSearchParams()`

<!-- **Jawaban: C** -->

---

## Soal 8

File apa yang digunakan untuk konfigurasi layout dalam Expo Router?

A. `config.tsx`
B. `layout.tsx`
C. `_layout.tsx`
D. `index.tsx`

<!-- **Jawaban: C** -->

---

## Soal 9

Bagaimana cara mengakses drawer navigation secara programmatic di Expo Router?

A. `navigation.openDrawer()`
B. `navigation.dispatch(DrawerActions.openDrawer())`
C. `router.push('/drawer')`
D. `drawer.open()`

<!-- **Jawaban: B** -->

---

## Soal 10

Apa kegunaan dari folder groups dengan tanda kurung seperti `(tabs)` atau `(drawer)` di Expo Router?

A. Untuk membuat route tersembunyi
B. Untuk grouping layout tanpa menambah path segment di URL
C. Untuk membuat nested folders
D. Untuk membuat dynamic routes

<!-- **Jawaban: B** -->
