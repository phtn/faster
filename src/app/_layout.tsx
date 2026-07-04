import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f8fafc",
        },
        headerShadowVisible: false,
        headerTintColor: "#0f172a",
        contentStyle: {
          backgroundColor: "#f8fafc",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Faster" }} />
      <Stack.Screen name="examples/index" options={{ title: "Examples" }} />
      <Stack.Screen name="examples/[slug]" options={{ title: "Example" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="account" options={{ title: "Account" }} />
      <Stack.Screen name="chat" options={{ title: "Member Pass" }} />
      <Stack.Screen name="amenities" options={{ title: "Amenities" }} />
      <Stack.Screen name="concierge" options={{ title: "Concierge" }} />
    </Stack>
  );
}
