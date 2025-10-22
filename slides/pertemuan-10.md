---
title: Data Fetching & Konsumsi API (REST API)
version: 1.0.0
header: Data Fetching & Konsumsi API (REST API)
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Data Fetching & Konsumsi API (REST API)**

---

## Apa itu API (Application Programming Interface)?

API adalah jembatan komunikasi antara aplikasi yang berbeda. Dalam konteks mobile, API memungkinkan aplikasi mengambil data dari server, mengirim data, atau melakukan operasi tertentu tanpa harus mengetahui detail implementasi server.

Analogi sederhana: API seperti pelayan di restoran yang menerima pesanan Anda (request) dan membawa makanan (response) dari dapur (server).

---

## Konsep REST API dan Karakteristiknya

REST (Representational State Transfer) adalah arsitektur API yang paling populer. Karakteristik utama:

- Stateless: setiap request berdiri sendiri
- Client-Server: pemisahan antara frontend dan backend
- Cacheable: response dapat di-cache untuk efisiensi
- Uniform Interface: struktur URL yang konsisten

```javascript
// Contoh URL REST yang baik
https://api.example.com/users          // GET semua users
https://api.example.com/users/123      // GET user dengan id 123
https://api.example.com/users/123/posts // GET posts dari user 123
```

---

## HTTP Methods: GET, POST, PUT, DELETE

HTTP methods menentukan aksi yang ingin dilakukan:

```javascript
// GET - Mengambil data
fetch("https://api.example.com/users");

// POST - Membuat data baru
fetch("https://api.example.com/users", {
  method: "POST",
  body: JSON.stringify({ name: "John", email: "john@example.com" }),
});

// PUT - Update data lengkap
fetch("https://api.example.com/users/123", {
  method: "PUT",
  body: JSON.stringify({ name: "John Doe", email: "johndoe@example.com" }),
});

// DELETE - Hapus data
fetch("https://api.example.com/users/123", {
  method: "DELETE",
});
```

---

## Status Code HTTP yang Umum Digunakan

Status code memberitahu hasil dari request:

```javascript
// 2xx - Success
200 OK              // Request berhasil
201 Created         // Data berhasil dibuat
204 No Content      // Berhasil tapi tidak ada response body

// 4xx - Client Error
400 Bad Request     // Request tidak valid
401 Unauthorized    // Butuh authentication
404 Not Found       // Resource tidak ditemukan

// 5xx - Server Error
500 Internal Server Error  // Error di server
503 Service Unavailable    // Server sedang down
```

---

## Anatomi URL Endpoint API

Struktur lengkap URL API:

```javascript
// Anatomi URL
https://api.example.com:443/v1/users?page=1&limit=10

// Breakdown:
// https://           - Protocol
// api.example.com    - Domain/Host
// :443               - Port (optional)
// /v1                - API Version
// /users             - Resource/Endpoint
// ?page=1&limit=10   - Query Parameters

// Contoh penggunaan
const baseURL = 'https://api.example.com/v1';
const endpoint = '/users';
const params = '?page=1&limit=10';
const fullURL = baseURL + endpoint + params;
```

---

## Request Headers dan Response Headers

Headers menyimpan metadata tentang request/response:

```javascript
// Request Headers
fetch('https://api.example.com/users', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here',
    'Accept': 'application/json',
    'User-Agent': 'MyApp/1.0'
  }
});

// Response Headers (contoh yang diterima)
{
  'content-type': 'application/json',
  'cache-control': 'max-age=3600',
  'date': 'Wed, 22 Oct 2025 15:44:00 GMT',
  'content-length': '1234'
}
```

---

## Format Data: JSON sebagai Standard

JSON (JavaScript Object Notation) adalah format standar untuk pertukaran data:

```javascript
// Struktur JSON
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "city": "Jakarta",
    "country": "Indonesia"
  },
  "hobbies": ["reading", "coding", "gaming"]
}

// Array of JSON objects
[
  { "id": 1, "name": "John" },
  { "id": 2, "name": "Jane" },
  { "id": 3, "name": "Bob" }
]
```

---

## Contoh Response JSON dari API Publik

