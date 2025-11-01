import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#facc15',
            headerStyle: {
            backgroundColor: '#0f172a',
            },
            headerShadowVisible: false,
            headerTintColor: '#facc15',
            tabBarStyle: {
            backgroundColor: '#0f172a',
            },
        }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Detalles',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} color={color} size={24}/>
          ),
        }}
      />  
      <Tabs.Screen
        name="create"
        options={{
          title: 'Crear',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={24}/>
          ),
        }}
      />  
      <Tabs.Screen
        name="edit"
        options={{
          title: 'Editar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'create' : 'create-outline'} color={color} size={24}/>
          ),
        }}
      />  
    </Tabs>
  );
}
