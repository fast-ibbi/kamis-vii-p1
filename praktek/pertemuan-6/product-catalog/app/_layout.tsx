import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6200ee" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Product Catalog", headerShown: false }} />
      <Stack.Screen 
        name="product/[id]" 
        options={{ 
          title: "Product Detail",
          headerBackTitle: "Back"
        }} 
      />
    </Stack>
  );
}
