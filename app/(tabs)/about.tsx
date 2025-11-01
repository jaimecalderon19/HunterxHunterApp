import { useCazadores } from '@/components/contextLogin';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function AboutScreen() {
  const { cazador, setCazador } = useCazadores(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const BASE_URL = 'https://balanceadorhxh-production.up.railway.app';

  const eliminarCazador = async () => {
    if (!cazador) return;
    
    Alert.alert(
      '¿Eliminar cazador?',
      `¿Estás seguro de que quieres eliminar a ${cazador.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const cazadorId = cazador.id || cazador._id;
              const response = await fetch(`${BASE_URL}/balanceador/cazadores/${cazadorId}`, {
                method: 'DELETE',
              });
              
              if (response.ok) {
                Alert.alert('Éxito', 'Cazador eliminado correctamente');
                setCazador(null);
              } else {
                Alert.alert('Error', 'No se pudo eliminar el cazador');
              }
            } catch (error) {
              Alert.alert('Error', 'Error al conectar con el servidor');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  if (!cazador) {
    return (
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={64} color="#94a3b8" />
          <Text style={styles.emptyText}>No hay cazador seleccionado</Text>
          <Text style={styles.emptySubtext}>Busca un cazador primero</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.avatarContainer}>
          <Image source={{uri: cazador.imagen}}  style={{ width: 120, height: 120, borderRadius: 60 }} />
        </View>

        <Text style={styles.name}>{cazador.nombre}</Text>
        <Text style={styles.license}>{cazador.tipoLicencia}</Text>
 
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Ver detalles</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={eliminarCazador}
          disabled={loading}
        >
          <View style={styles.buttonRow}>
            <Ionicons name="trash" size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>
              {loading ? 'Eliminando...' : 'Eliminar cazador'}
            </Text>
          </View>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del Cazador</Text>
              <Text style={styles.modalText}>Género: {cazador.genero}</Text>
              <Text style={styles.modalText}>Altura: {cazador.altura} cm</Text>
              <Text style={styles.modalText}>Edad: {cazador.edad} años</Text>
              <Text style={styles.modalText}>Peso: {cazador.peso} kg</Text>
              <Text style={styles.modalText}>
                Habilidades: {cazador.habilidades.join(', ')}
              </Text>

              <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={toggleModal}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  avatarContainer: {
    marginVertical: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#facc15',
    textAlign: 'center',
    marginBottom: 6,
  },
  license: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  modalTitle: {
    fontSize: 22,
    color: '#facc15',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 8,
  },
});
