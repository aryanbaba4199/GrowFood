import { StyleSheet, View } from 'react-native'
import { Text, TextInput, Button, Card, Title } from 'react-native-paper';
import React from 'react'

const productDisplay = ({product,qty, setQty} : any) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>{product.name}</Title>
          
          <Text>Price: ${product.price}</Text>
          <TextInput
            label="Quantity"
            value={qty.toString()}
            onChangeText={text => setQty(Number(text))}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text >Total Payable : {product.price*qty}</Text>
        </Card.Content>
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    input: {
      marginVertical: 8,
    },
    
});

export default productDisplay