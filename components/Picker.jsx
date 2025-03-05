import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Custom Picker Component
export function Picker({ value, onValueChange, items }) {

    // State to control whether the modal is open or closed
  const [isOpen, setIsOpen] = useState(false);

    //Creating Picker
  return (
    <>
      <Pressable
        style={styles.picker}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.pickerText}>{value}</Text>
        <Ionicons name="chevron-down" size={24} color="#666" />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Sport Type</Text>
              <Pressable
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </Pressable>
            </View>
            {items.map((item) => (
              <Pressable
                key={item}
                style={styles.option}
                onPress={() => {
                  onValueChange(item);
                  setIsOpen(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
                {item === value && (
                  <Ionicons name="checkmark" size={24} color="#00C853" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

// Style
const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});