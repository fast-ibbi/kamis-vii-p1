---
title: Pengenalan React (Komponen & JSX)
version: 1.0.0
header: Pengenalan React (Komponen & JSX)
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Pengenalan React (Komponen & JSX)**

---

## **Apa Itu React?**

React adalah library JavaScript yang dikembangkan oleh Facebook (sekarang Meta) untuk membangun antarmuka pengguna yang interaktif dan dinamis.

---

React memungkinkan developer membuat UI yang efisien dengan cara memecah tampilan menjadi komponen-komponen kecil yang dapat digunakan kembali.

---

## **Mengapa Menggunakan React?**

**Reusable Components:** Komponen dapat digunakan di berbagai tempat dalam aplikasi, mengurangi duplikasi kode dan mempermudah maintenance.[5]

**Performa Tinggi:** Virtual DOM membuat React sangat efisien dengan hanya memperbarui bagian DOM yang benar-benar berubah, bukan seluruh halaman.[6][4]

**Komunitas Besar:** React memiliki ekosistem yang sangat luas dengan ribuan library pendukung, dokumentasi lengkap, dan komunitas developer yang aktif. Ini memudahkan pembelajaran dan penyelesaian masalah.[3]

---

## **Analoginya Komponen**

Bayangkan komponen React seperti potongan LEGO. Setiap potongan LEGO memiliki fungsi dan bentuk spesifik, tetapi dapat dikombinasikan dengan potongan lain untuk membentuk struktur yang lebih besar dan kompleks. Sama seperti LEGO, komponen React bersifat modular dan dapat digunakan kembali di berbagai bagian aplikasi.[5]

Misalnya, komponen `Button` bisa digunakan di form login, halaman produk, atau dashboard, tanpa perlu menulis ulang kode button tersebut.

---

## **Apa Itu JSX?**

JSX (JavaScript XML) adalah ekstensi sintaks JavaScript yang memungkinkan developer menulis markup mirip HTML di dalam kode JavaScript. JSX membuat kode React lebih mudah dibaca dan ditulis karena menggabungkan logika dan tampilan dalam satu tempat.[1][2]

---

**Contoh JSX:**

```jsx
const element = <h1>Hello, React!</h1>;
```

Di balik layar, JSX di-compile menjadi panggilan fungsi JavaScript:

```javascript
const element = React.createElement("h1", null, "Hello, React!");
```

JSX bukan HTML asli, melainkan sintaks yang di-transpile oleh Babel menjadi JavaScript valid.[9][1]

---

## **Mengapa JSX Dipakai?**

JSX memberikan beberapa keuntungan:

**1. Kemudahan Menulis UI:** JSX memiliki sintaks yang familiar bagi developer yang sudah mengenal HTML, sehingga learning curve lebih rendah.[1]

**2. Integrasi Logika dan Tampilan:** Dengan JSX, logika JavaScript dan markup UI berada dalam satu file komponen, memudahkan pengelolaan dan pemeliharaan kode.[2]

**3. Type Safety:** Ketika menggunakan TypeScript, JSX memberikan type checking yang membantu mendeteksi error lebih awal.[9]

---

**Contoh integrasi logika:**

```jsx
const name = "Budi";
const element = <h1>Hello, {name}!</h1>;
```

Dengan JSX, variabel JavaScript dapat langsung digunakan dalam markup menggunakan kurung kurawal `{}`.[8]

---

## **Functional Component**

Functional component adalah fungsi JavaScript yang mengembalikan JSX. Ini adalah cara paling sederhana dan modern untuk membuat komponen React.[5]

**Contoh:**

```jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

**Atau menggunakan arrow function:**

```jsx
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};
```

---

## **Props (Properties)**

Props adalah cara untuk mengirim data dari parent component ke child component. Props bersifat **read-only**, artinya child component tidak boleh mengubah nilai props yang diterimanya.[5]

---

**Contoh:**

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Penggunaan:
function App() {
  return (
    <div>
      <Greeting name="Budi" />
      <Greeting name="Ani" />
      <Greeting name="Citra" />
    </div>
  );
}
```

