---
title: Styling dalam React Native (Flexbox & StyleSheet)
version: 1.0.0
header: Styling dalam React Native (Flexbox & StyleSheet)
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **Styling dalam React Native (Flexbox & StyleSheet)**

---

## Tujuan Pembelajaran Pertemuan 5

Setelah mengikuti pertemuan ini, mahasiswa diharapkan mampu:

- Memahami konsep styling dalam React Native
- Menggunakan StyleSheet API dengan efektif
- Menerapkan Flexbox untuk layout responsif
- Membuat tampilan yang menarik dan profesional

---

## Mengapa Styling Penting dalam Mobile Development?

Styling menentukan:

- User Experience (UX) yang baik
- Branding dan identitas aplikasi
- Readability dan usability
- Profesionalisme aplikasi

Aplikasi dengan styling buruk = tingkat uninstall tinggi

---

## Perbedaan Styling Web vs React Native

**Web CSS:**

- Menggunakan pixel (px), em, rem
- Display: block, inline, flex, grid
- Banyak property CSS standar

**React Native:**

- Menggunakan density-independent pixels
- Hanya Flexbox untuk layout
- Subset dari CSS properties
- camelCase naming (backgroundColor, bukan background-color)

---

## Pengenalan StyleSheet API

StyleSheet adalah API bawaan React Native untuk mendefinisikan style dengan performa optimal.

Keuntungan:

- Validasi error saat development
- Performa lebih baik (style di-cache)
- Code completion di IDE
- Reusability tinggi

---

## Cara Membuat dan Menggunakan StyleSheet

```javascript
import { StyleSheet, View, Text } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native</Text>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default App;
```

---

## Contoh Kode: StyleSheet Sederhana

```javascript
const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
```

```javascript
<View style={styles.box}>
  <Text style={styles.text}>Box</Text>
</View>
```

---

## Inline Styles vs StyleSheet - Perbandingan

**Inline Styles:**

```javascript
<View style={{ width: 100, height: 100, backgroundColor: "red" }}>
  <Text style={{ fontSize: 16, color: "white" }}>Inline</Text>
</View>
```

---

**StyleSheet:**

```javascript
<View style={styles.container}>
  <Text style={styles.text}>StyleSheet</Text>
</View>;

const styles = StyleSheet.create({
  container: { width: 100, height: 100, backgroundColor: "red" },
  text: { fontSize: 16, color: "white" },
});
```

StyleSheet lebih direkomendasikan untuk performa dan maintainability.

---

## Keuntungan Menggunakan StyleSheet

- **Performa**: Style object dibuat sekali dan di-reuse
- **Validasi**: Error detection saat development
- **Separation of Concerns**: Memisahkan logic dan styling
- **Reusability**: Style dapat digunakan di multiple components
- **Code Completion**: IDE autocomplete untuk style properties

---

## Konsep Dasar Flexbox

Flexbox adalah sistem layout utama di React Native untuk mengatur posisi dan ukuran komponen.

**Konsep Utama:**

- Main Axis (sumbu utama)
- Cross Axis (sumbu silang)
- Flex Container (parent)
- Flex Items (children)

Default: flexDirection adalah 'column' (berbeda dengan web yang 'row')

---

## Flex Container vs Flex Items

**Flex Container Properties:**

- flexDirection
- justifyContent
- alignItems
- flexWrap

**Flex Items Properties:**

- flex
- alignSelf
- flexGrow, flexShrink, flexBasis

---

```javascript
<View style={styles.container}>
  {" "}
  {/* Flex Container */}
  <View style={styles.item} /> {/* Flex Item */}
  <View style={styles.item} />
</View>
```

---

## Property flexDirection

- Menentukan arah susunan anak (main axis) dalam container flex.
- Nilai yang didukung: `column` (default, atas → bawah), `row` (kiri → kanan), `column-reverse` (bawah → atas), `row-reverse` (kanan → kiri).
- Mempengaruhi arah pengukuran `justifyContent` (karena mengikuti main axis) dan urutan visual anak.
- Berbeda dengan web, default React Native adalah `column`.

---

