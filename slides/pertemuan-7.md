---
title: State dan Props dalam React Native
version: 1.0.0
header: State dan Props dalam React Native
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **State dan Props dalam React Native**

---

## Tujuan Pembelajaran

Setelah mengikuti pertemuan ini, mahasiswa diharapkan mampu:

- Memahami konsep props dan cara penggunaannya
- Memahami konsep state dan cara mengelolanya
- Membedakan kapan menggunakan props dan state
- Membuat form interaktif dengan validasi menggunakan state

---

## Apa itu Props?

**Props (Properties)** adalah mekanisme untuk mengirim data dari komponen parent ke komponen child. Props memungkinkan komponen menjadi reusable dengan menerima data yang berbeda-beda.

---

```javascript
// Komponen Parent
import React from "react";
import { View } from "react-native";
import Greeting from "./Greeting";

const App = () => {
  return (
    <View>
      <Greeting name="Budi" />
      <Greeting name="Ani" />
    </View>
  );
};
```

---

## Karakteristik Props

Props memiliki karakteristik khusus:

- **Read-only:** Tidak bisa diubah oleh komponen yang menerimanya
- **Immutable:** Nilainya tetap selama lifecycle
- **Unidirectional:** Mengalir dari parent ke child (top-down)

---

```javascript
// SALAH - Tidak boleh mengubah props
const Greeting = (props) => {
  props.name = "Citra"; // ERROR!
  return <Text>Hello {props.name}</Text>;
};

// BENAR - Props hanya dibaca
const Greeting = (props) => {
  return <Text>Hello {props.name}</Text>;
};
```

---

## Contoh Penggunaan Props (1)

Mengirim berbagai tipe data melalui props:

```javascript
import React from 'react';
import { Text } from 'react-native';

const Greeting = (props) => {
  return (
    <Text>
      Hello {props.name}, umur {props.age} tahun
    </Text>
  );
};

<Greeting name="Budi" age={20} />
<Greeting name="Ani" age={19} />
```

---

## Contoh Penggunaan Props (2)

Mengirim fungsi sebagai props untuk event handling:

```javascript
// Button.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
```

---

```javascript
// App.js
const App = () => {
  const handlePress = () => {
    alert("Button diklik!");
  };

  return <CustomButton title="Klik Saya" onPress={handlePress} />;
};
```

---

## Props Destructuring

Destructuring membuat kode lebih bersih dan mudah dibaca:

```javascript
// Tanpa destructuring
const Greeting = (props) => {
  return (
    <Text>
      Hello {props.name}, umur {props.age}
    </Text>
  );
};
```

---

```javascript
// Dengan destructuring (Recommended)
const Greeting = ({ name, age }) => {
  return (
    <Text>
      Hello {name}, umur {age}
    </Text>
  );
};
```

---

```javascript
// Destructuring dengan default value
const Greeting = ({ name = "Guest", age = 0 }) => {
  return (
    <Text>
      Hello {name}, umur {age}
    </Text>
  );
};
```

---

## Default Props

Menetapkan nilai default jika props tidak dikirim:

```javascript
import React from "react";
import { Text } from "react-native";

const Greeting = ({ name, age }) => {
  return (
    <Text>
      Hello {name}, umur {age}
    </Text>
  );
};
```

---

```javascript
// Cara 1: Inline default value
Greeting.defaultProps = {
  name: "Guest",
  age: 0,
};
```

---

```javascript
// Cara 2: Destructuring dengan default
const Greeting2 = ({ name = "Guest", age = 0 }) => {
  return (
    <Text>
      Hello {name}, umur {age}
    </Text>
  );
};

export default Greeting;
```

---

## PropTypes untuk Validasi

PropTypes membantu validasi tipe data props (opsional tapi recommended):

```javascript
import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

const UserCard = ({ name, age, isActive }) => {
  return (
    <Text>
      {name} - {age} tahun - {isActive ? "Aktif" : "Tidak Aktif"}
    </Text>
  );
};
```

---

```javascript
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

UserCard.defaultProps = {
  isActive: true,
};

export default UserCard;
```

---

## Apa itu State?

**State** adalah data internal komponen yang dapat berubah seiring waktu. Ketika state berubah, komponen akan re-render untuk menampilkan perubahan tersebut.

State digunakan untuk:

- Data yang berubah karena interaksi user
- Data hasil fetching API
- Toggle visibility komponen
- Form input values

---

```javascript
import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Tambah" onPress={() => setCount(count + 1)} />
    </View>
  );
};
```

---

## Perbedaan State vs Props

| Aspek      | Props                      | State                       |
| ---------- | -------------------------- | --------------------------- |
| Definisi   | Data dari parent           | Data internal komponen      |
| Mutability | Immutable                  | Mutable                     |
| Arah data  | Top-down (parent to child) | Internal komponen           |
| Perubahan  | Tidak bisa diubah komponen | Bisa diubah dengan setState |
| Re-render  | Parent re-render           | Komponen re-render          |

