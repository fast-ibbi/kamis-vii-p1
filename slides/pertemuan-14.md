---
title: Optimasi Kinerja dan Debugging
version: 1.0.0
header: Optimasi Kinerja dan Debugging
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Optimasi Kinerja dan Debugging**

---

## **Tujuan Pembelajaran Pertemuan**

Setelah pertemuan ini, mahasiswa diharapkan mampu:

- Mengidentifikasi masalah performa dalam aplikasi React Native
- Menggunakan tools debugging untuk menemukan dan memperbaiki bug
- Menerapkan teknik optimasi untuk meningkatkan kinerja aplikasi
- Memahami best practices dalam pengembangan aplikasi React Native

---

## **Mengapa Optimasi Penting dalam Mobile Development**

Optimasi penting karena:

- Perangkat mobile memiliki keterbatasan resource (CPU, RAM, battery)
- User ekspektasi: aplikasi harus responsif dan cepat
- Aplikasi lambat = user uninstall (53% user meninggalkan app yang load > 3 detik)
- Rating app store dipengaruhi performa
- Battery drain berdampak pada user satisfaction

---

## **Dampak Aplikasi Lambat terhadap User Experience**

Konsekuensi aplikasi dengan performa buruk:

- Bounce rate tinggi
- Rating rendah di app store
- Uninstall rate meningkat
- Reputasi developer menurun
- Kehilangan revenue potensial

Contoh metrik ideal:

- Load time: < 2 detik
- Frame rate: 60 FPS
- Memory usage: optimal sesuai device

---

## **Metrik Kinerja Utama (FPS, Memory Usage, Load Time)**

Metrik yang perlu dimonitor:

1. **FPS (Frames Per Second)**: Target 60 FPS untuk animasi smooth
2. **Memory Usage**: Hindari memory leak
3. **Load Time**: Waktu aplikasi mulai hingga siap digunakan
4. **Bundle Size**: Ukuran file aplikasi
5. **API Response Time**: Kecepatan fetch data

---

### Debugging di React Native

---

## **Pengenalan Debugging dalam React Native**

Debugging adalah proses menemukan dan memperbaiki bug dalam kode. Dalam React Native, kita memiliki beberapa layer debugging:

- JavaScript layer
- Native layer (Android/iOS)
- Network layer
- State management layer

---

## **Tools Debugging yang Tersedia di Expo**

Tools debugging di Expo:

1. Expo Developer Menu
2. Chrome DevTools
3. React DevTools
4. Console logging
5. Expo Go App
6. Error Boundaries
7. Network inspector

---

## **Expo Developer Menu (Shake Gesture)**

Developer Menu dapat diakses dengan:

- Shake device (physical device)
- Cmd+D (iOS simulator)
- Cmd+M (Android emulator)

Menu options:

- Reload: Restart aplikasi
- Debug Remote JS: Buka Chrome DevTools
- Show Performance Monitor: Lihat FPS dan memory
- Toggle Element Inspector: Inspect UI elements

---

## **Remote Debugging dengan Chrome DevTools**

Aktifkan remote debugging untuk akses Chrome DevTools:

```javascript
// Setelah enable "Debug Remote JS" di Developer Menu
// Buka Chrome: http://localhost:19000/debugger-ui

// Console logging
console.log("Debug message");
console.warn("Warning message");
console.error("Error message");

// Breakpoints dapat diset di Chrome DevTools
function calculateTotal(items) {
  debugger; // Execution akan pause di sini
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

---

## **Console Logging Best Practices**

```javascript
// ❌ Bad: Log tanpa konteks
console.log(data);

// ✅ Good: Log dengan label jelas
console.log("User Data:", data);

// ✅ Good: Gunakan console.table untuk array/object
console.table(users);

// ✅ Good: Group related logs
console.group("API Call");
console.log("URL:", url);
console.log("Response:", response);
console.groupEnd();

