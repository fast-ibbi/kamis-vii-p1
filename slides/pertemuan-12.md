---
title: State Management dengan Redux/Context API
version: 1.0.0
header: State Management dengan Redux/Context API
footer: https://github.com/fast-ibbi/kamis-vii-p1
paginate: true
marp: true
---

<!--
_class: lead
_paginate: skip
-->

# **State Management dengan Redux/Context API**

---

### Pengenalan State Management

**1. Apa itu State Management?**

State management adalah cara mengatur dan mengelola data (state) dalam aplikasi. State management membantu kita menyimpan, mengubah, dan membagikan data antar komponen secara terorganisir.

```javascript
// Contoh state sederhana
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: "", email: "" });
```

**2. Mengapa Perlu State Management Global?**

Aplikasi kompleks memiliki banyak komponen yang perlu berbagi data. Tanpa state management global, kita harus passing props berkali-kali (props drilling) yang membuat kode sulit dipelihara.

```javascript
// Tanpa state management - props drilling
<App>
  <Header user={user} />
  <Main user={user}>
    <Profile user={user}>
      <UserInfo user={user} />
    </Profile>
  </Main>
</App>
```

**3. Masalah Props Drilling**

Props drilling terjadi ketika kita harus melewatkan props melalui banyak komponen perantara yang tidak menggunakan props tersebut.

```javascript
// Props drilling - tidak efisien
function App() {
  const [user, setUser] = useState({ name: "John" });
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />; // hanya meneruskan
}

function Child({ user }) {
  return <GrandChild user={user} />; // hanya meneruskan
}

function GrandChild({ user }) {
  return <Text>{user.name}</Text>; // akhirnya digunakan
}
```

**4. Perbandingan Local State vs Global State**

Local state hanya tersedia dalam satu komponen, sementara global state dapat diakses dari mana saja dalam aplikasi.

```javascript
// Local State
function Counter() {
  const [count, setCount] = useState(0); // hanya di komponen ini
  return <Text>{count}</Text>;
}

// Global State (konsep)
// Bisa diakses dari komponen manapun tanpa props
const globalUser = useGlobalState("user");
```

**5. Kapan Menggunakan State Management**

Gunakan state management global ketika:

- Data perlu diakses banyak komponen
- Data berubah dari berbagai tempat
- Aplikasi memiliki hierarki komponen yang dalam

```javascript
// Scenario memerlukan global state:
// - Informasi user login
// - Shopping cart
// - Theme aplikasi
// - Notification system
```

---

### Context API

**6. Pengenalan Context API**

Context API adalah fitur bawaan React untuk membuat global state tanpa library eksternal. Context memungkinkan data mengalir ke komponen tanpa props drilling.

```javascript
import { createContext } from "react";

// Membuat context untuk tema aplikasi
const ThemeContext = createContext("light");
```

**7. Konsep Provider dan Consumer**

Provider menyediakan data, Consumer mengonsumsi data. Provider membungkus komponen yang perlu akses ke context.

```javascript
// Provider menyediakan nilai
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Consumer mengambil nilai
<ThemeContext.Consumer>
  {theme => <Text>{theme}</Text>}
</ThemeContext.Consumer>
```

**8. Membuat Context dengan createContext**

createContext membuat object context baru dengan nilai default.

```javascript
import { createContext } from "react";

// Context untuk user authentication
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

// Context untuk shopping cart
export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});
```

**9. Implementasi Context Provider**

Provider component membungkus aplikasi dan menyediakan state beserta fungsi untuk mengubahnya.

```javascript
import React, { useState, createContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
```

**10. Mengakses Data dengan useContext Hook**

useContext hook memudahkan akses data dari context tanpa Consumer component.

```javascript
import { useContext } from "react";
import { UserContext } from "./UserContext";

function ProfileScreen() {
  const { user, logout } = useContext(UserContext);

  return (
    <View>
      <Text>Welcome, {user?.name}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
```

**11. Keuntungan dan Keterbatasan Context API**

Keuntungan: Built-in React, mudah dipelajari, cocok untuk state sederhana.
Keterbatasan: Performance issues pada update sering, sulit debug, tidak ada middleware.

