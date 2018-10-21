import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

const firebaseConfig = {
    apiKey: "AIzaSyAfW-k17fTieeBHLTzFVtJXG4uRwyoOhWA",
    authDomain: "touchpass-bf2cb.firebaseapp.com",
    databaseURL: "https://touchpass-bf2cb.firebaseio.com",
    projectId: "touchpass-bf2cb",
    storageBucket: "touchpass-bf2cb.appspot.com"
  };

firebase.initializeApp(firebaseConfig);

export default class LoginPage extends React.Component {
  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password: ''
    })
  }

  signUpUser = (email, password) => {

    try{
      if(this.state.password.length<6){
        alert("Please enter at least 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email,password)

    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {

    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        console.log(user)
      })

    }
    catch(error){
      console.log(error.toString())
    }

  }

  
  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input keyboardType="email-address" autoCorrect={false} autoCapitalize="none" onChangeText={(email) => this.setState({email})}/>
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry={true} onChangeText={(password) => this.setState({password})} autoCorrect={false} autoCapitalize="none"/>
          </Item>
          <Button style={{marginTop: 10}} onPress={()=>this.loginUser(this.state.email,this.state.password)} full rounded success>
              <Text style={{ color:'white' }}>Login</Text>
            </Button>

            <Button style={{marginTop: 10}} onPress={() => this.signUpUser(this.state.email, this.state.password)} full rounded primary>
              <Text style={{ color:'white' }}>Sign Up</Text>
            </Button>
        </Form>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});