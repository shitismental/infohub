import { Stack, useRouter } from "expo-router";
import { useState, useEffect } from "react";

import { useUser } from "../../utils/userContext";

export default function AuthLayout() {

  const router = useRouter();

  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading]);

  if (loading || user) return null;

  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="login" options={{ animation: "none" }} />
      <Stack.Screen name="register" options={{ animation: "none" }} />
    </Stack>
  );
}