// ✅ Good: Conditional logging
const DEBUG = __DEV__;
if (DEBUG) {
  console.log("Development mode:", userData);
}

// ✅ Good: Custom logger function
const logger = {
  info: (message, data) => console.log(`[INFO] ${message}`, data),
  error: (message, error) => console.error(`[ERROR] ${message}`, error),
};
```

---

## **React DevTools untuk Inspeksi Komponen**

React DevTools memungkinkan inspeksi component tree dan props/state:

```javascript
// Install React DevTools
// npm install -g react-devtools

// Jalankan: react-devtools
// Kemudian connect dari Expo Developer Menu

// Contoh komponen yang dapat diinspeksi
function UserProfile({ user }) {
  const [likes, setLikes] = useState(0);

  // Di React DevTools, kita bisa lihat:
  // - Props: user object
  // - State: likes value
  // - Component hierarchy

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>Likes: {likes}</Text>
    </View>
  );
}
```

---

## **Expo Go App untuk Testing Real-time**

Expo Go memungkinkan testing langsung di device:

```javascript
// Scan QR code dari terminal atau Expo Dev Tools
// Perubahan code otomatis reload (Fast Refresh)

// Contoh testing with console
import { LogBox } from "react-native";

// Ignore specific warnings saat development
LogBox.ignoreLogs(["Warning: componentWillReceiveProps", "Setting a timer"]);

// Ignore all logs (not recommended)
LogBox.ignoreAllLogs();
```

---

## **Error Boundaries dalam React Native**

Error Boundaries menangkap error di component tree:

```javascript
import React from "react";
import { View, Text, Button } from "react-native";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error ke service seperti Sentry
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Oops! Something went wrong
          </Text>
          <Text style={{ marginBottom: 20 }}>{this.state.error?.message}</Text>
          <Button
            title="Try Again"
            onPress={() => this.setState({ hasError: false })}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
```

---

## **Menangani Runtime Errors**

```javascript
// Try-catch untuk async operations
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    // Handle error gracefully
    Alert.alert("Error", "Failed to load user data");
    return null;
  }
}

// Promise rejection handling
Promise.reject(new Error("Test error")).catch((error) => {
  console.error("Promise rejected:", error);
});

// Global error handler (optional)
ErrorUtils.setGlobalHandler((error, isFatal) => {
  if (isFatal) {
    Alert.alert(
      "Unexpected error occurred",
      `Error: ${error.name} ${error.message}`,
    );
  }
});
```

---

## **Network Debugging dan Inspeksi API Calls**

```javascript
// Monitor network requests dengan Flipper atau Chrome DevTools

// Wrapper fetch dengan logging
const fetchWithLogging = async (url, options = {}) => {
  console.log(`[API] Request to: ${url}`);
  console.log("[API] Options:", options);

  const startTime = Date.now();

  try {
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;

    console.log(`[API] Response from ${url} (${duration}ms)`);
    console.log("[API] Status:", response.status);

    return response;
  } catch (error) {
    console.error(`[API] Error fetching ${url}:`, error);
    throw error;
  }
};

// Usage
fetchWithLogging("https://api.example.com/products")
  .then((res) => res.json())
  .then((data) => console.log("[API] Data:", data));

// Axios interceptor untuk logging
import axios from "axios";

axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log("Response:", response);
  return response;
});
```

---

### Optimasi Kinerja

---

## **Prinsip Dasar Optimasi React Native**

Prinsip optimasi:

1. **Measure First**: Identifikasi bottleneck sebelum optimasi
2. **Avoid Premature Optimization**: Optimasi saat ada masalah nyata
3. **Profile Performance**: Gunakan tools untuk measure
4. **Incremental Improvement**: Optimasi bertahap

```javascript
// Performance monitoring
import { PerformanceObserver, performance } from "react-native-performance";

// Mark timing points
performance.mark("screen-render-start");
// ... render logic
performance.mark("screen-render-end");