```javascript
// Keuntungan: Simple setup
const ThemeContext = createContext();

// Keterbatasan: Semua consumer re-render saat context berubah
function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Jika theme berubah, semua consumer re-render
  // meskipun hanya butuh user data
  return (
    <ThemeContext.Provider value={{ theme, setTheme, user, setUser }}>
      <AppContent />
    </ThemeContext.Provider>
  );
}
```

**12. Best Practices Context API**

Pisahkan context berdasarkan concern, gunakan custom hooks, dan hindari nested providers yang dalam.

```javascript
// ✅ Good: Pisah context berdasarkan fungsi
const AuthContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();

// ✅ Good: Custom hook untuk akses context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// ❌ Bad: Satu context untuk semua
const AppContext = createContext(); // auth, theme, cart, dll
```

---

### Redux Fundamentals

**13. Pengenalan Redux**

Redux adalah library state management yang menggunakan pola predictable state container. Redux membuat state management lebih terstruktur dan mudah di-debug.

```javascript
// Konsep dasar Redux
// State disimpan di satu tempat (store)
// State hanya diubah melalui actions
// Perubahan ditangani oleh pure functions (reducers)

import { createStore } from "redux";
```

**14. Tiga Prinsip Dasar Redux**

Single source of truth, State is read-only, Changes are made with pure functions.

```javascript
// 1. Single source of truth
const store = createStore(reducer);
// Semua state ada di satu object tree

// 2. State is read-only
// state tidak bisa diubah langsung
// state.count = 5; // ❌ SALAH

// 3. Pure functions (reducers)
function counterReducer(state = 0, action) {
  // Tidak mengubah state lama, return state baru
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
}
```

**15. Arsitektur Redux (Store, Action, Reducer)**

Redux memiliki tiga komponen utama yang bekerja dalam siklus unidirectional data flow.

```javascript
// ACTION: Object yang mendeskripsikan perubahan
const incrementAction = {
  type: "INCREMENT",
  payload: 1,
};

// REDUCER: Pure function yang mengubah state
function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    default:
      return state;
  }
}

// STORE: Menyimpan state dan menghubungkan action-reducer
import { createStore } from "redux";
const store = createStore(counterReducer);
```

**16. Redux Data Flow**

Data mengalir satu arah: View → Action → Reducer → Store → View.

```javascript
// 1. User interaction di View
<Button onPress={() => dispatch({ type: "INCREMENT" })} />;

// 2. Dispatch action
dispatch({ type: "INCREMENT", payload: 1 });

// 3. Reducer memproses action
function reducer(state, action) {
  if (action.type === "INCREMENT") {
    return state + action.payload;
  }
}

// 4. Store update state baru
// store.getState() // nilai baru

// 5. View re-render dengan state baru
const count = useSelector((state) => state.count);
```

**17. Apa itu Action?**

Action adalah plain JavaScript object yang memiliki property type dan opsional payload untuk data tambahan.

```javascript
// Action sederhana
const loginAction = {
  type: "LOGIN",
  payload: {
    username: "john",
    email: "john@example.com",
  },
};

// Action untuk berbagai operasi
const addTodoAction = {
  type: "ADD_TODO",
  payload: { id: 1, text: "Belajar Redux", completed: false },
};

const deleteTodoAction = {
  type: "DELETE_TODO",
  payload: 1, // id todo
};

const toggleTodoAction = {
  type: "TOGGLE_TODO",
  payload: 1,
};
```

**18. Apa itu Reducer?**

Reducer adalah pure function yang menerima state lama dan action, mengembalikan state baru tanpa mengubah state lama.

```javascript
// Reducer untuk counter
function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
}

// Reducer untuk todos
function todosReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}
```

**19. Apa itu Store?**

Store adalah object yang menyimpan state tree aplikasi. Store memiliki method dispatch, getState, dan subscribe.

```javascript
import { createStore } from "redux";

const store = createStore(counterReducer);

// getState: mengambil state saat ini
console.log(store.getState()); // 0

// dispatch: mengirim action
store.dispatch({ type: "INCREMENT" });
console.log(store.getState()); // 1

// subscribe: listen perubahan state
const unsubscribe = store.subscribe(() => {
  console.log("State berubah:", store.getState());
});

// unsubscribe ketika tidak diperlukan
unsubscribe();
```

---

### Implementasi Redux

**20. Setup Redux dalam React Native**

Install dependencies dan setup store provider di root aplikasi.

