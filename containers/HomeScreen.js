import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Entypo } from '@expo/vector-icons'; 
import { Button, Text, View, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";


export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  
  
  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://express-airbnb-api.herokuapp.com/rooms");
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
          <FlatList
            style={{marginBottom: 110}}
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              // let stars = [];
              // for(let i = 1; i<item.ratingValue; i++){
              //   stars.push(`<Entypo name="star" size={24} color="yellow" />`);
              // };                     
              return (
                <View style={styles.room}>
                  
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Room", { roomId: item._id });
                    }}
                  >                  
                    <Image
                      source={{uri: item.photos[0].url}}
                      style={styles.roomimg}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  
                  <View style={styles.pricecontainer}>
                    <Text style={styles.price}>{item.price} €</Text>
                  </View>
                  <View style={styles.roomdetail}>
                    <View style={styles.detailleft}>
                      <Text 
                        style={styles.title}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <View style={styles.row}>                        
                        {item.ratingValue === 5 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                          </View>
                        ) : item.ratingValue === 4 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="black" />
                          </View>
                        ) : item.ratingValue === 3 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                          </View>
                        ) : item.ratingValue === 2 ? (
                          <View style={styles.row}>
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="orange" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                            <Entypo name="star" size={20} color="black" />
                          </View>
                        )  : item.ratingValue === 1 ? (
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
                        <Text>{item.reviews} reviews</Text>
                      </View>
                    </View>
                    <Image
                      source={{uri: item.user.account.photo.url}}
                      style={styles.userimg}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              );
            }}
          />
          <Button
            title="Go to Profile"
            onPress={() => {
              navigation.navigate("Profile", { userId: 123 });
            }}
          />
        </View>
      )}
    </View>
  );
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

  room: {
    paddingHorizontal: 15,
    marginTop: 20,
  },

  roomimg: {
    width: "100%",
    height: 200,    
  },

  pricecontainer: {
    position: "absolute",
    bottom: 100,
    left: 15,
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
})
