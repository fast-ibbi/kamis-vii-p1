# Latihan Praktek Pertemuan 6: Navigasi pada React Native (Stack, Tab, Drawer)

## Petunjuk Umum

- Setiap soal dibuat dalam project terpisah atau dalam satu project dengan struktur folder yang jelas
- Gunakan Expo CLI untuk memudahkan setup: `npx create-expo-app nama-project`
- Install dependencies yang diperlukan (React Navigation dan library pendukung)
- Test setiap fitur navigasi untuk memastikan berfungsi dengan baik
- Perhatikan user experience dan animasi transisi

---

## Setup Awal

Sebelum mengerjakan soal, install dependencies yang diperlukan:

```bash
# Install core library
npm install @react-navigation/native

# Install dependencies untuk Expo
npx expo install react-native-screens react-native-safe-area-context

# Install navigator yang dibutuhkan
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer

# Install dependencies drawer
npx expo install react-native-gesture-handler react-native-reanimated

# Install icons
npx expo install @expo/vector-icons
```

Tambahkan plugin di `babel.config.js`:

```javascript
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: ["react-native-reanimated/plugin"],
};
```

---

## Soal 1: Implementasi Stack Navigation Sederhana

Buatlah aplikasi dengan Stack Navigation yang memiliki 3 screen:

1. **HomeScreen**: Tampilan welcome dengan tombol navigate ke About dan Contact
2. **AboutScreen**: Halaman about dengan deskripsi aplikasi dan tombol back
3. **ContactScreen**: Halaman contact dengan form sederhana

**Spesifikasi:**

- Gunakan `@react-navigation/native-stack`
- Setiap screen memiliki header yang dapat dikustomisasi
- HomeScreen memiliki 2 tombol untuk navigate ke screen lain
- AboutScreen dan ContactScreen memiliki tombol back
- Tambahkan styling yang menarik pada setiap screen

**Komponen yang harus dibuat:**

- App.js (setup NavigationContainer dan Stack.Navigator)
- screens/HomeScreen.js
- screens/AboutScreen.js
- screens/ContactScreen.js

---

## Soal 2: Passing Data Antar Screen

Buatlah aplikasi product catalog dengan fitur:

1. **ProductListScreen**: Menampilkan list produk (minimal 5 produk)
2. **ProductDetailScreen**: Menampilkan detail produk yang dipilih

**Spesifikasi:**

- Setiap produk memiliki: id, nama, harga, deskripsi, dan gambar (gunakan placeholder)
- Ketika produk diklik, navigate ke detail dan kirim data produk
- DetailScreen menampilkan semua informasi produk
- Tambahkan tombol "Add to Cart" di detail screen
- Gunakan FlatList untuk render list produk
- Styling card product yang menarik

**Data yang dikirim:**

```javascript
{
  id: 1,
  name: "Product Name",
  price: 150000,
  description: "Product description here",
  image: "url"
}
```

---

## Soal 3: Kustomisasi Header Stack Navigator

Buatlah aplikasi dengan Stack Navigation yang memiliki header custom:

1. **HomeScreen**: Header dengan background gradient (simulasi dengan warna solid)
2. **ProfileScreen**: Header dengan button "Edit" di kanan
3. **SettingsScreen**: Header dengan icon settings dan tanpa back button text

**Spesifikasi:**

- Kustomisasi `headerStyle`, `headerTintColor`, `headerTitleStyle`
- Tambahkan `headerRight` button di ProfileScreen
- Gunakan `headerLeft` untuk custom back button
- Tambahkan `headerTitle` dengan custom component
- Header height dan shadow dapat dikustomisasi
- Setiap screen memiliki styling header yang berbeda

**Bonus:**

- Implementasikan animated header
- Tambahkan search bar di header

---

## Soal 4: Bottom Tab Navigation dengan Icons

Buatlah aplikasi dengan Bottom Tab Navigation yang memiliki 4 tabs:

1. **Home**: Icon home, menampilkan dashboard
2. **Search**: Icon search, menampilkan search bar
3. **Favorites**: Icon heart, menampilkan favorite items
4. **Profile**: Icon person, menampilkan user profile

**Spesifikasi:**

- Gunakan `@expo/vector-icons` (Ionicons)
- Icon berubah (outline/filled) sesuai active state
- Kustomisasi `tabBarActiveTintColor` dan `tabBarInactiveTintColor`
- Tambahkan label di bawah icon
- Styling tab bar dengan shadow dan border
- Tab bar height minimal 60px