---

```javascript
// Props: dari parent
<UserCard name="Budi" age={20} />;

// State: internal komponen
const [count, setCount] = useState(0);
```

---

## Kapan Menggunakan State?

Gunakan state ketika:

- Data berubah karena interaksi user (klik, input, dll)
- Perlu menyimpan data temporary
- Menampilkan/menyembunyikan komponen
- Form handling
- Loading indicators

---

Jangan gunakan state untuk:

- Data yang tidak berubah (gunakan const)
- Data dari parent (gunakan props)
- Computed values (gunakan variables biasa)

---

## Functional Component dengan Hooks

Sejak React 16.8, kita menggunakan **Hooks** untuk mengelola state di Functional Component. Lebih sederhana dan modern!

```javascript
import React, { useState } from "react";
import { View, Text, Button } from "react-native";

// Modern way dengan Hooks
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Tambah" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default Counter;
```

---

## Syntax useState

Struktur dasar useState Hook:

```javascript
import { useState } from "react";

const [stateVariable, setStateFunction] = useState(initialValue);

// Contoh konkret:
const [count, setCount] = useState(0);
// count = nilai state saat ini
// setCount = fungsi untuk mengubah state
// 0 = nilai awal state

const [name, setName] = useState("");
const [isVisible, setIsVisible] = useState(false);
const [items, setItems] = useState([]);
const [user, setUser] = useState({ name: "", email: "" });
```

---

## Contoh useState Sederhana

Counter sederhana dengan increment dan decrement:

```javascript
import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>

      <View>
        <Button title="Kurang" onPress={() => setCount(count - 1)} />
        <Button title="Tambah" onPress={() => setCount(count + 1)} />
        <Button title="Reset" onPress={() => setCount(0)} />
      </View>
    </View>
  );
};

export default Counter;
```

---

## Mengubah State dengan setState

Cara yang benar mengubah state:

```javascript
import React, { useState } from "react";
import { Button } from "react-native";

const Example = () => {
  const [count, setCount] = useState(0);

  // SALAH - Jangan mutasi langsung
  const wrongWay = () => {
    count = count + 1; // ERROR! Tidak akan trigger re-render
  };
```

---

```javascript
// BENAR - Gunakan setState
const correctWay = () => {
  setCount(count + 1);
};

// BENAR - Dengan callback (untuk nilai berdasarkan state sebelumnya)
const betterWay = () => {
  setCount((prevCount) => prevCount + 1);
};
```

---

```javascript
  // BENAR - Multiple updates
  const multipleUpdates = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    // Akan menambah 3
  };

  return <Button title="Tambah" onPress={betterWay} />;
};
```

---

## Multiple State Variables

Mengelola beberapa state dalam satu komponen:

```javascript
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [submitted, setSubmitted] = useState(false);

    </View>
  );
};
```

---

## State dengan Object

Menggunakan object sebagai nilai state:

```javascript
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Update property tertentu
  const updateName = (value) => {
    setUser({ ...user, name: value });
  };

  const updateEmail = (value) => {
    setUser({ ...user, email: value });
  };
};
```

---

## State dengan Array

Contoh mengelola daftar/array dalam state:

```javascript
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
```

---

```javascript
// Menambah item
const addTodo = () => {
  if (inputText.trim()) {
    setTodos([...todos, { id: Date.now(), text: inputText }]);
    setInputText("");
  }
};

// Menghapus item
const deleteTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};

// Clear all
const clearAll = () => {
  setTodos([]);
};
```

---

## Contoh Form Input dengan State

Form lengkap dengan multiple inputs controlled:

```javascript
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleLogin = () => {
    setResult(`Login dengan: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Form</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Login" onPress={handleLogin} />

      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  result: { marginTop: 20, fontSize: 16, color: "green", textAlign: "center" },
});

export default LoginForm;
```

---

## Form Validation Sederhana

Validasi input menggunakan state dan conditional rendering:

```javascript
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const ValidatedForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validasi email
    if (!email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi password
    if (!password) {
      newErrors.password = "Password wajib diisi";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form valid! Login berhasil");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: null });
        }}
        style={[styles.input, errors.email && styles.inputError]}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors({ ...errors, password: null });
        }}
        secureTextEntry
        style={[styles.input, errors.password && styles.inputError]}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
});

