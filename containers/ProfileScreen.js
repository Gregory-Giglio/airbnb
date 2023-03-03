// import { useRoute } from "@react-navigation/core";
import { Text, View, TouchableOpacity, StyleSheet, Image, ActivityIndicator, TextInput } from "react-native";
import axios from "axios";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({userId}, {userToken}, {setToken}) {
  // const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  // const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();

  const [error, setError] = useState("");

  const submit = async () => {

  };

  return (
    <KeyboardAwareScrollView>
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
          <View style={styles.inputs}>
            <TextInput 
              style={styles.input}
              placeholder="email"
              autoCapitalize="none"       //pour empêcher que la première lettre soit automatiquement en majuscule
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="username"
              autoCapitalize="none"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <TextInput
              style={styles.inputaera}
              placeholder="Describe yourself in a few words..."
              numberOfLines={4}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="confirm password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            /> */}
          </View>
          <View style={styles.bottompage}>

            <Text style={{ color: "red", marginBottom: 5 }}>{error}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={submit}
            >
              <Text style={styles.textgrey}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setToken(null);
              }}
            >
              <Text style={styles.textgrey}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>        
      )}
    </KeyboardAwareScrollView>
  );
}


const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,    
  },

  viewlogo: {
    alignItems: "center",
    marginTop: 30,
  },

  main: {
    backgroundColor: "white",
        
  },

  textgrey: {
    color: "#717171",
  },

  inputs: {
    marginVertical: 50,
    marginHorizontal: 30,
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
    marginBottom: 30,
  },

  inputaera: {
    borderWidth: 2,
    borderColor: "#FFBAC0",
    marginBottom: 30,
    paddingHorizontal: 10,
  },

  bottompage: {
    alignItems: "center",
  },

  button: {
    width: 200,
    height: 50,
    borderColor: "#F9585D",
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
})