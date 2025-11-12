# Latihan Praktek Pertemuan 6: Navigasi dengan Expo Router (File-based Routing)

## Petunjuk Umum

- Setiap soal dibuat dalam project terpisah menggunakan Expo Router
- Gunakan file-based routing dengan struktur folder `app/`
- Manfaatkan fitur layout groups untuk tab dan drawer navigation
- Test setiap fitur navigasi untuk memastikan berfungsi dengan baik
- Perhatikan user experience dan animasi transisi

---

## Setup Awal

Sebelum mengerjakan soal, buat project baru dengan Expo Router:

```bash
# Membuat project baru dengan template tabs (recommended)
npx create-expo-app@latest nama-project --template tabs

# Atau dari blank project
npx create-expo-app@latest nama-project
cd nama-project

# Install Expo Router dan dependencies
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# Install dependencies untuk drawer navigation
npx expo install react-native-gesture-handler react-native-reanimated

# Install icons
npx expo install @expo/vector-icons
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

Update `app.json`:

```json
{
  "expo": {
    "scheme": "myapp",
    "plugins": ["expo-router"]
  }
}
```

---

## Soal 1: Implementasi Stack Navigation Sederhana dengan Expo Router

Buatlah aplikasi dengan Stack Navigation yang memiliki 3 screen:

1. **Home (index)**: Tampilan welcome dengan link navigate ke About dan Contact
2. **About**: Halaman about dengan deskripsi aplikasi dan tombol back
3. **Contact**: Halaman contact dengan form sederhana

**Struktur Folder:**

```
app/
├── _layout.tsx          # Root layout dengan Stack
├── index.tsx            # Home screen
├── about.tsx            # About screen
└── contact.tsx          # Contact screen
```

**Spesifikasi:**

- Gunakan `<Link>` component untuk navigasi deklaratif
- Gunakan `useRouter()` hook untuk navigasi programmatic
- Setiap screen memiliki header yang dapat dikustomisasi di `_layout.tsx`
- Home screen memiliki 2 link/button untuk navigate ke screen lain
- About dan Contact screen memiliki tombol back
- Tambahkan styling yang menarik pada setiap screen

**Contoh `_layout.tsx`:**

```typescript
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6200ee" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="about" options={{ title: "About Us" }} />
      <Stack.Screen name="contact" options={{ title: "Contact" }} />
    </Stack>
  );
}
```

---

## Soal 2: Passing Data Antar Screen dengan Dynamic Routes

Buatlah aplikasi product catalog dengan fitur:

1. **Product List**: Menampilkan list produk (minimal 5 produk)
2. **Product Detail**: Menampilkan detail produk yang dipilih (Dynamic Route)

**Struktur Folder:**

```
app/
├── _layout.tsx
├── index.tsx              # Product List
└── product/
    └── [id].tsx           # Dynamic route untuk detail
```

**Spesifikasi:**

- Setiap produk memiliki: id, nama, harga, deskripsi, dan gambar (gunakan placeholder)
- Ketika produk diklik, navigate ke `/product/[id]` dengan parameter
- Gunakan `useLocalSearchParams()` untuk mengakses parameter di detail screen
- DetailScreen menampilkan semua informasi produk
- Tambahkan tombol "Add to Cart" di detail screen
- Gunakan FlatList untuk render list produk
- Styling card product yang menarik

**Contoh navigasi:**

```typescript
// Di Product List (index.tsx)
import { Link } from "expo-router";

<Link
  href={{
    pathname: "/product/[id]",
    params: {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
    },
  }}
>
  View Details
</Link>;

// Di Product Detail ([id].tsx)
import { useLocalSearchParams } from "expo-router";

const { id, name, price, description } = useLocalSearchParams();
```

---

## Soal 3: Kustomisasi Header dengan Expo Router

Buatlah aplikasi dengan Stack Navigation yang memiliki header custom:

1. **Home**: Header dengan background warna custom
2. **Profile**: Header dengan button "Edit" di kanan
3. **Settings**: Header dengan icon settings dan custom styling

**Struktur Folder:**

```
app/
├── _layout.tsx
├── index.tsx
├── profile.tsx
└── settings.tsx
```

**Spesifikasi:**

- Kustomisasi header di `_layout.tsx` menggunakan `screenOptions`
- Tambahkan `headerRight` button di Profile screen
- Gunakan `headerLeft` untuk custom back button (opsional)
- Setiap screen memiliki styling header yang berbeda
- Kustomisasi `headerStyle`, `headerTintColor`, `headerTitleStyle`

**Contoh \_layout.tsx:**

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
          headerStyle: { backgroundColor: "#6200ee" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: "#03dac6" },
          headerTintColor: "#000",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/edit-profile")}>
              <Text style={{ color: "#000", marginRight: 15 }}>Edit</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
```

