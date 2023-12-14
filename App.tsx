import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactList from "./app/screens/Home";
import ContactForm from "./app/screens/AddContacts";
import ContactDetails from "./app/screens/ContactDetails";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ContactList' >
  
        <Stack.Screen name="ContactList" component={ContactList} options={{ title: 'Contacts' }}/>
        {/* <Stack.Screen name="updateContact" component={UpdateContact}/> */}
        <Stack.Screen name="ContactForm" component={ContactForm} options={{ title: 'Add Contact' }} />
        <Stack.Screen
          name="ContactDetails"
          component={ContactDetails}
          options={{ title: 'Contact Details' }}
        />
        {/* <Stack.Screen name='favoriteContact' component={Favorite}/> */}
        {/* <Stack.Screen name='view contact' component={ViewContact} /> */}
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}