// Measure duration
performance.measure(
  "screen-render",
  "screen-render-start",
  "screen-render-end",
);
```

---

## **Component Re-rendering dan Cara Menghindarinya**

```javascript
// ❌ Problem: Unnecessary re-renders
function ParentComponent() {
  const [count, setCount] = useState(0);

  // Object baru dibuat setiap render
  const user = { name: "John", age: 30 };

  return (
    <View>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <ChildComponent user={user} />
    </View>
  );
}

// Child akan re-render meski user tidak berubah

// ✅ Solution 1: Move static data outside
const USER_DATA = { name: "John", age: 30 };

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <ChildComponent user={USER_DATA} />
    </View>
  );
}

// ✅ Solution 2: useMemo for computed values
function ParentComponent() {
  const [count, setCount] = useState(0);

  const user = useMemo(
    () => ({
      name: "John",
      age: 30,
    }),
    [],
  ); // Empty deps = create once

  return (
    <View>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <ChildComponent user={user} />
    </View>
  );
}
```

---

## **React.memo untuk Optimasi Komponen**

```javascript
// ❌ Without React.memo: Re-renders setiap parent update
function ExpensiveComponent({ data }) {
  console.log("ExpensiveComponent rendered");

  // Expensive calculation
  const processedData = data.map((item) => ({
    ...item,
    computed: heavyComputation(item),
  }));

  return (
    <View>
      {processedData.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
}

// ✅ With React.memo: Re-render hanya jika props berubah
const ExpensiveComponent = React.memo(({ data }) => {
  console.log("ExpensiveComponent rendered");

  const processedData = data.map((item) => ({
    ...item,
    computed: heavyComputation(item),
  }));

  return (
    <View>
      {processedData.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
});

// ✅ Custom comparison function
const ExpensiveComponent = React.memo(
  ({ data, userId }) => {
    // Component logic
  },
  (prevProps, nextProps) => {
    // Return true jika props sama (skip re-render)
    return (
      prevProps.userId === nextProps.userId &&
      prevProps.data.length === nextProps.data.length
    );
  },
);
```

---

## **useMemo dan useCallback Hooks**

```javascript
// useMemo: Memoize computed values
function ProductList({ products, category }) {
  // ❌ Bad: Filtered setiap render
  const filteredProducts = products.filter((p) => p.category === category);

  // ✅ Good: Computed hanya saat dependencies berubah
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <FlatList
      data={filteredProducts}
      renderItem={({ item }) => <ProductItem product={item} />}
    />
  );
}

// useCallback: Memoize functions
function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // ❌ Bad: Function baru setiap render
  const handleSearch = (text) => {
    setQuery(text);
    // Search logic
  };

  // ✅ Good: Function reference tetap sama
  const handleSearch = useCallback((text) => {
    setQuery(text);
    // Search logic
  }, []); // Empty deps karena tidak ada external dependencies

  // ✅ With dependencies
  const handleAddToCart = useCallback(
    (productId) => {
      addToCart(productId);
      showNotification("Added to cart");
    },
    [addToCart, showNotification],
  );

  return (
    <View>
      <SearchInput onSearch={handleSearch} />
      <ResultsList results={results} onAdd={handleAddToCart} />
    </View>
  );
}
```

---

## **Virtualized Lists (FlatList vs ScrollView)**

```javascript
// ❌ Bad: ScrollView renders ALL items
function BadProductList({ products }) {
  return (
    <ScrollView>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScrollView>
  );
}
// Problem: 1000 products = 1000 components rendered!

// ✅ Good: FlatList hanya render visible items
function GoodProductList({ products }) {
  const renderItem = ({ item }) => <ProductCard product={item} />;

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      // Performance props
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}

// ✅ Better: Extract renderItem dengan useCallback
function OptimizedProductList({ products }) {
  const renderItem = useCallback(
    ({ item }) => <ProductCard product={item} />,
    [],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}
```

---

## **Optimasi FlatList dengan Props Khusus**

```javascript
function OptimizedList({ data }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.id}
      // Optimization props
      initialNumToRender={10} // Render 10 items pertama
      maxToRenderPerBatch={5} // Render 5 items per batch
      windowSize={5} // Viewport multiplier
      removeClippedSubviews={true} // Unmount off-screen items
      // Prevent re-render saat scroll
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      // Performance monitoring
      onEndReachedThreshold={0.5} // Load more threshold
      updateCellsBatchingPeriod={50} // Batch update interval
      // Separator
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "#ccc" }} />
      )}
      // Empty state
      ListEmptyComponent={() => (
        <Text style={{ textAlign: "center", padding: 20 }}>
          No data available
        </Text>
      )}
    />
  );
}