---

**Dengan destructuring:**

```jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
    </div>
  );
}

// Penggunaan:
<Greeting name="Budi" age={25} />;
```

---

**Props dengan tipe data berbeda:**

```jsx
function UserCard({ name, age, isActive, hobbies }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}

// Penggunaan:
<UserCard
  name="Budi"
  age={25}
  isActive={true}
  hobbies={["Reading", "Gaming", "Coding"]}
/>;
```

Props memungkinkan komponen menjadi reusable dengan data yang berbeda.[3][5]

---

## **Menggunakan Props**

Props dikirim ke komponen seperti HTML attributes. Nilai props dapat berupa string, number, boolean, array, object, atau bahkan function.[5]

**Contoh berbagai tipe props:**

**String (tanpa kurung kurawal):**

```jsx
<Greeting name="Budi" />
```

**Number, Boolean, Array, Object (dengan kurung kurawal):**

```jsx
<UserProfile
  age={25}
  isStudent={true}
  courses={["React", "Node.js"]}
  address={{ city: "Jakarta", country: "Indonesia" }}
/>
```

---

## **State (Keadaan Komponen)**

State adalah data yang dapat berubah dalam komponen. Berbeda dengan props yang bersifat read-only, state dapat dimodifikasi oleh komponen itu sendiri. Ketika state berubah, React akan secara otomatis me-render ulang komponen.[5]

---

**Karakteristik state:**

- Bersifat lokal dan private untuk komponen
- Dapat berubah seiring waktu
- Perubahan state memicu re-render
- Tidak boleh diubah secara langsung, harus menggunakan fungsi setter.[3]

State cocok untuk data yang interaktif seperti:

- Input form
- Toggle button (show/hide)
- Counter
- Data yang di-fetch dari API.[5]

---

## **State di Functional Component (Hooks)**

Di functional component, state dikelola menggunakan Hook `useState` yang diperkenalkan di React 16.8. `useState` mengembalikan array dengan dua elemen: nilai state saat ini dan fungsi untuk mengubahnya.[5]

**Sintaks:**

```jsx
const [stateValue, setStateValue] = useState(initialValue);
```

---

**Contoh sederhana:**

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

---

## **List Rendering (Array dan Key)**

React dapat me-render array elemen menggunakan method JavaScript `map()`. Setiap elemen dalam list harus memiliki atribut `key` yang unik agar React dapat melacak perubahan dengan efisien.[1][5]

**Contoh sederhana:**

