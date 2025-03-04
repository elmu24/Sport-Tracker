import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store';
import { ProgressCircle } from '../../components/ProgressCircle';
import { router } from 'expo-router';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export default function HomeScreen() {
  const exercises = useStore((state) => state.exercises);
  const goals = useStore((state) => state.goals);
  const completedDays = 3; // Hardcoded for demo

  const getTotalsByType = () => {
    return exercises.reduce((acc, exercise) => {
      const { type, distance } = exercise;
      acc[type] = (acc[type] || 0) + distance;
      return acc;
    }, {});
  };

  const totals = getTotalsByType();
  const totalDistance = Object.values(totals).reduce((a, b) => a + b, 0);

  const rings = [
    {
      progress: (totals['Swimming'] || 0) / goals.Swimming,
      color: '#00C853',
      strokeWidth: 12,
    },
    {
      progress: (totals['Running'] || 0) / goals.Running,
      color: '#2196F3',
      strokeWidth: 12,
    },
    {
      progress: (totals['Cycling'] || 0) / goals.Cycling,
      color: '#FF4081',
      strokeWidth: 12,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.headerLeft}
          onPress={() => router.push('/settings')}>
          <Ionicons name="settings" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>HOME</Text>
        <Pressable style={styles.headerRight}>
          <Text style={styles.loginText}>Log in</Text>
        </Pressable>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/flexifit-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.statsContainer}>
        <ProgressCircle rings={rings} size={240}>
          <Text style={styles.distanceText}>{totalDistance} km</Text>
          <Text style={styles.distanceLabel}>Total Distance</Text>
        </ProgressCircle>
      </View>

      <View style={styles.activityTypes}>
        <View style={styles.activityType}>
          <Ionicons name="walk" size={24} color="#2196F3" />
          <Text style={styles.activityValue}>{totals['Running'] || 0} km</Text>
          <Text style={styles.activityLabel}>running</Text>
        </View>
        <View style={styles.activityType}>
          <Ionicons name="water" size={24} color="#00C853" />
          <Text style={styles.activityValue}>{totals['Swimming'] || 0} km</Text>
          <Text style={styles.activityLabel}>swimming</Text>
        </View>
        <View style={styles.activityType}>
          <Ionicons name="bicycle" size={24} color="#FF4081" />
          <Text style={styles.activityValue}>{totals['Cycling'] || 0} km</Text>
          <Text style={styles.activityLabel}>cycling</Text>
        </View>
      </View>

      <View style={styles.weekContainer}>
        <Text style={styles.weekTitle}>Your Week</Text>
        <View style={styles.daysContainer}>
          {DAYS.map((day, index) => (
            <View key={day} style={styles.dayItem}>
              <Text style={styles.dayText}>{day}</Text>
              {index < completedDays && (
                <View style={styles.completedDay}>
                  <Ionicons name="checkmark" size={16} color="#fff" />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#00513B',
  },
  headerLeft: {
    width: 40,
  },
  headerRight: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  logo: {
    width: '100%',
    height: 125,
  },
  statsContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  distanceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  distanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  activityTypes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  activityType: {
    alignItems: 'center',
  },
  activityValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  activityLabel: {
    color: '#666',
    marginTop: 4,
  },
  weekContainer: {
    padding: 20,
  },
  weekTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
  },
  dayText: {
    color: '#666',
    marginBottom: 8,
  },
  completedDay: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00C853',
    justifyContent: 'center',
    alignItems: 'center',
  },
});