**Bonus:**

- Implementasikan animated header dengan `useLayoutEffect`
- Tambahkan search bar di header

---

## Soal 4: Bottom Tab Navigation dengan Expo Router

Buatlah aplikasi dengan Bottom Tab Navigation yang memiliki 4 tabs:

1. **Home**: Icon home, menampilkan dashboard
2. **Search**: Icon search, menampilkan search bar
3. **Favorites**: Icon heart, menampilkan favorite items
4. **Profile**: Icon person, menampilkan user profile

**Struktur Folder:**

```
app/
├── _layout.tsx           # Root layout
└── (tabs)/
    ├── _layout.tsx       # Tab configuration
    ├── index.tsx         # Home tab
    ├── search.tsx        # Search tab
    ├── favorites.tsx     # Favorites tab
    └── profile.tsx       # Profile tab
```

**Spesifikasi:**

- Gunakan folder groups `(tabs)` untuk tab navigation
- Gunakan `@expo/vector-icons` (Ionicons)
- Icon berubah (outline/filled) sesuai active state
- Kustomisasi `tabBarActiveTintColor` dan `tabBarInactiveTintColor`
- Tambahkan label di bawah icon
- Styling tab bar dengan shadow dan border
- Tab bar height minimal 60px

**Contoh (tabs)/\_layout.tsx:**

```typescript
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      {/* Tambahkan tab lainnya */}
    </Tabs>
  );
}
```

---

## Soal 5: Tab Navigation dengan Badge Notification

Buatlah aplikasi e-commerce dengan tab navigation yang menampilkan badge:

1. **Home Tab**: Badge menampilkan jumlah promo aktif
2. **Cart Tab**: Badge menampilkan jumlah item di cart
3. **Notifications Tab**: Badge menampilkan jumlah notifikasi belum dibaca
4. **Account Tab**: Tanpa badge

**Struktur Folder:**

```
app/
├── _layout.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx         # Home
    ├── cart.tsx          # Cart
    ├── notifications.tsx # Notifications
    └── account.tsx       # Account
```

**Spesifikasi:**

- Gunakan React state atau Context API untuk mengelola jumlah badge
- Badge dapat diupdate dengan tombol (simulasi add to cart, dll)
- Badge hilang ketika jumlah = 0
- Kustomisasi warna dan style badge menggunakan `tabBarBadge` dan `tabBarBadgeStyle`
- Implementasikan counter logic yang benar

**Contoh implementasi badge:**

```typescript
import { Tabs } from "expo-router";
import { useState } from "react";

export default function TabLayout() {
  const [cartCount, setCartCount] = useState(3);
  const [notifCount, setNotifCount] = useState(5);

  return (
    <Tabs>
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: { backgroundColor: "red" },
        }}
      />
      {/* Tab lainnya */}
    </Tabs>
  );
}
```

**Fungsi yang harus ada:**

- Tambah item ke cart (badge cart bertambah)
- Mark notification as read (badge berkurang)
- Clear all notifications

---

## Soal 6: Kombinasi Stack dan Tab Navigation dengan Expo Router

Buatlah aplikasi dengan struktur navigasi kompleks menggunakan nested folders:

**Struktur Folder:**

```
app/
├── _layout.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx              # Home tab root
    ├── home/
    │   └── details.tsx        # Home details (stack)
    ├── search.tsx             # Search tab root
    ├── search/
    │   └── results.tsx        # Search results (stack)
    ├── profile.tsx            # Profile tab root
    └── profile/
        ├── edit.tsx           # Edit profile (stack)
        └── settings.tsx       # Settings (stack)
```

**Spesifikasi:**

- Setiap tab dapat memiliki nested routes (stack navigation)
- Navigasi dalam stack tidak menghilangkan tab bar
- Back button berfungsi dengan benar di setiap stack
- Header title disesuaikan per screen
- Tab icons dengan active state
- Implementasikan deep navigation (Home → Details → Profile)

**Contoh navigasi ke nested route:**

```typescript
// Di Home tab (index.tsx)
import { Link } from "expo-router";

<Link href="/home/details">View Details</Link>;

// Atau dengan router.push
import { useRouter } from "expo-router";
const router = useRouter();
router.push("/home/details");
```

**Tips:**

- Gunakan folder groups `(tabs)` untuk tab navigator
- Nested folders otomatis menjadi stack navigation
- Konfigurasi header di `_layout.tsx` masing-masing folder
- Gunakan `href={null}` di Tabs.Screen untuk menyembunyikan tab tertentu

---

## Soal 7: Drawer Navigation dengan Expo Router

Buatlah aplikasi dengan Drawer Navigation yang memiliki:

**Menu Items:**

1. Dashboard
2. Profile
3. Settings
4. Notifications
5. Help & Support
6. Logout (dengan confirmation alert)

**Struktur Folder:**

```
app/
├── _layout.tsx
└── (drawer)/
    ├── _layout.tsx           # Drawer configuration
    ├── index.tsx             # Dashboard
    ├── profile.tsx           # Profile
    ├── settings.tsx          # Settings
    ├── notifications.tsx     # Notifications
    └── help.tsx              # Help & Support
```

**Spesifikasi:**

- Gunakan folder groups `(drawer)` untuk drawer navigation
- Setiap menu memiliki icon yang sesuai menggunakan Ionicons
- Kustomisasi drawer dengan `screenOptions`
- Active menu item highlighted dengan `drawerActiveTintColor`
- Drawer width minimal 280px
- Implementasikan logout dengan Alert confirmation

**Contoh (drawer)/\_layout.tsx:**

```typescript
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: "#6200ee",
        drawerInactiveTintColor: "gray",
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Tambahkan screen lainnya */}
    </Drawer>
  );
}
```

---

## Soal 8: Custom Drawer Content dengan Expo Router

Buatlah aplikasi dengan custom drawer yang memiliki fitur tambahan:

**Fitur Custom Drawer:**

1. Profile section dengan avatar dan info user
2. Menu items dengan icons dan labels
3. Divider line antara section
4. Theme switcher (Light/Dark mode button)
5. Logout button dengan icon di footer
6. App version di bawah logout

**Struktur Folder:**

```
app/
├── _layout.tsx
├── components/
│   └── CustomDrawerContent.tsx
└── (drawer)/
    ├── _layout.tsx
    ├── index.tsx
    ├── orders.tsx
    ├── wishlist.tsx
    ├── settings.tsx
    └── help.tsx
```

**Spesifikasi:**

- Buat component `CustomDrawerContent.tsx`
- Gunakan `DrawerContentScrollView` dari `@react-navigation/drawer`
- Tambahkan `DrawerItemList` untuk menu default
- Custom styling untuk setiap section
- Implementasikan switch untuk dark mode (UI only)
- Animasi smooth saat drawer dibuka/ditutup

**Contoh CustomDrawerContent.tsx:**

```typescript
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet, Switch } from "react-native";
import { useState } from "react";

export default function CustomDrawerContent(props: any) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john@example.com</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Theme Switcher */}
      <View style={styles.themeSection}>
        <Text>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Version 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}
```

**Gunakan di \_layout.tsx:**

```typescript
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {/* Screens */}
    </Drawer>
  );
}
```

---

## Soal 9: Kombinasi Stack, Tab, dan Drawer dengan Expo Router

Buatlah aplikasi lengkap dengan kombinasi semua jenis navigator:

**Struktur Folder:**

```
app/
├── _layout.tsx                    # Root layout
└── (drawer)/
    ├── _layout.tsx                # Drawer layout
    ├── (tabs)/                    # Tab Navigator
    │   ├── _layout.tsx            # Tab layout
    │   ├── index.tsx              # Home tab root
    │   ├── home/
    │   │   └── [id].tsx           # News detail (stack)
    │   ├── explore.tsx            # Explore tab root
    │   ├── explore/
    │   │   └── category.tsx       # Category (stack)
    │   ├── profile.tsx            # Profile tab root
    │   └── profile/
    │       └── edit.tsx           # Edit profile (stack)
    ├── settings.tsx               # Drawer item
    ├── notifications.tsx          # Drawer item
    └── about.tsx                  # Drawer item
```

**Spesifikasi:**

- Drawer sebagai root navigator menggunakan folder `(drawer)`
- Tab navigator di dalam drawer menggunakan folder `(tabs)`
- Stack navigator di setiap tab menggunakan nested folders
- Header dengan hamburger menu icon untuk buka drawer
- Tab bar hanya muncul di screens dalam `(tabs)`, hilang di drawer screens
- Navigasi seamless antar semua navigator
- Proper back handling di setiap level

**Contoh membuka drawer dari header:**

```typescript
// Di (tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={24}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ marginLeft: 15 }}
          />
        ),
      }}
    >
      {/* Tabs */}
    </Tabs>
  );
}
```

**Fitur tambahan:**

- Drawer toggle dari header button
- Badge notification pada tab dan drawer menu
- Custom header title per screen

---

## Soal 10: Mini Project - Social Media App Navigation dengan Expo Router

Buatlah struktur navigasi lengkap untuk aplikasi social media dengan fitur:

**Struktur Folder:**

