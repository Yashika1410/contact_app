import React, {useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet,Switch } from 'react-native';
import realm from '../helper/database';
import FloatingButton from '../component/FloatingButton';
import isValidImageUrl from '../helper/ValidUrl';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
 const loadContacts = () => {
    let loadedContacts;

    if (showFavorites) {
      loadedContacts = realm.objects('Contact').filtered('favorite = true');
    } else {
      loadedContacts = realm.objects('Contact');
    }

    setContacts(loadedContacts);
  };
  

  useEffect(()=>{
const subscription = realm.addListener('change', loadContacts);
loadContacts();

    return () => {
      subscription.remove();
    };
  },[]);
  useEffect(() => {
    loadContacts();
    // Load contacts when the component mounts
    
  }, [showFavorites]);

  const handleAddContact = () => {
    navigation.navigate('ContactForm');
  };

  const handleContactPress = (contact) => {
    navigation.navigate('ContactDetails', { contact });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    let filteredContacts;

    if (showFavorites) {
      filteredContacts = realm.objects('Contact').filtered(`favorite = true AND name CONTAINS[c] "${query}"`);
    } else {
      filteredContacts = realm.objects('Contact').filtered(`name CONTAINS[c] "${query}"`);
    }
     setContacts(filteredContacts);
  };
    const handleToggleFavorite = (contact) => {
    realm.write(() => {
      // Toggle the favorite status of the contact
      contact.favorite = !contact.favorite;
    });
  };
  return (
    <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../images/bg_image.jpg')} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Show Favorites</Text>
        <Switch
          value={showFavorites}
          onValueChange={() => setShowFavorites(!showFavorites)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={showFavorites ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
      <Text style={styles.heading}>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContactPress(item)}>
            <View style={styles.contactItem}>
              <Image style={styles.contactImage} source={{ uri:isValidImageUrl(item.imageUrl)}}/>

              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text>{item.phone}</Text>
              </View>
              <TouchableOpacity onPress={() => handleToggleFavorite(item)} style={styles.favoriteIcon}>
                <Icon
                  name={item.favorite ? 'heart' : 'heart-o'}
                  size={24}
                  color={item.favorite ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <FloatingButton onPress={handleAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
   backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items along the horizontal axis with space between
    marginBottom: 8,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontWeight: 'bold',
  },
  favoriteIcon: {
    marginLeft: 16, // Adjust the margin as needed
  },
});

export default ContactList;
