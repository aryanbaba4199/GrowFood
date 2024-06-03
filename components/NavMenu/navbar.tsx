// components/common/CustomHeader.tsx

import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';

const CustomHeader = ({ title }: { title: string }) => {
   

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#101820',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});

export default CustomHeader;