export default ValidatedForm;
```

---

## Menampilkan Error Message

Teknik menampilkan pesan error berdasarkan kondisi state:

```javascript
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const FormWithErrors = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({ username: false, email: false });

  // Validasi real-time
  const getUsernameError = () => {
    if (!touched.username) return null;
    if (!username) return "Username wajib diisi";
    if (username.length < 3) return "Username minimal 3 karakter";
    return null;
  };

  const getEmailError = () => {
    if (!touched.email) return null;
    if (!email) return "Email wajib diisi";
    if (!/\S+@\S+\.\S+/.test(email)) return "Format email tidak valid";
    return null;
  };

  const usernameError = getUsernameError();
  const emailError = getEmailError();
  const isFormValid = !usernameError && !emailError && username && email;

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          onBlur={() => setTouched({ ...touched, username: true })}
          style={[styles.input, usernameError && styles.inputError]}
        />
        {usernameError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠ {usernameError}</Text>
          </View>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setTouched({ ...touched, email: true })}
          keyboardType="email-address"
          style={[styles.input, emailError && styles.inputError]}
        />
        {emailError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠ {emailError}</Text>
          </View>
        )}
      </View>

      <Button
        title="Submit"
        onPress={() => alert("Form submitted!")}
        disabled={!isFormValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  fieldContainer: { marginBottom: 15 },
  input: { borderWidth: 1, padding: 12, borderRadius: 5, borderColor: "#ccc" },
  inputError: { borderColor: "red", backgroundColor: "#fff5f5" },
  errorContainer: {
    marginTop: 5,
    backgroundColor: "#ffebee",
    padding: 8,
    borderRadius: 5,
  },
  errorText: { color: "#d32f2f", fontSize: 12 },
});

export default FormWithErrors;
```

---

## Best Practices State & Props

**Tips & Best Practices:**

1. **Jangan mutasi state langsung**

```javascript
// SALAH
state.value = newValue;

// BENAR
setState(newValue);
```

2. **Gunakan functional update untuk state yang bergantung nilai sebelumnya**

```javascript
// SALAH (bisa bug di multiple updates)
setCount(count + 1);

// BENAR
setCount((prev) => prev + 1);
```

3. **Spread operator untuk update object/array**

```javascript
// Update object
setUser({ ...user, name: "New Name" });

// Update array
setItems([...items, newItem]);
```

4. **Jangan taruh terlalu banyak state**

```javascript
// TIDAK PERLU state untuk derived values
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
// Tidak perlu state untuk fullName
const fullName = `${firstName} ${lastName}`;
```

---

## Quiz

---

## Soal 1

Apa karakteristik utama dari Props dalam React Native?

A. Mutable dan dapat diubah oleh child component
B. Read-only dan immutable
C. Hanya bisa mengirim string
D. Tidak bisa dikirim ke child component

<!-- **Jawaban: B** -->

---

## Soal 2

Bagaimana cara yang benar untuk mengubah nilai state?

A. `state.count = 5`
B. `count = 5`
C. `setCount(5)`
D. `updateCount(5)`

<!-- **Jawaban: C** -->

---

## Soal 3

Apa yang akan terjadi jika kita mencoba mengubah props secara langsung di dalam komponen child?

A. Props akan berubah dan komponen akan re-render
B. Akan terjadi error karena props bersifat read-only
C. Props akan berubah hanya di komponen child saja
D. Tidak ada yang terjadi, perubahan diabaikan

<!-- **Jawaban: B** -->

---

## Soal 4

Manakah cara yang BENAR untuk update state berdasarkan nilai state sebelumnya?

A. `setCount(count + 1)`
B. `setCount((prev) => prev + 1)`
C. `count = count + 1`
D. `updateState(count + 1)`

<!-- **Jawaban: B** -->

---

## Soal 5

Apa yang dimaksud dengan Controlled Component?

A. Component yang menggunakan Redux
B. Input yang nilainya dikontrol oleh state React
C. Component yang memiliki validasi
D. Component yang tidak bisa diubah

<!-- **Jawaban: B** -->

---

## Soal 6

Bagaimana cara yang benar untuk update property tertentu dalam state object?

A. `setUser(user.name = "John")`
B. `setUser({ name: "John" })`
C. `setUser({ ...user, name: "John" })`
D. `user.name = "John"`

<!-- **Jawaban: C** -->

---

## Soal 7

Kapan sebaiknya menggunakan state dalam komponen?

A. Untuk semua data dalam aplikasi
B. Untuk data yang tidak pernah berubah
C. Untuk data yang berubah karena interaksi user
D. Hanya untuk data dari API

<!-- **Jawaban: C** -->

---

## Soal 8

Apa fungsi dari PropTypes dalam React Native?

A. Mengubah nilai props
B. Validasi tipe data props
C. Membuat props menjadi required
D. Menghapus props yang tidak diperlukan

<!-- **Jawaban: B** -->

---

## Soal 9

Manakah pernyataan yang BENAR tentang perbedaan State dan Props?

A. State immutable, Props mutable
B. Props dari parent, State internal komponen
C. State tidak bisa diubah, Props bisa diubah
D. Props dan State adalah hal yang sama

<!-- **Jawaban: B** -->

---

## Soal 10

Bagaimana cara yang benar untuk menambahkan item baru ke array dalam state?

A. `setItems(items.push(newItem))`
B. `items.push(newItem)`
C. `setItems([...items, newItem])`
D. `setItems(items + newItem)`

<!-- **Jawaban: C** -->
