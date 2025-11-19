import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ProductDetail() {
  const router = useRouter();
  const { id, name, price, description, image, category } =
    useLocalSearchParams();
  // TODO: Implement state management

  const formatPrice = (price: string | string[]) => {
    const priceStr = Array.isArray(price) ? price[0] : price;
    return `Rp ${parseInt(priceStr).toLocaleString("id-ID")}`;
  };

  // TODO: Implement getTotalPrice function
  // TODO: Implement handleAddToCart function
  // TODO: Implement incrementQuantity function
  // TODO: Implement decrementQuantity function

  // Convert arrays to strings if needed
  const displayName = Array.isArray(name) ? name[0] : name;
  const displayDescription = Array.isArray(description) ? description[0] : description;
  const displayImage = Array.isArray(image) ? image[0] : image;
  const displayCategory = Array.isArray(category) ? category[0] : category;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.productImage}>{displayImage}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{displayCategory}</Text>
        </View>

        <Text style={styles.productName}>{displayName}</Text>
        <Text style={styles.productPrice}>{formatPrice(price)}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{displayDescription}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Product ID:</Text>
            <Text style={styles.detailValue}>
              {Array.isArray(id) ? id[0] : id}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{displayCategory}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Availability:</Text>
            <Text style={[styles.detailValue, styles.inStock]}>In Stock</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <Pressable
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </Pressable>
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{/* TODO: Display quantity */}</Text>
            </View>
            <Pressable
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Price:</Text>
          <Text style={styles.totalPrice}>{/* TODO: Display total price */}</Text>
        </View>

        <Pressable style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>🛒 Add to Cart</Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back to Products</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    backgroundColor: "#fff",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  productImage: {
    fontSize: 120,
  },
  content: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#6200ee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 10,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#03dac6",
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  inStock: {
    color: "#4caf50",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButton: {
    backgroundColor: "#6200ee",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  quantityDisplay: {
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6200ee",
  },
  quantityText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  totalSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  totalLabel: {
    fontSize: 18,
    color: "#666",
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ee",
  },
  addToCartButton: {
    backgroundColor: "#03dac6",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
