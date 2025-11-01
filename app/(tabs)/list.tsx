import { Cazador, useCazadores } from '@/components/contextLogin';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ListScreen() {
  const { cazadores, setCazadores, setCazador } = useCazadores();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const BASE_URL = 'https://balanceadorhxh-production.up.railway.app';

  const obtenerCazadores = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/balanceador/cazadores`);
      const data = await response.json();
      
      if (data.cazadores) {
        setCazadores(data.cazadores);
      }
    } catch (error) {
      console.error('Error al obtener cazadores:', error);
      Alert.alert('Error', 'No se pudo cargar la lista de cazadores');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    obtenerCazadores();
  };

  const seleccionarCazador = (cazador: Cazador) => {
    setCazador(cazador);
    Alert.alert('Cazador seleccionado', `${cazador.nombre} ha sido seleccionado. Ve a la pestaña "Detalles" para verlo.`);
  };

  const filteredCazadores = cazadores.filter(cazador =>
    cazador.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    obtenerCazadores();
  }, []);

  const renderCazador = ({ item }: { item: Cazador }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => seleccionarCazador(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
            <Image source={{uri: item.imagen}}  style={{ width: 60, height: 60, borderRadius: 60 }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.license}>{item.tipoLicencia}</Text>
          <Text style={styles.details}>
            {item.edad} años • {item.genero}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.title}>🎯 Lista de Cazadores</Text>
          <Text style={styles.subtitle}>
            {filteredCazadores.length} de {cazadores.length} cazadores
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cazador..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={filteredCazadores}
          keyExtractor={(item) => (item.id || item._id)?.toString() || ''}
          renderItem={renderCazador}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#facc15']}
              tintColor="#facc15"
            />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons name="list" size={64} color="#94a3b8" />
              <Text style={styles.emptyText}>
                {loading ? 'Cargando...' : searchQuery ? 'No se encontraron cazadores' : 'No hay cazadores disponibles'}
              </Text>
              {!loading && !searchQuery && (
                <TouchableOpacity style={styles.refreshButton} onPress={obtenerCazadores}>
                  <Text style={styles.refreshButtonText}>Recargar</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />

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
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#facc15',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    color: '#e2e8f0',
    fontSize: 16,
    marginLeft: 10,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#facc15',
    marginBottom: 4,
  },
  license: {
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 2,
    fontStyle: 'italic',
  },
  details: {
    fontSize: 12,
    color: '#94a3b8',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#facc15',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  refreshButtonText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});