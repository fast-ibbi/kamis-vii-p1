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
```

---

```javascript
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
```

---

```javascript
// Error Response
{
  "status": "error",
  "error": {
    "code": 404,
    "message": "User not found"
  }
}
```

---

```javascript
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
```

---

```javascript
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
```

---

```javascript
// Dengan parameter
const userId = 1;
fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  .then((response) => response.json())
  .then((data) => console.log(data));
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
```

---

```javascript
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
```

---

```javascript
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  if (!user) return <Text>No user found</Text>;

  return <Text>{user.name}</Text>;
};
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
```

---

```javascript
const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

```javascript
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

<!-- **Jawaban: B** -->

---

## Soal 2

HTTP method mana yang digunakan untuk mengambil data dari server?

A. POST
B. PUT
C. GET
D. DELETE

<!-- **Jawaban: C** -->

---

## Soal 3

Status code HTTP mana yang menunjukkan request berhasil?

A. 404 Not Found
B. 500 Internal Server Error
C. 200 OK
D. 401 Unauthorized

<!-- **Jawaban: C** -->

---

## Soal 4

Apa format data standar yang digunakan dalam REST API?

A. XML
B. CSV
C. JSON
D. HTML

<!-- **Jawaban: C** -->

---

## Soal 5

Method mana yang harus digunakan dengan Fetch API untuk melakukan parsing JSON response?

A. `.parse()`
B. `.json()`
C. `.toJSON()`
D. `.getData()`

<!-- **Jawaban: B** -->

---

## Soal 6

Apa fungsi dari dependency array `[userId]` pada useEffect?

A. Menghapus userId dari memory
B. Menyimpan userId ke database
C. Re-fetch data ketika userId berubah
D. Mencegah infinite loop

<!-- **Jawaban: C** -->

---

## Soal 7

React Hook mana yang biasanya digunakan untuk fetch data saat component pertama kali di-render?

A. useState
B. useEffect
C. useContext
D. useReducer

<!-- **Jawaban: B** -->

---

## Soal 8

Apa yang harus dicek terlebih dahulu setelah mendapatkan response dari fetch?

A. response.status
B. response.ok
C. response.data
D. response.error

<!-- **Jawaban: B** -->

---

## Soal 9

Status code HTTP mana yang menunjukkan resource tidak ditemukan?

A. 200 OK
B. 401 Unauthorized
C. 404 Not Found
D. 500 Internal Server Error

<!-- **Jawaban: C** -->

---

## Soal 10

Header mana yang digunakan untuk mengirim Bearer Token dalam request?

A. Content-Type
B. Authorization
C. Accept
D. X-API-Key

<!-- **Jawaban: B** -->
