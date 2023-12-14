// components/ContactForm.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import realm from '../helper/database';
import Contact from '../models/Contact';

const ContactForm = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [_id, setId] = useState(null);
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [landmark, setLandmark] = useState('');
  const [favorite, setfavorite] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const { contact } = route.params|| {};
    if (contact) {
      setIsEdit(true);
      setId(contact._id);
      setName(contact.name);
      setPhone(contact.phone);
      setImageUrl(contact.imageUrl);
      setLandmark(contact.landmark);
      setfavorite(contact.favorite)
    } else {
    // Reset form state when adding a new contact
    setIsEdit(false);
    setName('');
    setPhone('');
    setImageUrl('');
    setLandmark('');
    setfavorite(false);
    setId(null);
  }
  }, [route.params]);

  const handleSaveContact = () => {
    if (name.trim() === '') {
      alert('Please enter a name');
      return;
    }

    if (phone.trim() === '') {
      alert('Please enter a phone number');
      return;
    }

    realm.write(() => {
      if (isEdit) {
        realm.create('Contact', { _id,name, phone, imageUrl, landmark,favorite }, 'modified');
      } else {
        realm.create('Contact', { name, phone, imageUrl, landmark,favorite });
      }
    });

    navigation.navigate('ContactList');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('../images/bg_image.jpg')} />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Landmark"
          value={landmark}
          onChangeText={(text) => setLandmark(text)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
          <Text style={styles.saveButtonText}>{isEdit ? 'Update Contact' : 'Save Contact'}</Text>
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});


export default ContactForm;