// Item component dengan React.memo
const ListItem = React.memo(({ item }) => {
  return (
    <View style={{ padding: 15, height: ITEM_HEIGHT }}>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );
});

const ITEM_HEIGHT = 80;
```

---

## **Image Optimization dan Caching**

```javascript
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

// ❌ Bad: Load large image tanpa optimasi
<Image
  source={{ uri: 'https://example.com/large-image.jpg' }}
  style={{ width: 100, height: 100 }}
/>

// ✅ Good: Gunakan resized image
<Image
  source={{ uri: 'https://example.com/image-100x100.jpg' }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover"
/>

// ✅ Better: FastImage dengan caching
import FastImage from 'react-native-fast-image';

<FastImage
  style={{ width: 100, height: 100 }}
  source={{
    uri: 'https://example.com/image.jpg',
    priority: FastImage.priority.high,
    cache: FastImage.cacheControl.immutable,
  }}
  resizeMode={FastImage.resizeMode.cover}
/>

// Preload images
FastImage.preload([
  {
    uri: 'https://example.com/image1.jpg',
    priority: FastImage.priority.high,
  },
  {
    uri: 'https://example.com/image2.jpg',
  },
]);

// Clear cache
FastImage.clearMemoryCache();
FastImage.clearDiskCache();

// Progressive image loading
function ProgressiveImage({ source, style }) {
  const [loading, setLoading] = useState(true);

  return (
    <View>
      {loading && (
        <ActivityIndicator style={StyleSheet.absoluteFill} />
      )}
      <Image
        source={source}
        style={style}
        onLoadEnd={() => setLoading(false)}
        defaultSource={require('./placeholder.png')}
      />
    </View>
  );
}
```

---

## **Lazy Loading dan Code Splitting**

```javascript
// Lazy loading components
import React, { lazy, Suspense } from "react";
import { ActivityIndicator } from "react-native";

// ❌ Bad: Load semua screens upfront
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

// ✅ Good: Lazy load screens
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));
const SettingsScreen = lazy(() => import("./screens/SettingsScreen"));

function App() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <Navigation />
    </Suspense>
  );
}

// Lazy load heavy dependencies
const HeavyChart = lazy(() => import("./components/HeavyChart"));

function DashboardScreen() {
  const [showChart, setShowChart] = useState(false);

  return (
    <View>
      <Button title="Show Chart" onPress={() => setShowChart(true)} />

      {showChart && (
        <Suspense fallback={<ActivityIndicator />}>
          <HeavyChart data={chartData} />
        </Suspense>
      )}
    </View>
  );
}

// Conditional imports
async function loadFeature(featureName) {
  if (featureName === "analytics") {
    const module = await import("./features/Analytics");
    return module.default;
  }
}
```

---

## **Mengurangi Bundle Size Aplikasi**

```javascript
// 1. Import specific functions, bukan entire library
// ❌ Bad
import _ from 'lodash';
const result = _.uniq(array);

// ✅ Good
import uniq from 'lodash/uniq';
const result = uniq(array);

// 2. Gunakan tree-shaking friendly imports
// ❌ Bad
import * as icons from 'react-native-vector-icons';

// ✅ Good
import Icon from 'react-native-vector-icons/MaterialIcons';