Response API biasanya memiliki struktur standar:

```javascript
// Success Response
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "React Native Tutorial",
    "author": "John Doe",
    "published_at": "2025-10-22"
  },
  "message": "Data retrieved successfully"
}

// Error Response
{
  "status": "error",
  "error": {
    "code": 404,
    "message": "User not found"
  }
}

// Paginated Response
{
  "status": "success",
  "data": [...],
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "per_page": 20,
    "total_items": 200
  }
}
```

---

## Authentication API: API Key, Bearer Token

Metode autentikasi untuk mengakses API:

```javascript
// 1. API Key (biasanya di query parameter atau header)
fetch("https://api.example.com/data?api_key=your_key_here");

// atau di header
fetch("https://api.example.com/data", {
  headers: {
    "X-API-Key": "your_key_here",
  },
});

// 2. Bearer Token (lebih aman, untuk user authentication)
fetch("https://api.example.com/profile", {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  },
});

// 3. Basic Auth
const credentials = btoa("username:password");
fetch("https://api.example.com/data", {
  headers: {
    Authorization: `Basic ${credentials}`,
  },
});
```

---

## Pengenalan Fetch API Bawaan JavaScript

Fetch API adalah interface modern untuk melakukan HTTP request:

```javascript
// Fetch API built-in di JavaScript modern
// Tidak perlu install library tambahan

// Contoh paling sederhana
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Fetch mengembalikan Promise
// Promise memiliki 3 state: pending, fulfilled, rejected
```

---

## Sintaks Dasar Fetch untuk GET Request

GET request adalah yang paling umum untuk mengambil data:

```javascript
// GET Request sederhana
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    // Cek apakah response berhasil
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data received:", data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

// Dengan parameter
const userId = 1;
fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

---

## Menggunakan Promise dengan Fetch

Promise adalah cara menangani operasi asynchronous:

```javascript
// Promise chain
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((user) => {
    console.log("User:", user);
    // Fetch posts dari user ini
    return fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
  })
  .then((response) => response.json())
  .then((posts) => {
    console.log("User posts:", posts);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Request completed");
  });

// Promise.all untuk multiple requests
Promise.all([
  fetch("https://jsonplaceholder.typicode.com/users/1"),
  fetch("https://jsonplaceholder.typicode.com/posts/1"),
])
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  .then(([user, post]) => {
    console.log("User:", user);
    console.log("Post:", post);
  });
```

---

## Async/Await untuk Fetch yang Lebih Readable

Async/await membuat kode asynchronous lebih mudah dibaca:

```javascript
// Dengan async/await
const fetchUser = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

