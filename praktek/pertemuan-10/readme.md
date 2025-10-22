# Latihan Praktek Pertemuan 10

## Data Fetching & Konsumsi API (REST API)

---

## Soal 1: Fetch Data Sederhana dengan JSONPlaceholder

Buatlah sebuah aplikasi React Native yang:

- Fetch data posts dari API: `https://jsonplaceholder.typicode.com/posts`
- Tampilkan list posts menggunakan FlatList
- Setiap item menampilkan: title dan body
- Implementasikan loading state dengan ActivityIndicator
- Gunakan Fetch API bawaan JavaScript

**Tujuan:** Memahami dasar fetch data dan menampilkannya di FlatList.

**API Endpoint:**

```
GET https://jsonplaceholder.typicode.com/posts
```

---

## Soal 2: Detail Post dengan Navigation

Lanjutkan Soal 1, tambahkan fitur:

- Setup React Navigation (Stack Navigator)
- Ketika post di-tap, navigasi ke halaman detail
- Detail page menampilkan: title, body, dan userId
- Fetch detail post dari API: `https://jsonplaceholder.typicode.com/posts/{id}`
- Tambahkan tombol Back untuk kembali ke list

**Tujuan:** Implementasi navigation dan fetch data individual.

**API Endpoint:**

```
GET https://jsonplaceholder.typicode.com/posts/1
```

---

## Soal 3: Error Handling dan Retry

Buatlah aplikasi fetch data dengan error handling yang baik:

- Fetch users dari: `https://jsonplaceholder.typicode.com/users`
- Implementasikan 3 state: loading, error, success
- Tampilkan error message jika fetch gagal
- Tambahkan tombol "Retry" untuk mencoba fetch ulang
- Tampilkan different UI untuk setiap state
- Gunakan try-catch untuk error handling

**Tujuan:** Implementasi proper error handling dan retry mechanism.

**API Endpoint:**

```
GET https://jsonplaceholder.typicode.com/users
```

---

## Soal 4: Pull to Refresh Functionality

Buatlah aplikasi dengan pull to refresh:

- Fetch photos dari: `https://jsonplaceholder.typicode.com/photos?_limit=20`
- Implementasikan RefreshControl pada FlatList
- Tampilkan gambar menggunakan Image component dengan uri
- Saat pull down, refresh data dari API
- Tampilkan loading indicator saat refresh

**Tujuan:** Implementasi pull to refresh untuk update data.

**API Endpoint:**

```
GET https://jsonplaceholder.typicode.com/photos?_limit=20
```

---

## Soal 5: Search Functionality dengan API

Buatlah aplikasi search dengan fitur:

- TextInput untuk search query
- Fetch hasil search dari: `https://jsonplaceholder.typicode.com/users?name_like={query}`
- Tampilkan hasil search dalam FlatList
- Implementasikan debouncing (delay 500ms sebelum fetch)
- Tampilkan "No results found" jika tidak ada hasil
- Clear results saat search query kosong

**Tujuan:** Implementasi search functionality dengan debouncing.

**API Endpoint:**

```
GET https://jsonplaceholder.typicode.com/users?name_like=Leanne
```

---

## Soal 6: POST Request - Create New Data

Buatlah form untuk membuat post baru:

- Form dengan input: title dan body
- Validasi form: title dan body wajib diisi
- Kirim POST request ke: `https://jsonplaceholder.typicode.com/posts`
- Tampilkan Alert dengan response data setelah berhasil
- Clear form setelah submit
- Disable button saat loading
- Gunakan Fetch API atau Axios

**Tujuan:** Implementasi POST request untuk create data.

**API Endpoint:**

```
POST https://jsonplaceholder.typicode.com/posts
Body: { title: "...", body: "...", userId: 1 }
```

---

## Soal 7: Update Data dengan PUT Request

Buatlah aplikasi edit post:

- Fetch single post dari API
- Form pre-filled dengan data post
- Edit title dan body
- Kirim PUT request untuk update
- Endpoint: `https://jsonplaceholder.typicode.com/posts/{id}`
- Tampilkan success/error message
- Gunakan async/await untuk fetch

