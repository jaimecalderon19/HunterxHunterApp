import { useCazadores } from '@/components/contextLogin';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function IndexScreen() {
  const [nombreBuscado, setNombreBuscado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState<'info' | 'success' | 'error'>('info');
  const { setCazador } = useCazadores();

  const BASE_URL = 'https://balanceadorhxh-production.up.railway.app';

  const buscarCazador = async () => {
    if (!nombreBuscado.trim()) {
      setEstado('error');
      setMensaje('Por favor ingresa un nombre.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/balanceador/cazadores/buscar?nombre=${nombreBuscado}`);
      const data = await response.json();

      if (data.found && data.cazadores && data.cazadores.length > 0) {
        setCazador(data.cazadores[0]);
        setEstado('success');
        setMensaje(`🎯 Cazador encontrado: ${data.cazadores[0].nombre}`);
      } else {
        setEstado('info');
        setMensaje(data.message || 'Cazador no encontrado');
      }
    } catch (error) {
      console.error('Error al buscar el cazador:', error);
      setEstado('error');
      setMensaje('⚠️ Error al conectar con el servidor');
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
      <View style={styles.container}>

        <Text style={styles.title}>🔮 Buscar Cazador</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="search" size={22} color="#94a3b8" style={styles.icon} />
          <TextInput
            placeholder="Ejemplo: Gon"
            placeholderTextColor="#94a3b8"
            value={nombreBuscado}
            onChangeText={setNombreBuscado}
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={buscarCazador} activeOpacity={0.8}>
          <LinearGradient
            colors={['#facc15', '#f59e0b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Buscar</Text>
          </LinearGradient>
        </TouchableOpacity>

        {mensaje ? (
          <Text
            style={[
              styles.message,
              estado === 'success' && styles.success,
              estado === 'error' && styles.error,
              estado === 'info' && styles.info,
            ]}
          >
            {mensaje}
          </Text>
        ) : null}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#facc15',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#e2e8f0',
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#1e293b',
    fontWeight: '700',
    fontSize: 16,
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  success: {
    color: '#22c55e',
  },
  error: {
    color: '#ef4444',
  },
  info: {
    color: '#e2e8f0',
  },
});
