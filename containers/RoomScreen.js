import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Entypo } from '@expo/vector-icons'; 
import { Button, Text, View, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

export default function RoomScreen() {
    const { params } = useRoute();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [fullText, setFullText] = useState(false);

    
    
    useEffect (() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`);
            setData(response.data);
            setIsLoading(false);

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
        <View style={styles.main}>
          <View style={styles.viewlogo}>
            <Image
              source={require("../assets/airbnb_logo_icon_170605.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
            <View>
                <Image
                    source={{uri: data.photos[0].url}}
                    style={styles.roomimg}
                    resizeMode="cover"
                />
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
                        {data.ratingValue === 5 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                          </View>
                        ) : data.ratingValue === 4 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="black" />
                          </View>
                        ) : data.ratingValue === 3 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                          </View>
                        ) : data.ratingValue === 2 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                          </View>
                        )  : data.ratingValue === 1 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                          </View>
                        ) : (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                          </View>
                        )
                      }
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
            
        </View>
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
})