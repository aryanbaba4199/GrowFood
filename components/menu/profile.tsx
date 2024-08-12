import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native'; // Import Text from react-native
import { List, Divider, Avatar, Title, Subheading, TextInput, Button, IconButton } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../menu/interface/rootStackParams';
import { getUserApi } from '../API';
import { GlobalContext } from '../../App';



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
  const [user, setUser] = useState<{ id: string; name: string; email: string; avatar: string | null }>({ id: '', name: '', email: '', avatar: null });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [expandedAddresses, setExpandedAddresses] = useState<{ [key: string]: boolean }>({});
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { userDetails, setUserDetails } = useContext(GlobalContext);

  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    locality: '',
    city: '',
    state: '',
    zip: '',
    landMark: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get(`${getUserApi}/me`);
          if (res.status === 200) {
            setUserDetails({ id: res.data._id, name: res.data.name, email: res.data.email, avatar: 'https://example.com/default-profile-image.jpg'})
            setUser({ id: res.data._id, name: res.data.name, email: res.data.email, avatar: 'https://example.com/default-profile-image.jpg' });
          } else {
            Alert.alert("Failed to fetch user data");
          }
        } else {
          navigation.navigate('SignIn');
        }
      } catch (error) {
        console.error('Fetch user error:', error);
        Alert.alert("Something went wrong while fetching user data");
      }
    };

    fetchUser();
  }, []);

  const handleAdresse = async () => {
    try {
      const res = await axios.get(`${getUserApi}/getAddress/${user.id}`);
      if (res.status === 200) {
        AsyncStorage.setItem('User', JSON.stringify(res.data));
        setAddresses(res.data);
        console.log(res.data);
      }
    } catch (e) {
      Alert.alert('Something went wrong');
      console.error(e);
    }
  };

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
      const res = await axios.post(`${getUserApi}/createAddress`, { address: { ...newAddress, userId: user.id } });
      if (res.status === 200) {
        Alert.alert("Address added successfully");
        setShowAddressForm(false);
        setNewAddress({ name: '', mobile: '', locality: '', city: '', state: '', zip: '', landMark: '' });
        handleAdresse(); // Refresh addresses
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{
            uri: user.avatar as any,
          }}
        />
        <Title style={styles.title}>{user.name}</Title>
        <Subheading style={styles.subtitle}>{user.email}</Subheading>
      </View>
      <View style={styles.list}>
        <List.Section>
          {user.email ? 
            <List.Item
              title="Sign out"
              left={(props) => <List.Icon {...props} icon="logout" />}
              onPress={handleSignOut}
            />
            : 
            <List.Item
              title="Sign In"
              left={(props) => <List.Icon {...props} icon="login" />}
              onPress={handleSignIn}
            />
          }
          <Divider />
          <List.Item
            title="Addresses"
            left={(props) => <List.Icon {...props} icon="map-marker" />}
            right={(props) => <IconButton {...props} icon="plus" onPress={() => setShowAddressForm(!showAddressForm)} />}
            onPress={handleAdresse}
          />
          {addresses.map((address) => (
            <View key={address._id}>
              <List.Item
                title={address.locality}
                description={`${address.city}, ${address.state} - ${address.zip}`}
                left={(props) => <List.Icon {...props} icon="map-marker" />}
                right={(props) => <IconButton {...props} icon={expandedAddresses[address._id] ? "chevron-up" : "chevron-down"} onPress={() => toggleAddress(address._id)} />}
              />
              {expandedAddresses[address._id] && (
                <View style={styles.addressDetails}>
                  <Text>Name: {address.name}</Text>
                  <Text>Mobile: {address.mobile}</Text>
                  <Text>Locality: {address.locality}</Text>
                  <Text>City: {address.city}</Text>
                  <Text>State: {address.state}</Text>
                  <Text>Zip: {address.zip}</Text>
                  <Text>Landmark: {address.landMark}</Text>
                  <Button onPress={() => toggleAddress(address._id)}>Collapse</Button>
                </View>
              )}
              <Divider />
            </View>
          ))}
          <Divider />
          <List.Item
            title="Orders"
            left={(props) => <List.Icon {...props} icon="shopping" />}
            onPress={() => console.log('Orders Pressed')}
          />
          <Divider />
          <List.Item
            title="About us"
            left={(props) => <List.Icon {...props} icon="information" />}
            onPress={() => console.log('About Us Pressed')}
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
