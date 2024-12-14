import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Your global styles here
  body: {
    flex: 1,
    flexDirection : 'row',
    backgroundColor: '#F4F6FF',
    width : 23,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#15892e',
    fontSize : 17,
  },
  bgcolor: {
    backgroundColor : '#15892e',
    color : '#f7f7f7',
  }, 
  title : {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
    fontFamily: 'sans-serif',
    alignSelf: 'flex-start',
  }
});