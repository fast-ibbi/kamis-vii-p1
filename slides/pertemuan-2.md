---
title: Pengenalan JavaScript ES6
version: 1.0.0
header: Pengenalan JavaScript ES6
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Pengenalan JavaScript ES6**

---

## Pendahuluan JavaScript ES6

- ES6 atau ECMAScript 2015 adalah standar besar pembaruan JavaScript.
- Membawa sintaks modern, fitur sintetik untuk kode lebih ringkas dan kuat.
- Diluncurkan pada Juni 2015 setelah 6 tahun tanpa update besar.
- Menjadi fondasi JavaScript modern yang digunakan hingga sekarang.
- Didukung penuh oleh semua browser modern dan runtime seperti Node.js.

---

## Kenapa ES6 Penting?

- JavaScript lama punya keterbatasan untuk pengembangan modern.
- ES6 mengoptimalkan penulisan kode dan meningkatkan performa.
- Memecahkan masalah seperti hoisting, callback hell, dan scope confusion.
- Memberikan sintaks yang lebih ekspresif dan mudah dibaca.
- Standar industri untuk development web dan aplikasi JavaScript modern.

---

## Let & Const (Variabel Baru)

- `var` punya scope fungsi dan bisa dideklarasi ulang.
- `let` punya block scope dan tidak bisa dideklarasi ulang.
- `const` untuk nilai konstan tetap, juga block scope.
- Mengatasi masalah hoisting yang membingungkan di `var`.

---

Contoh:

```js
let x = 10;
const y = 20;
// y = 30; // Error: Assignment to constant variable.

// Hoisting behavior
console.log(varVariable); // undefined (hoisted)
// console.log(letVariable); // ReferenceError
var varVariable = "var value";
let letVariable = "let value";
```

---

## Arrow Functions

- Sintaks fungsi singkat dan lebih ekspresif.

Contoh:

```js
const tambah = (a, b) => a + b;
```

---

## Contoh Arrow Function

```js
// Function biasa
function kali(a, b) {
  return a * b;
}

// Arrow function
const kaliArrow = (a, b) => a * b;
```

---

## Template Literals

- String dengan backticks (`) untuk interpolasi.
- Bisa menyisipkan ekspresi dengan `${}`.
- Mendukung multi-line string.

---

Contoh:

```js
const nama = "Andi";
const umur = 25;
console.log(`Halo, ${nama}! Umur: ${umur}`);

// Multi-line string
const html = `
  <div>
    <h1>${nama}</h1>
    <p>Umur: ${umur} tahun</p>
  </div>
`;
```

---

## Destructuring Assignment

- Memudahkan memecah array atau objek ke variabel.
- Mengurangi repetisi kode.
- Mendukung default values dan rest pattern.
- Berguna untuk parameter fungsi dan return values.

---

## Contoh Destructuring Array

```js
const arr = [10, 20, 30, 40];
const [a, b] = arr;
console.log(a, b); // 10 20
```

---

## Contoh Destructuring Objek

```js
const orang = { nama: "Budi", umur: 25, kota: "Jakarta" };
const { nama, umur } = orang;
console.log(nama, umur); // Budi 25
```

---

## Default Parameters

- Nilai default jika argumen tidak diberikan.
- Mengurangi pengecekan manual parameter.
- Bisa menggunakan ekspresi sebagai default value.
- Parameter sebelumnya bisa digunakan untuk default selanjutnya.

---

Contoh:

```js
function greet(nama = "Tamu", waktu = "pagi") {
  console.log(`Selamat ${waktu}, ${nama}!`);
}
greet(); // Selamat pagi, Tamu!
greet("Sari"); // Selamat pagi, Sari!
greet("Andi", "sore"); // Selamat sore, Andi!
```

---

## Spread Operator (...)

- Menyebarkan isi array/objek.
- Berguna untuk copy, merge, dan passing arguments.
- Shallow copy, bukan deep copy.
- Bisa digunakan dalam function calls, array literals, object literals.

---

## Contoh Spread Operator Array

```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2); // [1, 2, 3, 4]

// Merge arrays
const fruits = ["apple", "banana"];
const vegetables = ["carrot", "lettuce"];
const food = [...fruits, ...vegetables];
console.log(food); // ['apple', 'banana', 'carrot', 'lettuce']
```

---

## Rest Parameters

- Mengumpulkan argumen fungsi menjadi array.
- Harus parameter terakhir dalam fungsi.
- Berbeda dengan `arguments` object (array-like).
- Berguna untuk fungsi dengan jumlah parameter tidak tetap.

---

## Contoh Rest Parameters

```js
function jumlah(...angka) {
  return angka.reduce((total, nilai) => total + nilai, 0);
}

console.log(jumlah(1, 2, 3)); // 6
console.log(jumlah(5, 10, 15, 20)); // 50
```

---

## Promises

- Objek menangani asynchronous operation.

---

## Contoh Promise

```js
const janji = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Sukses!"), 1000);
});
janji.then((result) => console.log(result));
```

---

## Async/Await

- Penyederhanaan penggunaan Promise.

---

## Contoh Async/Await

```js
async function tes() {
  try {
    const result = await janji;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
tes();
```

---

## Modul ES6 (Import & Export)

- Cara pembagian kode jadi modul.

---

## Contoh Modul

```js
// module.js
export const pi = 3.14;

// main.js
import { pi } from "./module.js";
console.log(pi);
```

---

## Ringkasan dan Penugasan

- Rekap fitur penting ES6.
- Latihan membuat kode menggunakan fitur ES6.
- Kesempatan tanya jawab.
