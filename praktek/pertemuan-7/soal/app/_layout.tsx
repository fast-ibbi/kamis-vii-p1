import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#f5f5f5',
            width: 240,
          },
          drawerActiveTintColor: '#4CAF50',
          drawerInactiveTintColor: '#666',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color }) => "🏠",
          }}
        />
        <Drawer.Screen
          name="soal1"
          options={{
            drawerLabel: "Soal 1 - Greeting",
            title: "Soal 1",
            drawerIcon: ({ color }) => "1️⃣",
          }}
        />
        <Drawer.Screen
          name="soal2"
          options={{
            drawerLabel: "Soal 2",
            title: "Soal 2",
            drawerIcon: ({ color }) => "2️⃣",
          }}
        />
        <Drawer.Screen
          name="soal3"
          options={{
            drawerLabel: "Soal 3",
            title: "Soal 3",
            drawerIcon: ({ color }) => "3️⃣",
          }}
        />
        <Drawer.Screen
          name="soal4"
          options={{
            drawerLabel: "Soal 4",
            title: "Soal 4",
            drawerIcon: ({ color }) => "4️⃣",
          }}
        />
        <Drawer.Screen
          name="soal5"
          options={{
            drawerLabel: "Soal 5",
            title: "Soal 5",
            drawerIcon: ({ color }) => "5️⃣",
          }}
        />
        <Drawer.Screen
          name="soal6"
          options={{
            drawerLabel: "Soal 6",
            title: "Soal 6",
            drawerIcon: ({ color }) => "6️⃣",
          }}
        />
        <Drawer.Screen
          name="soal7"
          options={{
            drawerLabel: "Soal 7",
            title: "Soal 7",
            drawerIcon: ({ color }) => "7️⃣",
          }}
        />
        <Drawer.Screen
          name="soal8"
          options={{
            drawerLabel: "Soal 8",
            title: "Soal 8",
            drawerIcon: ({ color }) => "8️⃣",
          }}
        />
        <Drawer.Screen
          name="soal9"
          options={{
            drawerLabel: "Soal 9",
            title: "Soal 9",
            drawerIcon: ({ color }) => "9️⃣",
          }}
        />
        <Drawer.Screen
          name="soal10"
          options={{
            drawerLabel: "Soal 10 - Cart",
            title: "Soal 10 - Shopping Cart",
            drawerIcon: ({ color }) => "🔟",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