**Icons yang digunakan:**

- Home: home/home-outline
- Search: search/search-outline
- Favorites: heart/heart-outline
- Profile: person/person-outline

---

## Soal 5: Tab Navigation dengan Badge Notification

Buatlah aplikasi e-commerce dengan tab navigation yang menampilkan badge:

1. **Home Tab**: Badge menampilkan jumlah promo aktif
2. **Cart Tab**: Badge menampilkan jumlah item di cart
3. **Notifications Tab**: Badge menampilkan jumlah notifikasi belum dibaca
4. **Account Tab**: Tanpa badge

**Spesifikasi:**

- Gunakan state management untuk mengelola jumlah badge
- Badge dapat diupdate dengan tombol (simulasi add to cart, dll)
- Badge hilang ketika jumlah = 0
- Kustomisasi warna dan style badge
- Implementasikan counter logic yang benar

**Fungsi yang harus ada:**

- Tambah item ke cart (badge cart bertambah)
- Mark notification as read (badge berkurang)
- Clear all notifications

---

## Soal 6: Kombinasi Stack dan Tab Navigation

Buatlah aplikasi dengan struktur navigasi kompleks:

**Struktur:**

```
Tab Navigator (Bottom)
├── Home Tab (Stack)
│   ├── HomeScreen
│   └── DetailsScreen
├── Search Tab (Stack)
│   ├── SearchScreen
│   └── ResultScreen
└── Profile Tab (Stack)
    ├── ProfileScreen
    ├── EditProfileScreen
    └── SettingsScreen
```

**Spesifikasi:**

- Setiap tab memiliki stack navigator sendiri
- Navigasi dalam stack tidak menghilangkan tab bar
- Back button berfungsi dengan benar di setiap stack
- Header title disesuaikan per screen
- Tab icons dengan active state
- Implementasikan deep navigation (Home → Details → Profile)

**Tips:**

- Buat file terpisah untuk setiap StackNavigator
- Gunakan `headerShown: false` pada tab screen untuk menghindari double header

---

## Soal 7: Drawer Navigation (Side Menu)

Buatlah aplikasi dengan Drawer Navigation yang memiliki:

**Menu Items:**

1. Dashboard
2. Profile
3. Settings
4. Notifications
5. Help & Support
6. Logout (dengan confirmation alert)

**Spesifikasi:**

- Setiap menu memiliki icon yang sesuai
- Drawer header menampilkan profile picture, nama, dan email
- Drawer footer menampilkan version number
- Kustomisasi drawer content dengan styling menarik
- Drawer width minimal 280px
- Active menu item highlighted dengan background color
- Implementasikan logout confirmation

**Drawer Header harus menampilkan:**

- Profile image (gunakan placeholder)
- User name
- Email
- Background dengan warna atau gradient

---

## Soal 8: Custom Drawer Content

Buatlah aplikasi dengan custom drawer yang memiliki fitur tambahan:

**Fitur Custom Drawer:**

1. Profile section dengan avatar dan info user
2. Menu items dengan icons dan labels
3. Divider line antara section
4. Theme switcher (Light/Dark mode button)
5. Logout button dengan icon di footer
6. App version di bawah logout

**Spesifikasi:**

- Gunakan `DrawerContentScrollView`
- Implementasikan custom component untuk drawer
- Tambahkan `DrawerItemList` untuk menu default
- Custom styling untuk setiap section
- Implementasikan switch untuk dark mode (UI only)
- Animasi smooth saat drawer dibuka/ditutup

**Struktur Drawer:**

```
┌─────────────────────┐
│  Profile Section    │
│  Avatar + Name      │
├─────────────────────┤
│  Home              │
│  My Orders         │
│  Wishlist          │
├─────────────────────┤
│  Settings          │
│  Help Center       │
├─────────────────────┤
│  Theme Switcher    │
│  Logout Button     │
│  Version 1.0.0     │
└─────────────────────┘
```

---

## Soal 9: Kombinasi Stack, Tab, dan Drawer

Buatlah aplikasi lengkap dengan kombinasi semua jenis navigator:

**Struktur Navigasi:**

```
Drawer Navigator
├── Main App (Tab Navigator)
│   ├── Home Tab (Stack)
│   │   ├── HomeScreen
│   │   └── NewsDetailScreen
│   ├── Explore Tab (Stack)
│   │   ├── ExploreScreen
│   │   └── CategoryScreen
│   └── Profile Tab (Stack)
│       ├── ProfileScreen
│       └── EditProfileScreen
├── Settings (Single Screen)
├── Notifications (Single Screen)
└── About (Single Screen)
```

