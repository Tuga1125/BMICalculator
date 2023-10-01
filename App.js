import React, { useState } from 'react';
import { View, Text, TextInput, Button, StatusBar, StyleSheet } from 'react-native';

export default function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [measurementSystem, setMeasurementSystem] = useState('metric'); // Default to metric
  const [bmi, setBMI] = useState('');
  const [result, setResult] = useState('');

  const calculateBMI = () => {
    const heightFactor = measurementSystem === 'metric' ? 100 : 39.37;
    const weightFactor = measurementSystem === 'metric' ? 1 : 2.20462;

    const heightMeters = height / heightFactor;
    const weightKg = weight / weightFactor;

    if (heightMeters > 0 && weightKg > 0) {
      const bmiValue = (weightKg / (heightMeters * heightMeters)).toFixed(2);
      setBMI(bmiValue);

      if (bmiValue < 18.5) {
        setResult('Underweight');
      } else if (bmiValue < 25) {
        setResult('Normal Weight');
      } else if (bmiValue < 30) {
        setResult('Overweight');
      } else {
        setResult('Obese');
      }
    } else {
      setBMI('');
      setResult('Please enter valid values');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>BMI Calculator</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height:</Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter height (${measurementSystem === 'metric' ? 'cm' : 'inches'})`}
          onChangeText={text => setHeight(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Weight:</Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter weight (${measurementSystem === 'metric' ? 'kg' : 'lbs'})`}
          onChangeText={text => setWeight(text)}
          keyboardType="numeric"
        />
      </View>

      <Button title="Calculate BMI" onPress={calculateBMI} />

      <Text style={styles.label}>BMI: {bmi}</Text>
      <Text style={styles.result}>Result: {result}</Text>

      <Button
        title={`Switch to ${measurementSystem === 'metric' ? 'Imperial' : 'Metric'}`}
        onPress={() => setMeasurementSystem(measurementSystem === 'metric' ? 'imperial' : 'metric')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});