```javascript
const styles = StyleSheet.create({
  // Default (atas ke bawah)
  column: {
    flexDirection: "column",
  },

  // Kiri ke kanan
  row: {
    flexDirection: "row",
  },

  // Bawah ke atas
  columnReverse: {
    flexDirection: "column-reverse",
  },

  // Kanan ke kiri
  rowReverse: {
    flexDirection: "row-reverse",
  },
});
```

---

## Demo Visual: flexDirection

```javascript
const FlexDirectionExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: "red" }]} />
      <View style={[styles.box, { backgroundColor: "green" }]} />
      <View style={[styles.box, { backgroundColor: "blue" }]} />
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // Coba ganti: column, row-reverse, column-reverse
    padding: 20,
  },
  box: {
    width: 50,
    height: 50,
    margin: 5,
  },
});
```

---

## Property justifyContent (Alignment Sumbu Utama)

- Mengatur perataan anak terhadap sumbu utama (main axis) yang ditentukan oleh `flexDirection`.
- Nilai umum: `flex-start` (awal), `center` (tengah), `flex-end` (akhir), `space-between` (jarak hanya di antara item), `space-around` (jarak di kiri/kanan tiap item sama, tepi luar setengah), `space-evenly` (jarak sama rata termasuk tepi luar).
- Default: `flex-start`.
- Tips: Ubah `flexDirection` untuk menggeser arah perataan (horizontal vs vertikal).

---

```javascript
const styles = StyleSheet.create({
  flexStart: {
    justifyContent: "flex-start", // Awal (default)
  },
  center: {
    justifyContent: "center", // Tengah
  },
  flexEnd: {
    justifyContent: "flex-end", // Akhir
  },
  spaceBetween: {
    justifyContent: "space-between", // Ruang di antara items
  },
  spaceAround: {
    justifyContent: "space-around", // Ruang merata di sekitar items
  },
  spaceEvenly: {
    justifyContent: "space-evenly", // Ruang sama rata
  },
});
```

---

## Demo Visual: justifyContent Variations

```javascript
const JustifyContentExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: "coral" }]} />
      <View style={[styles.box, { backgroundColor: "teal" }]} />
      <View style={[styles.box, { backgroundColor: "gold" }]} />
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between", // Coba variasi lainnya
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
  },
});
```

---

## Property alignItems (Alignment Sumbu Silang)

- Mengatur perataan anak terhadap sumbu silang (cross axis), yaitu sumbu yang tegak lurus dengan `flexDirection`.
- Nilai umum: `stretch` (default, melebar memenuhi cross axis jika tanpa ukuran tetap), `flex-start`, `center`, `flex-end`, `baseline` (berdasarkan baseline teks).
- Default: `stretch`.
- Catatan: Jika anak memiliki `width`/`height` tetap di cross axis, efek `stretch` tidak terlihat.

---

```javascript
const styles = StyleSheet.create({
  stretch: {
    alignItems: "stretch", // Memenuhi cross axis (default)
  },
  flexStart: {
    alignItems: "flex-start", // Awal cross axis
  },
  center: {
    alignItems: "center", // Tengah cross axis
  },
  flexEnd: {
    alignItems: "flex-end", // Akhir cross axis
  },
  baseline: {
    alignItems: "baseline", // Baseline teks
  },
});
```

---

## Demo Visual: alignItems Variations

```javascript
const AlignItemsExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { height: 50 }]} />
      <View style={[styles.box, { height: 80 }]} />
      <View style={[styles.box, { height: 60 }]} />
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center", // Coba: flex-start, flex-end, stretch
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  box: {
    width: 60,
    backgroundColor: "purple",
    margin: 5,
  },
});
```

---

## Property alignSelf (Override alignItems)

- Mengoverride nilai `alignItems` dari parent untuk satu item saja.
- Nilai sama dengan `alignItems` ditambah `auto` (mengikuti parent).
- Berguna untuk membuat pengecualian alignment pada item tertentu tanpa mengubah seluruh container.

---

```javascript
const AlignSelfExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]} />
      <View style={[styles.box, styles.box2]} />
      <View style={[styles.box, styles.box3]} />
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start", // Default untuk semua items
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    margin: 5,
  },
  box1: {
    backgroundColor: "red",
    alignSelf: "flex-start",
  },
  box2: {
    backgroundColor: "green",
    alignSelf: "center", // Override alignItems
  },
  box3: {
    backgroundColor: "blue",
    alignSelf: "flex-end", // Override alignItems
  },
});
```

