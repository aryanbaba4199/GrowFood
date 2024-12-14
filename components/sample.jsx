import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';

const Sample = () => {
    const [phoneNumber, setPhoneNumber] = useState("");  // Update to phone number
    const [sessionId, setSessionId] = useState('');
    const [otp, setOtp] = useState("");
    const API_KEY = "fe988fa7-6e7c-11ef-8b17-0200cd936042"; // Replace with your valid API key



    const handleSubmit = async () => {
        if (!phoneNumber) {
            Alert.alert('Error', 'Please enter a valid phone number');
            return;
        }

        try {
            const res = await axios.get(`https://2factor.in/API/V1/${API_KEY}/SMS/+91${phoneNumber}/AUTOGEN/OTP1`);

            if (res.data.Status === "Success") {
  
                setSessionId(res.data.Details);
                Alert.alert("OTP Sent", "Please check your SMS.");
            } else {
                Alert.alert('Error', 'Failed to send OTP. Please try again.');
            }
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'Failed to send OTP. Please check the phone number or your internet connection.');
        }
    };

    const verifyOtp = async () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter the OTP');
            return;
        }

        try {
            const res = await axios.get(`https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${otp}`);

            if (res.data.Status === 'Success') {
                Alert.alert('Success', 'Phone Number verified');
            } else {
                Alert.alert('Error', 'Invalid OTP');
            }
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'Failed to verify OTP');
        }
    };

    return (
        <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: 500,
                height: 700,
            }}>
                <Text style={{
                    alignSelf: 'center',
                    marginBottom: 10,
                    fontSize: 20,
                }}>Enter Your Phone Number</Text>
                <TextInput
                    placeholder='Enter your phone number'
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    keyboardType='phone-pad'
                    style={{
                        height: 50,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginBottom: 10,
                        paddingHorizontal: 10,
                    }}
                />
                <Button onPress={handleSubmit}>Submit</Button>
                {sessionId !== '' && (
                    <View>
                        <Text>Enter OTP </Text>
                        <TextInput
                            placeholder='Enter OTP number'
                            keyboardType='number-pad'
                            value={otp}
                            onChangeText={setOtp}
                            style={{
                                height: 50,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                                paddingHorizontal: 10,
                            }}
                        />
                        <Button
                            mode='contained'
                            onPress={verifyOtp}
                            disabled={!otp}
                        >Verify</Button>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Sample;
