---
title: Database Lokal (AsyncStorage / SQLite)
version: 1.0.0
header: Database Lokal (AsyncStorage / SQLite)
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Database Lokal (AsyncStorage / SQLite)**

---

### Slide 1: Judul - Database Lokal dalam React Native

Pertemuan ini membahas teknik penyimpanan data lokal di perangkat mobile menggunakan React Native. Mahasiswa akan mempelajari dua pendekatan utama: AsyncStorage untuk data sederhana dan SQLite untuk data kompleks dengan relasi.

---

### Slide 2: Mengapa Perlu Penyimpanan Lokal?

Penyimpanan lokal memungkinkan aplikasi menyimpan data di perangkat pengguna tanpa koneksi internet. Keuntungannya meliputi:

- Akses data lebih cepat (tidak perlu request ke server)
- Aplikasi tetap berfungsi offline
- Mengurangi beban server dan biaya bandwidth
- Menyimpan preferensi pengguna dan cache data

Contoh use case: menyimpan token autentikasi, pengaturan aplikasi, data favorit, atau history pencarian.

---

### Slide 3: Perbandingan Penyimpanan Lokal vs Cloud

**Penyimpanan Lokal:**

- Data tersimpan di perangkat
- Akses cepat tanpa internet
- Kapasitas terbatas
- Data hilang jika aplikasi dihapus

**Penyimpanan Cloud:**

- Data tersimpan di server
- Memerlukan koneksi internet
- Kapasitas lebih besar
- Data persisten lintas perangkat

Solusi terbaik: kombinasi keduanya (local storage untuk cache, cloud untuk data utama).

---

### Slide 4: Jenis-jenis Storage di React Native

React Native menyediakan beberapa opsi penyimpanan:

**AsyncStorage:** Key-value storage sederhana untuk data kecil
**SQLite:** Database relasional untuk data terstruktur kompleks
**Realm:** Database object-oriented alternatif
**MMKV:** Storage super cepat untuk key-value
**File System:** Menyimpan file langsung (gambar, dokumen)

Pemilihan bergantung pada kompleksitas dan volume data aplikasi.

---

### Slide 5: AsyncStorage vs SQLite: Kapan Menggunakan?

**Gunakan AsyncStorage untuk:**

- Data sederhana (string, number, boolean)
- Pengaturan aplikasi
- Token autentikasi
- Data yang tidak saling berhubungan
- Jumlah data < 6MB

**Gunakan SQLite untuk:**

- Data terstruktur dengan relasi
- Query kompleks (JOIN, filtering)
- Volume data besar
- Memerlukan indexing
- Transaksi data yang kompleks

---

### Slide 6: Apa itu AsyncStorage?

AsyncStorage adalah sistem penyimpanan key-value asinkron yang sederhana dan tidak terenkripsi. Data disimpan dalam format string, sehingga objek harus dikonversi terlebih dahulu.

Karakteristik utama:

- Berbasis Promise (async/await)
- Global untuk seluruh aplikasi
- Persistent (data tetap ada setelah aplikasi ditutup)
- Tidak terenkripsi (jangan simpan data sensitif)

---

### Slide 7: Karakteristik AsyncStorage (Key-Value Storage)

AsyncStorage bekerja seperti dictionary/map dengan pasangan key-value:

```javascript
// Konsep key-value
key: "username" → value: "johndoe"
key: "theme" → value: "dark"
key: "isLoggedIn" → value: "true"
```

Setiap data diidentifikasi dengan key unik bertipe string. Value juga harus string, sehingga tipe data lain perlu dikonversi.

---

### Slide 8: Instalasi @react-native-async-storage/async-storage

Instalasi menggunakan npm atau yarn:

```bash
npm install @react-native-async-storage/async-storage
```

Untuk Expo:

```bash
npx expo install @react-native-async-storage/async-storage
```

Import dalam komponen:

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";
```

Tidak perlu konfigurasi tambahan, langsung siap digunakan.

---

### Slide 9: Metode Dasar AsyncStorage

AsyncStorage memiliki beberapa metode utama:

```javascript
// Menyimpan data
await AsyncStorage.setItem(key, value);

