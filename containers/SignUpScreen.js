import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text, TextInput, View, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [error, setError] = useState("");

  const submit = async () => {
    
      try {
        setError("");

        if (!email || !username || !description || !password || !confirmPassword){
          setError("All fields are mandatory");
          return;
        };
        
        if (password !== confirmPassword){
          setError("Passwords must be the same");
          return;
        };

        const response = await axios.post(`https://express-airbnb-api.herokuapp.com/user/sign_up`,
        {
          "email": email,
          "username": username,
          "description": description,
          "password": password
        });

        setToken(response.data.token, response.data.id);
        alert("You are log in");

      } catch (error) {
        const message = error.response.data.error;
        
        if (
          message === "This username already has an account." ||
          message === "This email already has an account."
        ) {
          setError(message);
        }
      }
               
  };
  
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
          <Text style={[styles.title, styles.textgrey]}>Sign up</Text>
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
          <TextInput
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
          />
        </View>
        <View style={styles.bottompage}>

          <Text style={{ color: "red", marginBottom: 5 }}>{error}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={submit}
          >
            <Text style={styles.textgrey}>Sign up</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.textgrey}>Already have an account ? Sign in</Text>
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