```jsx
function ItemList() {
  const items = ["Apple", "Banana", "Cherry"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

---

**Dengan data object:**

```jsx
function UserList() {
  const users = [
    { id: 1, name: "Budi", age: 25 },
    { id: 2, name: "Ani", age: 22 },
    { id: 3, name: "Citra", age: 28 },
  ];

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}
```

---

**Dengan komponen terpisah:**

```jsx
function UserCard({ user }) {
  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

function UserList() {
  const users = [
    { id: 1, name: "Budi", email: "budi@example.com" },
    { id: 2, name: "Ani", email: "ani@example.com" },
  ];

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

---

**Mengapa key penting:**

- Membantu React mengidentifikasi item mana yang berubah, ditambah, atau dihapus
- Meningkatkan performance rendering
- Harus unik di antara siblings (tidak perlu global unique)[5]

**Hindari menggunakan index sebagai key jika:**

- Item bisa diurutkan ulang
- Item bisa ditambah/dihapus di tengah list
- Karena dapat menyebabkan bug dan masalah performance[1]

---

**Best practice:**

```jsx
// GOOD: Gunakan unique ID dari data
<li key={user.id}>{user.name}</li>

// AVOID: Gunakan index hanya jika list statis
<li key={index}>{user.name}</li>
```

---

## **Komponen Reusable (Gunakan Lagi)**

Salah satu kekuatan utama React adalah kemampuan membuat komponen yang dapat digunakan kembali di berbagai tempat dengan data yang berbeda. Ini mengurangi duplikasi kode dan mempermudah maintenance.[5]

---

**Contoh komponen Button reusable:**

```jsx
function Button({ label, onClick, variant = "primary" }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}

// Penggunaan di berbagai tempat:
function App() {
  return (
    <div>
      <Button label="Save" onClick={() => alert("Saved!")} />
      <Button
        label="Cancel"
        onClick={() => alert("Cancelled!")}
        variant="secondary"
      />
      <Button
        label="Delete"
        onClick={() => alert("Deleted!")}
        variant="danger"
      />
    </div>
  );
}
```

---

**Contoh Card component:**

```jsx
function Card({ title, description, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Digunakan untuk berbagai konten:
function ProductList() {
  return (
    <div>
      <Card
        title="Laptop"
        description="High-performance laptop"
        image="laptop.jpg"
      />
      <Card title="Phone" description="Latest smartphone" image="phone.jpg" />
    </div>
  );
}
```

---

<!--
_class: lead
-->

# **QUIZ**

---

## **Soal 1**

**Apa kepanjangan dari JSX dalam konteks React?**

A. Java Syntax eXtension  
B. JavaScript XML  
C. JavaScript eXtended  
D. JSON eXtended

---

## **Soal 2**

**Mana pernyataan yang BENAR tentang functional component di React?**

A. Hanya bisa dibuat menggunakan class  
B. Merupakan fungsi JavaScript yang mengembalikan JSX  
C. Tidak boleh menerima props  
D. Tidak dapat menggunakan hooks

---

## **Soal 3**

**Bagaimana cara yang tepat untuk menerima props dengan destructuring?**

A. `function Greeting(props) { const {name} = props; }`  
B. `function Greeting({ name }) { return <h1>{name}</h1>; }`  
C. A dan B sama-sama benar  
D. Tidak ada jawaban yang benar

---

## **Soal 4**

**Manakah contoh penggunaan state yang TEPAT di functional component?**

A. `const [count, setCount] = useState(0);`  
B. `this.state = { count: 0 };`  
C. `state.count = 1;`  
D. `setState(count + 1);`

---

## **Soal 5**

**Mengapa setiap item dalam list rendering perlu atribut `key`?**

A. Untuk menentukan ukuran font  
B. Agar React dapat mengidentifikasi perubahan dan mengoptimalkan re-render  
C. Membuat elemen menjadi tidak dapat dihapus  
D. Untuk styling CSS otomatis

---

## **Soal 6**

**Apa yang terjadi ketika state berubah di React?**

A. Tidak ada perubahan pada tampilan  
B. React akan me-render ulang (re-render) komponen tersebut  
C. Browser akan reload otomatis  
D. State akan kembali ke nilai awal

---

## **Soal 7**

**Mana pernyataan yang BENAR tentang props di React?**

A. Props bersifat read-only dari perspektif child component  
B. Child component harus mengubah props untuk memperbarui parent  
C. Props hanya bisa berupa string  
D. Props disimpan dalam local storage otomatis

---

## **Soal 8**

**Apa hasil transpile dari JSX berikut: `const el = <h1>Hello</h1>`?**

A. `const el = React.createElement("h1", null, "Hello");`  
B. `const el = document.createElement("h1", "Hello");`  
C. `const el = <h1>Hello</h1>;`  
D. `const el = createElement(h1, "Hello");`

---

## **Soal 9**

**Manakah cara yang BENAR mengirim function sebagai prop?**

A. `<Button onClick={handleClick} />`  
B. `<Button onClick="handleClick" />`  
C. `<Button onClick={() => 'handleClick'} />`  
D. `<Button onClick={handleClick()} />`

---

## **Soal 10**

**Apa benefit UTAMA menggunakan komponen reusable?**

A. Mengurangi duplikasi kode dan mempermudah maintenance  
B. Menambah ukuran bundle secara drastis  
C. Membuat aplikasi menjadi statis  
D. Menghilangkan kebutuhan akan props