// Mengambil data
const value = await AsyncStorage.getItem(key);

// Menghapus satu item
await AsyncStorage.removeItem(key);

// Menghapus semua data
await AsyncStorage.clear();

// Mengambil semua keys
const keys = await AsyncStorage.getAllKeys();

// Operasi multiple
await AsyncStorage.multiSet([
  [key1, value1],
  [key2, value2],
]);
```

Semua metode bersifat asinkron dan mengembalikan Promise.

---

### Slide 10: Menyimpan Data Sederhana dengan setItem

Metode setItem menyimpan data dengan key tertentu:

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fungsi menyimpan data
const saveUserData = async () => {
  try {
    await AsyncStorage.setItem("username", "johndoe");
    await AsyncStorage.setItem("email", "john@example.com");
    console.log("Data berhasil disimpan");
  } catch (error) {
    console.error("Error menyimpan data:", error);
  }
};

// Penggunaan dalam komponen
const handleSave = () => {
  saveUserData();
};
```

Selalu gunakan try-catch untuk menangani error.

---

### Slide 11: Mengambil Data dengan getItem

Metode getItem mengambil data berdasarkan key:

```javascript
const getUserData = async () => {
  try {
    const username = await AsyncStorage.getItem("username");
    const email = await AsyncStorage.getItem("email");

    if (username !== null && email !== null) {
      console.log("Username:", username);
      console.log("Email:", email);
      return { username, email };
    } else {
      console.log("Data tidak ditemukan");
      return null;
    }
  } catch (error) {
    console.error("Error mengambil data:", error);
  }
};

// Dalam komponen
const [userData, setUserData] = useState(null);

useEffect(() => {
  const loadData = async () => {
    const data = await getUserData();
    setUserData(data);
  };
  loadData();
}, []);
```

Periksa null untuk memastikan data ada.

---

### Slide 12: Menghapus Data dengan removeItem dan clear

Menghapus data spesifik atau seluruh data:

```javascript
// Menghapus satu item
const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("username");
    console.log("Username dihapus");
  } catch (error) {
    console.error("Error menghapus:", error);
  }
};

// Menghapus beberapa item
const removeMultiple = async () => {
  try {
    const keys = ["username", "email", "token"];
    await AsyncStorage.multiRemove(keys);
    console.log("Data dihapus");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Menghapus semua data (hati-hati!)
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Semua data dihapus");
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

### Slide 13: Menyimpan Objek dan Array (JSON.stringify)

AsyncStorage hanya menerima string, gunakan JSON.stringify untuk objek:

```javascript
const saveUserProfile = async () => {
  try {
    const userProfile = {
      id: 1,
      name: "John Doe",
      age: 25,
      hobbies: ["reading", "coding", "gaming"],
    };

    // Konversi objek ke string JSON
    const jsonValue = JSON.stringify(userProfile);
    await AsyncStorage.setItem("userProfile", jsonValue);
    console.log("Profile disimpan");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Menyimpan array
const saveFavorites = async (favorites) => {
  try {
    const jsonArray = JSON.stringify(favorites);
    await AsyncStorage.setItem("favorites", jsonArray);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

### Slide 14: Membaca Objek dan Array (JSON.parse)

Gunakan JSON.parse untuk mengkonversi kembali string JSON:

```javascript
const getUserProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("userProfile");

    // Parse JSON string ke objek
    const profile = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (profile) {
      console.log("Name:", profile.name);
      console.log("Hobbies:", profile.hobbies);
      return profile;
    }
  } catch (error) {
    console.error("Error parsing:", error);
  }
};

// Membaca array
const getFavorites = async () => {
  try {
    const jsonArray = await AsyncStorage.getItem("favorites");
    return jsonArray != null ? JSON.parse(jsonArray) : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
```

---

### Slide 15: Best Practices AsyncStorage

Praktik terbaik menggunakan AsyncStorage:

```javascript
// 1. Buat helper functions
const storage = {
  save: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Save error:", e);
    }
  },

  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Get error:", e);
      return null;
    }
  },

  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Remove error:", e);
    }
  },
};

// 2. Gunakan konstanta untuk keys
const STORAGE_KEYS = {
  USER_TOKEN: "@user_token",
  USER_PROFILE: "@user_profile",
  SETTINGS: "@app_settings",
};

// 3. Jangan simpan data sensitif tanpa enkripsi
// 4. Batasi ukuran data (maksimal 6MB)
// 5. Gunakan try-catch di semua operasi
```

---

### Slide 16: Pengenalan SQLite dalam React Native

SQLite adalah database SQL embedded yang powerful untuk aplikasi mobile. Keunggulan:

- Database relasional lengkap
- Query SQL standard
- Mendukung transaksi ACID
- Performa tinggi untuk data kompleks
- Zero-configuration

SQLite cocok untuk aplikasi yang memerlukan relasi data, seperti aplikasi e-commerce, chat, atau inventory management.

---

### Slide 17: Keunggulan SQLite untuk Data Kompleks

SQLite unggul dalam skenario berikut:

**Relasi Data:**

```sql
-- Tabel Users
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);

-- Tabel Orders dengan foreign key
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  total REAL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Query Kompleks:**

```sql
-- JOIN multiple tables
SELECT users.name, COUNT(orders.id) as total_orders
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id;
```

**Indexing untuk performa:**

```sql
CREATE INDEX idx_user_id ON orders(user_id);
```

---

### Slide 18: Instalasi expo-sqlite atau react-native-sqlite-storage

Untuk Expo:

```bash
npx expo install expo-sqlite
```

Untuk React Native CLI:

```bash
npm install react-native-sqlite-storage
```

Import dalam komponen (Expo):

```javascript
import * as SQLite from "expo-sqlite";

// Membuka database
const db = SQLite.openDatabase("mydb.db");
```

Import untuk React Native CLI:

```javascript
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase({
  name: "mydb.db",
  location: "default",
});
```

---

### Slide 19: Membuka Koneksi Database SQLite

Membuka atau membuat database baru:

```javascript
import * as SQLite from "expo-sqlite";

// Membuka database (akan dibuat jika belum ada)
const db = SQLite.openDatabase("notesapp.db");

// Fungsi untuk test koneksi
const testConnection = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT 1",
      [],
      (_, result) => console.log("Database connected"),
      (_, error) => console.error("Connection failed:", error)
    );
  });
};

// Best practice: buat fungsi init database
const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      [],
      () => console.log("Table created"),
      (_, error) => console.error("Error creating table:", error)
    );
  });
};
```

---

### Slide 20: Membuat Tabel dengan SQL CREATE TABLE

Syntax CREATE TABLE untuk mendefinisikan struktur data:

```javascript
const createTables = () => {
  db.transaction((tx) => {
    // Tabel users
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );

    // Tabel categories
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT
      )`
    );

    // Tabel notes dengan foreign keys
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        category_id INTEGER,
        title TEXT NOT NULL,
        content TEXT,
        is_favorite INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )`
    );
  });
};
```

---

### Slide 21: Insert Data ke SQLite (SQL INSERT)

Menambahkan data ke tabel:

```javascript
// Insert single record
const addNote = (title, content, userId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, userId],
      (_, result) => {
        console.log("Note added with ID:", result.insertId);
      },
      (_, error) => {
        console.error("Error inserting:", error);
        return false;
      }
    );
  });
};

// Insert multiple records
const addMultipleNotes = (notesArray) => {
  db.transaction(
    (tx) => {
      notesArray.forEach((note) => {
        tx.executeSql(
          "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
          [note.title, note.content, note.userId]
        );
      });
    },
    (error) => console.error("Transaction error:", error),
    () => console.log("All notes inserted")
  );
};

// Contoh penggunaan
addNote("My First Note", "This is the content", 1);
```

Gunakan placeholder (?) untuk mencegah SQL injection.

---

### Slide 22: Query Data dari SQLite (SQL SELECT)

Mengambil data dari database:

```javascript
// SELECT semua data
const getAllNotes = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM notes ORDER BY created_at DESC",
      [],
      (_, { rows }) => {
        const notes = rows._array; // Expo SQLite
        // atau rows.raw() untuk react-native-sqlite-storage
        callback(notes);
      }
    );
  });
};

