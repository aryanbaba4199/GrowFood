import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Card, Title, DataTable } from 'react-native-paper';
import React, {useEffect, useState} from 'react';

const ProductDisplay = ({ product, qty, setSubTotal, subTotal}) => {

  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };
  const displayedText = showFullText ? product?.name : `${product?.name?.slice(0, 10)}...`;

  const formatDate = (date, deliveryDays) => {
    const deliveryDate = new Date(date); // Create a new Date object based on the current date
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays); // Add delivery days to the current date

    const year = deliveryDate.getFullYear();
    const month = String(deliveryDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = String(deliveryDate.getDate()).padStart(2, '0'); 

    return `${day}-${month}-${year}`;
  };

  // Get the current date and calculate the delivery date
  const currentDate = new Date();
  const formattedDeliveryDate = formatDate(currentDate, product?.deliveryDays ??0); 
  
  useEffect(() => {
    setSubTotal(prevSubTotal => prevSubTotal + (product.sellingPrice * qty));
  }, [qty]);


  return (
    <View style={styles.container}>
      <Card>
        
        <DataTable.Row>
          <DataTable.Cell onPress={()=>handleToggleText()}>{displayedText}</DataTable.Cell>
          <DataTable.Cell>{qty}</DataTable.Cell>
          <DataTable.Cell>{product.sellingPrice}</DataTable.Cell>
          <DataTable.Cell>{qty*product.sellingPrice}</DataTable.Cell>
        </DataTable.Row>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2, 
  },
  input: {
    marginVertical: 8,
  },
});

export default ProductDisplay;