```
app/
├── _layout.tsx                           # Root layout
├── index.tsx                             # Splash/Landing
├── (auth)/                               # Auth group
│   ├── _layout.tsx                       # Auth layout (no header)
│   ├── login.tsx
│   └── register.tsx
└── (main)/                               # Main app group
    └── (drawer)/                         # Drawer navigation
        ├── _layout.tsx                   # Drawer config
        ├── (tabs)/                       # Tab navigation
        │   ├── _layout.tsx               # Tab config
        │   ├── index.tsx                 # Home feed
        │   ├── home/
        │   │   ├── post/[id].tsx         # Post detail
        │   │   ├── user/[id].tsx         # User profile
        │   │   └── comments/[postId].tsx # Comments
        │   ├── search.tsx                # Search
        │   ├── search/
        │   │   └── results.tsx           # Search results
        │   ├── add.tsx                   # Create post (modal)
        │   ├── notifications.tsx         # Notifications
        │   ├── notifications/
        │   │   └── [id].tsx              # Notification detail
        │   ├── profile.tsx               # My profile
        │   └── profile/
        │       ├── edit.tsx              # Edit profile
        │       └── settings.tsx          # Settings
        ├── saved.tsx                     # Saved posts (drawer)
        ├── archived.tsx                  # Archived (drawer)
        └── help.tsx                      # Help & Privacy (drawer)
```

**Spesifikasi:**

1. **Auth Flow:**

   - Gunakan folder group `(auth)` dengan `headerShown: false`
   - Login dan Register screens
   - Conditional rendering di root layout (auth vs main)

2. **Main Flow:**

   - Drawer → Tab → Stack navigation hierarchy
   - Header dengan hamburger menu, search icon, create post icon
   - Tab bar dengan 5 items (Home, Search, Add, Notifications, Profile)
   - Badge pada notifications tab
   - Modal presentation untuk create post

3. **Features:**
   - Dynamic routes untuk post detail, user profile, comments
   - Deep linking support
   - Proper back navigation handling
   - Custom drawer content dengan profile header

**Contoh Root Layout (\_layout.tsx):**

```typescript
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // In real app, check auth status from AsyncStorage/Context

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(main)" />
      )}
    </Stack>
  );
}
```

**Challenge:**

- Implementasikan Context API untuk auth state management
- Implementasikan screen tracking dengan `useSegments()`
- Handle Android back button dengan `useFocusEffect`
- Persist auth state dengan AsyncStorage
- Implementasikan modal presentation untuk create post dengan `presentation: "modal"`

**Tips:**

- Gunakan folder groups dengan `()` untuk grouping tanpa path segment
- Gunakan `href={null}` untuk hide tab tertentu dari tab bar
- Gunakan `useLocalSearchParams()` untuk dynamic routes
- Gunakan `useRouter()` untuk programmatic navigation

---

## Tips Pengerjaan

1. **Setup Project**: Gunakan `npx create-expo-app --template tabs` untuk quick start
2. **Install Dependencies**: Install semua library yang dibutuhkan sebelum mulai coding
3. **Structure First**: Rencanakan struktur folder `app/` sebelum coding
4. **Test Incrementally**: Test setiap route sebelum membuat nested navigation
5. **Console Log**: Gunakan console.log untuk debug navigation flow dan params
6. **File-based Routing**: Pahami mapping folder structure ke URL routes
7. **Clean Code**: Gunakan TypeScript untuk type-safe navigation
8. **Type Safety**: Gunakan typed routes dengan `expo-router` TypeScript support
9. **Performance**: Lazy load dengan dynamic imports untuk screens berat
10. **User Experience**: Perhatikan animasi dan transition yang smooth

---

## Kriteria Penilaian

- **Fungsionalitas (40%)**: Navigasi bekerja dengan benar, no crashes, params passing correct
- **Struktur Folder (25%)**: Proper folder structure, file naming, dan organization
- **UI/UX (20%)**: Tampilan menarik, animasi smooth, intuitive navigation
- **Code Quality (15%)**: Clean code, TypeScript usage, reusable components

---

## Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Expo Router API Reference](https://docs.expo.dev/router/reference/api/)
- [Expo Vector Icons](https://icons.expo.fyi/)
- [Expo Router Examples](https://github.com/expo/router/tree/main/apps)
- [File-based Routing Guide](https://docs.expo.dev/router/create-pages/)

---

## Submission

- Simpan semua project dalam folder `praktek/pertemuan-6/`
- Setiap soal dalam folder terpisah: `soal-1/`, `soal-2/`, dst.
- Tambahkan README.md di setiap folder soal dengan cara menjalankan
- (Optional) Screenshot atau video demo navigasi
- Push ke repository Git masing-masing

**Deadline:** [Sesuaikan dengan jadwal kelas]

**Selamat Mengerjakan! Happy Coding! 🚀📱**
