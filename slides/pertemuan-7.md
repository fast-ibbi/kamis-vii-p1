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
// Greeting.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Greeting = (props) => {
  return (
    <Text style={styles.text}>
      Hello {props.name}, umur {props.age} tahun
    </Text>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 18, marginVertical: 5 }
});

export default Greeting;

// App.js
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

// Dengan destructuring (Recommended)
const Greeting = ({ name, age }) => {
  return (
    <Text>
      Hello {name}, umur {age}
    </Text>
  );
};

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

// Cara 1: Inline default value
Greeting.defaultProps = {
  name: "Guest",
  age: 0,
};

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

Jangan gunakan state untuk:

- Data yang tidak berubah (gunakan const)
- Data dari parent (gunakan props)
- Computed values (gunakan variables biasa)

---

## Class Component State (Intro)

Sebelum Hooks, state dikelola di Class Component (untuk konteks historis):

```javascript
import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View>
        <Text>Count: {this.state.count}</Text>
        <Button title="Tambah" onPress={this.increment} />
      </View>
    );
  }
}
```

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
import { View, Text, Button, StyleSheet } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Count: {count}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Kurang" onPress={() => setCount(count - 1)} />
        <Button title="Tambah" onPress={() => setCount(count + 1)} />
        <Button title="Reset" onPress={() => setCount(0)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  countText: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around" },
});

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

  // BENAR - Gunakan setState
  const correctWay = () => {
    setCount(count + 1);
  };

  // BENAR - Dengan callback (untuk nilai berdasarkan state sebelumnya)
  const betterWay = () => {
    setCount((prevCount) => prevCount + 1);
  };

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

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nama"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Umur"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />

      {submitted && (
        <Text style={styles.result}>
          {name} - {email} - {age} tahun
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  result: { marginTop: 20, fontSize: 16, color: "green" },
});

export default UserForm;
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

  // Atau buat fungsi generic
  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nama"
        value={user.name}
        onChangeText={(value) => handleChange("name", value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(value) => handleChange("email", value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={user.phone}
        onChangeText={(value) => handleChange("phone", value)}
        style={styles.input}
      />

      <Text style={styles.preview}>{JSON.stringify(user, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  preview: { marginTop: 20, padding: 10, backgroundColor: "#f0f0f0" },
});

export default UserProfile;
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

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tambah todo..."
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
      />
      <View style={styles.buttonRow}>
        <Button title="Tambah" onPress={addTodo} />
        <Button title="Clear All" onPress={clearAll} color="red" />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <Button
              title="Hapus"
              onPress={() => deleteTodo(item.id)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  todoText: { fontSize: 16 },
});

export default TodoList;
```

---

## Lifting State Up

**Lifting State Up** adalah teknik memindahkan state ke parent component agar bisa di-share ke multiple child components.

```javascript
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

// Child Component 1
const TemperatureInput = ({ scale, temperature, onTemperatureChange }) => {
  return (
    <View style={styles.inputContainer}>
      <Text>Masukkan suhu dalam {scale}:</Text>
      <TextInput
        value={temperature}
        onChangeText={onTemperatureChange}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  );
};

// Child Component 2
const BoilingVerdict = ({ celsius }) => {
  return (
    <Text style={styles.verdict}>
      {celsius >= 100 ? "Air akan mendidih!" : "Air tidak akan mendidih."}
    </Text>
  );
};

// Parent Component - State di-lift ke sini
const Calculator = () => {
  const [temperature, setTemperature] = useState("");

  return (
    <View style={styles.container}>
      <TemperatureInput
        scale="Celsius"
        temperature={temperature}
        onTemperatureChange={setTemperature}
      />
      <BoilingVerdict celsius={parseFloat(temperature)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputContainer: { marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginTop: 5, borderRadius: 5 },
  verdict: { fontSize: 18, fontWeight: "bold", color: "red" },
});

export default Calculator;
```

---

## Contoh Lifting State Up

Form dengan state di parent yang dibagikan ke multiple children:

```javascript
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Child: Input Component
const FormInput = ({ label, value, onChange }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} onChangeText={onChange} style={styles.input} />
    </View>
  );
};

// Child: Display Component
const FormPreview = ({ name, email }) => {
  return (
    <View style={styles.preview}>
      <Text style={styles.previewTitle}>Preview:</Text>
      <Text>Nama: {name || "-"}</Text>
      <Text>Email: {email || "-"}</Text>
    </View>
  );
};

// Parent: State dikelola di sini
const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <FormInput label="Nama" value={name} onChange={setName} />
      <FormInput label="Email" value={email} onChange={setEmail} />
      <FormPreview name={name} email={email} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5 },
  preview: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  previewTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default RegistrationForm;