// Multiple requests dengan async/await
const fetchUserAndPosts = async (userId) => {
  try {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await userResponse.json();

    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const posts = await postsResponse.json();

    return { user, posts };
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## Error Handling dalam Fetch API

Penanganan error yang proper sangat penting:

```javascript
// Error handling lengkap
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);

    // Cek status code
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Resource not found");
      } else if (response.status === 401) {
        throw new Error("Unauthorized access");
      } else if (response.status === 500) {
        throw new Error("Server error");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    // Network error atau error lainnya
    if (error.message === "Network request failed") {
      return { success: false, error: "No internet connection" };
    }
    return { success: false, error: error.message };
  }
};

// Penggunaan
const result = await fetchWithErrorHandling("https://api.example.com/data");
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

---

## Lifecycle untuk Fetch Data (useEffect)

Di React Native, fetch data biasanya dilakukan di useEffect:

```javascript
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Re-fetch jika userId berubah

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  if (!user) return <Text>No user found</Text>;

  return <Text>{user.name}</Text>;
};
```

---

## State Management untuk Data API

Mengelola berbagai state untuk data dari API:

```javascript
import React, { useState, useEffect } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`
      );
      const data = await response.json();

      if (isRefresh) {
        setPosts(data);
        setPage(1);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    fetchPosts(1, true);
  };

  const loadMore = () => {
    if (!loading) {
      fetchPosts(page + 1);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
};
```

---

## Loading State dan Error State

Menampilkan feedback yang tepat kepada user:

```javascript
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
} from "react-native";

const DataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={fetchData} />
      </View>
    );
  }

  // Success state
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text>{data.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
```

---

## Parsing dan Menampilkan Data JSON

Mengolah dan menampilkan data dari API:

```javascript
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.company}>{item.company.name}</Text>
        <Text style={styles.address}>
          {item.address.city}, {item.address.street}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderUser}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  userCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    color: "#666",
    marginBottom: 2,
  },
  company: {
    color: "#007AFF",
    marginBottom: 2,
  },
  address: {
    color: "#999",
    fontSize: 12,
  },
});
```

---

## Contoh Kode: Fetch Data Sederhana

Implementasi lengkap fetch data di React Native:

```javascript
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // Menggunakan API publik JSONPlaceholder sebagai contoh
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderArticle = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body} numberOfLines={3}>
        {item.body}
      </Text>
      <Text style={styles.id}>Article ID: {item.id}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchNews}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Latest News</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderArticle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 15,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  body: {
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  id: {
    fontSize: 12,
    color: "#999",
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NewsApp;
```

---

## Pengenalan Axios Library

Axios adalah HTTP client yang lebih powerful daripada Fetch:

```javascript
// Instalasi
// npm install axios
// atau
// yarn add axios

import axios from "axios";

// Keunggulan Axios:
// 1. Automatic JSON transformation
// 2. Request/Response interceptors
// 3. Better error handling
// 4. Request cancellation
// 5. Progress tracking
// 6. Timeout configuration

// Contoh sederhana
axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    console.log(response.data); // Data sudah otomatis di-parse
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Dengan async/await
const fetchPost = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(response.data);
    console.log(response.status);
    console.log(response.headers);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## Instalasi dan Setup Axios di React Native

Konfigurasi Axios untuk project React Native:

```javascript
// 1. Install axios
// npm install axios

// 2. Buat file api.js untuk konfigurasi
// api.js
import axios from "axios";

// Base configuration
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Tambahkan token jika ada
    const token = "your-token-here";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error("Response error:", error.response.status);
    } else if (error.request) {
      // Request made but no response
      console.error("Network error");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

// 3. Penggunaan di component
import api from "./api";

const MyComponent = () => {
  const fetchData = async () => {
    try {
      const response = await api.get("/posts");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
};
```

---

## Perbandingan Fetch vs Axios

Perbedaan utama antara Fetch dan Axios:

```javascript
// FETCH API
// 1. GET Request
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Harus manual parse JSON
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// 2. POST Request
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    // Harus manual stringify
    title: "foo",
    body: "bar",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));

// =====================================

// AXIOS
// 1. GET Request
axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log(response.data)) // Data otomatis parsed
  .catch((error) => console.error(error));

// 2. POST Request
axios
  .post("https://jsonplaceholder.typicode.com/posts", {
    // Data otomatis di-stringify
    title: "foo",
    body: "bar",
    userId: 1,
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));

// Perbandingan Fitur:
/*
Feature              | Fetch           | Axios
---------------------|-----------------|------------------
Built-in             | Yes (ES6)       | No (library)
JSON Transform       | Manual          | Automatic
Error Handling       | Basic           | Advanced
Timeout              | No (need AbortController) | Yes
Interceptors         | No              | Yes
Progress Tracking    | No              | Yes
Cancel Request       | AbortController | CancelToken
Browser Support      | Modern only     | Wide support
*/
```

---

## Sintaks Axios untuk GET Request

Berbagai cara melakukan GET request dengan Axios:

```javascript
import axios from "axios";

// 1. GET Request sederhana
axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

// 2. GET dengan parameter
axios
  .get("https://jsonplaceholder.typicode.com/posts", {
    params: {
      userId: 1,
      _limit: 10,
    },
  })
  .then((response) => console.log(response.data));

// 3. GET dengan async/await
const fetchPosts = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// 4. GET dengan custom headers
axios
  .get("https://api.example.com/data", {
    headers: {
      Authorization: "Bearer token123",
      "Custom-Header": "value",
    },
    timeout: 5000,
  })
  .then((response) => console.log(response.data));