```javascript
// Install packages
// npm install redux react-redux @reduxjs/toolkit

// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// App.js
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
```

**21. Membuat Actions dan Action Creators**

Action creators adalah fungsi yang mengembalikan action object untuk memudahkan pembuatan action.

```javascript
// Action types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const INCREMENT_BY_AMOUNT = "INCREMENT_BY_AMOUNT";

// Action creators
function increment() {
  return { type: INCREMENT };
}

function decrement() {
  return { type: DECREMENT };
}

function incrementByAmount(amount) {
  return {
    type: INCREMENT_BY_AMOUNT,
    payload: amount,
  };
}

// Penggunaan
dispatch(increment());
dispatch(incrementByAmount(5));

// Action creators untuk todos
function addTodo(text) {
  return {
    type: "ADD_TODO",
    payload: {
      id: Date.now(),
      text: text,
      completed: false,
    },
  };
}
```

**22. Membuat Reducers**

Reducer menangani berbagai action types dan mengubah state sesuai logika bisnis.

```javascript
// counterReducer.js
const initialState = {
  value: 0,
  status: "idle",
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        value: state.value + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        value: state.value - 1,
      };
    case "INCREMENT_BY_AMOUNT":
      return {
        ...state,
        value: state.value + action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default counterReducer;
```

**23. Menggabungkan Multiple Reducers (combineReducers)**

combineReducers menggabungkan beberapa reducer menjadi satu root reducer.

```javascript
import { combineReducers } from "redux";

// Reducer terpisah
function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

function todosReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    default:
      return state;
  }
}

// Gabungkan reducers
const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
  counter: counterReducer,
});

// State structure:
// {
//   user: null,
//   todos: [],
//   counter: { value: 0, status: 'idle' }
// }
```

**24. Konfigurasi Store**

Store dikonfigurasi dengan root reducer dan optional middleware.

```javascript
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

// Cara 1: Manual dengan createStore
const store = createStore(rootReducer);

// Cara 2: Dengan Redux Toolkit (recommended)
export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
```

**25. Menggunakan Provider dari react-redux**

Provider component membuat Redux store tersedia untuk seluruh aplikasi.

```javascript
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}

// Semua komponen di dalam Provider bisa akses store
```

**26. Mengakses State dengan useSelector**

useSelector hook mengambil data dari Redux store berdasarkan selector function.

```javascript
import { useSelector } from "react-redux";

function CounterScreen() {
  // Akses state counter
  const count = useSelector((state) => state.counter.value);
  const status = useSelector((state) => state.counter.status);

  // Akses nested state
  const user = useSelector((state) => state.user);
  const userName = useSelector((state) => state.user?.name);

  // Multiple selectors
  const todos = useSelector((state) => state.todos);
  const completedTodos = useSelector((state) =>
    state.todos.filter((todo) => todo.completed)
  );

  return (
    <View>
      <Text>Count: {count}</Text>
      <Text>Status: {status}</Text>
      <Text>User: {userName}</Text>
      <Text>Completed: {completedTodos.length}</Text>
    </View>
  );
}
```

**27. Dispatch Actions dengan useDispatch**

useDispatch hook mengembalikan dispatch function untuk mengirim actions.

```javascript
import { useDispatch, useSelector } from "react-redux";
import { Button, View, Text } from "react-native";

function CounterScreen() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT" });
  };

  const handleDecrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  const handleIncrementByAmount = () => {
    dispatch({
      type: "INCREMENT_BY_AMOUNT",
      payload: 5,
    });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="+" onPress={handleIncrement} />
      <Button title="-" onPress={handleDecrement} />
      <Button title="+5" onPress={handleIncrementByAmount} />
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
}
```

---

### Perbandingan dan Studi Kasus

**28. Context API vs Redux: Kapan Menggunakan?**

Context API cocok untuk state sederhana dan jarang berubah. Redux cocok untuk aplikasi kompleks dengan banyak state updates.

```javascript
// Gunakan Context API untuk:
// - Theme switching
// - User authentication (simple)
// - Language/i18n

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Gunakan Redux untuk:
// - Shopping cart dengan banyak operasi
// - Complex forms
// - Real-time data updates
// - Undo/redo functionality

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeItem: (state, action) => {
      // complex logic
    },
  },
});
```