// 3. Analyze bundle size
// Run: npx expo-cli customize:web
// Check webpack bundle analyzer

// 4. Remove unused dependencies
// Check package.json dan hapus yang tidak digunakan

// 5. Optimize images
// Gunakan WebP format
// Compress images sebelum bundle

// 6. Enable Hermes engine (di app.json)
{
  "expo": {
    "jsEngine": "hermes",
    "android": {
      "enableProguard": true
    }
  }
}

// 7. Split large files
// Pisahkan constants, utilities ke file terpisah
// constants.js
export const API_URL = 'https://api.example.com';
export const COLORS = { primary: '#007AFF' };

// utils.js
export const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
```

---

## **Async Storage Best Practices**

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Wrapper functions untuk error handling
export const storage = {
  async set(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  },

  async get(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Error reading data:", error);
      return null;
    }
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  },

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};

// ✅ Batch operations untuk performance
async function saveMultipleData(data) {
  const pairs = Object.entries(data).map(([key, value]) => [
    key,
    JSON.stringify(value),
  ]);

  try {
    await AsyncStorage.multiSet(pairs);
  } catch (error) {
    console.error("Error saving multiple data:", error);
  }
}

// ✅ Cache strategy dengan expiration
const cache = {
  async set(key, value, expirationMinutes = 60) {
    const item = {
      value,
      expiry: Date.now() + expirationMinutes * 60 * 1000,
    };
    await storage.set(key, item);
  },

  async get(key) {
    const item = await storage.get(key);

    if (!item) return null;

    if (Date.now() > item.expiry) {
      await storage.remove(key);
      return null;
    }

    return item.value;
  },
};

// Usage
await cache.set("user_data", userData, 30); // Cache 30 minutes
const cachedData = await cache.get("user_data");
```

---

## **Memory Leaks dan Cara Mencegahnya**

```javascript
// ❌ Problem 1: Uncleared timers
function BadComponent() {
  useEffect(() => {
    setInterval(() => {
      console.log("Running...");
    }, 1000);
    // Missing cleanup!
  }, []);
}

// ✅ Solution: Clear timers
function GoodComponent() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Running...");
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
}

// ❌ Problem 2: Unremoved event listeners
function BadComponent() {
  useEffect(() => {
    const subscription = Notifications.addListener(handleNotification);
    // Missing cleanup!
  }, []);
}

// ✅ Solution: Remove listeners
function GoodComponent() {
  useEffect(() => {
    const subscription = Notifications.addListener(handleNotification);

    return () => subscription.remove();
  }, []);
}

// ❌ Problem 3: setState after unmount
function BadComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((result) => {
      setData(result); // Component mungkin sudah unmount!
    });
  }, []);
}

// ✅ Solution: Check mounted state
function GoodComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchData().then((result) => {
      if (isMounted) {
        setData(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);
}

// ✅ Better: AbortController untuk fetch
function BetterComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch("https://api.example.com/data", {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then(setData)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      });

    return () => abortController.abort();
  }, []);
}
```

---

## **Performance Monitoring dengan Expo**

```javascript
// Monitor app performance
import { PerformanceObserver, performance } from "react-native-performance";

// Setup performance observer
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});

observer.observe({ entryTypes: ["measure", "mark"] });

// Track screen transitions
function HomeScreen({ navigation }) {
  useEffect(() => {
    performance.mark("home-screen-mount");

    return () => {
      performance.mark("home-screen-unmount");
      performance.measure(
        "home-screen-duration",
        "home-screen-mount",
        "home-screen-unmount",
      );
    };
  }, []);

  const handleNavigate = () => {
    performance.mark("navigation-start");
    navigation.navigate("Details");
    performance.mark("navigation-end");
    performance.measure(
      "navigation-time",
      "navigation-start",
      "navigation-end",
    );
  };

  return <Button title="Go to Details" onPress={handleNavigate} />;
}

// Track API calls
async function fetchWithPerformance(url) {
  performance.mark(`fetch-${url}-start`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    performance.mark(`fetch-${url}-end`);
    performance.measure(
      `fetch-${url}`,
      `fetch-${url}-start`,
      `fetch-${url}-end`,
    );

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Custom performance metrics
const metrics = {
  startTime: null,

  startMeasure(name) {
    this.startTime = performance.now();
    performance.mark(`${name}-start`);
  },

  endMeasure(name) {
    performance.mark(`${name}-end`);
    const duration = performance.now() - this.startTime;
    performance.measure(name, `${name}-start`, `${name}-end`);
    return duration;
  },
};

// Usage
metrics.startMeasure("heavy-computation");
const result = performHeavyComputation();
const duration = metrics.endMeasure("heavy-computation");
console.log(`Computation took ${duration}ms`);
```

