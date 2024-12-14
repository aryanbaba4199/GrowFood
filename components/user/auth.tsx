import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../menu/interface/rootStackParams';
import { getUserApi } from '../API';
import { GlobalContext } from '../../App';
import Notification from '../Helpers/Notification';
import { authApi, getterFunction, posterFunction } from '../../appApi';

const API_URL = getUserApi;

const AuthScreen: React.FC = () => {
  const { setRefreshUser } = useContext(GlobalContext);
  const [notifier, setNotifier] = useState({
    title: '', text: '', icon: '',
  });
  const [authType, setAuthType] = useState('SignIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [userData, setUserData] = useState({
    shopName: '',
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [resetOpen, setResetOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpOpen, setOtpOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');

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
        setNotifier({
          title: 'Warning',
          text: 'Email and Password are required',
          icon: 'warning',
        });
        return;
      }
      try {
        const res = await posterFunction(authApi.login,  { email, password });

          const { token } = res;
          await AsyncStorage.setItem('userToken', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setRefreshUser(true);
          setNotifier({
            title: 'Success',
            text: 'Successfully logged in...',
            icon: 'success',
          });
          navigation.goBack();
      } catch (err) {
        console.error('Sign in error:', err);
        Alert.alert('Something went wrong');
      }
    } else if (authType === 'SignUp') {
      if (!userData.name || !userData.mobile || !userData.email || !userData.password || !userData.shopName) {
        Alert.alert('Please fill in all fields');
        return;
      }
      try {
        const res = await axios.post(authApi.register, userData);
        if (res.status === 200) {
          Alert.alert('Account Created Successfully');
          setAuthType('SignIn');
        } else if (res.status === 409) {
          Alert.alert('Email Already Registered');
        }
      } catch (err) {
        console.error('Sign up error:', err);
        Alert.alert('Something went wrong');
      }
    } else if (authType === 'ForgotPassword') {
      if (!forgotPasswordEmail) {
        Alert.alert('Please enter your email address');
        return;
      }
      try {
        const res = await getterFunction(`${authApi.forgot}/${forgotPasswordEmail}`);
          Alert.alert('OTP Sent to your Email Address');
          setOtpOpen(true);
      } catch (err) {
        console.error('Forgot password error:', err);
        Alert.alert('Something went wrong');
      }
    }
  };

  const handleVerifyOtp = async()=>{
    try{
      const formData = {email : forgotPasswordEmail, otp}
      const res = await posterFunction(authApi.verifyOtp, formData)
      setResetOpen(true);
      setOtpOpen(false);
      Alert.alert('OTP Verification Successful');
    }catch (err){
      console.error('Error in verification', err);
    }
  }

  const handleReset = async()=>{
    try{
      const formData = {
        email : forgotPasswordEmail, newPassword
      }
      const res = await posterFunction(authApi.reset, formData)
      Alert.alert('Password changed');
      setAuthType('SignIn')
    }catch (err){
      Alert.alert('Error in reset')
      console.error('Error in reset password',err);
    }
  }

  return (
    <ScrollView>
      {notifier?.title !== '' && <Notification notifier={notifier} setNotifier={setNotifier} />}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://www.thegrowfood.com/_next/image?url=%2Ffavicon.ico&w=64&q=75' }}
          style={styles.logo}
        />
        <Text style={styles.title}>
          {authType === 'SignIn' ? 'Welcome Back' : authType === 'SignUp' ? 'Create Your Account' : 'Forgot Password'}
        </Text>
      </View>
      <View style={styles.container}>
        {authType === 'SignUp' && (
          <>
            <View style={styles.inputWrapper}>
              <Icon name="store" size={20} color="#888" />
              <TextInput
                label="Shop Name"
                style={styles.input}
                value={userData.shopName}
                onChangeText={(text) => setUserData({ ...userData, shopName: text })}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="account" size={20} color="#888" />
              <TextInput
                label="Contact Person Name"
                style={styles.input}
                value={userData.name}
                onChangeText={(text) => setUserData({ ...userData, name: text })}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="phone" size={20} color="#888" />
              <TextInput
                label="Mobile"
                style={styles.input}
                keyboardType="numeric"
                value={userData.mobile}
                onChangeText={(text) => setUserData({ ...userData, mobile: text })}
              />
            </View>
          </>
        )}
        {authType === 'ForgotPassword' && !otpOpen &&(
          <View style={styles.inputWrapper}>
            <Icon name="email" size={20} color="#888" />
            <TextInput
              label="Enter Your Email"
              style={styles.input}
              value={forgotPasswordEmail}
              onChangeText={setForgotPasswordEmail}
              keyboardType="email-address"
            />
          </View>
        )}
        <>
        {otpOpen && (
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#888" />
            <TextInput
              label="Enter OTP"
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
            />
          </View>
        )}
        {resetOpen && (
          <>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#888" />
            <TextInput
              label="New Password"
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              keyboardType="visible-password"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#888" />
            <TextInput
              label="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              keyboardType="visible-password"
            />
          </View>
          </>
        )}
        </>
        {(authType === 'SignIn' || authType === 'SignUp') && (
          <>
            <View style={styles.inputWrapper}>
              <Icon name="email" size={20} color="#888" />
              <TextInput
                label="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="#888" />
              <TextInput
                label="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                keyboardType="visible-password"
              />
            </View>
          </>
        )}
        {!otpOpen && !resetOpen &&
        <Button mode="contained" onPress={handleAuth} style={styles.button}>
          {authType === 'SignIn' ? 'Sign In' : authType === 'SignUp' ? 'Sign Up' : 'Submit'}
        </Button>
        }
        {otpOpen &&
        <Button mode="contained" onPress={handleVerifyOtp} style={styles.button}>
          Validate
        </Button>
        }
        {resetOpen &&
        <Button mode="contained" onPress={handleReset} style={styles.button}>
          Submit
        </Button>
        }
        {authType !== 'ForgotPassword' && (
          <Button
            mode="text"
            onPress={() => setAuthType(authType === 'SignIn' ? 'SignUp' : 'SignIn')}
            labelStyle={styles.switchText}
          >
            {authType === 'SignIn' ? 'Create Account' : 'Already have an account?'}
          </Button>
        )}
        {authType === 'SignIn' && (
          <Button
            mode="text"
            onPress={() => setAuthType('ForgotPassword')}
            labelStyle={styles.switchText}
          >
            Forgot Password?
          </Button>
        )}
      </View>
      {authType==='ForgotPassword' && 
      <Button
      mode="text"
      onPress={() => setAuthType('SignIn')}
      labelStyle={styles.switchText}
    >
      Sign In
    </Button>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#15892e',
  },
  switchText: {
    fontSize: 14,
    color: '#15892e',
  },
});

export default AuthScreen;
