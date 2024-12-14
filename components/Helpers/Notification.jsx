import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Dialog, Portal, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Notification = ({ notifier, setNotifier }) => {
  // Function to get color based on the icon type
  const getIconColor = (iconType) => {
    switch (iconType) {
      case 'warning':
        return '#FFA500'; // Orange for warning
      case 'error':
        return '#FF0000'; // Red for error
      case 'success':
        return '#15892e'; // Green for success
      default:
        return '#333'; // Default neutral color
    }
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={!!notifier} onDismiss={() => setNotifier(null)}>
          <Dialog.Title style={styles.title}>
            <View style={styles.iconTitleWrapper}>
              {notifier?.icon && (
                <Icon
                  name={notifier.icon}
                  size={20}
                  color={getIconColor(notifier.icon)}
                  style={styles.icon}
                />
              )}
              <Text style={{
                ...styles.titleText,
                color: getIconColor(notifier?.icon),
                fontWeight: 'bold',
                fontSize : 22,
              }}>{notifier?.title ?? 'Notification'}</Text>
            </View>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.contentText}>
              {notifier?.text ?? 'No additional details available.'}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable onPress={() => setNotifier(null)}>
            <Button
              
              mode="contained"
              textColor="white"
              buttonColor={getIconColor(notifier?.icon)}
              style={styles.button}
            >
              OK
            </Button>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    color: '#15892e',
  },
  contentText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default Notification;
