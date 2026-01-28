# Expense Tracker - Tutorial 📱💰

Aplikasi pelacakan pengeluaran dan pemasukan komprehensif yang dibangun dengan React Native dan Expo. Tutorial ini akan memandu Anda membangun aplikasi pencatat keuangan lengkap dari awal.

## Daftar Isi

- [Fitur](#fitur)
- [Mulai Cepat](#mulai-cepat)
- [Tutorial Langkah demi Langkah](#tutorial-langkah-demi-langkah)
- [Struktur Proyek](#struktur-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)

## Fitur

✨ **Fitur Utama:**

- 💸 Melacak pengeluaran dan pemasukan
- 📊 Organisasi berbasis kategori
- Tambahkan catatan ke transaksi
- 🔍 Cari dan filter transaksi
- 📈 Tampilan ringkasan kategori
- 💰 Perhitungan saldo real-time
- ➕ Kategori kustom

## Mulai Cepat

1. **Instal dependensi:**

   ```bash
   npm install
   ```

2. **Jalankan aplikasi:**

   ```bash
   npx expo start
   ```

3. **Jalankan di platform:**
   - Tekan `w` untuk web
   - Tekan `a` untuk Android
   - Tekan `i` untuk iOS
   - Pindai kode QR dengan aplikasi Expo Go

---

## Tutorial Langkah demi Langkah

### Langkah 1: Persiapan Proyek

Buat proyek Expo baru:

```bash
npx create-expo-app expense-tracker --template tabs
cd expense-tracker
```

Instal dependensi yang diperlukan:

```bash
npm install @react-native-async-storage/async-storage @react-navigation/native @react-navigation/bottom-tabs
```

### Langkah 2: Definisikan Interface Type

Buat file `types/expense.ts`:

```typescript
// Interface untuk mendefinisikan struktur data transaksi
export interface Expense {
  id: string; // ID unik untuk setiap transaksi
  title: string; // Judul/nama transaksi
  amount: number; // Jumlah uang dalam angka
  category: string; // Kategori transaksi (Makanan, Transportasi, dll)
  date: string; // Tanggal transaksi dalam format ISO string
  type: "income" | "expense"; // Tipe: pemasukan atau pengeluaran
  notes?: string; // Catatan tambahan (opsional)
}

// Array kategori default yang tersedia di aplikasi
export const DEFAULT_CATEGORIES = [] as const;

// Type alias untuk kategori
export type CategoryType = string;
```

**Penjelasan:** Ini mendefinisikan struktur data untuk setiap transaksi dan kategori default.

### Langkah 3: Buat Utilitas Penyimpanan

Buat file `utils/storage.ts`:

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_CATEGORIES, Expense } from "../types/expense";

// Key untuk menyimpan data di AsyncStorage
const EXPENSES_KEY = "@expenses_tracker_data";
const CATEGORIES_KEY = "@categories_tracker_data";

// Fungsi untuk menyimpan array transaksi ke AsyncStorage
export const saveExpenses = async (expenses: Expense[]): Promise<void> => {
  try {
    // Konversi array objek ke JSON string
    const jsonValue = JSON.stringify(expenses);
  } catch (error) {
    console.error("Error saving expenses:", error);
    throw error;
  }
};

// Fungsi untuk memuat semua transaksi dari AsyncStorage
export const loadExpenses = async (): Promise<Expense[]> => {
  try {
    if (jsonValue != null) {
      // Parse JSON string menjadi array objek
      const expenses = JSON.parse(jsonValue);
      // Pastikan setiap expense memiliki property 'type' (backward compatibility)
      return expenses.map((expense: any) => ({
        ...expense,
        type: expense.type || "expense", // Default ke 'expense' jika tidak ada
      }));
    }
    // Return array kosong jika belum ada data
    return [];
  } catch (error) {
    console.error("Error loading expenses:", error);
    return [];
  }
};

// Fungsi untuk menambah transaksi baru
export const addExpense = async (expense: Expense): Promise<void> => {
  try {
    // Muat semua transaksi yang ada
    const expenses = await loadExpenses();
    // Tambahkan transaksi baru ke array
    expenses.push(expense);
    // Simpan kembali semua transaksi termasuk yang baru
    await saveExpenses(expenses);
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

// Fungsi untuk menghapus transaksi berdasarkan ID
export const deleteExpense = async (id: string): Promise<void> => {
  try {
    // Muat semua transaksi
    const expenses = await loadExpenses();
    // Filter: ambil semua transaksi kecuali yang ID-nya sama dengan parameter
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    // Simpan array yang sudah difilter
    await saveExpenses(updatedExpenses);
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};

// Fungsi untuk memuat semua kategori (default + custom)
export const loadCategories = async (): Promise<string[]> => {
  try {
    // Ambil kategori custom dari storage
    const jsonValue = await AsyncStorage.getItem(CATEGORIES_KEY);
    if (jsonValue != null) {
      const customCategories = JSON.parse(jsonValue);
      // Gabungkan kategori default dengan kategori custom
      return [...DEFAULT_CATEGORIES, ...customCategories];
    }
    // Jika belum ada kategori custom, kembalikan hanya kategori default
    return [...DEFAULT_CATEGORIES];
  } catch (error) {
    console.error("Error loading categories:", error);
    return [...DEFAULT_CATEGORIES];
  }
};

// Fungsi untuk menambah kategori custom baru
export const addCategory = async (category: string): Promise<void> => {
  try {
    // Muat kategori custom yang ada
    const jsonValue = await AsyncStorage.getItem(CATEGORIES_KEY);
    const customCategories = jsonValue != null ? JSON.parse(jsonValue) : [];

    // Cek apakah kategori sudah ada (di default atau custom)
    const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];
    if (allCategories.includes(category)) {
      throw new Error("Kategori sudah ada");
    }

    // Tambahkan kategori baru ke array custom
    customCategories.push(category);
    // Simpan kembali kategori custom yang sudah diupdate
    await AsyncStorage.setItem(
      CATEGORIES_KEY,
      JSON.stringify(customCategories),
    );
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};
```

**Penjelasan:** Fungsi-fungsi ini menangani persistensi data menggunakan AsyncStorage, memungkinkan kita untuk menyimpan dan mengambil transaksi dan kategori.

### Langkah 4: Setup Tata Letak Navigasi

Buat file `app/_layout.tsx`:

```typescript
import { Stack } from "expo-router";

// Komponen layout utama yang mengatur navigasi aplikasi
export default function RootLayout() {
  return (
    // Stack Navigator untuk navigasi antar layar
    <Stack>
      {/* Layar utama (index) - daftar transaksi */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,  // Sembunyikan header default
          title: "Pencatat Keuangan",
        }}
      />
      {/* Layar tambah transaksi - ditampilkan sebagai modal */}
      <Stack.Screen
        name="add-expense"
        options={{
          title: "Tambah Transaksi",
          presentation: "modal",  // Tampilkan sebagai modal dari bawah
          headerStyle: {
            backgroundColor: "#4CAF50",  // Warna hijau untuk header
          },
          headerTintColor: "#fff",  // Warna teks header putih
          headerTitleStyle: {
            fontWeight: "bold",  // Tebal untuk judul
          },
        }}
      />
    </Stack>
  );
}
```

**Penjelasan:** Menyiapkan navigation stack dengan dua layar - daftar utama dan modal tambah transaksi.

### Langkah 5: Buat Layar Utama (Bagian 1 - State & Logika)

Buat file `app/index.tsx`:

```typescript
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Expense } from "../types/expense";
import { deleteExpense, loadCategories, loadExpenses } from "../utils/storage";

export default function Index() {
  // === STATE MANAGEMENT ===
  // State untuk menyimpan semua transaksi
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  // State untuk transaksi yang sudah difilter (hasil pencarian/filter kategori)
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  // State untuk saldo (pemasukan - pengeluaran)
  const [balance, setBalance] = useState<number>(0);
  // State untuk query pencarian
  const [searchQuery, setSearchQuery] = useState<string>("");
  // State untuk kategori yang dipilih (untuk filter)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // State untuk tab aktif (list atau summary)
  const [activeTab, setActiveTab] = useState<"list" | "summary">("list");
  // State untuk ringkasan per kategori
  const [categorySummary, setCategorySummary] = useState<
    Record<string, { income: number; expense: number }>
  >({});
  // State untuk menyimpan semua kategori
  const [categories, setCategories] = useState<string[]>([]);
  // Hook untuk navigasi
  const router = useRouter();

  // Hook untuk memuat data setiap kali layar difokuskan
  // Berguna saat kembali dari layar tambah transaksi
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  // Fungsi untuk memuat dan memproses semua data
  const loadData = async () => {
    // Muat transaksi dan kategori dari storage
    const data = await loadExpenses();
    const cats = await loadCategories();
    setCategories(cats);

    // Urutkan transaksi berdasarkan tanggal (terbaru di atas)
    const sortedData = data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    setAllExpenses(sortedData);

    // === HITUNG TOTAL PEMASUKAN DAN PENGELUARAN ===
    // Filter hanya transaksi pemasukan, lalu jumlahkan
    const income = data
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);
    // Filter hanya transaksi pengeluaran, lalu jumlahkan
    const expense = data
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    setBalance(income - expense); // Saldo = Pemasukan - Pengeluaran

    // === HITUNG RINGKASAN PER KATEGORI ===
    // Buat objek dengan struktur: { kategori: { income: 0, expense: 0 } }
    const summary: Record<string, { income: number; expense: number }> = {};
    // Inisialisasi semua kategori dengan nilai 0
    cats.forEach((cat) => {
      summary[cat] = { income: 0, expense: 0 };
    });

    // Loop setiap transaksi dan tambahkan ke kategori yang sesuai
    data.forEach((item) => {
      if (!summary[item.category]) {
        summary[item.category] = { income: 0, expense: 0 };
      }
      if (item.type === "income") {
        summary[item.category].income += item.amount;
      } else {
        summary[item.category].expense += item.amount;
      }
    });

    setCategorySummary(summary);
    // Terapkan filter yang aktif (jika ada)
    applyFilters(sortedData, searchQuery, selectedCategory);
  };

  // === LOGIKA FILTER ===
  // Fungsi untuk memfilter transaksi berdasarkan pencarian dan kategori
  const applyFilters = (
    data: Expense[],
    search: string,
    category: string | null,
  ) => {
    let filtered = [...data]; // Copy array agar tidak mengubah original

    // Filter berdasarkan query pencarian (di judul atau catatan)
    if (search.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.notes?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter berdasarkan kategori yang dipilih
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    setFilteredExpenses(filtered);
  };

  // Handler saat user mengetik di search box
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    applyFilters(allExpenses, text, selectedCategory);
  };

  // Handler saat user memilih/membatalkan filter kategori
  const handleCategoryFilter = (category: string) => {
    // Toggle: jika kategori yang sama diklik, batalkan filter
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    applyFilters(allExpenses, searchQuery, newCategory);
  };

  // Handler untuk menghapus transaksi dengan konfirmasi
  const handleDelete = (id: string) => {
    Alert.alert(
      "Hapus Transaksi",
      "Apakah Anda yakin ingin menghapus transaksi ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            await deleteExpense(id); // Hapus dari storage
            loadData(); // Reload data untuk update UI
          },
        },
      ],
    );
  };

  // === FUNGSI FORMATTING ===
  // Format tanggal ke format Indonesia (contoh: 28 Jan 2026)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      month: "short", // Bulan singkat (Jan, Feb, dll)
      day: "numeric", // Tanggal angka
      year: "numeric", // Tahun 4 digit
    });
  };

  // Format angka ke format Rupiah (contoh: Rp 50.000)
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Tidak tampilkan desimal
    }).format(amount);
  };

  // ... (fungsi render dilanjutkan di bagian berikutnya)
}
```

**Penjelasan:** Bagian ini menangani manajemen state, pemuatan data, filtering, dan fungsi utilitas.

### Langkah 6: Buat Layar Utama (Bagian 2 - Render)

Lanjutkan di `app/index.tsx`:

```typescript
  // Render transaction item
  const renderItem = ({ item }: { item: Expense }) => (
    <View
      style={[
        styles.expenseItem,
        item.type === "income" ? styles.incomeItem : styles.expenseItemBorder,
      ]}
    >
      <View style={styles.expenseLeft}>
        <View style={styles.expenseInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text
              style={[
                styles.typeLabel,
                item.type === "income"
                  ? styles.incomeLabel
                  : styles.expenseLabel,
              ]}
            >
              {item.type === "income" ? "💰 Pemasukan" : "💸 Pengeluaran"}
            </Text>
          </View>
          <Text
            style={[
              styles.expenseCategory,
              item.type === "income" && styles.incomeCategoryText,
            ]}
          >
            {item.category}
          </Text>
          <Text style={styles.expenseDate}>{formatDate(item.date)}</Text>
          {item.notes && <Text style={styles.expenseNotes}>{item.notes}</Text>}
        </View>
      </View>
      <View style={styles.expenseRight}>
        <Text
          style={[
            styles.expenseAmount,
            item.type === "income"
              ? styles.incomeAmount
              : styles.expenseAmountColor,
          ]}
        >
          {item.type === "income" ? "+" : "-"}
          {formatRupiah(item.amount)}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render category summary tab
  const renderCategorySummary = () => (
    <ScrollView style={styles.summaryContainer}>
      <View style={styles.summaryContent}>
        {Object.keys(categorySummary).map((category) => {
          const catData = categorySummary[category] || {
            income: 0,
            expense: 0,
          };
          const netAmount = catData.income - catData.expense;

          // Skip kategori yang tidak memiliki transaksi
          if (catData.income === 0 && catData.expense === 0) return null;

          return (
            <View key={category} style={styles.categoryCard}>
              <View style={styles.categoryCardHeader}>
                <Text style={styles.categoryCardTitle}>{category}</Text>
                <Text
                  style={[
                    styles.categoryCardNet,
                    netAmount >= 0 ? styles.positiveNet : styles.negativeNet,
                  ]}
                >
                  {netAmount >= 0 ? "+" : ""}
                  {formatRupiah(netAmount)}
                </Text>
              </View>
              <View style={styles.categoryCardDetails}>
                {catData.income > 0 && (
                  <View style={styles.categoryDetailRow}>
                    <Text style={styles.categoryDetailLabel}>
                      💰 Pemasukan:
                    </Text>
                    <Text style={styles.categoryIncomeAmount}>
                      {formatRupiah(catData.income)}
                    </Text>
                  </View>
                )}
                {catData.expense > 0 && (
                  <View style={styles.categoryDetailRow}>
                    <Text style={styles.categoryDetailLabel}>
                      💸 Pengeluaran:
                    </Text>
                    <Text style={styles.categoryExpenseAmount}>
                      {formatRupiah(catData.expense)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );

  // Main render
  return (
    <View style={styles.container}>
      {/* Header with balance */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pencatat Keuangan</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Saldo</Text>
            <Text
              style={[
                styles.balanceText,
                balance < 0 && styles.negativeBalance,
              ]}
            >
              {formatRupiah(0)}
            </Text>
          </View>
        </View>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "list" && styles.tabActive]}
          onPress={() => setActiveTab("list")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "list" && styles.tabTextActive,
            ]}
          >
            📋 Daftar Transaksi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "summary" && styles.tabActive]}
          onPress={() => setActiveTab("summary")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "summary" && styles.tabTextActive,
            ]}
          >
            📊 Ringkasan Kategori
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "list" ? (
        <>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Cari transaksi..."
              value={searchQuery}
            />
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
            contentContainerStyle={styles.filterContent}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterChip,
                  selectedCategory === cat && styles.filterChipActive,
                ]}
                onPress={() => handleCategoryFilter(cat)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCategory === cat && styles.filterChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Transaction List or Empty State */}
          {filteredExpenses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery || selectedCategory
                  ? "Tidak ada transaksi yang cocok"
                  : "Belum ada transaksi"}
              </Text>
              <Text style={styles.emptySubtext}>
                {searchQuery || selectedCategory
                  ? "Coba ubah filter atau pencarian Anda"
                  : "Tekan tombol + untuk menambah transaksi pertama Anda"}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredExpenses}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </>
      ) : (
        renderCategorySummary()
      )}

      {/* Floating add button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-expense")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
```

**Penjelasan:** Ini merender UI dengan header, tab, pencarian, filter, dan daftar transaksi dengan tombol floating action button.

### Langkah 7: Buat Layar Tambah Transaksi

Buat file `app/add-expense.tsx`:

```typescript
import { useRouter, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Expense } from "../types/expense";
import { addExpense, loadCategories, addCategory } from "../utils/storage";

export default function AddExpense() {
  const router = useRouter();

  // === STATE UNTUK FORM INPUT ===
  // Tipe transaksi: pemasukan atau pengeluaran (default: pengeluaran)
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense");
  // Judul transaksi
  const [title, setTitle] = useState("");
  // Jumlah uang (disimpan sebagai string untuk input)
  const [amount, setAmount] = useState("");
  // Kategori yang dipilih (default: Lainnya)
  const [category, setCategory] = useState("Lainnya");
  // Daftar semua kategori yang tersedia
  const [categories, setCategories] = useState<string[]>([]);
  // Catatan tambahan (opsional)
  const [notes, setNotes] = useState("");
  // State untuk menampilkan/menyembunyikan modal tambah kategori
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  // Nama kategori baru yang akan ditambahkan
  const [newCategoryName, setNewCategoryName] = useState("");

  // Muat kategori saat layar difokuskan
  useFocusEffect(
    useCallback(() => {
      loadCategoriesData();
    }, [])
  );

  // Fungsi untuk memuat kategori dari storage
  const loadCategoriesData = async () => {
    const cats = await loadCategories();
    setCategories(cats);
  };

  // Fungsi untuk menyimpan transaksi baru
  const handleSubmit = async () => {
    // === VALIDASI INPUT ===
    // Cek apakah judul sudah diisi
    if (!title.trim()) {
      Alert.alert("Kesalahan", "Mohon masukkan judul");
      return;
    }

    // Konversi string amount ke number dan validasi
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert("Kesalahan", "Mohon masukkan jumlah yang valid");
      return;
    }

    // === BUAT OBJEK TRANSAKSI BARU ===
    const newExpense: Expense = {
      id: Date.now().toString(),  // ID unik dari timestamp
      title: title.trim(),  // Hapus spasi di awal/akhir
      amount: amountNum,  // Jumlah dalam bentuk number
      category,  // Kategori yang dipilih
      type: transactionType,  // Tipe: income atau expense
      date: new Date().toISOString(),  // Tanggal sekarang dalam format ISO
      notes: notes.trim() || undefined,  // Catatan (undefined jika kosong)
    };

    try {
      // Simpan transaksi ke storage
      await addExpense(newExpense);
      // Kembali ke layar sebelumnya
      router.back();
    } catch (err) {
      Alert.alert("Kesalahan", "Gagal menyimpan transaksi.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Transaction type toggle */}
        <Text style={styles.label}>Tipe Transaksi</Text>
        <View style={styles.typeToggleContainer}>
          <TouchableOpacity
            style={[
              styles.typeToggleButton,
              transactionType === "expense" && styles.typeToggleExpenseActive,
            ]}
            onPress={() => setTransactionType("expense")}
          >
            <Text style={styles.typeToggleText}>💸 Pengeluaran</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeToggleButton,
              transactionType === "income" && styles.typeToggleIncomeActive,
            ]}
            onPress={() => setTransactionType("income")}
          >
            <Text style={styles.typeToggleText}>💰 Pemasukan</Text>
          </TouchableOpacity>
        </View>

        {/* Title input */}
        <Text style={styles.label}>Judul</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Belanja bulanan"
          value={title}
          onChangeText={setTitle}
        />

        {/* Amount input */}
        <Text style={styles.label}>Jumlah (Rp)</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* Category selector */}
        <Text style={styles.label}>Kategori</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonActive,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes input */}
        <Text style={styles.label}>Catatan (Opsional)</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Tambahkan detail tambahan..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        {/* Submit buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {transactionType === "income" ? "Tambah Pemasukan" : "Tambah Pengeluaran"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
```

**Penjelasan:** Layar ini menangani penambahan transaksi baru dengan pemilihan tipe, input jumlah, pemilihan kategori, dan catatan opsional.

### Langkah 8: Tambahkan Styling

#### 8.1 StyleSheet untuk Layar Utama (index.tsx)

Tambahkan styles di akhir file `app/index.tsx`:

```typescript
const styles = StyleSheet.create({
  // Container utama aplikasi
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // === HEADER STYLES ===
  header: {
    backgroundColor: "#4CAF50", // Warna hijau khas
    padding: 20,
    paddingTop: 60, // Ruang untuk status bar
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  statItem: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)", // Semi-transparan
    padding: 10,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 4,
  },
  incomeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C8E6C9", // Hijau muda untuk pemasukan
  },
  expenseText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFCDD2", // Merah muda untuk pengeluaran
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  negativeBalance: {
    color: "#FFCDD2", // Merah muda untuk saldo negatif
  },

  // === TAB STYLES ===
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent", // Border transparan saat tidak aktif
  },
  tabActive: {
    borderBottomColor: "#4CAF50", // Border hijau saat aktif
  },
  tabText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#4CAF50",
    fontWeight: "700",
  },

  // === CATEGORY SUMMARY STYLES ===
  summaryContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  summaryContent: {
    padding: 15,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  categoryCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  categoryCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  categoryCardNet: {
    fontSize: 20,
    fontWeight: "bold",
  },
  positiveNet: {
    color: "#4CAF50", // Hijau untuk net positif
  },
  negativeNet: {
    color: "#f44336", // Merah untuk net negatif
  },
  categoryCardDetails: {
    gap: 8,
  },
  categoryDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryDetailLabel: {
    fontSize: 14,
    color: "#666",
  },
  categoryIncomeAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
  categoryExpenseAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f44336",
  },

  // === SEARCH & FILTER STYLES ===
  searchContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  filterContainer: {
    maxHeight: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterContent: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20, // Rounded pill shape
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterChipActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  filterChipText: {
    fontSize: 14,
    color: "#666",
  },
  filterChipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  // === TRANSACTION ITEM STYLES ===
  listContainer: {
    padding: 15,
  },
  expenseItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2, // Shadow untuk Android
    shadowColor: "#000", // Shadow untuk iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderLeftWidth: 4, // Border kiri sebagai indikator
    borderLeftColor: "#f44336",
  },
  incomeItem: {
    borderLeftColor: "#4CAF50", // Hijau untuk pemasukan
  },
  expenseItemBorder: {
    borderLeftColor: "#f44336", // Merah untuk pengeluaran
  },
  expenseLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  expenseInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  typeLabel: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  incomeLabel: {
    backgroundColor: "#C8E6C9",
    color: "#2E7D32",
  },
  expenseLabel: {
    backgroundColor: "#FFCDD2",
    color: "#C62828",
  },
  expenseCategory: {
    fontSize: 14,
    color: "#f44336",
    marginBottom: 2,
  },
  incomeCategoryText: {
    color: "#4CAF50",
  },
  expenseDate: {
    fontSize: 12,
    color: "#999",
  },
  expenseNotes: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
  expenseRight: {
    alignItems: "flex-end",
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  incomeAmount: {
    color: "#4CAF50",
  },
  expenseAmountColor: {
    color: "#f44336",
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },

  // === EMPTY STATE STYLES ===
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#999",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },

  // === FLOATING ACTION BUTTON ===
  addButton: {
    position: "absolute", // Floating di atas konten
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30, // Membuat lingkaran sempurna
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow lebih tinggi untuk efek floating
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "300",
  },
});
```

#### 8.2 StyleSheet untuk Layar Tambah Transaksi (add-expense.tsx)

Tambahkan styles di akhir file `app/add-expense.tsx`:

```typescript
const styles = StyleSheet.create({
  // Container dan form utama
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: 20,
  },

  // === LABEL & INPUT STYLES ===
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  notesInput: {
    height: 100, // Lebih tinggi untuk multiline
    paddingTop: 12, // Align text ke atas
  },

  // === TRANSACTION TYPE TOGGLE ===
  typeToggleContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  typeToggleButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
  },
  typeToggleExpenseActive: {
    backgroundColor: "#FFEBEE", // Background merah muda
    borderColor: "#f44336",
  },
  typeToggleIncomeActive: {
    backgroundColor: "#E8F5E9", // Background hijau muda
    borderColor: "#4CAF50",
  },
  typeToggleText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  typeToggleTextActive: {
    color: "#333",
  },

  // === CATEGORY SELECTOR ===
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap ke baris baru jika perlu
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryButtonActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  addCategoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#2196F3",
  },
  addCategoryButtonText: {
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "600",
  },

  // === MODAL STYLES ===
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Dark overlay
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  modalInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#9E9E9E",
    alignItems: "center",
  },
  modalCancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalAddButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  modalAddButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // === SUBMIT BUTTONS ===
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 30,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#9E9E9E",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
```

**Prinsip Styling yang Digunakan:**

1. **Skema Warna Konsisten**
   - Hijau (#4CAF50) untuk pemasukan dan aksi positif
   - Merah (#f44336) untuk pengeluaran dan aksi destruktif
   - Abu-abu (#9E9E9E) untuk aksi netral

2. **Material Design**
   - Elevation dan shadow untuk kedalaman
   - Rounded corners untuk estetika modern
   - Ripple effects melalui TouchableOpacity

3. **Responsive Layout**
   - Flexbox untuk layout yang adaptif
   - Relative sizing (flex: 1) untuk responsivitas
   - Gap properties untuk spacing konsisten

4. **Typography Hierarchy**
   - Header: 28px bold
   - Title: 18-20px semibold
   - Body: 14-16px regular
   - Caption: 12px

5. **Spacing System**
   - Padding: 8, 12, 15, 20px
   - Margin: 4, 8, 10, 15px
   - Gap: 8, 10px

### Langkah 9: Pengujian

Jalankan aplikasi dan uji:

```bash
npx expo start
```

Uji fitur-fitur berikut:

1. ✅ Tambah transaksi pemasukan
2. ✅ Tambah transaksi pengeluaran
3. ✅ Lihat perhitungan saldo
4. ✅ Cari transaksi
5. ✅ Filter berdasarkan kategori
6. ✅ Hapus transaksi
7. ✅ Tambah kategori kustom

---

## Struktur Proyek

```
expense-tracker/
├── app/
│   ├── _layout.tsx          # Tata letak navigasi
│   ├── index.tsx            # Layar daftar transaksi utama
│   └── add-expense.tsx      # Layar tambah transaksi
├── types/
│   └── expense.ts           # Interface TypeScript
├── utils/
│   └── storage.ts           # Utilitas AsyncStorage
├── assets/                  # Gambar dan ikon
├── app.json                 # Konfigurasi Expo
├── package.json             # Dependensi
└── tsconfig.json           # Konfigurasi TypeScript
```

## Teknologi yang Digunakan

- **React Native** - Framework mobile lintas platform
- **Expo** - Platform dan alat pengembangan
- **TypeScript** - JavaScript dengan type-safe
- **Expo Router** - Navigasi berbasis file
- **AsyncStorage** - Persistensi data lokal
- **React Navigation** - Library navigasi

## Konsep Kunci yang Dipelajari

1. **Manajemen State** - Menggunakan useState dan useEffect hooks
2. **Persistensi Data** - AsyncStorage untuk penyimpanan lokal
3. **Navigasi** - Routing berbasis file dengan Expo Router
4. **Rendering List** - Optimasi FlatList
5. **Pencarian & Filter** - Filtering data real-time
6. **Validasi Form** - Pattern validasi input
7. **Styling** - StyleSheet dan desain responsif

## Langkah Selanjutnya

Tingkatkan aplikasi dengan:

- 📊 Chart dan grafik
- 📅 Filter rentang tanggal
- 💾 Ekspor data ke CSV
- 🔔 Peringatan anggaran
- 🌙 Mode gelap
- ☁️ Sinkronisasi cloud
- 📱 Widget

## Sumber Daya

- [Dokumentasi Expo](https://docs.expo.dev/)
- [Dokumentasi React Native](https://reactnative.dev/)
- [Handbook TypeScript](https://www.typescriptlang.org/docs/)
- [React Navigation](https://reactnavigation.org/)

---

Dibuat dengan ❤️ menggunakan React Native dan Expo
