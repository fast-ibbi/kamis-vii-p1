## Latihan Praktek (Soal)

1. Let & Const — Perbaiki dan jelaskan

- Diberikan kode:
  ```js
  var a = 1;
  if (true) {
    var a = 2;
  }
  console.log(a);
  ```
- Tugas: Ubah kode agar `a` di dalam blok tidak mengganti `a` di luar blok. Tunjukkan output sebelum dan sesudah.

2. Arrow Function & Default Params — Implementasi cepat

- Buat fungsi `multiplyAll(numbers, multiplier = 2)` yang menerima array angka dan mengembalikan array baru dengan setiap nilai dikalikan `multiplier`. Gunakan arrow function dan default parameter.
- Contoh input: `[1,2,3]` → default multiplier → output `[2,4,6]`.

3. Destructuring & Template Literals — Format output

- Diberikan objek `const user = { nama: 'Siti', umur: 30, kota: 'Bandung' }`.
- Tugas: Ambil `nama` dan `kota` dengan destructuring dan buat string: `"Siti tinggal di Bandung."` menggunakan template literal.

4. Spread & Rest — Manipulasi array dan fungsi variadic

- Gabungkan dua array `arr1` dan `arr2` menggunakan spread operator.
- Buat fungsi `sumAll(...nums)` yang menggunakan rest parameter untuk menjumlahkan semua argumen.

5. Promise & Async/Await — Konversi ke async

- Diberikan function yang mengembalikan Promise:
  ```js
  function delayResult(val, ms) {
    return new Promise((resolve) => setTimeout(() => resolve(val), ms));
  }
  // then-chain
  delayResult(5, 200)
    .then((a) => delayResult(a * 2, 200))
    .then(console.log);
  ```
- Tugas: Tulis ulang contoh di atas menggunakan `async/await` sehingga hasil akhirnya tetap sama (tampilkan hasil ke console).

---

## Latihan: Higher-order Functions (5 soal)

6. Map — Konversi dan transformasi

- Diberikan array objek produk:
  ```js
  const products = [
    { name: "Buku", price: 50000 },
    { name: "Pensil", price: 2000 },
    { name: "Ransel", price: 150000 },
  ];
  ```
- Tugas: Gunakan `map` untuk membuat array baru yang hanya berisi nama produk (string). Hasil contoh: `['Buku','Pensil','Ransel']`.

7. Filter — Saring berdasarkan kondisi

- Diberikan array angka: `[3, 8, 12, 5, 20]`.
- Tugas: Gunakan `filter` untuk menghasilkan array berisi angka genap saja.

8. Reduce — Jumlahkan dan temukan maksimum

- Diberikan array angka: `[10, 5, 8, 20, 3]`.
- Tugas A: Gunakan `reduce` untuk menghitung jumlah semua angka.
- Tugas B: Gunakan `reduce` untuk menemukan nilai maksimum dalam array.

9. Kombinasi (map + filter) — Pipeline data

- Diberikan array produk dengan stok:
  ```js
  const store = [
    { name: "Sapu", price: 12000, stock: 3 },
    { name: "Ember", price: 8000, stock: 0 },
    { name: "Gayung", price: 3000, stock: 10 },
  ];
  ```
- Tugas: Ambil nama produk yang masih tersedia (stock > 0) lalu ubah jadi huruf kapital semua. Gunakan chaining `filter` + `map`.

10. Implement HOF sendiri — makeMultiplier

- Tugas: Buat fungsi `makeMultiplier(n)` yang mengembalikan fungsi baru. Fungsi hasil menerima satu angka dan mengalikan angka tersebut dengan `n`.
- Contoh:
  ```js
  const mul3 = makeMultiplier(3);
  console.log(mul3(5)); // 15
  ```

---

## Jawaban (opsional)

6. Map — solusi singkat:

```js
const names = products.map((p) => p.name);
```

7. Filter — solusi singkat:

```js
const evens = [3, 8, 12, 5, 20].filter((n) => n % 2 === 0);
```

8. Reduce — solusi singkat:

```js
const sum = [10, 5, 8, 20, 3].reduce((a, b) => a + b, 0);
const max = [10, 5, 8, 20, 3].reduce((a, b) => (a > b ? a : b), -Infinity);
```

9. Kombinasi:

```js
const availableUpper = store
  .filter((item) => item.stock > 0)
  .map((item) => item.name.toUpperCase());
```

10. makeMultiplier:

```js
function makeMultiplier(n) {
  return function (x) {
    return x * n;
  };
}
```