// SELECT dengan WHERE clause
const getNotesByUser = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      (_, { rows }) => callback(rows._array)
    );
  });
};

// SELECT dengan JOIN
const getNotesWithCategory = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT notes.*, categories.name as category_name 
       FROM notes 
       LEFT JOIN categories ON notes.category_id = categories.id`,
      [],
      (_, { rows }) => callback(rows._array)
    );
  });
};

// Penggunaan dalam komponen
const [notes, setNotes] = useState([]);

useEffect(() => {
  getAllNotes(setNotes);
}, []);
```

---

### Slide 23: Update Data di SQLite (SQL UPDATE)

Mengupdate data yang sudah ada:

```javascript
// Update single field
const updateNoteTitle = (noteId, newTitle) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE notes SET title = ? WHERE id = ?",
      [newTitle, noteId],
      (_, result) => {
        console.log("Rows affected:", result.rowsAffected);
      }
    );
  });
};

// Update multiple fields
const updateNote = (noteId, title, content, categoryId) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE notes 
       SET title = ?, content = ?, category_id = ?
       WHERE id = ?`,
      [title, content, categoryId, noteId],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log("Note updated successfully");
        } else {
          console.log("Note not found");
        }
      }
    );
  });
};

// Toggle favorite
const toggleFavorite = (noteId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE notes SET is_favorite = NOT is_favorite WHERE id = ?",
      [noteId]
    );
  });
};
```

---

### Slide 24: Delete Data dari SQLite (SQL DELETE)

Menghapus data dari tabel:

```javascript
// Delete single record
const deleteNote = (noteId) => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM notes WHERE id = ?", [noteId], (_, result) => {
      console.log("Deleted rows:", result.rowsAffected);
    });
  });
};

// Delete dengan kondisi
const deleteOldNotes = (daysOld) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM notes 
       WHERE created_at < datetime('now', '-' || ? || ' days')`,
      [daysOld],
      (_, result) => {
        console.log("Deleted old notes:", result.rowsAffected);
      }
    );
  });
};

// Delete all (hati-hati!)
const deleteAllNotes = () => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM notes", [], (_, result) => {
      console.log("All notes deleted");
    });
  });
};

// Soft delete (alternative)
const softDeleteNote = (noteId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE notes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?",
      [noteId]
    );
  });
};
```

---

### Slide 25: Menggunakan Transaction untuk Keamanan Data

Transaction memastikan konsistensi data (all or nothing):

```javascript
// Transaction untuk operasi kompleks
const transferNote = (noteId, fromUserId, toUserId) => {
  db.transaction(
    (tx) => {
      // Step 1: Verifikasi note milik fromUser
      tx.executeSql(
        "SELECT id FROM notes WHERE id = ? AND user_id = ?",
        [noteId, fromUserId],
        (_, { rows }) => {
          if (rows.length === 0) {
            throw new Error("Note not found or unauthorized");
          }
        }
      );

      // Step 2: Update owner
      tx.executeSql("UPDATE notes SET user_id = ? WHERE id = ?", [
        toUserId,
        noteId,
      ]);

      // Step 3: Log transfer
      tx.executeSql(
        "INSERT INTO transfer_logs (note_id, from_user, to_user) VALUES (?, ?, ?)",
        [noteId, fromUserId, toUserId]
      );
    },
    (error) => {
      // Rollback otomatis jika error
      console.error("Transaction failed:", error);
    },
    () => {
      // Success callback
      console.log("Transfer completed successfully");
    }
  );
};

// Transaction dengan async/await (Expo SQLite)
const addNoteWithCategory = async (title, content, categoryName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Insert category first
      tx.executeSql(
        "INSERT INTO categories (name) VALUES (?)",
        [categoryName],
        (_, result) => {
          const categoryId = result.insertId;

          // Then insert note with category
          tx.executeSql(
            "INSERT INTO notes (title, content, category_id) VALUES (?, ?, ?)",
            [title, content, categoryId],
            (_, noteResult) => resolve(noteResult.insertId)
          );
        }
      );
    }, reject);
  });
};
```