**Tujuan:** Implementasi PUT request untuk update data.

**API Endpoint:**

```
GET https://jsonplaceholder.typicode.com/posts/1
PUT https://jsonplaceholder.typicode.com/posts/1
Body: { id: 1, title: "...", body: "...", userId: 1 }
```

---

## Soal 8: Delete Data dengan Konfirmasi

Buatlah aplikasi delete post:

- List posts dengan tombol delete di setiap item
- Tampilkan Alert konfirmasi sebelum delete
- Kirim DELETE request ke: `https://jsonplaceholder.typicode.com/posts/{id}`
- Hapus item dari list setelah delete berhasil
- Tampilkan error jika delete gagal
- Update UI secara optimistic (hapus dari list dulu)

**Tujuan:** Implementasi DELETE request dengan konfirmasi.

**API Endpoint:**

```
DELETE https://jsonplaceholder.typicode.com/posts/1
```

---

## Soal 9: Axios Implementation dengan Interceptors

Buatlah aplikasi menggunakan Axios dengan fitur:

- Install dan setup Axios
- Buat axios instance dengan baseURL
- Implementasikan request interceptor (tambahkan timestamp ke header)
- Implementasikan response interceptor (log response status)
- Fetch data dari: `https://jsonplaceholder.typicode.com/todos`
- Filter todos yang completed
- Tampilkan dalam FlatList dengan styling berbeda untuk completed/uncompleted

**Tujuan:** Implementasi Axios dengan interceptors.

**Setup:**

```bash
npm install axios
```

**API Endpoint:**

```
GET https://jsonplaceholder.typicode.com/todos
```

---

## Soal 10: News App dengan Multiple Features

Buatlah aplikasi berita lengkap dengan fitur:

**Features:**

- Fetch posts dari JSONPlaceholder sebagai "berita"
- **Home Screen:**
  - List semua posts dengan FlatList
  - Setiap item tampilkan: title, body (3 lines), dan userId
  - Pull to refresh
  - Loading state
- **Detail Screen:**

  - Fetch detail post dan comments
  - Tampilkan title, body lengkap
  - Tampilkan list comments dari post tersebut
  - Comments endpoint: `https://jsonplaceholder.typicode.com/posts/{id}/comments`

- **User Screen:**

  - Fetch user info dari userId
  - Endpoint: `https://jsonplaceholder.typicode.com/users/{userId}`
  - Tampilkan: name, email, phone, website, company

- **Additional Requirements:**
  - React Navigation (Stack Navigator)
  - Error handling untuk semua fetch
  - Custom API service file (services/api.js)
  - Custom hook useAPI untuk reusable fetch logic
  - Styling yang baik (card layout, spacing, colors)
  - Loading skeleton atau placeholder

**Tujuan:** Membuat aplikasi lengkap dengan multiple screens dan proper architecture.

**API Endpoints:**

```
GET https://jsonplaceholder.typicode.com/posts
GET https://jsonplaceholder.typicode.com/posts/{id}
GET https://jsonplaceholder.typicode.com/posts/{id}/comments
GET https://jsonplaceholder.typicode.com/users/{userId}
```

**Project Structure:**

```
src/
├── screens/
│   ├── HomeScreen.js
│   ├── DetailScreen.js
│   └── UserScreen.js
├── services/
│   └── api.js
├── hooks/
│   └── useAPI.js
├── components/
│   ├── PostCard.js
│   ├── CommentItem.js
│   └── LoadingScreen.js
└── navigation/
    └── AppNavigator.js
```

---

## Tips Pengerjaan:

### 1. Setup Project

```bash
# Install dependencies yang mungkin diperlukan
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install axios
```

### 2. Testing API

Gunakan Postman atau browser untuk test API endpoint terlebih dahulu sebelum implementasi.

### 3. Console.log for Debugging

```javascript
console.log("Response:", response.data);
console.log("Error:", error.message);
```

### 4. Error Handling Template

```javascript
try {
  setLoading(true);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  setData(data);
  setError(null);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
```

### 5. Axios Template

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

// GET request
const fetchData = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
```

### 6. useEffect for Fetch

```javascript
useEffect(() => {
  fetchData();
}, []); // Empty dependency array = run once
```

### 7. FlatList dengan API Data

```javascript
<FlatList
  data={posts}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  )}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>
