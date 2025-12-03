---
title: Handling Event, Input, dan Form Validation
version: 1.0.0
header: Handling Event, Input, dan Form Validation
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Handling Event, Input, dan Form Validation**

---

## Tujuan Pembelajaran

Mahasiswa mampu menangani interaksi pengguna, mengelola input, dan menerapkan validasi form dalam aplikasi React Native.

---

## Pengertian Event Handling

Event handling adalah proses menangkap dan merespons aksi pengguna seperti klik, sentuh, ketik, dan gesture lainnya dalam aplikasi mobile. Event handler memungkinkan aplikasi menjadi interaktif dan responsif terhadap input pengguna.

---

## Jenis-jenis Event di React Native

React Native menyediakan berbagai event handler:

- **onPress**: Ketika komponen ditekan
- **onChangeText**: Ketika teks berubah di input
- **onSubmit**: Ketika form disubmit
- **onFocus**: Ketika input mendapat fokus
- **onBlur**: Ketika input kehilangan fokus
- **onLongPress**: Ketika komponen ditekan lama
- **onScroll**: Ketika terjadi scrolling

---

## Cara Kerja Event Handler

Event handler adalah fungsi yang dipanggil ketika event terjadi. Fungsi ini dihubungkan dengan komponen melalui props dan dapat menerima parameter event untuk informasi detail.

```javascript
const handlePress = () => {
  console.log("Button pressed");
};

<Button title="Click Me" onPress={handlePress} />;
```

---

## Contoh Kode onPress

Event onPress adalah yang paling umum digunakan untuk menangani interaksi tap/klik pada komponen.

```javascript
import { Button, Alert } from "react-native";

const App = () => {
  const handleButtonPress = () => {
    Alert.alert("Success", "Tombol berhasil diklik!");
  };

  return <Button title="Klik Saya" onPress={handleButtonPress} />;
};
```

---

## Komponen Input Dasar

TextInput adalah komponen utama untuk menerima input teks dari pengguna. Komponen ini fleksibel dan dapat dikonfigurasi untuk berbagai jenis input.

```javascript
import { TextInput, StyleSheet } from "react-native";

const MyInput = () => {
  return <TextInput style={styles.input} placeholder="Masukkan nama Anda" />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});
```

---

## Props TextInput

TextInput memiliki banyak props untuk kustomisasi:

- **value**: Nilai teks yang ditampilkan
- **onChangeText**: Handler ketika teks berubah
- **placeholder**: Teks petunjuk
- **secureTextEntry**: Menyembunyikan input (password)
- **keyboardType**: Jenis keyboard
- **multiline**: Input multi-baris
- **maxLength**: Batas panjang karakter

---

```javascript
<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Email"
  keyboardType="email-address"
  maxLength={50}
  autoCapitalize="none"
/>
```

---

## Controlled Component

Controlled component adalah komponen input yang nilainya sepenuhnya dikendalikan oleh state React. Ini memastikan single source of truth dan memudahkan validasi.

```javascript
import { useState } from "react";
import { TextInput } from "react-native";

const ControlledInput = () => {
  const [name, setName] = useState("");

  return <TextInput value={name} onChangeText={setName} placeholder="Nama" />;
};
```

---

## Contoh Controlled TextInput

Dengan controlled component, kita dapat memanipulasi nilai sebelum update state.

```javascript
const [username, setUsername] = useState("");

const handleUsernameChange = (text) => {
  // Convert ke lowercase
  setUsername(text.toLowerCase());
};

return (
  <TextInput
    value={username}
    onChangeText={handleUsernameChange}
    placeholder="Username"
  />
);
```

---

## Uncontrolled vs Controlled Component

**Controlled**: State React mengontrol nilai input (recommended untuk React Native).
**Uncontrolled**: Menggunakan ref untuk akses nilai langsung (jarang digunakan di RN).

```javascript
// Controlled (Recommended)
const [value, setValue] = useState("");
<TextInput value={value} onChangeText={setValue} />;

// Uncontrolled (Not common in RN)
const inputRef = useRef();
<TextInput ref={inputRef} defaultValue="initial" />;
```

---

## State Management untuk Form

Gunakan useState atau useReducer untuk mengelola multiple input. Pendekatan object state lebih efisien untuk form kompleks.

```javascript
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
});

const handleInputChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};
```

---

## Contoh State Multiple Input

Mengelola beberapa input dalam satu state object untuk kemudahan maintenance.

```javascript
const [form, setForm] = useState({
  email: "",
  password: "",
  confirmPassword: "",
});

return (
  <>
    <TextInput
      value={form.email}
      onChangeText={(text) => setForm({ ...form, email: text })}
      placeholder="Email"
    />
    <TextInput
      value={form.password}
      onChangeText={(text) => setForm({ ...form, password: text })}
      placeholder="Password"
      secureTextEntry
    />
  </>
);
```

---

## Update State Object

