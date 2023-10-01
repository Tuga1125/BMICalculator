import React, { useState } from 'react';
import { View, Text, TextInput, Button, StatusBar } from 'react-native';

export default function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [measurementSystem, setMeasurementSystem] = useState('metric');
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
    <View style={{ padding: 20 }}>
      <StatusBar barStyle="dark-content" />
      <Text>Height:</Text>
      <TextInput
        placeholder={`Enter height (${measurementSystem === 'metric' ? 'cm' : 'inches'})`}
        onChangeText={text => setHeight(text)}
        keyboardType="numeric"
      />

      <Text>Weight:</Text>
      <TextInput
        placeholder={`Enter weight (${measurementSystem === 'metric' ? 'kg' : 'lbs'})`}
        onChangeText={text => setWeight(text)}
        keyboardType="numeric"
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      <Text>BMI: {bmi}</Text>
      <Text>Result: {result}</Text>

      <Button
        title={`Switch to ${measurementSystem === 'metric' ? 'Imperial' : 'Metric'}`}
        onPress={() => setMeasurementSystem(measurementSystem === 'metric' ? 'imperial' : 'metric')}
      />
    </View>
  );
}