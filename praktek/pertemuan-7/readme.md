# Latihan Praktek Pertemuan 7: State dan Props dalam React Native

## Petunjuk Umum

- Setiap soal dibuat dalam file terpisah dengan nama `soal1.js`, `soal2.js`, dst.
- Gunakan Expo atau React Native CLI untuk testing
- Fokus pada pemahaman state management dan props passing
- Test setiap komponen untuk memastikan interaktivitas berfungsi dengan baik
- Perhatikan best practices dalam penulisan code

---

## Setup Awal

Buat project baru dengan Expo:

```bash
npx create-expo-app pertemuan-7-practice
cd pertemuan-7-practice
npm start
```

Atau gunakan Expo Snack untuk testing online: https://snack.expo.dev/

---

## Soal 1: Props Sederhana - Greeting Component

Buatlah komponen `Greeting` yang menerima props dan menampilkan pesan sapaan.

**Spesifikasi:**

- Komponen menerima props: `name`, `age`, dan `city`
- Tampilkan format: "Hello [name], you are [age] years old from [city]"
- Gunakan destructuring untuk props
- Buat default props jika tidak ada nilai yang dikirim
- Style text dengan fontSize 18, color blue

**Komponen yang harus dibuat:**

```javascript
// components/Greeting.js
const Greeting = ({ name, age, city }) => {
  // Implementation here
};

Greeting.defaultProps = {
  name: "Guest",
  age: 0,
  city: "Unknown",
};

export default Greeting;
```

**Usage di App.js:**

```javascript
<Greeting name="Budi" age={20} city="Jakarta" />
<Greeting name="Ani" age={19} city="Bandung" />
<Greeting /> {/* Akan menggunakan default props */}
```

---

## Soal 2: Props dengan Function - Custom Button

Buatlah komponen `CustomButton` yang menerima props untuk customization dan event handling.

**Spesifikasi:**

- Props: `title`, `onPress`, `backgroundColor`, `textColor`
- Gunakan TouchableOpacity untuk button
- Button dengan padding 15, borderRadius 8
- Text dengan fontSize 16, fontWeight bold
- Implementasikan ripple effect atau opacity change saat ditekan

**Contoh Usage:**

```javascript
<CustomButton
  title="Login"
  onPress={() => alert("Login pressed")}
  backgroundColor="#007bff"
  textColor="#fff"
/>

<CustomButton
  title="Cancel"
  onPress={() => console.log("Cancel")}
  backgroundColor="#dc3545"
  textColor="#fff"
/>
```

**Bonus:**

- Tambahkan props `disabled` untuk disable button
- Tambahkan props `icon` untuk menampilkan icon di sebelah text

---

## Soal 3: Props dengan PropTypes Validation

Buatlah komponen `UserCard` dengan validasi props menggunakan PropTypes.

**Spesifikasi:**

- Props: `name` (string, required), `email` (string, required), `age` (number, required), `isActive` (boolean, optional)
- Install PropTypes: `npm install prop-types`
- Tampilkan card dengan border, shadow, dan padding
- Tampilkan status "Active" atau "Inactive" berdasarkan props isActive
- Gunakan warna hijau untuk active, merah untuk inactive

**PropTypes Definition:**

```javascript
import PropTypes from "prop-types";

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

UserCard.defaultProps = {
  isActive: true,
};
```

**Contoh Data:**

```javascript
<UserCard name="John Doe" email="john@example.com" age={25} isActive={true} />
<UserCard name="Jane Smith" email="jane@example.com" age={30} isActive={false} />
```

---

## Soal 4: useState - Counter Component

Buatlah aplikasi counter sederhana menggunakan useState.

**Spesifikasi:**

- State: `count` dengan initial value 0
- 4 tombol: Increment (+1), Decrement (-1), Reset (0), Add 5 (+5)
- Tampilkan count dengan fontSize 48, fontWeight bold
- Decrement button disabled ketika count = 0
- Tampilkan warna berbeda jika count negatif (merah), positif (hijau), atau nol (abu-abu)

**Fitur Tambahan:**

- Tampilkan history perubahan dalam list (5 terakhir)
- Tambahkan animasi atau transition saat nilai berubah
- Tambahkan sound effect (optional) saat button diklik

**Layout:**

```
┌─────────────────────┐
│   Counter: 5        │  (Large display)
├─────────────────────┤
│  [-1] [+1] [+5]     │  (Buttons)
│      [Reset]        │
├─────────────────────┤
│   History:          │
│   0 → 1 → 2 → 3 → 5 │
└─────────────────────┘
```

---

## Soal 5: Multiple State Variables - User Form

Buatlah form registrasi dengan multiple state variables.

**Spesifikasi:**

