import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Avatar, Title, Subheading } from 'react-native-paper';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image size={100} source={{ uri: 'https://example.com/avatar.png' }} />
        <Title style={styles.title}>John Doe</Title>
        <Subheading style={styles.subtitle}>johndoe@example.com</Subheading>
      </View>
      <View style={styles.list}>
        <List.Section>
          <List.Item
            title="Sign In"
            left={props => <List.Icon {...props} icon="login" />}
            onPress={() => console.log('Sign In Pressed')}
          />
          <Divider />
          <List.Item
            title="Addresses"
            left={props => <List.Icon {...props} icon="map-marker" />}
            onPress={() => console.log('Addresses Pressed')}
          />
          <Divider />
          <List.Item
            title="Orders"
            left={props => <List.Icon {...props} icon="shopping" />}
            onPress={() => console.log('Orders Pressed')}
          />
          <Divider />
          <List.Item
            title="About us"
            left={props => <List.Icon {...props} icon="information" />}
            onPress={() => console.log('About Us Pressed')}
          />
        </List.Section>
      </View>
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
});

export default ProfileScreen;
