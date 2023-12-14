
import React from 'react';
import isValidImageUrl from '../helper/ValidUrl';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import realm from '../helper/database';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactDetails = ({ route, navigation }) => {
  const { contact } = route.params;

  const handleEditContact = () => {
    navigation.navigate('ContactForm', { contact });
  };

  const handleDeleteContact = () => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${contact.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            realm.write(() => {
              realm.delete(contact);
            });
            navigation.navigate('ContactList');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

 return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('../images/bg_image.jpg')} />
      <View style={styles.contactContainer}>
        <Image style={styles.contactImage} source={{ uri: isValidImageUrl(contact.imageUrl) }} />
        <View style={styles.contactDetails}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{contact.name}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{contact.phone}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Landmark:</Text>
            <Text style={styles.value}>{contact.landmark}</Text>
          </View>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={handleEditContact} style={styles.option}>
          <Icon name="edit" size={24} color="black" />
          <Text style={styles.optionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteContact} style={styles.option}>
          <Icon name="trash-o" size={24} color="black" />
          <Text style={styles.optionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    opacity: 0.5,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  contactImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  contactDetails: {
    flex: 1,
  },
  fieldContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  option: {
    alignItems: 'center',
  },
  optionText: {
    color: 'black',
  },
});
export default ContactDetails;