---

## Property flex (Proportional Sizing)

- Shorthand dari tiga properti: `flexGrow` (seberapa banyak tumbuh), `flexShrink` (seberapa banyak menyusut), `flexBasis` (ukuran dasar sebelum distribusi ruang).
- Di React Native, nilai numerik sederhana umum dipakai sebagai proporsi (mis. 1, 2, 3) untuk membagi ruang kosong di sepanjang main axis.
- Contoh: total `flex` 1+2+1=4 → proporsi 25% : 50% : 25%.
- Hindari menggabungkan `flex` dengan `width/height` tetap di main axis jika tidak diperlukan agar layout tetap responsif.

---

```javascript
const FlexExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text>Flex 1</Text>
      </View>
      <View style={styles.box2}>
        <Text>Flex 2</Text>
      </View>
      <View style={styles.box3}>
        <Text>Flex 1</Text>
      </View>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  box1: {
    flex: 1, // Mengambil 1 bagian (25%)
    backgroundColor: "lightblue",
  },
  box2: {
    flex: 2, // Mengambil 2 bagian (50%)
    backgroundColor: "lightgreen",
  },
  box3: {
    flex: 1, // Mengambil 1 bagian (25%)
    backgroundColor: "lightcoral",
  },
});
```

---

Total flex = 1 + 2 + 1 = 4

- box1 = 1/4 = 25%
- box2 = 2/4 = 50%
- box3 = 1/4 = 25%

---

## Demo: Penggunaan flex untuk Layout Responsif

```javascript
const ResponsiveLayout = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Content Area</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 6, // Content mengambil ruang terbesar
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 18,
    color: "#333",
  },
  footerText: {
    fontSize: 16,
    color: "white",
  },
});
```

---

## Property flexWrap (Wrapping Items)

- Mengatur apakah item boleh pindah ke baris/kolom berikutnya saat tidak muat pada satu garis main axis.
- Nilai: `nowrap` (default, tidak membungkus), `wrap` (membungkus ke baris/kolom baru).
- Catatan: `wrap-reverse` tidak didukung di React Native.
- Sering dipakai bersama `flexDirection: 'row'` untuk membuat grid sederhana.

---

```javascript
const FlexWrapExample = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <View key={item} style={styles.box}>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap", // Items akan wrap ke baris baru
    // flexWrap: 'nowrap', // Default, tidak wrap
    padding: 10,
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: "tomato",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
```

---

## Spacing: padding vs margin

- `padding`: ruang DI DALAM batas elemen (antara konten dan border).
- `margin`: ruang DI LUAR batas elemen (jarak antar elemen).
- Variasi sisi: `Top`, `Right`, `Bottom`, `Left` serta `Horizontal` (Left+Right) dan `Vertical` (Top+Bottom).
- Satuan di RN adalah density-independent pixel (tanpa `px`). `margin: 'auto'` tidak didukung.

---

```javascript
const SpacingExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxWithPadding}>
        <Text style={styles.text}>Padding 20</Text>
      </View>

      <View style={styles.boxWithMargin}>
        <Text style={styles.text}>Margin 20</Text>
      </View>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  boxWithPadding: {
    backgroundColor: "lightblue",
    padding: 20, // Ruang di DALAM box
    marginBottom: 10,
  },
  boxWithMargin: {
    backgroundColor: "lightgreen",
    margin: 20, // Ruang di LUAR box
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

// Specific spacing:
// paddingTop, paddingRight, paddingBottom, paddingLeft
// paddingHorizontal (left + right)
// paddingVertical (top + bottom)
// Sama untuk margin
```

---

## Border Styling

- `borderWidth`, `borderColor`, dan `borderRadius` adalah properti utama untuk garis tepi dan sudut membulat.
- Tersedia varian sisi: `borderTopWidth`, `borderLeftColor`, `borderTopLeftRadius`, dll.
- Lingkaran sempurna: set `width === height` dan `borderRadius` = setengah dari ukuran.
- Efek bayangan bukan bagian dari border; gunakan `shadow*` (iOS) atau `elevation` (Android).