---

## **Profiling dengan React Native Performance Monitor**

```javascript
// Enable Performance Monitor dari Developer Menu
// Shows: RAM usage, JS frame rate, UI frame rate

// Monitor specific components
import { Profiler } from "react";

function onRenderCallback(
  id, // "id" prop dari Profiler
  phase, // "mount" atau "update"
  actualDuration, // Waktu render
  baseDuration, // Estimated waktu tanpa memoization
  startTime,
  commitTime,
  interactions,
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MainContent />
    </Profiler>
  );
}

// Profile specific sections
function ProductList({ products }) {
  return (
    <Profiler id="ProductList" onRender={onRenderCallback}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Profiler id={`Product-${item.id}`} onRender={onRenderCallback}>
            <ProductCard product={item} />
          </Profiler>
        )}
      />
    </Profiler>
  );
}

// Custom performance tracking hook
function usePerformanceTracking(componentName) {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const duration = performance.now() - startTime.current;

    console.log(
      `${componentName} render #${renderCount.current}: ${duration}ms`,
    );

    startTime.current = performance.now();
  });
}

// Usage
function MyComponent() {
  usePerformanceTracking("MyComponent");

  return <View>{/* component content */}</View>;
}
```

---

## **Common Performance Pitfalls**

```javascript
// ❌ Pitfall 1: Inline function di renderItem
<FlatList
  data={items}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  )}
/>;
// Function baru dibuat setiap render!

// ✅ Solution: Extract dan memoize
const renderItem = useCallback(
  ({ item }) => <ItemComponent item={item} onPress={handlePress} />,
  [handlePress],
);

// ❌ Pitfall 2: Heavy computation di render
function ProductList({ products }) {
  const sortedProducts = products
    .sort((a, b) => a.price - b.price)
    .filter((p) => p.inStock);
  // Computed setiap render!
}

// ✅ Solution: useMemo
const sortedProducts = useMemo(() => {
  return products.sort((a, b) => a.price - b.price).filter((p) => p.inStock);
}, [products]);

// ❌ Pitfall 3: Unnecessary useState updates
function Counter() {
  const [count, setCount] = useState(0);

  setInterval(() => {
    setCount(count + 1); // Closure problem!
  }, 1000);
}

