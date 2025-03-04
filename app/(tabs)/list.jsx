import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store';

export default function ExerciseListScreen() {
  // Getting exercises 
  const exercises = useStore((state) => state.exercises);

    // Calculating total distances per type
  const getTotalsByType = () => {
    return exercises.reduce((acc, exercise) => {
      const { type, distance } = exercise;
      acc[type] = (acc[type] || 0) + distance;
      return acc;
    }, {});
  };

    // Getting those distances 
  const totals = getTotalsByType();

  // Layout
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercise List</Text>
      </View>

      <ScrollView style={styles.content}>
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseItem}>
            <View style={styles.exerciseIcon}>
              <Ionicons
                name={
                  exercise.type === 'Swimming'
                    ? 'water'
                    : exercise.type === 'Running'
                    ? 'walk'
                    : 'bicycle'
                }
                size={24}
                color="#fff"
              />
            </View>
            <View style={styles.exerciseDetails}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseType}>{exercise.type}</Text>
                <Text style={styles.exerciseDate}>{exercise.date}</Text>
              </View>
              <View style={styles.exerciseStats}>
                <Text style={styles.exerciseStat}>{exercise.distance} km</Text>
                <Text style={styles.exerciseStat}>{exercise.duration} min</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Total Distance</Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryStat}>
            <Ionicons name="water" size={24} color="#fff" />
            <Text style={styles.summaryValue}>{totals['Swimming'] || 0} km</Text>
          </View>
          <View style={styles.summaryStat}>
            <Ionicons name="bicycle" size={24} color="#fff" />
            <Text style={styles.summaryValue}>{totals['Cycling'] || 0} km</Text>
          </View>
          <View style={styles.summaryStat}>
            <Ionicons name="walk" size={24} color="#fff" />
            <Text style={styles.summaryValue}>{totals['Running'] || 0} km</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// Styles
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
    flex: 1,
    padding: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  exerciseIcon: {
    marginRight: 15,
    justifyContent: 'center',
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  exerciseType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseDate: {
    color: '#666',
  },
  exerciseStats: {
    flexDirection: 'row',
    gap: 15,
  },
  exerciseStat: {
    color: '#00C853',
  },
  summary: {
    padding: 20,
    backgroundColor: '#333',
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryValue: {
    color: '#fff',
    marginTop: 5,
  },
});