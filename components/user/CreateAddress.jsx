import { StyleSheet, Text, View, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import { getUserApi } from '../API';
import { GlobalContext } from '../../App';
import { Button, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const CreateAddress = ({setCreateAddressMode}) => {
    const [newAddress, setNewAddress] = useState({defaultAddress});
    const {userDetails, setRefreshUser} = useContext(GlobalContext);
    

   const defaultAddress = {
        name: '',
        mobile: '',
        locality: '',
        city: '',
        state: '',
        zip: '',
        landMark: '',
   }  
   
   const handleAddAddress = async () => {

    try {
      const res = await axios.post(`${getUserApi}/createAddress`, { address: { ...newAddress, userId: userDetails.id } });
      if (res.status === 200) {
        setRefreshUser(true);
        setCreateAddressMode(false);
        Alert.alert("Address added successfully");
        setNewAddress({ name: '', mobile: '', locality: '', city: '', state: '', zip: '', landMark: '' });
      } else {
        Alert.alert("Failed to add address");
      }
    } catch (e) {
      Alert.alert('Something went wrong');
      console.error(e);
    }
  };


  return (
    <>
    <ScrollView>
        <View style={styles.addressForm}>
          <TextInput
            label="Name"
            value={newAddress.name}
            onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
            style={styles.input}
          />
          <TextInput
            label="Mobile"
            value={newAddress.mobile}
            onChangeText={(text) => setNewAddress({ ...newAddress, mobile: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Locality"
            value={newAddress.locality}
            onChangeText={(text) => setNewAddress({ ...newAddress, locality: text })}
            style={styles.input}
          />
          <TextInput
            label="City"
            value={newAddress.city}
            onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
            style={styles.input}
          />
          <TextInput
            label="State"
            value={newAddress.state}
            onChangeText={(text) => setNewAddress({ ...newAddress, state: text })}
            style={styles.input}
          />
          <TextInput
            label="Zip"
            value={newAddress.zip}
            onChangeText={(text) => setNewAddress({ ...newAddress, zip: text })}
            style={styles.input}
          />
          <TextInput
            label="Landmark"
            value={newAddress.landMark}
            onChangeText={(text) => setNewAddress({ ...newAddress, landMark: text })}
            style={styles.input}
          />
          
        </View>
        </ScrollView>
        <View style={{
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'center',
            alignContent : 'center',
            marginHorizontal : 10,
            position : 'absolute',
            bottom : 0,
          }}>
          <Button mode='contained'style={{width : '46%', borderRadius : 0, marginHorizontal : 10}} onPress={()=>setCreateAddressMode(false)} >Cancel</Button>
          <Button mode="contained" style={{width : '46%', borderRadius : 0, marginHorizontal : 10, backgroundColor : '#a854ab'}} onPress={handleAddAddress}>
            Add Address
          </Button>
          </View>
    </>
  )
}

export default CreateAddress

const styles = StyleSheet.create({})