---

### Slide 26: Studi Kasus - Aplikasi Catatan dengan AsyncStorage

Implementasi lengkap aplikasi catatan sederhana:

```javascript
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "@notes_storage";

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
      if (jsonValue !== null) {
        setNotes(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Error loading notes:", e);
    }
  };

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (e) {
      console.error("Error saving notes:", e);
    }
  };

  const addNote = () => {
    if (title.trim() === "") return;

    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    saveNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    saveNotes(filtered);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Note" onPress={addNote} />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Button title="Delete" onPress={() => deleteNote(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default NotesApp;
```

---

### Slide 27: Studi Kasus - Aplikasi To-Do List dengan SQLite

Implementasi aplikasi to-do list dengan SQLite:

```javascript
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todos.db");

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    initDatabase();
    loadTodos();
  }, []);

  const initDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          completed INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );
    });
  };

  const loadTodos = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos ORDER BY created_at DESC",
        [],
        (_, { rows }) => setTodos(rows._array)
      );
    });
  };

  const addTodo = () => {
    if (inputText.trim() === "") return;

    db.transaction((tx) => {
      tx.executeSql("INSERT INTO todos (text) VALUES (?)", [inputText], () => {
        setInputText("");
        loadTodos();
      });
    });
  };

  const toggleComplete = (id, currentStatus) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE todos SET completed = ? WHERE id = ?",
        [currentStatus ? 0 : 1, id],
        () => loadTodos()
      );
    });
  };

  const deleteTodo = (id) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM todos WHERE id = ?", [id], () => loadTodos());
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter todo"
          style={{ flex: 1, borderWidth: 1, padding: 10 }}
        />
        <Button title="Add" onPress={addTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              borderBottomWidth: 1,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => toggleComplete(item.id, item.completed)}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  textDecorationLine: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button
              title="Delete"
              onPress={() => deleteTodo(item.id)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

export default TodoApp;
```

---

### Slide 28: Error Handling dalam Storage Lokal

Best practices untuk menangani error:

```javascript
// AsyncStorage error handling
const safeAsyncStorage = {
  setItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return { success: true };
    } catch (error) {
      console.error("AsyncStorage setItem error:", error);
      // Handle specific errors
      if (error.message.includes("QuotaExceededError")) {
        return { success: false, error: "Storage limit exceeded" };
      }
      return { success: false, error: error.message };
    }
  },

  getItem: async (key, defaultValue = null) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (error) {
      console.error("AsyncStorage getItem error:", error);
      return defaultValue;
    }
  },
};

// SQLite error handling
const safeSQLExecute = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          sql,
          params,
          (_, result) => resolve(result),
          (_, error) => {
            console.error("SQL Error:", error);
            // Handle specific SQL errors
            if (error.message.includes("UNIQUE constraint")) {
              reject(new Error("Duplicate entry"));
            } else if (error.message.includes("no such table")) {
              reject(new Error("Table does not exist"));
            } else {
              reject(error);
            }
            return false;
          }
        );
      },
      (error) => reject(error)
    );
  });
};

// Contoh penggunaan dengan user feedback
const saveUserProfile = async (profile) => {
  const result = await safeAsyncStorage.setItem("profile", profile);
  if (!result.success) {
    Alert.alert("Error", `Failed to save: ${result.error}`);
  }
};
```

---

### Slide 29: Migrasi Data dan Versioning Database

Mengelola perubahan struktur database:

```javascript
const DATABASE_VERSION = 3;
const VERSION_KEY = "@db_version";

const migrateDatabase = async () => {
  try {
    const currentVersion = await AsyncStorage.getItem(VERSION_KEY);
    const version = currentVersion ? parseInt(currentVersion) : 0;

    if (version < DATABASE_VERSION) {
      db.transaction(
        (tx) => {
          // Migration version 1 to 2
          if (version < 2) {
            tx.executeSql("ALTER TABLE notes ADD COLUMN category_id INTEGER");
            console.log("Migrated to version 2");
          }

          // Migration version 2 to 3
          if (version < 3) {
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS tags (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT UNIQUE NOT NULL
            )`
            );
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS note_tags (
              note_id INTEGER,
              tag_id INTEGER,
              FOREIGN KEY (note_id) REFERENCES notes(id),
              FOREIGN KEY (tag_id) REFERENCES tags(id),
              PRIMARY KEY (note_id, tag_id)
            )`
            );
            console.log("Migrated to version 3");
          }
        },
        (error) => console.error("Migration failed:", error),
        async () => {
          await AsyncStorage.setItem(VERSION_KEY, DATABASE_VERSION.toString());
          console.log("Migration completed");
        }
      );
    }
  } catch (error) {
    console.error("Migration error:", error);
  }
};

// Panggil saat aplikasi start
useEffect(() => {
  migrateDatabase();
}, []);
```

---

## Quiz Pilihan Berganda

---

## Soal 1

Apa keuntungan utama menggunakan penyimpanan lokal (local storage) dalam aplikasi mobile?

A. Mempercantik tampilan aplikasi
B. Aplikasi dapat berfungsi offline dan akses data lebih cepat
C. Mengurangi ukuran file aplikasi
D. Meningkatkan kualitas gambar

**Jawaban: B**

---

## Soal 2

Kapan sebaiknya kita menggunakan AsyncStorage dibandingkan SQLite?

A. Untuk menyimpan data terstruktur dengan relasi kompleks
B. Untuk data sederhana seperti token autentikasi dan pengaturan aplikasi
C. Untuk data yang memerlukan JOIN query
D. Untuk data berukuran lebih dari 10MB

**Jawaban: B**

---

## Soal 3

Apa tipe data yang dapat disimpan langsung di AsyncStorage?

A. Object dan Array
B. Number dan Boolean
C. Hanya String
D. Semua tipe data JavaScript

**Jawaban: C**

---

## Soal 4

Metode apa yang digunakan untuk menyimpan data ke AsyncStorage?

A. `AsyncStorage.save(key, value)`
B. `AsyncStorage.setItem(key, value)`
C. `AsyncStorage.write(key, value)`
D. `AsyncStorage.put(key, value)`

**Jawaban: B**

---

## Soal 5

Bagaimana cara menyimpan object JavaScript ke AsyncStorage?

A. Langsung menyimpan object tanpa konversi
B. Menggunakan `JSON.stringify()` untuk konversi ke string
C. Menggunakan `toString()` method
D. Menggunakan `Object.freeze()`

**Jawaban: B**

---

## Soal 6

Apa kepanjangan dari SQL dalam SQLite?

A. Simple Query Language
B. Structured Query Language
C. Standard Quality Language
D. System Query Library

**Jawaban: B**

---

## Soal 7

Query SQL mana yang digunakan untuk menambahkan data ke tabel?

A. `CREATE INTO table_name`
B. `ADD TO table_name`
C. `INSERT INTO table_name`
D. `APPEND INTO table_name`

**Jawaban: C**

---

## Soal 8

Apa fungsi dari placeholder `?` dalam query SQLite?

A. Untuk membuat query lebih cepat
B. Untuk mencegah SQL injection dengan parameterized query
C. Untuk membuat query terlihat lebih rapi
D. Untuk menandai query yang belum selesai

**Jawaban: B**

---

## Soal 9

Apa kegunaan Transaction dalam SQLite?

A. Mempercepat eksekusi query
B. Memastikan konsistensi data dengan prinsip all-or-nothing
C. Mengurangi ukuran database
D. Mengenkripsi data otomatis

**Jawaban: B**

---

## Soal 10

Metode SQL mana yang digunakan untuk mengambil data dari tabel?

A. `GET FROM table_name`
B. `FETCH FROM table_name`
C. `SELECT FROM table_name`
D. `RETRIEVE FROM table_name`

**Jawaban: C**

---

**Selamat! Anda telah menyelesaikan materi Database Lokal (AsyncStorage / SQLite)** 🎉
