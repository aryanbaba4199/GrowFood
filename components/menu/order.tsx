import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../redux/actions/orderAction';
import auth from '@react-native-firebase/auth';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';

function OrdersScreen() {
  const dispatch : any = useDispatch();
  const user = useSelector((state : any) => state.auth.user);
  const orders = useSelector((state : any) => state.orders.orders);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrder(user.id));
    } else {
      Alert.alert("Please log in to see your orders");
    }
  }, [user, dispatch]);

  const renderOrder = ({ item } : any) => (
    <Card style={styles.orderCard}>
      <Card.Content>
        <Title>Order ID: {item.id}</Title>
        <Paragraph>Order Date: {new Date(item.date).toLocaleDateString()}</Paragraph>
        <Paragraph>Total Amount: ${item.total.toFixed(2)}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>View Details</Button>
      </Card.Actions>
    </Card>
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>You must be logged in to see your orders.</Text>
        <Button mode="contained" onPress={() => Alert.alert("Navigate to login")}>
          Log In
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.message}>No orders found.</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  orderCard: {
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default OrdersScreen;
