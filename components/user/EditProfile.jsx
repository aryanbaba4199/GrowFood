import { Alert, Image, StyleSheet, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../App';
import axios from 'axios';
import { updateUserDetails } from '../API';


const EditProfile = ({setProfile}) => {
  const { userDetails, setRefreshUser } = useContext(GlobalContext);
  
  const [userData, setUserData] = useState({
    shopName: '',
    name: '',
    mobile: '',
  });



  useEffect(() => {
    if (userDetails) {
      setUserData({
        shopName: userDetails.shopName || '',
        name: userDetails.name || '',
        mobile: userDetails.mobile || '',
      });
    }
  }, [userDetails]);

  const handleUpdateUser = async () => {
    try {
      const res = await axios.put(`${updateUserDetails}/${userDetails.id}`, userData);
      if (res.status === 200) {
        setRefreshUser(true);
        Alert.alert('Profile updated successfully');
      } else {
        Alert.alert('Profile not updated');
      }
    } catch (e) {
      Alert.alert('Something went wrong, please try again');
      console.error(e);
    }
  };

  return (
    <>
      <View style={{ marginTop: 20 }}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.image}
          />
          
        </View>

        <Title style={{
            
            alignSelf : 'center',
            color : '#8c52ff',
            fontWeight : 'bold',
            marginVertical : 10,
        }}>Grow Food</Title>

        <TextInput
          label="Shop Name"
          style={styles.input}
          value={userData.shopName}
          onChangeText={(text) => setUserData({ ...userData, shopName: text })}
        />
        <TextInput
          label="Contact Person Name"
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
        />
        <TextInput
          label="Mobile"
          style={styles.input}
          keyboardType="numeric"
          value={userData.mobile}
          onChangeText={(text) => setUserData({ ...userData, mobile: text })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={{
            display: 'flex',
            flexDirection : 'row',
        }}>
        <Button style={styles.closebutton} mode="contained" onPress={()=>setProfile(false)}>
          Close
        </Button>
        <Button style={styles.button} mode="contained" onPress={()=>handleUpdateUser()}>
          Update Profile
        </Button>
        
        </View>
      </View>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {

    width: 150, // Adjust to your desired size
    height: 150, // Ensure height and width are equal
    borderRadius: 75, // Make it half of the width/height to create a circle
    resizeMode: 'cover', // Adjust image resizing
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  closebutton: {
    borderRadius: 0,
    width : '50%',
    backgroundColor : '#6b53ac'
  },
  button: {
    borderRadius: 0,
    width : '50%',
    backgroundColor : '#a854ab',
    borderLeftColor : '#000000',
    borderLeftWidth : 1,
  },
});