// ✅ Solution: Functional update
useEffect(() => {
  const id = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);

// ❌ Pitfall 4: Large objects di state
const [data, setData] = useState({
  users: [],
  products: [],
  orders: [],
  // ... banyak data
});

// ✅ Solution: Split state
const [users, setUsers] = useState([]);
const [products, setProducts] = useState([]);
const [orders, setOrders] = useState([]);

// ❌ Pitfall 5: Tidak memoize context value
function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
// Object baru setiap render, semua consumers re-render!

// ✅ Solution: useMemo
const value = useMemo(() => ({ user, setUser }), [user]);

return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
```

---

## **Best Practices Ringkasan**

```javascript
// 1. Component Optimization
const MyComponent = React.memo(({ data }) => {
  // Component logic
});

// 2. Hook Optimization
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

// 3. List Optimization
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  initialNumToRender={10}
  maxToRenderPerBatch={5}
  windowSize={5}
  removeClippedSubviews={true}
  getItemLayout={getItemLayout}
/>

// 4. Image Optimization
<FastImage
  source={{ uri: imageUrl, priority: FastImage.priority.high }}
  resizeMode={FastImage.resizeMode.cover}
/>

// 5. Navigation Optimization
const LazyScreen = lazy(() => import('./screens/LazyScreen'));

// 6. State Management
// Gunakan state lokal jika memungkinkan
// Context untuk shared state
// Redux/Zustand untuk complex state

// 7. Error Handling
<ErrorBoundary>
  <App />
</ErrorBoundary>

// 8. Cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

---

## **Checklist Optimasi Sebelum Release**

Checklist optimasi aplikasi:

**Performance**

- [ ] FlatList gunakan props optimasi (initialNumToRender, windowSize)
- [ ] Component berat di-wrap dengan React.memo
- [ ] useMemo/useCallback untuk expensive operations
- [ ] Images dioptimasi dan di-cache
- [ ] Bundle size < 20MB
- [ ] App startup time < 3 detik
- [ ] Smooth scrolling (60 FPS)

**Code Quality**

- [ ] No console.log di production
- [ ] Error boundaries implemented
- [ ] All timers/listeners cleaned up
- [ ] No memory leaks
- [ ] Proper error handling

**User Experience**

- [ ] Loading states untuk async operations
- [ ] Error messages user-friendly
- [ ] Offline handling
- [ ] Pull to refresh di lists
- [ ] Empty states implemented

**Testing**

- [ ] Test di berbagai devices
- [ ] Test dengan slow network
- [ ] Test dengan low memory devices
- [ ] Test orientasi landscape/portrait

```javascript
// Production build checklist code
if (__DEV__) {
  console.log('Development mode - all features enabled');
} else {
  // Production mode
  console.log = () => {}; // Disable console.log
  console.warn = () => {};
  console.error = () => {};
}

// Enable Hermes (app.json)
{
  "expo": {
    "jsEngine": "hermes",
    "android": {
      "enableProguard": true,
      "enableShrinkResources": true
    }
  }
}
```

---

## **Studi Kasus: Before & After Optimization**

```javascript
// BEFORE OPTIMIZATION - Slow Product List
function SlowProductList({ products }) {
  return (
    <ScrollView>
      {products.map((product) => {
        // Heavy computation di setiap render
        const discount = calculateDiscount(product);
        const rating = calculateAverageRating(product.reviews);

        return (
          <View key={product.id} style={styles.card}>
            <Image
              source={{ uri: product.imageUrl }}
              style={{ width: 300, height: 300 }}
            />
            <Text>{product.name}</Text>
            <Text>Price: ${product.price}</Text>
            <Text>Discount: {discount}%</Text>
            <Text>Rating: {rating}/5</Text>
            <TouchableOpacity onPress={() => addToCart(product)}>
              <Text>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

// Problems:
// - ScrollView renders all 1000 products
// - Large images (300x300) not optimized
// - Heavy computation every render
// - New function created for each item
// - No memoization

// Performance:
// - Initial render: 5000ms
// - Memory: 250MB
// - FPS: 30

// AFTER OPTIMIZATION - Fast Product List
const ProductCard = React.memo(({ product, onAddToCart }) => {
  // Compute once, memoize result
  const discount = useMemo(
    () => calculateDiscount(product),
    [product.price, product.originalPrice],
  );

  const rating = useMemo(
    () => calculateAverageRating(product.reviews),
    [product.reviews],
  );

  return (
    <View style={styles.card}>
      <FastImage
        source={{
          uri: product.thumbnailUrl, // 100x100 thumbnail
          priority: FastImage.priority.normal,
        }}
        style={{ width: 100, height: 100 }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text>{product.name}</Text>
      <Text>Price: ${product.price}</Text>
      <Text>Discount: {discount}%</Text>
      <Text>Rating: {rating}/5</Text>
      <TouchableOpacity onPress={() => onAddToCart(product.id)}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
});

function FastProductList({ products }) {
  const handleAddToCart = useCallback((productId) => {
    addToCart(productId);
  }, []);

  const renderItem = useCallback(
    ({ item }) => <ProductCard product={item} onAddToCart={handleAddToCart} />,
    [handleAddToCart],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
}

const ITEM_HEIGHT = 120;

// Performance After:
// - Initial render: 800ms (6x faster!)
// - Memory: 80MB (3x reduction!)
// - FPS: 60 (smooth!)

// Improvements:
// ✅ FlatList virtualization
// ✅ Optimized images (thumbnails + caching)
// ✅ Memoized computations
// ✅ Memoized callbacks
// ✅ React.memo for components
```

---

---

## Quiz Pilihan Berganda

---

---

## Soal 1

Apa metrik kinerja utama yang perlu dimonitor dalam aplikasi React Native?

A. Ukuran font dan warna tema
B. FPS, Memory Usage, dan Load Time
C. Jumlah komponen dan file
D. Ukuran layar device

**Jawaban: B**

---

---

## Soal 2

Bagaimana cara membuka Expo Developer Menu di device fisik?

A. Tap layar 3 kali
B. Shake device
C. Tekan tombol volume
D. Swipe dari atas ke bawah

**Jawaban: B**

---

---

## Soal 3

Apa fungsi dari React.memo dalam optimasi komponen?

A. Menyimpan data ke memori
B. Mencegah re-render komponen jika props tidak berubah
C. Mempercepat loading aplikasi
D. Mengurangi ukuran bundle

**Jawaban: B**

---

---

## Soal 4

Hook apa yang digunakan untuk memoize computed values yang expensive?

A. useState
B. useEffect
C. useMemo
D. useRef

**Jawaban: C**

---

---

## Soal 5

Apa perbedaan utama antara ScrollView dan FlatList dalam hal performa?

A. ScrollView lebih cepat daripada FlatList
B. FlatList hanya render item yang visible (virtualization), ScrollView render semua item
C. ScrollView untuk data kecil, FlatList untuk data besar
D. Tidak ada perbedaan signifikan

**Jawaban: B**

---

---

## Soal 6

Apa yang dimaksud dengan memory leak dalam aplikasi?

A. Data yang tersimpan terlalu banyak
B. Aplikasi menggunakan internet berlebihan
C. Memory tidak dilepaskan setelah tidak digunakan, menyebabkan memory usage terus meningkat
D. Storage device penuh

**Jawaban: C**

---

---

## Soal 7

Bagaimana cara yang benar untuk cleanup timer di useEffect?

A. Tidak perlu cleanup
B. Return function yang memanggil clearInterval/clearTimeout
C. Set timer ke null
D. Restart aplikasi

**Jawaban: B**

---

---

## Soal 8

Apa fungsi dari Error Boundary dalam React Native?

A. Mencegah error terjadi
B. Menangkap dan menampilkan error di component tree dengan graceful fallback UI
C. Mengirim error ke server
D. Memperbaiki error secara otomatis

**Jawaban: B**

---

---

## Soal 9

Props apa yang digunakan di FlatList untuk optimasi rendering?

A. `renderAll` dan `showAll`
B. `initialNumToRender`, `maxToRenderPerBatch`, dan `windowSize`
C. `fastRender` dan `optimize`
D. `quickLoad` dan `speedUp`

**Jawaban: B**

---

---

## Soal 10

Apa yang sebaiknya dilakukan SEBELUM melakukan optimasi kode?

A. Langsung refactor semua kode
B. Measure/profile performance untuk identifikasi bottleneck terlebih dahulu
C. Tambah library baru
D. Hapus semua console.log

**Jawaban: B**

---

**Selamat! Anda telah menyelesaikan materi Optimasi Kinerja dan Debugging** 🎉
