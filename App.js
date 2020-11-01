import { StatusBar } from 'expo-status-bar'
import React, {Component} from 'react'
import DeckHome from './components/DeckHome'
import CreateDeck from './components/CreateDeck'
import IndividualDeck from './components/IndividualDeck'
import Quiz from './components/Quiz'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {white, darkGray, purple, black} from './utils/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Provider } from 'react-redux'
import { createStore} from 'redux'
import CreateCard from './components/CreateCard'
import reducer from './reducers'
import {setLocalNotification, clearLocalNotification} from './utils/notifications';

const Tab = createBottomTabNavigator()

function Tabs () {
  return (
     <Tab.Navigator
        tabBarOptions={{
        activeTintColor: white,
        inactiveTintColor: darkGray,
        activeBackgroundColor: purple,
        inactiveBackgroundColor: purple,
        labelStyle: {
          fontSize: 13,
          marginTop: -2,
          padding:0
        },
       }
      }
      >
      <Tab.Screen
        name="Decks"
        component={DeckHome}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create Deck"
        component={CreateDeck}
        options={{
          tabBarLabel: 'Create Deck',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

export default class App extends Component  {
  
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }
 

render () {

  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Decks">
            <Stack.Screen name="Home" component={Tabs}
              options={{
                headerStyle: {
                  backgroundColor: black,
                },
                headerTintColor: white,
              }} 
            />
            <Stack.Screen name="Deck Details" component={IndividualDeck}
              options={{
                  headerStyle: {
                    backgroundColor: purple,
                  },
                  headerTintColor: white,
                }}  
            />
            <Stack.Screen name="Create Card" component={CreateCard} 
            options={{
                  headerStyle: {
                    backgroundColor: purple,
                  },
                  headerTintColor: white,
                }}  
            />
            <Stack.Screen name="Quiz" component={Quiz} 
            options={{
                  headerStyle: {
                    backgroundColor: purple,
                  },
                  headerTintColor: white,
                }}  
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
  }
}