- State variables: `name`, `email`, `password`, `confirmPassword`, `phone`
- Semua input adalah controlled components
- Tampilkan preview data yang diinput di bawah form (real-time)
- Button "Submit" di bawah form
- Setelah submit, tampilkan alert dengan semua data
- Clear form setelah submit

**Input Fields:**

1. Name (TextInput)
2. Email (TextInput dengan keyboardType email-address)
3. Phone (TextInput dengan keyboardType phone-pad)
4. Password (TextInput dengan secureTextEntry)
5. Confirm Password (TextInput dengan secureTextEntry)

**Preview Section:**

```
Preview:
- Name: [real-time value]
- Email: [real-time value]
- Phone: [real-time value]
- Passwords match: Yes/No
```

---

## Soal 6: State dengan Object - Profile Editor

Buatlah aplikasi profile editor yang menggunakan object sebagai state.

**Spesifikasi:**

- State: `profile` object dengan properties: firstName, lastName, email, bio, birthDate
- Gunakan satu state object, bukan multiple state variables
- Update property dengan spread operator
- Implementasikan generic `handleChange` function
- Tampilkan full name (firstName + lastName) computed value
- Button "Save Profile" yang menampilkan alert dengan JSON.stringify

**Profile Object Structure:**

```javascript
const [profile, setProfile] = useState({
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
  birthDate: "",
});
```

**Generic Handler:**

```javascript
const handleChange = (field, value) => {
  setProfile((prev) => ({
    ...prev,
    [field]: value,
  }));
};
```

---

## Soal 7: State dengan Array - Todo List

Buatlah aplikasi Todo List lengkap dengan CRUD operations.

**Spesifikasi:**

- State: `todos` array dengan struktur: `{ id, text, completed, createdAt }`
- Input field untuk menambah todo baru
- Tombol untuk menambah todo
- List dengan FlatList atau ScrollView
- Setiap item memiliki:
  - Checkbox untuk toggle completed status
  - Text dengan strikethrough jika completed
  - Button delete untuk menghapus item
  - Timestamp dibuat

**Fitur:**

1. **Add Todo**: Tambah todo baru ke array
2. **Toggle Complete**: Toggle status completed
3. **Delete Todo**: Hapus todo dari array
4. **Clear Completed**: Hapus semua todo yang sudah completed
5. **Count Display**: Tampilkan total todos dan completed todos

**Bonus:**

- Filter: All / Active / Completed
- Edit todo text
- Sort by date (newest/oldest)
- Persist data dengan AsyncStorage

---

## Soal 8: Lifting State Up - Temperature Converter

Buatlah aplikasi konversi suhu dengan teknik lifting state up.

**Spesifikasi:**

- Parent component mengelola state `temperature` dan `scale` (Celsius/Fahrenheit)
- Dua child components: `TemperatureInput` untuk Celsius dan Fahrenheit
- Child ketiga: `BoilingVerdict` menampilkan apakah air mendidih atau tidak
- Konversi otomatis ketika salah satu input berubah
- Air mendidih pada 100°C atau 212°F

**Struktur Komponen:**

```
Calculator (Parent - manages state)
├── TemperatureInput (Celsius)
├── TemperatureInput (Fahrenheit)
└── BoilingVerdict
```

**Conversion Functions:**

```javascript
const toCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
```

**UI Layout:**

```
┌─────────────────────────────┐
│ Celsius:  [____] °C         │
│ Fahrenheit: [____] °F       │
├─────────────────────────────┤
│ The water would boil.       │
│ (or: The water would not    │
│  boil.)                     │
└─────────────────────────────┘
```

---

## Soal 9: Form Validation dengan State

Buatlah form login dengan validasi lengkap menggunakan state.

**Spesifikasi:**

- State: `email`, `password`, `errors`, `touched`
- Validasi rules:
  - Email: required, format email valid
  - Password: required, minimal 8 karakter, harus ada 1 huruf besar, 1 angka
- Error message muncul setelah field di-blur (touched)
- Border merah pada input yang error
- Button "Login" disabled jika form invalid
- Tampilkan loading state saat submit (simulasi 2 detik)

**Validation Logic:**

```javascript
const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
  return null;
};

const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  return null;
};
```

**States:**

- `errors`: { email: null, password: null }
- `touched`: { email: false, password: false }
- `isLoading`: boolean

**UI Elements:**

- Error message dengan background merah muda
- Loading indicator saat submit
- Success message setelah login berhasil

---

## Soal 10: Mini Project - Shopping Cart

Buatlah aplikasi shopping cart lengkap dengan state management kompleks.

**Spesifikasi:**

**Product Data:**

