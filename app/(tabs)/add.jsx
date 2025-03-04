import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Platform, ScrollView } from 'react-native';
import { Picker } from '../../components/Picker';
import { Calendar } from 'react-native-calendars';
import { useStore } from '../../store';
import { router } from 'expo-router';

const SPORT_TYPES = ['Swimming', 'Running', 'Cycling'];

export default function AddExerciseScreen() {
  const addExercise = useStore((state) => state.addExercise);
  const [name, setName] = useState('');
  const [type, setType] = useState(SPORT_TYPES[0]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = () => {
    if (!name || !distance || !duration || !date) return;

    addExercise({
      id: Date.now().toString(),
      name,
      type,
      distance: Number(distance),
      duration: Number(duration),
      date,
    });

    // Clear fields
    setName('');
    setType(SPORT_TYPES[0]);
    setDistance('');
    setDuration('');
    setDate('');

    router.push('/list');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add exercises</Text>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exercise name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter exercise name"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sport type</Text>
          <Picker
            value={type}
            onValueChange={setType}
            items={SPORT_TYPES}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Distance</Text>
          <View style={styles.measurementInput}>
            <TextInput
              style={[styles.input, styles.numberInput]}
              value={distance}
              onChangeText={setDistance}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#666"
            />
            <Text style={styles.unit}>km</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration</Text>
          <View style={styles.measurementInput}>
            <TextInput
              style={[styles.input, styles.numberInput]}
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#666"
            />
            <Text style={styles.unit}>min</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <Pressable
            style={styles.input}
            onPress={() => setShowCalendar(true)}>
            <Text style={styles.dateText}>
              {date || 'Select a date'}
            </Text>
          </Pressable>
          {showCalendar && (
            <View style={styles.calendar}>
              <Calendar
                onDayPress={(day) => {
                  setDate(day.dateString);
                  setShowCalendar(false);
                }}
                theme={{
                  backgroundColor: '#333',
                  calendarBackground: '#333',
                  textSectionTitleColor: '#fff',
                  selectedDayBackgroundColor: '#00C853',
                  selectedDayTextColor: '#fff',
                  todayTextColor: '#00C853',
                  dayTextColor: '#fff',
                  textDisabledColor: '#666',
                  monthTextColor: '#fff',
                }}
              />
            </View>
          )}
        </View>

        <Pressable 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add exercise</Text>
        </Pressable>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

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
  form: {
    flex: 1,
    padding: 20,
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
  measurementInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberInput: {
    flex: 1,
    marginRight: 10,
  },
  unit: {
    color: '#666',
    fontSize: 16,
  },
  dateText: {
    color: '#fff',
  },
  calendar: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
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
  bottomPadding: {
    height: 40,
  },
});