// 5. GET dengan full response access
axios.get("https://jsonplaceholder.typicode.com/posts/1").then((response) => {
  console.log("Data:", response.data);
  console.log("Status:", response.status);
  console.log("Status Text:", response.statusText);
  console.log("Headers:", response.headers);
  console.log("Config:", response.config);
});

// 6. POST Request
const createPost = async () => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "New Post",
        body: "This is the content",
        userId: 1,
      }
    );
    console.log("Created:", response.data);
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

// 7. PUT Request (update)
const updatePost = async (id) => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        id: id,
        title: "Updated Post",
        body: "Updated content",
        userId: 1,
      }
    );
    console.log("Updated:", response.data);
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

// 8. DELETE Request
const deletePost = async (id) => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    console.log("Deleted:", response.status);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
```

---

## Axios Interceptors untuk Global Configuration

Interceptors memungkinkan modifikasi request/response secara global:

```javascript
import axios from "axios";

// Buat instance Axios
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Tambahkan token ke setiap request
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request
    console.log(`${config.method.toUpperCase()} ${config.url}`);

    // Tampilkan loading
    showLoadingIndicator();

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // Hide loading
    hideLoadingIndicator();

    // Log response
    console.log("Response received:", response.status);

    return response;
  },
  (error) => {
    // Hide loading
    hideLoadingIndicator();

    // Handle different error types
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized - redirecting to login");
          // Redirect to login
          break;
        case 403:
          console.error("Forbidden");
          break;
        case 404:
          console.error("Not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("Error:", error.response.status);
      }
    } else if (error.request) {
      // Request made but no response
      console.error("Network error - no response received");
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Fungsi helper
const showLoadingIndicator = () => {
  console.log("Loading...");
};

const hideLoadingIndicator = () => {
  console.log("Loading complete");
};

// Penggunaan
const fetchData = async () => {
  try {
    const response = await api.get("/posts");
    console.log(response.data);
  } catch (error) {
    // Error sudah dihandle di interceptor
  }
};

// Multiple interceptors
const requestInterceptor1 = api.interceptors.request.use((config) => {
  console.log("Interceptor 1");
  return config;
});

const requestInterceptor2 = api.interceptors.request.use((config) => {
  console.log("Interceptor 2");
  return config;
});

// Remove interceptor
api.interceptors.request.eject(requestInterceptor1);

export default api;
```

---

## Best Practices Konsumsi API

Praktik terbaik dalam mengkonsumsi API:

```javascript
// 1. Pisahkan API logic ke service/api file terpisah
// services/postService.js
import api from "./api";

export const postService = {
  // Get all posts
  getAllPosts: async (params = {}) => {
    try {
      const response = await api.get("/posts", { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get single post
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create post
  createPost: async (postData) => {
    try {
      const response = await api.post("/posts", postData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update post
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete post
  deletePost: async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

// 2. Gunakan custom hook untuk reusability
// hooks/useAPI.js
import { useState, useEffect } from "react";

export const useAPI = (apiFunc, params = null, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = params ? await apiFunc(params) : await apiFunc();

        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

// 3. Penggunaan di component
import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { postService } from "./services/postService";
import { useAPI } from "./hooks/useAPI";

const PostsScreen = () => {
  const {
    data: posts,
    loading,
    error,
  } = useAPI(postService.getAllPosts, { _limit: 10 }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
};

// 4. Environment variables untuk API URLs
// .env
// API_BASE_URL=https://api.production.com
// API_TIMEOUT=10000

// config.js
export const API_CONFIG = {
  baseURL: process.env.API_BASE_URL || "https://api.development.com",
  timeout: parseInt(process.env.API_TIMEOUT) || 10000,
};

// 5. Request debouncing untuk search
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const searchAPI = async (term) => {
    const result = await postService.getAllPosts({ q: term });
    if (result.success) {
      setResults(result.data);
    }
  };

  // Debounce search untuk mengurangi request
  const debouncedSearch = useCallback(
    debounce((term) => searchAPI(term), 500),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm]);

  return (
    // Component UI
    <></>
  );
};
```

---

## Handling Network Errors dan Timeout

Menangani berbagai jenis network error:

```javascript
import axios from "axios";
import { Alert } from "react-native";

// 1. Setup timeout
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000, // 5 detik
});

// 2. Comprehensive error handling
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await api.get(url);
    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = "An error occurred";
    let errorType = "unknown";

    if (error.code === "ECONNABORTED") {
      // Timeout error
      errorMessage = "Request timeout. Please try again.";
      errorType = "timeout";
    } else if (error.message === "Network Error") {
      // No internet connection
      errorMessage = "No internet connection. Please check your network.";
      errorType = "network";
    } else if (error.response) {
      // Server responded with error
      errorType = "server";
      switch (error.response.status) {
        case 400:
          errorMessage = "Bad request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please login again.";
          break;
        case 403:
          errorMessage = "Access forbidden.";
          break;
        case 404:
          errorMessage = "Resource not found.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        case 503:
          errorMessage = "Service unavailable. Please try again later.";
          break;
        default:
          errorMessage = `Error: ${error.response.status}`;
      }
    } else if (error.request) {
      // Request made but no response
      errorMessage = "No response from server. Please try again.";
      errorType = "no_response";
    }

    return {
      success: false,
      error: errorMessage,
      errorType,
      originalError: error,
    };
  }
};

// 3. Custom hook dengan error handling
import { useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useAPIWithRetry = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async (apiFunc, maxRetries = 3) => {
    setLoading(true);
    setError(null);

    // Check internet connection first
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setError("No internet connection");
      setLoading(false);
      Alert.alert(
        "No Internet",
        "Please check your internet connection and try again."
      );
      return;
    }

    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const result = await apiFunc();

        if (result.success) {
          setData(result.data);
          setError(null);
          setRetryCount(0);
          setLoading(false);
          return result;
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        attempts++;

        if (attempts >= maxRetries) {
          setError(err.message);
          setRetryCount(attempts);
          setLoading(false);

          Alert.alert(
            "Error",
            `Failed after ${attempts} attempts. ${err.message}`,
            [
              { text: "Cancel", style: "cancel" },
              { text: "Retry", onPress: () => fetchData(apiFunc, maxRetries) },
            ]
          );
          return;
        }

        // Wait before retry (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempts) * 1000)
        );
      }
    }
  };

  const retry = (apiFunc, maxRetries = 3) => {
    fetchData(apiFunc, maxRetries);
  };

  return { data, loading, error, fetchData, retry, retryCount };
};

// 4. Penggunaan di component
import React, { useEffect } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { postService } from "./services/postService";
import { useAPIWithRetry } from "./hooks/useAPIWithRetry";

const PostsWithRetry = () => {
  const { data, loading, error, fetchData, retry } = useAPIWithRetry();

  useEffect(() => {
    fetchData(() => postService.getAllPosts({ _limit: 10 }), 3);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
        <Button
          title="Retry"
          onPress={() =>
            retry(() => postService.getAllPosts({ _limit: 10 }), 3)
          }
        />
      </View>
    );
  }

  return <View>{/* Render data */}</View>;
};

// 5. Cancel request (untuk menghindari memory leak)
import { useEffect, useRef } from "react";

const ComponentWithCancelToken = () => {
  const cancelTokenSource = useRef(null);

  useEffect(() => {
    cancelTokenSource.current = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get("/posts", {
          cancelToken: cancelTokenSource.current.token,
        });
        console.log(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error:", error);
        }
      }
    };

    fetchData();

    // Cleanup: cancel request jika component unmount
    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel("Component unmounted");
      }
    };
  }, []);

  return <View />;
};
```

---

## Caching Data untuk Performa Optimal

Implementasi caching untuk mengurangi request ke server:

```javascript
// 1. Simple memory cache
class APICache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
  }

  set(key, data, ttl = 300000) {
    // Default 5 menit
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now() + ttl);
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const timestamp = this.timestamps.get(key);
    if (Date.now() > timestamp) {
      // Cache expired
      this.cache.delete(key);
      this.timestamps.delete(key);
      return null;
    }

    return this.cache.get(key);
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }

  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }
}

