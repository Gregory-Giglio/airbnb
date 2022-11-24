import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Entypo } from '@expo/vector-icons';
import Swiper from "react-native-swiper"; 
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button, Text, View, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";

export default function RoomScreen() {
    const { params } = useRoute();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [fullText, setFullText] = useState(false);
    const [stars, setStars] = useState([]);
    
    
    
    useEffect (() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`);
            setData(response.data);
            setIsLoading(false);

            const tempstars = [];
            for(let i = 0; i<5; i++){
              if (i < response.data.ratingValue) {                
                tempstars.push(<Entypo name="star" size={20} color="orange" key={i} />);
              } else {
                tempstars.push(<Entypo name="star" size={20} color="grey" key={i} />);
              }
            };
            setStars(tempstars);

        } catch (error) {
            alert(error.response.data.error);
        }
        };

        fetchData();
    }, []);

    
    return (
    <View>
      {isLoading === true ? (
        <View>
          <ActivityIndicator size="large" color="#F9585D" style={{ marginTop: 100 }} />
        </View>
      ) : (
        <ScrollView>
        <View style={styles.main}>
          <View style={styles.viewlogo}>
            <Image
              source={require("../assets/airbnb_logo_icon_170605.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
            <View>               
              
                <Swiper
                  style={styles.wrapper}
                  dotColor="salmon"
                  activeDotColor="red"
                  autoplay
                >
                  {data.photos.map((slide) => {
                    return (
                      <View style={styles.slide} key={slide.picture_id}>
                        <Image
                          source={{ uri: slide.url }}
                          style={{ height: "100%", width: "100%" }}
                        />
                      </View>
                    );
                  })}
                </Swiper>                
                <View style={styles.pricecontainer}>
                    <Text style={styles.price}>{data.price} €</Text>
                </View>
            </View>
            <View style={styles.roomdetail}>
                    <View style={styles.detailleft}>
                      <Text 
                        style={styles.title}
                        numberOfLines={1}
                      >
                        {data.title}
                      </Text>
                      <View style={styles.row}>
                        <Text>{stars}</Text>                        
                        <Text>{data.reviews} reviews</Text>
                      </View>
                    </View>
                    <Image
                      source={{uri: data.user.account.photo.url}}
                      style={styles.userimg}
                      resizeMode="cover"
                    />
                    
            </View>
            <TouchableOpacity
                onPress={() => {
                    setFullText(!fullText);
                }}
            >        
                <Text
                    style={styles.description}
                    numberOfLines= {fullText ? 0 : 3}
                >
                    {data.description}
                </Text>
            </TouchableOpacity>
            
            <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: data.location[1],
              longitude: data.location[0],
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            >
              <Marker
                  
                  coordinate={{
                    latitude: data.location[1],
                    longitude: data.location[0],
                  }}
                  
                />  
            </MapView>

        </View>
        </ScrollView>
      )}
    </View>
    )
          
}

const styles = StyleSheet.create({
    main: {
      marginTop: 30,
    },
  
    row: {
      flexDirection: "row",
    },
  
    logo: {
      width: 30,
      height: 30,    
    },
  
    viewlogo: {
      alignItems: "center",
      
    },
    
    roomimg: {
        width: "100%",
        height: 300,
        marginTop: 10,    
    },

    pricecontainer: {
        position: "absolute",
        bottom: 10,
        backgroundColor: "black",
        width: 90,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    
    price: {
        fontSize: 20,
        color: "white",
    },

    roomdetail: {    
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    
    detailleft: {
        flex: 2,
        paddingRight: 20,        
    },
    
    title: {
        fontSize: 18,
    },
    
    userimg: {    
        width: 70,
        height: 70,
        borderRadius: 50,
    },

    description: {
        paddingHorizontal: 20,
    },

    wrapper: {
      height: 300,
      marginTop: 10,
    },
    slide: {
      height: 300,
    },

    map: {
      height: 300,
      width: "100%",
      marginVertical: 20,
    },
})