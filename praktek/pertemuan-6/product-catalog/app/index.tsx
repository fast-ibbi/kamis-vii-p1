import { Link } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Data produk
const PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: "15999000",
    description:
      "iPhone 15 Pro dengan chip A17 Pro, kamera 48MP, dan layar Super Retina XDR 6.1 inci. Tersedia dalam berbagai warna elegan.",
    image: "📱",
    category: "Smartphone",
  },
  {
    id: "2",
    name: "MacBook Air M3",
    price: "18999000",
    description:
      "MacBook Air dengan chip M3 yang powerful, layar Liquid Retina 13.6 inci, dan desain tipis yang sempurna untuk mobilitas tinggi.",
    image: "💻",
    category: "Laptop",
  },
  {
    id: "3",
    name: "AirPods Pro",
    price: "3999000",
    description:
      "AirPods Pro generasi terbaru dengan Active Noise Cancellation, Spatial Audio, dan charging case USB-C yang tahan lama.",
    image: "🎧",
    category: "Audio",
  },
  {
    id: "4",
    name: "iPad Pro 12.9",
    price: "16999000",
    description:
      "iPad Pro dengan layar Liquid Retina XDR 12.9 inci, chip M2, dan support untuk Apple Pencil generasi ke-2.",
    image: "📲",
    category: "Tablet",
  },
  {
    id: "5",
    name: "Apple Watch Ultra",
    price: "12999000",
    description:
      "Apple Watch Ultra dengan desain titanium yang kokoh, GPS presisi ganda, dan battery life hingga 36 jam.",
    image: "⌚",
    category: "Wearable",
  },
  {
    id: "6",
    name: "Magic Keyboard",
    price: "1599000",
    description:
      "Magic Keyboard dengan Touch ID, koneksi wireless yang stabil, dan baterai yang dapat bertahan hingga satu bulan.",
    image: "⌨️",
    category: "Accessories",
  },
];

export default function Index() {
  const formatPrice = (price: string) => {
    return `Rp ${parseInt(price).toLocaleString("id-ID")}`;
  };

  const renderProduct = ({ item }: { item: (typeof PRODUCTS)[0] }) => (
    <Link
      href={{
        pathname: "/product/[id]",
        params: {
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image,
          category: item.category,
        },
      }}
      asChild
    >
      <Pressable style={styles.card}>
        <View style={styles.imageContainer}>
          <Text style={styles.productImage}>{item.image}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details →</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Product Catalog</Text>
        <Text style={styles.headerSubtitle}>
          Discover our amazing products
        </Text>
      </View>

      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#6200ee",
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#e0e0e0",
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    backgroundColor: "#f0f0f0",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    fontSize: 64,
  },
  cardContent: {
    padding: 15,
  },
  category: {
    fontSize: 12,
    color: "#6200ee",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#03dac6",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },
  viewDetailsButton: {
    alignSelf: "flex-start",
  },
  viewDetailsText: {
    color: "#6200ee",
    fontSize: 14,
    fontWeight: "600",
  },
});
