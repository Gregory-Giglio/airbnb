import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text, TextInput, View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  
  return (
    <KeyboardAwareScrollView>
    <View>
      <View style={styles.main}>
        <View style={styles.viewlogo}>
          <Image
            source={require("../assets/airbnb_logo_icon_170605.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, styles.textgrey]}>Sign in</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput 
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
        <View style={styles.bottompage}>

          <Text style={{ color: "red", marginVertical: 5 }}>{error}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              // const userToken = "secret-token";
              // setToken(userToken);
              setError("");

              if (!email || !password){
                setError("All fields are mandatory");                
              } else {
                try {
                  const response = await axios.post(
                    `https://express-airbnb-api.herokuapp.com/user/log_in`,
                    {
                      "email": email,
                      "password": password
                    }
                    );
                    
                    setToken(response.data.token)
                    alert("You are log in");
                    
                } catch (error) {
                  const message = error.response.data.error;
                  setError(message);
                }
                          
            }}}
            >
            <Text style={styles.textgrey}>Sign in</Text>
          </TouchableOpacity>
          
          <TouchableOpacity            
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.textgrey}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,    
  },

  viewlogo: {
    alignItems: "center",
    marginTop: 60,
  },

  main: {
    backgroundColor: "white",
    
  },

  title: {
    marginTop: 10,
    fontSize: 18,
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
