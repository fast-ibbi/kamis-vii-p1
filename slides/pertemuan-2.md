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

## Let & Const (Variabel Baru)

- `var` punya scope fungsi dan bisa dideklarasi ulang.
- `let` punya block scope dan tidak bisa dideklarasi ulang.
- `const` untuk nilai konstan tetap, juga block scope.

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

## Higher-order Functions (HOF)

- Fungsi yang menerima fungsi lain sebagai argumen atau mengembalikan fungsi.
- Banyak digunakan untuk memproses array secara deklaratif.

---

## Array.prototype.map()

- Menghasilkan array baru dengan hasil pemanggilan fungsi pada setiap elemen.
- Tidak mengubah array asli (pure for arrays of primitives/objects reference remains).

Contoh:

```js
const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8]
```

---

## Array.prototype.filter()

- Menghasilkan array baru berisi elemen yang lolos predikat (fungsi yang mengembalikan boolean).

Contoh:

```js
const values = [5, 10, 15, 20];
const big = values.filter((v) => v >= 15);
console.log(big); // [15, 20]
```

---

## Array.prototype.reduce()

- Menggabungkan semua elemen array menjadi satu nilai menggunakan fungsi accumulator.
- Sangat berguna untuk sum, group-by, atau membangun struktur baru.

Contoh (sum):

```js
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum); // 10
```

Contoh (group by):

```js
const names = ["alice", "bob", "alice"];
const counts = names.reduce((acc, name) => {
  acc[name] = (acc[name] || 0) + 1;
  return acc;
}, {});
console.log(counts); // { alice: 2, bob: 1 }
```

---

## forEach, find, some, every

- forEach: iterasi tanpa mengembalikan array (side-effects).
- find: mengembalikan elemen pertama yang cocok.
- some: apakah setidaknya satu elemen lolos predikat (boolean).
- every: apakah semua elemen lolos predikat (boolean).

Contoh singkat:

```js
const items = [1, 2, 3, 4];
items.forEach((x) => console.log(x));
const firstEven = items.find((x) => x % 2 === 0);
console.log(firstEven); // 2
console.log(items.some((x) => x > 3)); // true
console.log(items.every((x) => x > 0)); // true
```

---

## Tips & chaining

- Banyak HOF dapat dirangkai: `arr.map(...).filter(...).reduce(...)`.
- Prefer immutability: gunakan hasil yang dikembalikan, jangan ubah input langsung.
- Gunakan nama fungsi/predicate yang jelas untuk readability.

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