---

```javascript
const BorderExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text>Border Width</Text>
      </View>

      <View style={styles.box2}>
        <Text>Border Radius</Text>
      </View>

      <View style={styles.box3}>
        <Text>Rounded</Text>
      </View>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  box1: {
    width: 150,
    height: 80,
    borderWidth: 3,
    borderColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  box2: {
    width: 150,
    height: 80,
    borderWidth: 2,
    borderColor: "#3498db",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  box3: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#2ecc71",
    borderRadius: 50, // Membuat lingkaran
    justifyContent: "center",
    alignItems: "center",
  },
});

// Specific borders:
// borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth
// borderTopLeftRadius, borderTopRightRadius, dll
```

---

## Background dan Color Properties

- `backgroundColor` untuk latar komponen; `color` untuk warna teks pada komponen `Text`.
- Format warna yang didukung: Hex (`#RRGGBB`), `rgb(r,g,b)`, `rgba(r,g,b,a)`, dan nama warna tertentu (mis. `tomato`).
- Transparansi gunakan kanal alpha pada `rgba` atau hex 8 digit (`#RRGGBBAA` pada RN terbaru).
- Gradien tidak native; gunakan library pihak ketiga (mis. `react-native-linear-gradient`).

---

```javascript
const ColorExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.whiteText}>Hex Color</Text>
      </View>

      <View style={styles.box2}>
        <Text style={styles.whiteText}>RGB Color</Text>
      </View>

      <View style={styles.box3}>
        <Text style={styles.whiteText}>RGBA (Transparent)</Text>
      </View>

      <View style={styles.box4}>
        <Text style={styles.darkText}>Named Color</Text>
      </View>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  box1: {
    backgroundColor: "#3498db", // Hex
    padding: 20,
    borderRadius: 10,
  },
  box2: {
    backgroundColor: "rgb(231, 76, 60)", // RGB
    padding: 20,
    borderRadius: 10,
  },
  box3: {
    backgroundColor: "rgba(46, 204, 113, 0.5)", // RGBA
    padding: 20,
    borderRadius: 10,
  },
  box4: {
    backgroundColor: "lightblue", // Named color
    padding: 20,
    borderRadius: 10,
  },
  whiteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  darkText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});
```

---

## Text Styling

- Properti umum: `fontSize`, `fontWeight`, `color`, `lineHeight`, `textAlign`, `fontStyle`, `textDecorationLine`.
- `fontWeight`: `normal`, `bold`, atau angka `'100'`–`'900'` (ketersediaan tergantung font yang dipakai).
- `textAlign`: `left`, `right`, `center`, `justify`; `lineHeight` mengatur jarak antar baris.
- Untuk pemotongan teks gunakan prop pada `Text` seperti `numberOfLines` dan `ellipsizeMode` (bukan style).

---

```javascript
const TextStylingExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title Text</Text>
      <Text style={styles.subtitle}>Subtitle Text</Text>
      <Text style={styles.body}>
        This is body text with normal weight and regular size.
      </Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.centered}>Centered Text</Text>
      <Text style={styles.italic}>Italic Text</Text>
      <Text style={styles.underline}>Underlined Text</Text>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#555",
    lineHeight: 24,
    marginBottom: 10,
  },
  caption: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  centered: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  italic: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
  underline: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

// Font weights: 'normal', 'bold', '100'-'900'
// Text align: 'left', 'right', 'center', 'justify'
// Text decoration: 'none', 'underline', 'line-through', 'underline line-through'
```

---

## Studi Kasus: Membuat Card Component

```javascript
const CardComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>IMAGE</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Card Title</Text>
          <Text style={styles.cardDescription}>
            This is a description of the card content. It demonstrates how to
            create a nice card layout.
          </Text>

          <View style={styles.cardFooter}>
            <Text style={styles.price}>$29.99</Text>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Buy Now</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Android shadow
  },
  imageContainer: {
    height: 200,
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    fontSize: 24,
    color: "#999",
    fontWeight: "bold",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#27ae60",
  },
  button: {
    backgroundColor: "#3498db",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
```

---

## Studi Kasus: Layout Grid Sederhana

