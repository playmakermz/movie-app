import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button, ImageBackground, Image, ScrollView } from 'react-native';
import {API_ACCESS_TOKEN} from './constant'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, StackActions,useFocusEffect } from '@react-navigation/native'
import {styles} from './style'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import basicApi from './ApiBasic.json'

const Stack = createNativeStackNavigator();

const coverImageSize = {
    backdrop: {
      width: 280,
      height: 160,
    },
    poster: {
      width: 100,
      height: 160,
    },
}

// ================== MovieList() ===================
function MovieList({ title, path, coverType }){
    const [movies, setMovies] = useState([basicApi])

    useFocusEffect(
        useCallback(() => {
        getMovieList(path, setMovies, movies) // Lakukan disaat focus saja
        console.log('screen was  focused')  
          // Do something when the screen is focused
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [])
    )

    return (
        <View>
          <View style={styles.header}>
            <View style={styles.purpleLabel}></View>
            <Text style={styles.title}>{title}</Text>
          </View>

          <FlatList
        style={{
          ...styles.movieList,
          maxHeight: coverImageSize[coverType].height,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={movies}
        renderItem={({ item }) => (

          <MovieItem
            movie={item}
            size={coverImageSize[coverType]}
            coverType={coverType}
          />

        )}
        keyExtractor={(item) => item.id.toString()}
      />

        </View>
      )
}

// ======================== getMovieList ==================
function getMovieList(path, setMovies, movies) {
    const url = `https://api.themoviedb.org/3/${path}`
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_ACCESS_TOKEN}`,
          },
        }
        fetch(url, options)
        .then(async (response) => await response.json())
        .then((response) => {
          setMovies(response.results)
          
        })
        .catch((errorResponse) => {
          console.log(errorResponse)
        })
  
    console.log(movies)
}

function MovieItem({ movie, size, coverType }){
    const navigation = useNavigation()
    const pushAction = StackActions.push('MovieDetail', { id: movie.id, poster_path: movie.poster_path, overview: movie.overview, title: movie.title})
    return (
        <TouchableOpacity onPress={() => {
            navigation.dispatch(pushAction)
          }}>
          <ImageBackground
            resizeMode="cover"
            style={[size, styles.backgroundImage]}
            imageStyle={styles.backgroundImageStyle}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path
              }`,
            }}
          >
            <LinearGradient
              colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
              locations={[0.6, 0.8]}
              style={styles.gradientStyle}
            >
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      )
}

function MovieDetail({ route }){
    const { id } = route.params
    const  {poster_path}  = route.params 
    const {overview} = route.params
    const {title} = route.params
    console.log(`Halo saya adalah ${route} dan ${poster_path}`)
    //route.par.map((item) => console.log(item))
    //const {id} = 278
    // ========= FetchData()

    // =================== Main function 
    return (
      
        <View
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 32,
      }}
    >
          <Image
        style={styles.responsiveImg}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
        }}
      />

      <Text style={{ fontSize: 30 }}>Movie ID: {id}</Text>
      <Text style={{ fontSize: 30 }}>Movie ID: {title}</Text>
      <Text style={{ fontSize: 18 }}>Movie ID: {overview}</Text>
    </View>
    
      )
}

export {MovieDetail, MovieList}