import { useCazadores } from '@/components/contextLogin';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function CreateScreen() {
  const { setCazador } = useCazadores();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    altura: '',
    peso: '',
    genero: 'Masculino',
    tipoLicencia: 'Cazador Rookie',
    habilidades: '',
  });

  const BASE_URL = 'https://balanceadorhxh-production.up.railway.app';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validarFormulario = () => {
    const { nombre, edad, altura, peso, habilidades } = formData;
    
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return false;
    }
    
    if (!edad || isNaN(Number(edad)) || Number(edad) < 1 || Number(edad) > 200) {
      Alert.alert('Error', 'La edad debe ser un número válido entre 1 y 200');
      return false;
    }
    
    if (!altura || isNaN(Number(altura)) || Number(altura) < 50 || Number(altura) > 300) {
      Alert.alert('Error', 'La altura debe ser un número válido entre 50 y 300 cm');
      return false;
    }
    
    if (!peso || isNaN(Number(peso)) || Number(peso) < 20 || Number(peso) > 500) {
      Alert.alert('Error', 'El peso debe ser un número válido entre 20 y 500 kg');
      return false;
    }
    
    if (!habilidades.trim()) {
      Alert.alert('Error', 'Las habilidades son obligatorias');
      return false;
    }
    
    return true;
  };

  const crearCazador = async () => {
    if (!validarFormulario()) return;
    
    setLoading(true);
    try {
      const habilidadesArray = formData.habilidades
        .split(',')
        .map(h => h.trim())
        .filter(h => h.length > 0);
      
      const nuevoCazador = {
        nombre: formData.nombre.trim(),
        edad: Number(formData.edad),
        altura: Number(formData.altura),
        peso: Number(formData.peso),
        genero: formData.genero,
        tipoLicencia: formData.tipoLicencia,
        habilidades: habilidadesArray,
      };

      const response = await fetch(`${BASE_URL}/balanceador/cazadores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCazador),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Éxito', 'Cazador creado correctamente', [
          {
            text: 'Ver cazador',
            onPress: () => {
              setCazador(data.cazador);
            }
          },
          {
            text: 'Crear otro',
            onPress: limpiarFormulario
          }
        ]);
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'No se pudo crear el cazador');
      }
    } catch (error) {
      console.error('Error al crear cazador:', error);
      Alert.alert('Error', 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      edad: '',
      altura: '',
      peso: '',
      genero: 'Masculino',
      tipoLicencia: 'Cazador Rookie',
      habilidades: '',
    });
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Ionicons name="add-circle" size={48} color="#facc15" />
            <Text style={styles.title}>✨ Nuevo Cazador</Text>
            <Text style={styles.subtitle}>Registra un nuevo cazador en el sistema</Text>
          </View>

          <View style={styles.form}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Gon Freecss"
                placeholderTextColor="#94a3b8"
                value={formData.nombre}
                onChangeText={(value) => handleInputChange('nombre', value)}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Edad *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: 12"
                  placeholderTextColor="#94a3b8"
                  value={formData.edad}
                  onChangeText={(value) => handleInputChange('edad', value)}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Género</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      formData.genero === 'Masculino' && styles.toggleButtonActive
                    ]}
                    onPress={() => handleInputChange('genero', 'Masculino')}
                  >
                    <Text style={[
                      styles.toggleButtonText,
                      formData.genero === 'Masculino' && styles.toggleButtonTextActive
                    ]}>M</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      formData.genero === 'Femenino' && styles.toggleButtonActive
                    ]}
                    onPress={() => handleInputChange('genero', 'Femenino')}
                  >
                    <Text style={[
                      styles.toggleButtonText,
                      formData.genero === 'Femenino' && styles.toggleButtonTextActive
                    ]}>F</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Altura (cm) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: 154"
                  placeholderTextColor="#94a3b8"
                  value={formData.altura}
                  onChangeText={(value) => handleInputChange('altura', value)}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Peso (kg) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: 49"
                  placeholderTextColor="#94a3b8"
                  value={formData.peso}
                  onChangeText={(value) => handleInputChange('peso', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo de Licencia</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Cazador Rookie"
                placeholderTextColor="#94a3b8"
                value={formData.tipoLicencia}
                onChangeText={(value) => handleInputChange('tipoLicencia', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Habilidades *</Text>
              <Text style={styles.helper}>Separa las habilidades con comas (,)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ej: Jajanken, Nen, Fuerza sobrehumana"
                placeholderTextColor="#94a3b8"
                value={formData.habilidades}
                onChangeText={(value) => handleInputChange('habilidades', value)}
                multiline={true}
                numberOfLines={3}
              />
            </View>

          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.clearButton]} 
              onPress={limpiarFormulario}
              disabled={loading}
            >
              <Ionicons name="refresh" size={16} color="#94a3b8" style={{ marginRight: 8 }} />
              <Text style={styles.clearButtonText}>Limpiar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.createButton]} 
              onPress={crearCazador}
              disabled={loading}
            >
              <Ionicons name="checkmark" size={16} color="#0f172a" style={{ marginRight: 8 }} />
              <Text style={styles.createButtonText}>
                {loading ? 'Creando...' : 'Crear Cazador'}
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#facc15',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 5,
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  helper: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#e2e8f0',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 5,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#facc15',
    borderColor: '#facc15',
  },
  toggleButtonText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleButtonTextActive: {
    color: '#0f172a',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  clearButton: {
    backgroundColor: '#374151',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  createButton: {
    backgroundColor: '#facc15',
  },
  clearButtonText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  },
  createButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
  },
});