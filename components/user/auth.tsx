import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { createUser, getUser } from '../../redux/actions/userAuthAction';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../menu/interface/rootStackParams';

const AuthScreen: React.FC = () => {
  const [authType, setAuthType] = useState('SignIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    address: {
      address: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch : any = useDispatch();

  useEffect(() => {
    setUserData((prevData) => ({ ...prevData, email, password }));
  }, [email, password]);

  const handleAuth = async () => {
    console.log(userData);
    if (authType === 'SignIn') {
      try {
        const user = await auth().signInWithEmailAndPassword(email, password);
        
        Alert.alert("Log in successfully")
        navigation.navigate("Profile")
      } catch (err) {
        console.error('Sign in error:', err);
      }
    } else {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({
          displayName: userData.name,
        });
        

        dispatch(createUser(userData));
        Alert.alert('User created successfully');
        navigation.navigate("Profile")
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
            <TextInput
              label="Address"
              style={styles.input}
              value={userData.address.address}
              onChangeText={(text) => setUserData({ ...userData, address: { ...userData.address, address: text } })}
            />
            <TextInput
              label="City"
              style={styles.input}
              value={userData.address.city}
              onChangeText={(text) => setUserData({ ...userData, address: { ...userData.address, city: text } })}
            />
            <TextInput
              label="State"
              style={styles.input}
              value={userData.address.state}
              onChangeText={(text) => setUserData({ ...userData, address: { ...userData.address, state: text } })}
            />
            <TextInput
              label="Zip"
              keyboardType='numeric'
              style={styles.input}
              value={userData.address.zip}
              onChangeText={(text) => setUserData({ ...userData, address: { ...userData.address, zip: text } })}
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