Gunakan spread operator untuk update state object tanpa mutasi langsung, menjaga immutability.

```javascript
// Benar - Menggunakan spread operator
const updateField = (field, value) => {
  setForm((prevForm) => ({
    ...prevForm,
    [field]: value,
  }));
};

// Salah - Mutasi langsung
form.email = "new@email.com"; // Jangan lakukan ini!
```

---

## Pengertian Form Validation

Form validation adalah proses memverifikasi bahwa input pengguna memenuhi kriteria tertentu sebelum data diproses atau dikirim ke server. Validasi meningkatkan data quality dan user experience.

---

## Jenis Validasi

- **Client-side validation**: Validasi di aplikasi sebelum kirim data
- **Server-side validation**: Validasi di backend (wajib untuk keamanan)
- **Real-time validation**: Validasi saat user mengetik
- **On-submit validation**: Validasi saat form disubmit

---

```javascript
// Real-time validation
const handleEmailChange = (text) => {
  setEmail(text);
  if (!emailRegex.test(text)) {
    setEmailError("Email tidak valid");
  } else {
    setEmailError("");
  }
};

// On-submit validation
const handleSubmit = () => {
  if (!email || !password) {
    Alert.alert("Error", "Semua field harus diisi");
    return;
  }
  // Proses submit
};
```

---

## Validasi Email

Validasi email menggunakan regex pattern untuk memastikan format email yang benar.

```javascript
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleEmailValidation = (text) => {
  setEmail(text);
  if (!validateEmail(text)) {
    setEmailError("Format email tidak valid");
  } else {
    setEmailError("");
  }
};
```

---

## Contoh Regex Email

Pattern regex untuk validasi email yang lebih comprehensive.

```javascript
// Basic pattern
const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Comprehensive pattern
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Penggunaan
const isValidEmail = emailRegex.test("user@example.com"); // true
const isInvalid = emailRegex.test("invalid.email"); // false
```

---

## Validasi Password

Validasi password dengan kriteria: minimal 8 karakter, kombinasi huruf dan angka, karakter spesial opsional.

```javascript
const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (!minLength) return "Password minimal 8 karakter";
  if (!hasLetter) return "Password harus mengandung huruf";
  if (!hasNumber) return "Password harus mengandung angka";

  return ""; // Valid
};
```

---

## Validasi Required Field

Memastikan field wajib tidak kosong atau hanya berisi whitespace.

```javascript
const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === "") {
    return `${fieldName} wajib diisi`;
  }
  return "";
};

// Penggunaan
const nameError = validateRequired(name, "Nama");
const emailError = validateRequired(email, "Email");

if (nameError || emailError) {
  Alert.alert("Error", nameError || emailError);
  return;
}
```

---

## Error Messages

Menampilkan pesan error yang jelas, spesifik, dan membantu pengguna memperbaiki input.

```javascript
import { Text } from "react-native";

const FormInput = ({ value, onChangeText, error, placeholder }) => {
  return (
    <>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input, error && styles.inputError]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
```

---

## State untuk Error Handling

Mengelola error untuk setiap field dalam object state terpisah.

```javascript
const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const [errors, setErrors] = useState({
  email: "",
  password: "",
});

const setFieldError = (field, message) => {
  setErrors((prev) => ({
    ...prev,
    [field]: message,
  }));
};

const clearFieldError = (field) => {
  setErrors((prev) => ({
    ...prev,
    [field]: "",
  }));
};
```

---

## Kondisi Disable Button

Menonaktifkan tombol submit jika ada error atau field wajib kosong untuk mencegah submit data invalid.

```javascript
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

const isFormValid = () => {
  return email && password && !emailError && !passwordError;
};

return <Button title="Login" onPress={handleLogin} disabled={!isFormValid()} />;
```

---

## Real-time Validation

Validasi yang dijalankan saat pengguna mengetik untuk memberikan feedback instant.

```javascript
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");

const handleEmailChange = (text) => {
  setEmail(text);

  // Real-time validation
  if (text && !validateEmail(text)) {
    setEmailError("Format email tidak valid");
  } else {
    setEmailError("");
  }
};

return (
  <>
    <TextInput
      value={email}
      onChangeText={handleEmailChange}
      placeholder="Email"
    />
    {emailError && <Text style={styles.error}>{emailError}</Text>}
  </>
);
```

---

## On-Submit Validation

Validasi yang dijalankan saat form disubmit untuk memastikan semua input valid sebelum proses.

```javascript
const handleSubmit = () => {
  let hasError = false;
  const newErrors = {};

  // Validate email
  if (!email) {
    newErrors.email = "Email wajib diisi";
    hasError = true;
  } else if (!validateEmail(email)) {
    newErrors.email = "Format email tidak valid";
    hasError = true;
  }

  // Validate password
  if (!password) {
    newErrors.password = "Password wajib diisi";
    hasError = true;
  } else if (password.length < 8) {
    newErrors.password = "Password minimal 8 karakter";
    hasError = true;
  }

  setErrors(newErrors);

  if (hasError) {
    Alert.alert("Error", "Mohon perbaiki input yang salah");
    return;
  }

  // Proses login
  console.log("Form valid, proses submit");
};
```