const apiCache = new APICache();

// 2. API service dengan caching
export const postServiceWithCache = {
  getAllPosts: async (params = {}, useCache = true) => {
    const cacheKey = `posts_${JSON.stringify(params)}`;

    // Check cache first
    if (useCache) {
      const cachedData = apiCache.get(cacheKey);
      if (cachedData) {
        console.log("Returning cached data");
        return { success: true, data: cachedData, fromCache: true };
      }
    }

    try {
      const response = await api.get("/posts", { params });

      // Save to cache
      apiCache.set(cacheKey, response.data, 300000); // 5 menit

      return { success: true, data: response.data, fromCache: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  clearCache: () => {
    apiCache.clear();
  },
};

// 3. AsyncStorage cache untuk persistent storage
import AsyncStorage from "@react-native-async-storage/async-storage";

class PersistentCache {
  async set(key, data, ttl = 300000) {
    const item = {
      data,
      timestamp: Date.now() + ttl,
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  }

  async get(key) {
    try {
      const item = await AsyncStorage.getItem(key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      if (Date.now() > parsed.timestamp) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error("Cache error:", error);
      return null;
    }
  }

  async clear() {
    await AsyncStorage.clear();
  }

  async delete(key) {
    await AsyncStorage.removeItem(key);
  }
}

const persistentCache = new PersistentCache();

// 4. Hook untuk data dengan cache
import { useState, useEffect } from "react";

export const useCachedAPI = (apiFunc, params = null, cacheKey = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Check cache first
        if (cacheKey) {
          const cachedData = await persistentCache.get(cacheKey);
          if (cachedData && isMounted) {
            setData(cachedData);
            setFromCache(true);
            setLoading(false);
            // Continue fetching fresh data in background
          }
        }

        // Fetch fresh data
        const result = params ? await apiFunc(params) : await apiFunc();

        if (result.success && isMounted) {
          setData(result.data);
          setError(null);
          setFromCache(false);

          // Update cache
          if (cacheKey) {
            await persistentCache.set(cacheKey, result.data);
          }
        } else if (isMounted) {
          setError(result.error);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [cacheKey, apiFunc, params]);

  const refresh = async () => {
    if (cacheKey) {
      await persistentCache.delete(cacheKey);
    }
    setLoading(true);
    // Re-trigger useEffect by changing state
  };

  return { data, loading, error, fromCache, refresh };
};

// 5. Penggunaan di component
import React from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { postService } from "./services/postService";
import { useCachedAPI } from "./hooks/useCachedAPI";

const CachedPostsScreen = () => {
  const {
    data: posts,
    loading,
    error,
    fromCache,
    refresh,
  } = useCachedAPI(postService.getAllPosts, { _limit: 10 }, "posts_list");

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  if (loading && !posts) {
    return <ActivityIndicator size="large" />;
  }

  if (error && !posts) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      {fromCache && (
        <Text style={{ padding: 10, backgroundColor: "#ffffcc" }}>
          Showing cached data
        </Text>
      )}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.title}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
```

---

## Studi Kasus: Aplikasi Berita dengan Public API

Implementasi lengkap aplikasi berita menggunakan API:

```javascript
// 1. Setup API service
// services/newsService.js
import axios from 'axios';

const NEWS_API_KEY = 'your-api-key-here'; // Dari newsapi.org
const BASE_URL = 'https://newsapi.org/v2';

const newsAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

export const newsService = {
  getTopHeadlines: async (country = 'id', category = 'general') => {
    try {
      const response = await newsAPI.get('/top-headlines', {
        params: {
          country,
          category,
          apiKey: NEWS_API_KEY
        }
      });
      return { success: true, data: response.data.articles };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  searchNews: async (query, page = 1) => {
    try {
      const response = await newsAPI.get('/everything', {
        params: {
          q: query,
          page,
          pageSize: 20,
          apiKey: NEWS_API_KEY
        }
      });
      return { success: true, data: response.data.articles };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// 2. News List Screen
// screens/NewsListScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet
} from 'react-native';
import { newsService } from '../services/newsService';

const NewsListScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');

  const categories = [
    'general', 'business', 'technology',
    'entertainment', 'sports', 'health'
  ];

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const result = await newsService.getTopHeadlines('id', category);

      if (result.success) {
        setArticles(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const renderArticle = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('NewsDetail', { article: item })}
    >
      {item.urlToImage && (
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.source}>{item.source.name}</Text>
          <Text style={styles.date}>
            {new Date(item.publishedAt).toLocaleDateString('id-ID')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = (cat) => (
    <TouchableOpacity
      key={cat}
      style={[
        styles.categoryButton,
        category === cat && styles.categoryButtonActive
      ]}
      onPress={() => setCategory(cat)}
    >
      <Text
        style={[
          styles.categoryText,
          category === cat && styles.categoryTextActive
        ]}
      >
        {cat.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );

  if (loading && articles.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  if (error && articles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchNews}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item}
          renderItem={({ item }) => renderCategory(item)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        renderItem={renderArticle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  categoryContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0'
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF'
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666'
  },
  categoryTextActive: {
    color: 'white'
  },
  list: {
    padding: 10
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  image: {
    width: '100%',
    height: 200
  },
  content: {
    padding: 15
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 22
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  source: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600'
  },
  date: {
    fontSize: 12,
    color: '#999'
  },
  loadingText: {
    marginTop: 10,
    color: '#666'
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center'
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default NewsListScreen;

// 3. News Detail Screen
// screens/NewsDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet
} from 'react-native';

const NewsDetailScreen = ({ route }) => {
  const { article } = route.params;

  const openArticle = () => {
    Linking.openURL(article.url);
  };

  return (
    <ScrollView style={styles.container}>
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.meta}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        {article.author && (
          <Text style={styles.author}>By {article.author}</Text>
        )}

        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.body}>{article.content}</Text>

        <TouchableOpacity style={styles.button} onPress={openArticle}>
          <Text style={styles.buttonText}>Read Full Article</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    width: '100%',
    height: 250
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: 30
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  source: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600'
  },
  date: {
    fontSize: 14,
    color: '#999'
  },
  author: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 15
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#333'
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default NewsDetailScreen;
```

---

## Ringkasan dan Persiapan Mini Project

Ringkasan materi dan panduan mini project:

```javascript
// RINGKASAN MATERI

/*
1. REST API Fundamentals
   - HTTP Methods: GET, POST, PUT, DELETE
   - Status Codes: 2xx, 4xx, 5xx
   - URL Structure dan Query Parameters
   - JSON sebagai format data

2. Fetch API
   - Built-in JavaScript
   - Promise-based
   - Manual JSON parsing
   - Basic error handling

3. Axios
   - Third-party library
   - Automatic JSON transformation
   - Interceptors untuk global config
   - Better error handling

4. React Native Implementation
   - useEffect untuk lifecycle
   - State management (data, loading, error)
   - FlatList dengan API data
   - Pull to refresh

5. Best Practices
   - Separation of concerns (API services)
   - Custom hooks untuk reusability
   - Error handling
   - Caching strategies
   - Network error management
*/

// MINI PROJECT: News App
// Requirements:
// 1. Fetch berita dari API publik (NewsAPI atau JSONPlaceholder)
// 2. Tampilkan list berita dengan gambar
// 3. Detail berita saat di-tap
// 4. Pull to refresh
// 5. Error handling
// 6. Loading state

// Project Structure
/*
project-root/
├── src/
│   ├── screens/
│   │   ├── NewsListScreen.js
│   │   └── NewsDetailScreen.js
│   ├── services/
│   │   └── newsService.js
│   ├── hooks/
│   │   └── useAPI.js
│   ├── components/
│   │   ├── NewsCard.js
│   │   └── LoadingScreen.js
│   └── navigation/
│       └── AppNavigator.js
├── App.js
└── package.json
*/

// Checklist untuk Mini Project:
const projectChecklist = {
  setup: [
    "Install axios",
    "Setup API service file",
    "Create navigation structure",
  ],
  features: [
    "List berita dengan FlatList",
    "Pull to refresh functionality",
    "Loading indicator",
    "Error handling dengan retry",
    "Detail screen dengan gambar",
    "Format tanggal yang readable",
  ],
  bonus: [
    "Search functionality",
    "Category filter",
    "Caching dengan AsyncStorage",
    "Share article feature",
    "Bookmark feature",
  ],
  evaluation: [
    "Code structure dan organization",
    "Error handling",
    "User experience (loading, error states)",
    "Code readability",
    "Best practices implementation",
  ],
};

// Template untuk mulai Mini Project
// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NewsListScreen from "./src/screens/NewsListScreen";
import NewsDetailScreen from "./src/screens/NewsDetailScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="NewsList"
          component={NewsListScreen}
          options={{ title: "Latest News" }}
        />
        <Stack.Screen
          name="NewsDetail"
          component={NewsDetailScreen}
          options={{ title: "News Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// Tips untuk Mini Project:
/*
1. Mulai dengan setup API service terlebih dahulu
2. Test API call dengan console.log sebelum render UI
3. Buat UI sederhana dulu, tambahkan styling kemudian
4. Handle error state dari awal
5. Test dengan berbagai kondisi (no internet, slow connection)
6. Gunakan API gratis seperti:
   - JSONPlaceholder (https://jsonplaceholder.typicode.com)
   - NewsAPI (https://newsapi.org) - butuh API key gratis
   - The Movie DB (https://www.themoviedb.org/documentation/api)
7. Commit progress secara berkala
8. Dokumentasikan code dengan comments
*/

// Grading Rubric
const gradingRubric = {
  functionality: "40%", // Fitur berjalan dengan baik
  codeQuality: "25%", // Clean code, organized
  errorHandling: "15%", // Proper error handling
  userExperience: "15%", // Loading states, smooth transitions
  bonus: "5%", // Extra features
};

console.log("Selamat mengerjakan Mini Project! 🚀");
console.log("Deadline: 1 minggu dari sekarang");
console.log("Submit: Source code + screenshot/video demo");
```

---

## Quiz Pilihan Berganda

---

## Soal 1

Apa kepanjangan dari REST dalam REST API?

A. Remote Enhanced State Transfer
B. Representational State Transfer
C. Request Enhanced Service Technology
D. Remote Execution State Technology

**Jawaban: B**

---

## Soal 2

HTTP method mana yang digunakan untuk mengambil data dari server?

A. POST
B. PUT
C. GET
D. DELETE

**Jawaban: C**

---

## Soal 3

Status code HTTP mana yang menunjukkan request berhasil?

A. 404 Not Found
B. 500 Internal Server Error
C. 200 OK
D. 401 Unauthorized

**Jawaban: C**

---

## Soal 4

Apa format data standar yang digunakan dalam REST API?

A. XML
B. CSV
C. JSON
D. HTML

**Jawaban: C**

---

## Soal 5

Method mana yang harus digunakan dengan Fetch API untuk melakukan parsing JSON response?

A. `.parse()`
B. `.json()`
C. `.toJSON()`
D. `.getData()`

**Jawaban: B**

---

## Soal 6

Keunggulan Axios dibandingkan Fetch API adalah?

A. Built-in di JavaScript tanpa instalasi
B. Automatic JSON transformation
C. Lebih cepat dalam processing
D. Tidak perlu error handling

**Jawaban: B**

---

## Soal 7

React Hook mana yang biasanya digunakan untuk fetch data saat component pertama kali di-render?

A. useState
B. useEffect
C. useContext
D. useReducer

**Jawaban: B**

---

## Soal 8

Apa fungsi dari Axios Interceptors?

A. Menghentikan request ke server
B. Mengenkripsi data
C. Modifikasi request/response secara global
D. Mempercepat koneksi internet

**Jawaban: C**

---

## Soal 9

Status code HTTP mana yang menunjukkan resource tidak ditemukan?

A. 200 OK
B. 401 Unauthorized
C. 404 Not Found
D. 500 Internal Server Error

**Jawaban: C**

---

## Soal 10

Apa tujuan utama dari caching data API?

A. Menghemat memori perangkat
B. Mengurangi request ke server dan meningkatkan performa
C. Mengenkripsi data
D. Mempercepat koneksi internet

**Jawaban: B**

---

**Selamat! Anda telah menyelesaikan materi Data Fetching & Konsumsi API (REST API)** 🎉
