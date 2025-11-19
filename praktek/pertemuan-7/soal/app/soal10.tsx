import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Product Data
const PRODUCTS = [
  { id: 1, name: "Laptop", price: 15000000, image: "í²»" },
  { id: 2, name: "Mouse", price: 250000, image: "í¶±ï¸" },
  { id: 3, name: "Keyboard", price: 500000, image: "âŒ¨ï¸" },
  { id: 4, name: "Monitor", price: 3000000, image: "í¶¥ï¸" },
  { id: 5, name: "Headphone", price: 750000, image: "í¾§" },
];

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  productId: number;
  quantity: number;
}

// Format currency
const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

// ProductCard Component
const ProductCard: React.FC<{ 
  product: Product; 
  onAddToCart: (productId: number) => void;
}> = ({ product, onAddToCart }) => {
  return (
    <View style={styles.productCard}>
      <Text style={styles.productImage}>{product.image}</Text>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => onAddToCart(product.id)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

// CartButton Component with Badge
const CartButton: React.FC<{ 
  itemCount: number; 
  onPress: () => void;
}> = ({ itemCount, onPress }) => {
  return (
    <TouchableOpacity style={styles.cartButton} onPress={onPress}>
      <Text style={styles.cartButtonIcon}>í»’</Text>
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Main App Component
export default function Soal10Screen() {
  // TODO: Implement state and handlers

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Store</Text>
        {/* TODO: Add CartButton */}
      </View>
      
      {/* TODO: Add ProductList or Cart view */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartButtonIcon: {
    fontSize: 28,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productList: {
    flex: 1,
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    fontSize: 48,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearCartText: {
    color: '#ff4444',
    fontWeight: '600',
  },
  cartItemsList: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cartItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cartItemImage: {
    fontSize: 40,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 20,
    color: '#ff4444',
    fontWeight: 'bold',
  },
  cartItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    color: '#333',
  },
  subtotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  cartFooter: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continueShoppingButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  continueShoppingButtonText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyCartIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