```

---

## Controlled Components

**Controlled Component** adalah input yang nilainya dikontrol oleh state React.

```javascript
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const ControlledInput = () => {
  const [text, setText] = useState("");

  // Uncontrolled - TIDAK DIREKOMENDASIKAN untuk React Native
  // <TextInput />
  // Nilai tidak dikontrol React

  // Controlled - DIREKOMENDASIKAN
  // <TextInput value={text} onChangeText={setText} />
  // Nilai selalu sync dengan state

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Controlled Input:</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Ketik sesuatu..."
        style={styles.input}
      />
      <Text style={styles.output}>Anda mengetik: {text}</Text>
      <Text style={styles.output}>Panjang karakter: {text.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  output: { fontSize: 14, color: "#666", marginTop: 5 },
});

export default ControlledInput;
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

5. **Lift state up hanya jika diperlukan**

```javascript
// Taruh state sedekat mungkin dengan komponen yang menggunakannya
```

---

## Quiz Pilihan Berganda

---

## Soal 1

Apa karakteristik utama dari Props dalam React Native?

A. Mutable dan dapat diubah oleh child component
B. Read-only dan immutable
C. Hanya bisa mengirim string
D. Tidak bisa dikirim ke child component

**Jawaban: B**

---

## Soal 2

Bagaimana cara yang benar untuk mengubah nilai state?

A. `state.count = 5`
B. `count = 5`
C. `setCount(5)`
D. `updateCount(5)`

**Jawaban: C**

---

## Soal 3

Apa yang dimaksud dengan "Lifting State Up"?

A. Memindahkan state ke komponen paling atas (App.js)
B. Memindahkan state ke parent component agar bisa di-share ke multiple children
C. Menghapus state dari aplikasi
D. Memindahkan state ke Redux store

**Jawaban: B**

---

## Soal 4

Manakah cara yang BENAR untuk update state berdasarkan nilai state sebelumnya?

A. `setCount(count + 1)`
B. `setCount((prev) => prev + 1)`
C. `count = count + 1`
D. `updateState(count + 1)`

**Jawaban: B**

---

## Soal 5

Apa yang dimaksud dengan Controlled Component?

A. Component yang menggunakan Redux
B. Input yang nilainya dikontrol oleh state React
C. Component yang memiliki validasi
D. Component yang tidak bisa diubah

**Jawaban: B**

---

## Soal 6

Bagaimana cara yang benar untuk update property tertentu dalam state object?

A. `setUser(user.name = "John")`
B. `setUser({ name: "John" })`
C. `setUser({ ...user, name: "John" })`
D. `user.name = "John"`

**Jawaban: C**

---

## Soal 7

Kapan sebaiknya menggunakan state dalam komponen?

A. Untuk semua data dalam aplikasi
B. Untuk data yang tidak pernah berubah
C. Untuk data yang berubah karena interaksi user
D. Hanya untuk data dari API

**Jawaban: C**

---

## Soal 8

Apa fungsi dari PropTypes dalam React Native?

A. Mengubah nilai props
B. Validasi tipe data props
C. Membuat props menjadi required
D. Menghapus props yang tidak diperlukan

**Jawaban: B**

---

## Soal 9

Manakah pernyataan yang BENAR tentang perbedaan State dan Props?

A. State immutable, Props mutable
B. Props dari parent, State internal komponen
C. State tidak bisa diubah, Props bisa diubah
D. Props dan State adalah hal yang sama

**Jawaban: B**

---

## Soal 10

Bagaimana cara yang benar untuk menambahkan item baru ke array dalam state?

A. `setItems(items.push(newItem))`
B. `items.push(newItem)`
C. `setItems([...items, newItem])`
D. `setItems(items + newItem)`

**Jawaban: C**

---

**Selamat! Anda telah menyelesaikan materi State dan Props dalam React Native** 🎉
