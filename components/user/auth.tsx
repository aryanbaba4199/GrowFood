import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../menu/interface/rootStackParams';

const API_URL = "http://10.0.2.2:5000/api/users";

const AuthScreen: React.FC = () => {
  const [authType, setAuthType] = useState('SignIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setUserData((prevData) => ({ ...prevData, email, password }));
  }, [email, password]);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    };
    loadToken();
  }, []);

  const handleAuth = async () => {
    if (authType === 'SignIn') {
      if (!email || !password) {
        Alert.alert("Please fill in all fields");
        return;
      }
      try {
        const res = await axios.post(`${API_URL}/login`, {
          email,
          password
        });
        
        if (res.status === 200) {
          const { token } = res.data;
          await AsyncStorage.setItem('userToken', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          Alert.alert("Logged in Successfully");
          navigation.goBack();
        } else {
          Alert.alert("Login Failed");
        }
      } catch (err) {
        console.error('Sign in error:', err);
        Alert.alert("Something went wrong");
      }
    } else {
      if (!userData.name || !userData.mobile || !userData.email || !userData.password) {
        Alert.alert("Please fill in all fields");
        return;
      }
      try {
        const res = await axios.post(`${API_URL}/register`, {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          mobile: userData.mobile
        });
        if (res.status === 200) {
          Alert.alert("Account Created Successfully");
          setAuthType("SignIn");
        } else if (res.status === 409) {
          Alert.alert("Email Already Registered");
        }
      } catch (err) {
        console.error('Sign up error:', err);
        Alert.alert('Something went wrong');
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {authType === 'SignUp' && (
          <>
            <TextInput
              label="Name"
              style={styles.input}
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
            <TextInput
              label="Mobile"
              style={styles.input}
              keyboardType='numeric'
              value={userData.mobile}
              onChangeText={(text) => setUserData({ ...userData, mobile: text })}
            />
          </>
        )}

        <TextInput label="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType='email-address' />
        <TextInput label="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} keyboardType='visible-password' />
        <Button mode="contained" onPress={handleAuth} style={styles.button}>
          {authType === 'SignIn' ? 'Sign In' : 'Sign Up'}
        </Button>
        <Button mode="text" onPress={() => setAuthType(authType === 'SignIn' ? 'SignUp' : 'SignIn')}>
          {authType === 'SignIn' ? 'Create Account' : 'Already have an account?'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default AuthScreen;