**29. Contoh Kasus: Todo List dengan State Management**

Implementasi lengkap todo list menggunakan Redux.

```javascript
// todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;

// TodoScreen.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./todoSlice";

function TodoScreen() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <View>
      <TextInput value={text} onChangeText={setText} placeholder="Add todo" />
      <Button title="Add" onPress={handleAdd} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
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
              onPress={() => dispatch(deleteTodo(item.id))}
            />
          </View>
        )}
      />
    </View>
  );
}
```

**30. Tips Memilih State Management Solution**

Pertimbangkan kompleksitas aplikasi, ukuran tim, dan kebutuhan debugging sebelum memilih solusi.

```javascript
// Decision Tree:

// Aplikasi kecil (< 5 screens)
// → useState + props

// Aplikasi sedang (5-15 screens)
// State jarang berubah → Context API
const AuthContext = createContext();

// Aplikasi besar (> 15 screens)
// State sering berubah → Redux
// Banyak async operations → Redux + Redux Thunk/Saga
import { configureStore } from "@reduxjs/toolkit";

// Tips praktis:
// 1. Mulai dengan useState
// 2. Upgrade ke Context jika props drilling
// 3. Upgrade ke Redux jika:
//    - Banyak shared state
//    - Complex state logic
//    - Perlu time-travel debugging
//    - State updates dari banyak tempat

// Hybrid approach (Best practice)
function App() {
  return (
    <Provider store={reduxStore}>
      <ThemeContext.Provider value={theme}>
        <AuthContext.Provider value={auth}>
          <AppContent />
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </Provider>
  );
}
// Redux untuk business logic
// Context untuk UI preferences
```

---

## Quiz Pilihan Berganda

---

## Soal 1

Apa masalah utama yang diselesaikan oleh state management global?

A. Meningkatkan kecepatan aplikasi
B. Mengurangi ukuran bundle aplikasi
C. Menghindari props drilling
D. Membuat UI lebih menarik

**Jawaban: C**

---

## Soal 2

Apa fungsi dari `createContext()` dalam React Context API?

A. Membuat komponen baru
B. Membuat object context untuk menyimpan dan berbagi data
C. Membuat state lokal
D. Membuat reducer function

**Jawaban: B**

---

## Soal 3

Hook mana yang digunakan untuk mengakses data dari Context API?

A. useState
B. useEffect
C. useContext
D. useReducer

**Jawaban: C**

---

## Soal 4

Berapa banyak prinsip dasar Redux?

A. 2 prinsip
B. 3 prinsip
C. 4 prinsip
D. 5 prinsip

**Jawaban: B** (Single source of truth, State is read-only, Changes with pure functions)

---

## Soal 5

Dalam Redux, apa yang dimaksud dengan Action?

A. Fungsi yang mengubah state
B. Plain object dengan property type yang mendeskripsikan perubahan
C. Komponen React
D. Method untuk mengambil state

**Jawaban: B**

---

## Soal 6

Apa tugas utama dari Reducer dalam Redux?

A. Menampilkan UI ke user
B. Mengirim request ke API
C. Pure function yang menerima state dan action, mengembalikan state baru
D. Menyimpan data ke database

**Jawaban: C**

---

## Soal 7

Hook mana yang digunakan untuk mengakses state dari Redux store?

A. useStore
B. useSelector
C. useRedux
D. useState

**Jawaban: B**

---

## Soal 8

Hook mana yang digunakan untuk mengirim action ke Redux store?

A. useSend
B. useAction
C. useDispatch
D. useUpdate

**Jawaban: C**

---

## Soal 9

Kapan sebaiknya menggunakan Context API dibandingkan Redux?

A. Untuk aplikasi dengan state kompleks dan sering berubah
B. Untuk state sederhana yang jarang berubah seperti theme atau auth
C. Untuk aplikasi e-commerce dengan shopping cart
D. Untuk aplikasi yang memerlukan time-travel debugging

**Jawaban: B**

---

## Soal 10

Fungsi apa yang digunakan untuk menggabungkan multiple reducers di Redux?

A. mergeReducers()
B. joinReducers()
C. combineReducers()
D. connectReducers()

**Jawaban: C**

---

**Selamat! Anda telah menyelesaikan materi State Management dengan Redux/Context API** 🎉