```javascript
const GridLayout = () => {
  const items = [
    { id: 1, color: "#e74c3c", name: "Red" },
    { id: 2, color: "#3498db", name: "Blue" },
    { id: 3, color: "#2ecc71", name: "Green" },
    { id: 4, color: "#f39c12", name: "Orange" },
    { id: 5, color: "#9b59b6", name: "Purple" },
    { id: 6, color: "#1abc9c", name: "Teal" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grid Layout</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.gridItem, { backgroundColor: item.color }]}
          >
            <Text style={styles.gridText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
```

---

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%", // 2 kolom dengan spacing
    height: 120,
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  gridText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
```

---

## Tips & Best Practices Styling React Native

**1. Gunakan StyleSheet.create()** - Bukan inline styles
**2. Organisasi styles** - Letakkan di bawah component atau file terpisah
**3. Reusable styles** - Buat style yang dapat digunakan ulang
**4. Konsisten dengan spacing** - Gunakan kelipatan 4 atau 8 (4, 8, 12, 16, 20, 24...)
**5. Color palette** - Definisikan color constants
**6. Responsive design** - Gunakan flex, bukan fixed width/height
**7. Platform specific** - Gunakan Platform API jika perlu
**8. Performance** - Hindari nested styles yang dalam

---

```javascript
// Constants file (colors.js)
export const COLORS = {
  primary: "#3498db",
  secondary: "#2ecc71",
  danger: "#e74c3c",
  dark: "#2c3e50",
  light: "#ecf0f1",
};

// Usage
import { COLORS } from "./colors";

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
  },
});
```

---

## Quiz Pilihan Berganda

---

## Soal 1

Apa keuntungan utama menggunakan StyleSheet.create() dibandingkan inline styles?

A. Lebih mudah ditulis
B. Performa lebih baik karena style di-cache
C. Tidak ada perbedaan
D. Ukuran file lebih kecil

<!-- **Jawaban: B** -->

---

## Soal 2

Apa nilai default dari property `flexDirection` di React Native?

A. row
B. row-reverse
C. column
D. column-reverse

<!-- **Jawaban: C** -->

---

## Soal 3

Property apa yang digunakan untuk mengatur alignment pada sumbu utama (main axis)?

A. alignItems
B. alignSelf
C. justifyContent
D. alignContent

<!-- **Jawaban: C** -->

---

## Soal 4

Jika sebuah View memiliki tiga child dengan `flex: 1`, `flex: 2`, dan `flex: 1`, berapa persen ruang yang diambil oleh child kedua?

A. 25%
B. 33%
C. 50%
D. 66%

<!-- **Jawaban: C** -->

---

## Soal 5

Bagaimana cara menulis property CSS `background-color` dalam React Native?

A. background-color
B. background_color
C. backgroundColor
D. BackgroundColor

<!-- **Jawaban: C** -->

---

## Soal 6

Property apa yang digunakan untuk membuat items wrap ke baris baru jika tidak muat dalam satu baris?

A. flexWrap: 'wrap'
B. wrapContent: true
C. flexBreak: true
D. multiLine: true

<!-- **Jawaban: A** -->

---

## Soal 7

Apa perbedaan antara `padding` dan `margin`?

A. Tidak ada perbedaan
B. Padding adalah ruang di dalam element, margin adalah ruang di luar element
C. Padding adalah ruang di luar element, margin adalah ruang di dalam element
D. Keduanya sama, hanya nama yang berbeda

<!-- **Jawaban: B** -->

---

## Soal 8

Property apa yang digunakan untuk membuat sebuah kotak menjadi lingkaran sempurna?

A. shape: 'circle'
B. borderRadius dengan nilai setengah dari width/height
C. circular: true
D. roundShape: true

<!-- **Jawaban: B** -->

---

## Soal 9

Property apa yang memungkinkan satu flex item untuk mengoverride alignment dari parent container?

A. alignOverride
B. customAlign
C. alignSelf
D. selfAlign

<!-- **Jawaban: C** -->

---

## Soal 10

Nilai apa dari `justifyContent` yang memberikan jarak yang sama rata di antara dan di sekitar items?

A. space-between
B. space-around
C. space-evenly
D. space-equal

<!-- **Jawaban: C** -->