---

## Library Validasi Populer

Library yang memudahkan validasi form di React Native:

- **Formik**: Library form management lengkap
- **React Hook Form**: Performa tinggi, minimalis
- **Yup**: Schema validation yang powerful

```javascript
// Contoh dengan Yup
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required("Password wajib diisi"),
});

// Validasi
loginSchema
  .validate({ email, password })
  .then(() => console.log("Valid"))
  .catch((err) => console.log(err.message));
```

---

## Best Practices Form UX

Praktik terbaik untuk user experience form:

- Placeholder yang jelas dan deskriptif
- Label yang visible dan meaningful
- Error message yang spesifik dan helpful
- Feedback visual (warna, icon)
- Disable state yang jelas
- Auto-focus pada field pertama

---

```javascript
<View>
  <Text style={styles.label}>Email *</Text>
  <TextInput
    value={email}
    onChangeText={handleEmailChange}
    placeholder="contoh@email.com"
    keyboardType="email-address"
    autoCapitalize="none"
    autoFocus={true}
    style={[styles.input, emailError && styles.inputError]}
  />
  {emailError && (
    <View style={styles.errorContainer}>
      <Icon name="alert-circle" color="red" />
      <Text style={styles.errorText}>{emailError}</Text>
    </View>
  )}
</View>
```

---

## Keyboard Type Optimization

Menggunakan keyboardType sesuai jenis input untuk UX lebih baik dan input lebih cepat.

```javascript
// Email
<TextInput keyboardType="email-address" />

// Nomor telepon
<TextInput keyboardType="phone-pad" />

// Angka
<TextInput keyboardType="numeric" />

// Desimal
<TextInput keyboardType="decimal-pad" />

// URL
<TextInput keyboardType="url" />

// Kombinasi dengan props lain
<TextInput
  keyboardType="email-address"
  autoCapitalize="none"
  autoCorrect={false}
/>
```

---

## Quiz Pilihan Berganda

---

## Soal 1

Event handler apa yang digunakan untuk menangani perubahan teks pada TextInput?

A. onPress
B. onChange
C. onChangeText
D. onTextChange

<!-- **Jawaban: C** -->

---

## Soal 2

Apa yang dimaksud dengan Controlled Component dalam React Native?

A. Komponen yang tidak bisa diubah
B. Komponen input yang nilainya dikendalikan oleh state React
C. Komponen yang memiliki validasi
D. Komponen yang menggunakan ref

<!-- **Jawaban: B** -->

---

## Soal 3

Prop TextInput mana yang digunakan untuk menyembunyikan input password?

A. hideText
B. passwordMode
C. secureTextEntry
D. hidePassword

<!-- **Jawaban: C** -->

---

## Soal 4

Bagaimana cara yang BENAR untuk update field tertentu dalam state object form?

A. `form.email = "new@email.com"`
B. `setForm({ email: "new@email.com" })`
C. `setForm({ ...form, email: "new@email.com" })`
D. `form = { email: "new@email.com" }`

<!-- **Jawaban: C** -->

---

## Soal 5

Jenis validasi apa yang dilakukan saat pengguna mengetik dan memberikan feedback langsung?

A. On-submit validation
B. Server-side validation
C. Real-time validation
D. Post validation

<!-- **Jawaban: C** -->

---

## Soal 6

Regex pattern mana yang VALID untuk validasi email dasar?

A. `/^[a-z]+@[a-z]+$/`
B. `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
C. `/email@domain.com/`
D. `/^@.+$/`

<!-- **Jawaban: B** -->

---

## Soal 7

Apa prop keyboardType yang tepat untuk input nomor telepon?

A. "numeric"
B. "number-pad"
C. "phone-pad"
D. "telephone"

<!-- **Jawaban: C** -->

---

## Soal 8

Kapan sebaiknya button submit di-disable dalam form?

A. Selalu disabled
B. Ketika ada error atau field wajib kosong
C. Hanya ketika loading
D. Tidak perlu disabled

<!-- **Jawaban: B** -->

---

## Soal 9

Library mana yang merupakan schema validation yang powerful untuk React Native?

A. Formik
B. Yup
C. React Hook Form
D. Redux Form

<!-- **Jawaban: B** -->

---

## Soal 10

Apa fungsi dari prop `maxLength` pada TextInput?

A. Mengatur tinggi maksimal input
B. Mengatur lebar maksimal input
C. Membatasi jumlah karakter yang bisa diinput
D. Mengatur ukuran font maksimal

<!-- **Jawaban: C** -->

---

**Selamat! Anda telah menyelesaikan materi Handling Event, Input, dan Form Validation** 🎉