```

---

## API Documentation - JSONPlaceholder

### Base URL

```
https://jsonplaceholder.typicode.com
```

### Available Resources

- Posts: `/posts` (100 posts)
- Comments: `/comments` (500 comments)
- Albums: `/albums` (100 albums)
- Photos: `/photos` (5000 photos)
- Todos: `/todos` (200 todos)
- Users: `/users` (10 users)

### Common Query Parameters

```javascript
// Limit results
GET /posts?_limit=10

// Pagination
GET /posts?_page=1&_limit=10

// Sort
GET /posts?_sort=title&_order=asc

// Filter
GET /posts?userId=1

// Search
GET /posts?title_like=qui
```

### HTTP Methods

```javascript
// GET - Fetch data
GET /posts
GET /posts/1

// POST - Create new
POST /posts
Body: { title: '...', body: '...', userId: 1 }

// PUT - Update (full)
PUT /posts/1
Body: { id: 1, title: '...', body: '...', userId: 1 }

// PATCH - Update (partial)
PATCH /posts/1
Body: { title: '...' }

// DELETE - Remove
DELETE /posts/1
```

---

## Kriteria Penilaian:

### Fungsionalitas (40%)

- API call berhasil dan data ditampilkan
- Error handling bekerja dengan baik
- Semua fitur requirement terpenuhi

### Code Quality (25%)

- Code terstruktur dan rapi
- Penamaan variable yang jelas
- Separation of concerns (API service terpisah)
- Menggunakan best practices

### User Experience (20%)

- Loading state yang jelas
- Error message yang informatif
- Smooth transition dan navigation
- Styling yang baik dan konsisten

### Error Handling (15%)

- Try-catch implementation
- Network error handling
- Empty state handling
- Retry functionality

### Bonus (+10%)

- Implementasi caching
- Skeleton loading
- Animations
- Dark mode
- Share functionality
- Offline support

---

## Sumber Belajar Tambahan:

### Dokumentasi

- [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide/)
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [React Native Networking](https://reactnative.dev/docs/network)

### Video Tutorial (Rekomendasi)

- Fetch API in React Native
- Axios vs Fetch
- Error Handling Best Practices
- React Navigation Tutorial

### Public APIs untuk Praktek Lanjutan

- [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)
- [OpenWeather API](https://openweathermap.org/api)
- [News API](https://newsapi.org/)
- [REST Countries](https://restcountries.com/)

---

## Troubleshooting Common Issues:

### 1. Network Request Failed

```javascript
// Cek internet connection
// Cek URL endpoint benar
// Cek timeout configuration
```

### 2. JSON Parse Error

```javascript
// Pastikan response adalah JSON
console.log("Response type:", response.headers.get("content-type"));
```

### 3. CORS Error (hanya di web)

```javascript
// JSONPlaceholder mendukung CORS
// Jika pakai API lain, cek CORS policy
```

### 4. Timeout Error

```javascript
// Increase timeout
fetch(url, {
  signal: AbortSignal.timeout(10000), // 10 seconds
});
```

### 5. Image Not Loading

```javascript
// Pastikan URL valid
// Gunakan default image untuk fallback
<Image
  source={{ uri: imageUrl }}
  defaultSource={require("./placeholder.png")}
/>
```

---

## Submission Guidelines:

### Yang Harus Dikumpulkan:

1. **Source Code** (zip atau github repository)
2. **Screenshot/Video Demo** aplikasi berjalan
3. **README.md** dengan:
   - Cara install dependencies
   - Cara run aplikasi
   - Fitur yang diimplementasikan
   - Kendala yang dihadapi (jika ada)

### Format Penamaan File:

```
NIM_Nama_Pertemuan10.zip
```

### Deadline:

**1 minggu dari hari ini** (29 Oktober 2025)

### Submit ke:

- Google Classroom
- atau Email: [email pengajar]

---

**Selamat mengerjakan! Jangan ragu untuk bertanya jika ada kesulitan.** 🚀

**Good Luck & Happy Coding!** 💻✨
