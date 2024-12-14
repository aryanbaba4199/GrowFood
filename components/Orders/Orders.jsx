import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Card, Title, Paragraph, Button, Text} from 'react-native-paper';
import {Gfcolors} from '../../context/styles';
import LoaderComponent from '../../context/LoaderComponent';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../../globalStyles';

function OrdersScreen({
  orders,
  products,
  handleOrderClick,
  loader,
  userDetails,
  refreshing,
  setRefreshing,
  getOrders,
}) {
  const navigation = useNavigation();

  const renderOrder = ({item}) => (
    <Card style={styles.orderCard}>
      <Card.Content>
        <Title style={{...globalStyles.text}}>
          Product :{' '}
          {(products && products.find(p => p._id === item.productId)?.name) ||
            ''}
        </Title>
        <Paragraph>
          Order Date: {new Date(item.date).toLocaleDateString()}
        </Paragraph>
        <Paragraph>Quantity : {item.quantity}</Paragraph>
        <Paragraph>Total Amount: {item.orderAmount?.toFixed(2)}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => handleOrderClick(item.productId)}
          style={{
            ...globalStyles.text,
          }}
          textColor="#15892e">
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  if (!userDetails?.id) {
    return (
      <>
        {loader ? (
          <LoaderComponent />
        ) : (
          <View style={styles.container}>
            <Text style={styles.message}>
              You must be logged in to see your orders.
            </Text>
            <Button
              mode="contained"
              style={{
                width: 200,
                alignSelf: 'center',
                marginTop: 20,
              }}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              Log In{' '}
            </Button>
          </View>
        )}
      </>
    );
  }

  return (
    <>
      {loader ? (
        <LoaderComponent />
      ) : (
        <View style={styles.container}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getOrders(userDetails.id)}
              />
            }
            data={orders}
            renderItem={renderOrder}
            keyExtractor={item => item?.id}
            ListEmptyComponent={
              <Text style={styles.message}>No orders found.</Text>
            }
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
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
