import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
    width: width * 0.7,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 10,
  },
  inputElement: {
    fontWeight: 'bold',
    width: width * 0.55,
    paddingLeft: 10,
  },
  registerButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.7,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 2,
    marginBottom: 10,
  },
});