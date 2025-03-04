import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useStore } from '../store';
import { useState } from 'react';
import { router, Tabs } from 'expo-router';

// Settings function
export default function SettingsScreen() {

  // Getting current goals (standard-state)
  const goals = useStore((state) => state.goals);
  // Updating goals
  const updateGoals = useStore((state) => state.updateGoals);

  const [swimming, setSwimming] = useState(goals.Swimming.toString());
  const [running, setRunning] = useState(goals.Running.toString());
  const [cycling, setCycling] = useState(goals.Cycling.toString());

  // Saving updated goals
  const handleSave = () => {
    updateGoals({
      Swimming: Number(swimming) || 0,
      Running: Number(running) || 0,
      Cycling: Number(cycling) || 0,
    });
    // going back to previos screen
    router.back();
  };

  // Layout structure
  return (
    // Tab-name Header, Headlines, Text, Textfields, Save-Button
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Exercise Goals (km)</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Swimming Goal</Text>
          <TextInput
            style={styles.input}
            value={swimming}
            onChangeText={setSwimming}
            keyboardType="numeric"
            placeholder="Enter swimming goal"
            placeholderTextColor="#666"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Running Goal</Text>
          <TextInput
            style={styles.input}
            value={running}
            onChangeText={setRunning}
            keyboardType="numeric"
            placeholder="Enter running goal"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cycling Goal</Text>
          <TextInput
            style={styles.input}
            value={cycling}
            onChangeText={setCycling}
            keyboardType="numeric"
            placeholder="Enter cycling goal"
            placeholderTextColor="#666"
          />
        </View>

        <Pressable 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
}

//Styles for Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#00513B',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00C853',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonPressed: {
    backgroundColor: '#009624',
    transform: [{ scale: 0.98 }],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});