**Spesifikasi:**

- Drawer sebagai root navigator
- Tab navigator di dalam drawer untuk main app flow
- Stack navigator di setiap tab untuk detail navigation
- Header dengan hamburger menu icon untuk buka drawer
- Tab bar hanya muncul di main app, hilang di drawer screens
- Navigasi seamless antar semua navigator
- Proper back handling di setiap level

**Fitur tambahan:**

- Drawer toggle dari header button
- Badge notification pada tab dan drawer menu
- Custom header title per screen

---

## Soal 10: Mini Project - Social Media App Navigation

Buatlah struktur navigasi lengkap untuk aplikasi social media dengan fitur:

**Screens yang harus dibuat:**

1. **Auth Flow (Stack)**

   - SplashScreen (headerShown: false)
   - LoginScreen (headerShown: false)
   - RegisterScreen (headerShown: false)

2. **Main Flow (Drawer → Tab → Stack)**

   - **Home Tab**: Feed → Post Detail → User Profile → Comments
   - **Search Tab**: Search → Search Results → User Profile
   - **Add Post Tab**: Create Post (Modal atau separate screen)
   - **Notifications Tab**: Notification List → Notification Detail
   - **Profile Tab**: My Profile → Edit Profile → Settings

3. **Drawer Menu:**
   - Saved Posts
   - Archived
   - Settings
   - Help & Privacy
   - Logout

**Spesifikasi:**

- Conditional navigation (show auth atau main based on login status)
- Proper screen transitions dan animations
- Header dengan actions (search icon, menu icon, create post icon)
- Tab bar dengan 5 items dan custom styling
- Badge pada notifications tab
- Modal untuk create post atau confirmation dialogs
- Deep linking capability structure

**Challenge:**

- Implementasikan navigation ref untuk navigate dari luar component
- Implementasikan screen tracking untuk analytics
- Handle Android back button properly
- Persist navigation state

**File Structure:**

```
src/
├── navigation/
│   ├── AppNavigator.js
│   ├── AuthNavigator.js
│   ├── MainNavigator.js
│   ├── DrawerNavigator.js
│   ├── TabNavigator.js
│   └── StackNavigators/
│       ├── HomeStack.js
│       ├── SearchStack.js
│       ├── NotificationStack.js
│       └── ProfileStack.js
├── screens/
│   ├── Auth/
│   ├── Home/
│   ├── Search/
│   ├── Notifications/
│   └── Profile/
└── components/
    └── CustomDrawerContent.js
```

---

## Tips Pengerjaan

1. **Setup Project**: Gunakan Expo untuk kemudahan development
2. **Install Dependencies**: Install semua library yang dibutuhkan sebelum mulai coding
3. **Structure First**: Rencanakan struktur navigasi sebelum coding
4. **Test Incrementally**: Test setiap navigator sebelum menggabungkan
5. **Console Log**: Gunakan console.log untuk debug navigation flow
6. **Navigation DevTools**: Gunakan React Navigation DevTools untuk debugging
7. **Clean Code**: Pisahkan navigator ke file terpisah untuk maintainability
8. **Type Safety**: Pertimbangkan gunakan TypeScript untuk type-safe navigation
9. **Performance**: Lazy load screens yang jarang diakses
10. **User Experience**: Perhatikan animasi dan transition yang smooth

---

## Kriteria Penilaian

- **Fungsionalitas (40%)**: Navigasi bekerja dengan benar, no crashes
- **Struktur Navigasi (25%)**: Proper nesting dan organization
- **UI/UX (20%)**: Tampilan menarik, animasi smooth, intuitive navigation
- **Code Quality (15%)**: Clean code, proper file structure, reusable components

---

## Resources

- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Expo Vector Icons](https://icons.expo.fyi/)
- [React Navigation Examples](https://github.com/react-navigation/react-navigation/tree/main/example)

---

## Submission

- Simpan semua project dalam folder `praktek/pertemuan-6/`
- Setiap soal dalam folder terpisah: `soal-1/`, `soal-2/`, dst.
- Tambahkan README.md di setiap folder soal dengan cara menjalankan
- (Optional) Screenshot atau video demo navigasi
- Push ke repository Git masing-masing

**Deadline:** [Sesuaikan dengan jadwal kelas]

**Selamat Mengerjakan! Happy Coding! 🚀📱**
