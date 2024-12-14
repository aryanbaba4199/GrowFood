import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Alert, Text, Linking } from 'react-native'; // Import Text from react-native
import { List, Divider, Avatar, Title, Subheading, TextInput, Button, IconButton} from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../menu/interface/rootStackParams';
import { getUserApi } from '../API';
import { GlobalContext } from '../../App';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import EditProfile from '../user/EditProfile';
import { globalStyles } from '../../globalStyles';



interface Address {
  _id: string;
  userId: string;
  name: string;
  mobile: string;
  locality: string;
  city: string;
  state: string;
  zip: string;
  landMark: string;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [profileEdit, setProfileEdit] = useState(false);
  const [expandedAddresses, setExpandedAddresses] = useState<{ [key: string]: boolean }>({});
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { userDetails, address } = useContext(GlobalContext);

  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    locality: '',
    city: '',
    state: '',
    zip: '',
    landMark: '',
  });



  



 

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      delete axios.defaults.headers.common['Authorization'];
      Alert.alert("Signed out successfully");
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert("Something went wrong while signing out");
    }
  };


  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleAddAddress = async () => {
    try {
      const res = await axios.post(`${getUserApi}/createAddress`, { address: { ...newAddress, userId: userDetails.id } });
      if (res.status === 200) {
        Alert.alert("Address added successfully");
        setShowAddressForm(false);
        setNewAddress({ name: '', mobile: '', locality: '', city: '', state: '', zip: '', landMark: '' });
      } else {
        Alert.alert("Failed to add address");
      }
    } catch (e) {
      Alert.alert('Something went wrong');
      console.error(e);
    }
  };

  const toggleAddress = (id: string) => {
    setExpandedAddresses((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
    {profileEdit ? 
    <EditProfile setProfile= {setProfileEdit}/> :
    <ScrollView>
    <View style={styles.container}>
     
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          
          source={{
            uri: userDetails.avatar as any,
          }}
        />
       
        
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft : 55,
        }}>
        <Title style={styles.title}>{userDetails.name}</Title>
          <Icon name = 'edit' size={24} style={{marginLeft : 30}} onPress={()=>setProfileEdit(true)}/>
      </View>
        <Subheading style={styles.subtitle}>{userDetails.email}</Subheading>
      </View>
      
  
      <View style={styles.list}>
        <List.Section>
          {userDetails.email ? 
            <List.Item
              title="Sign out"
              left={(props) => <List.Icon {...props} icon="logout" color='#15892e' />}
              onPress={handleSignOut}
            />
            : 
            <List.Item
              title="Sign In"
              left={(props) => <List.Icon {...props} icon="login" color='#15892e' />}
              onPress={handleSignIn}
            />
          }
          <Divider />
          <List.Item
            title="Addresses"
            left={(props) => <List.Icon {...props} icon="map-marker" color='#15892e'/>}
            right={(props) => <IconButton {...props} icon="plus" onPress={() => setShowAddressForm(!showAddressForm)} />}
            
          />
          {address?.map((address : any) => (
            <View key={address._id}>
              <List.Item
                title={address.locality}
                description={`${address.city}, ${address.state} - ${address.zip}`}
                left={(props) => <List.Icon {...props} icon="map-marker" color='#15892e'/>}
                right={(props) => <IconButton {...props} icon={expandedAddresses[address._id] ? "chevron-up" : "chevron-down"} onPress={() => toggleAddress(address._id)} />}
              />
              {expandedAddresses[address._id] && (
                <View style={styles.addressDetails}>
                  <Text>Name: {address.name}</Text>
                  <Text>Mobile: {address.mobile}</Text>
                  <View style={{display : 'flex', flexDirection : 'row', marginTop : 2, gap : 2}}>
                  <Text>Address {address.locality}</Text>
                  <Text>{address.landMark}</Text>
                  <Text>{address.city}</Text>
                  <Text>{address.state}</Text>
                  <Text>- {address.zip}</Text>
                  </View>
                </View>
              )}
              <Divider />
            </View>
          ))}
          <Divider />
          <List.Item
            title="Orders"
            left={(props) => <List.Icon {...props} icon="shopping" color='#15892e'/>}
            onPress={() => {
              navigation.navigate('Orders' as any);
            }}
          />
          <Divider />
          <List.Item
            title="About us"
            left={(props) => <List.Icon {...props} icon="information" color='#15892e' />}
            onPress={() => Linking.openURL('https://www.thegrowfood.com/aboutus')}
          />
        </List.Section>
      </View>
      {showAddressForm && (
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
          <Button mode="contained" onPress={handleAddAddress} style={styles.button}>
            Add Address
          </Button>
        </View>
      )}
    </View>
    </ScrollView>
    
}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
   

    backgroundColor: '#f4f4f4',
  },
  title: {
    marginTop: 10,
  },
  subtitle: {
    color: 'gray',
  },
  list: {
    flex: 1,
  },
  addressDetails: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  addressForm: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default ProfileScreen;
