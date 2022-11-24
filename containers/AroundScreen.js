import axios from "axios";
import { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Button, Text, View, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";

export default function RoomScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);       
    
        
    useEffect (() => {
        const getPermission = async () => {
            try {
              
              const { status } = await Location.requestForegroundPermissionsAsync();
              
              if (status === "granted") {                
                const location = await Location.getCurrentPositionAsync();
                
                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);
                
                fetchData(location.coords.latitude, location.coords.longitude);
                
              } else {
                alert("Permission refusée");

              }
            } catch (error) {
              alert(error.message);
            }
        };          

        const fetchData = async (lat, long) => {
        try {
            const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${lat}&longitude=${long}`);
            setData(response.data);
            setIsLoading(false);

        } catch (error) {
            alert(error.message);
        }
        };

        getPermission();
        
        
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
                        
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                >
                    
                    {data.map((marker) => {
                        return (
                            <Marker
                                key={marker._id}
                                coordinate={{
                                    latitude: marker.location[1],
                                    longitude: marker.location[0],
                                }}
                                title={marker.title}
                                description={marker.description}
                            />
                        );
            })}
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
      
      logo: {
        width: 30,
        height: 30,
      },
    
      viewlogo: {
        alignItems: "center",        
      },

      map: {
        height: 600,
        width: "100%",
        marginVertical: 20,
      },
})