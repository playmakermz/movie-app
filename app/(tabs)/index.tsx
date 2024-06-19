import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button, ScrollView, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons'
import {styles} from './style'
import { MovieDetail, MovieList } from './component';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();


// ================= Home() ============
function Home({ route }){
  let {movieLists} = route.params
  // ref: https://reactnavigation.org/docs/params/
  // https://snack.expo.dev/

  return(
    <ScrollView>
    <View style={styles.container}>
      {movieLists.map((movieList) => (
        
        <MovieList
          title={movieList.title}
          path={movieList.path}
          coverType={movieList.coverType}
          key={movieList.title}
        />
      ))}
      <StatusBar translucent={false} />
    </View>
  </ScrollView>
  )
}


// ================= Favorite ============
function Search(){

  return(
    <View>
    <Text>Search</Text>
  </View>
  )
}

// ================== Search 
function Favorite(){

  return(
    <View>
    <Text>Favorite</Text>
  </View>
  )
}

// ================ App() =================
function App(){
  let movieLists = [
    {
      title: 'Now Playing in Theater',
      path: 'movie/now_playing?language=en-US&page=1',
      coverType: 'backdrop',
    },
    {
      title: 'Upcoming Movies',
      path: 'movie/upcoming?language=en-US&page=1',
      coverType: 'poster',
    },
    {
      title: 'Top Rated Movies',
      path: 'movie/top_rated?language=en-US&page=1',
      coverType: 'poster',
    },
    {
      title: 'Popular Movies',
      path: 'movie/popular?language=en-US&page=1',
      coverType: 'poster',
    },
  ]

  return(
    <Tab.Navigator>

<Tab.Screen
      name="Home"
      options={{
        tabBarIcon: ({ color }) => (
          <Feather name="home" size={28} color={color} />
        ),
        headerShown: false,
      }}>

{() => (<Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={Home} initialParams={{ movieLists: movieLists }}/>
  <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>)
  }

      </Tab.Screen>


      <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color }) => (
          <Feather name="search" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />

<Tab.Screen
      name="Favorite"
      component={Favorite}
      options={{
        tabBarIcon: ({ color }) => (
          <Feather name="heart" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />

    </Tab.Navigator>
  )
}



export default App