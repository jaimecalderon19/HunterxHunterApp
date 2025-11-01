import { CazadoresProvider } from "@/components/contextLogin";
import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() { 
return (
    <CazadoresProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CazadoresProvider>
    
  );
}