```javascript
const PRODUCTS = [
  { id: 1, name: "Laptop", price: 15000000, image: "url" },
  { id: 2, name: "Mouse", price: 250000, image: "url" },
  { id: 3, name: "Keyboard", price: 500000, image: "url" },
  { id: 4, name: "Monitor", price: 3000000, image: "url" },
  { id: 5, name: "Headphone", price: 750000, image: "url" },
];
```

**States yang diperlukan:**

- `cart`: Array of { productId, quantity }
- `products`: Array of product data
- `showCart`: Boolean untuk toggle cart view

**Fitur yang harus ada:**

1. **Product List Screen:**

   - Grid layout 2 kolom
   - Card dengan image, name, price
   - Button "Add to Cart"
   - Badge menampilkan jumlah item di cart
   - Button "View Cart" di header

2. **Cart Management:**

   - Add to cart (increment quantity jika sudah ada)
   - Remove from cart
   - Increase quantity (+)
   - Decrease quantity (-)
   - Clear cart

3. **Cart Screen:**

   - List items dalam cart
   - Quantity controls per item
   - Price per item
   - Subtotal per item
   - Total price di bawah
   - Button "Checkout"
   - Button "Continue Shopping"

4. **Calculations:**
   - Subtotal per item: price × quantity
   - Cart total: sum of all subtotals
   - Total items count

**Komponen Structure:**

```
App.js
├── ProductList
│   └── ProductCard
├── CartButton (with badge)
└── Cart
    └── CartItem
```

**Bonus Features:**

- Discount code functionality
- Shipping cost calculation
- Tax calculation (11%)
- Save cart to AsyncStorage
- Wishlist functionality
- Product search/filter
- Sort by price (low to high / high to low)

**UI Requirements:**

- Smooth animations saat add/remove
- Empty cart state dengan illustration
- Confirmation dialog sebelum clear cart
- Toast/Alert notification saat add to cart
- Loading states untuk async operations

---

## Tips Pengerjaan

1. **Start Simple**: Mulai dari fungsi dasar, baru tambahkan fitur kompleks
2. **Console.log**: Gunakan console.log untuk debug state changes
3. **Component Structure**: Pisahkan komponen untuk reusability
4. **State Management**: Pertimbangkan di mana state sebaiknya ditempatkan
5. **Spread Operator**: Selalu gunakan spread untuk immutable updates
6. **Functional Updates**: Gunakan callback function untuk update state berdasarkan nilai sebelumnya
7. **Validation**: Implement proper input validation
8. **Error Handling**: Handle edge cases dan errors
9. **User Feedback**: Berikan feedback visual untuk setiap action
10. **Clean Code**: Format code dengan baik, gunakan naming yang jelas

---

## Best Practices

### State Management

```javascript
// ✅ BENAR - Functional update
setCount((prev) => prev + 1);

// ❌ SALAH - Direct state reference
setCount(count + 1); // Bisa bug jika multiple updates
```

### Object State Update

```javascript
// ✅ BENAR - Spread operator
setUser({ ...user, name: "New Name" });

// ❌ SALAH - Direct mutation
user.name = "New Name"; // Tidak akan trigger re-render
```

### Array State Update

```javascript
// ✅ BENAR - Immutable operations
setItems([...items, newItem]); // Add
setItems(items.filter((item) => item.id !== id)); // Remove
setItems(items.map((item) => (item.id === id ? { ...item, updated } : item))); // Update

// ❌ SALAH - Mutable operations
items.push(newItem); // Mutates original array
```

---

## Kriteria Penilaian

- **Fungsionalitas (40%)**: Semua fitur bekerja dengan benar
- **State Management (25%)**: Proper use of useState, lifting state up
- **Props Handling (15%)**: Correct props passing dan validation
- **UI/UX (10%)**: Tampilan menarik dan user-friendly
- **Code Quality (10%)**: Clean code, proper naming, comments

---

## Testing Checklist

Sebelum submit, pastikan:

- [ ] Tidak ada error di console
- [ ] Semua button berfungsi
- [ ] State updates correctly
- [ ] Props passed correctly
- [ ] Input validation works
- [ ] Edge cases handled
- [ ] UI responsive
- [ ] Code properly formatted
- [ ] Components exported/imported correctly
- [ ] Default props set (if needed)

---

## Resources

- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [React Native TextInput](https://reactnative.dev/docs/textinput)
- [PropTypes Documentation](https://www.npmjs.com/package/prop-types)
- [JavaScript Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

---

## Submission

- Simpan semua file dalam folder `praktek/pertemuan-7/`
- File naming: `soal1.js`, `soal2.js`, ..., `soal10.js`
- (Optional) Buat folder `components/` untuk reusable components
- (Optional) Screenshot atau screen recording demo
- Push ke repository Git masing-masing

**Deadline:** [Sesuaikan dengan jadwal kelas]

**Selamat Mengerjakan! Happy Coding! 🚀⚛️**
