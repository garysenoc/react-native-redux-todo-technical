import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here

    if (
      (username === 'user1' && password === 'user1') ||
      (username === 'user2' && password === 'user2')
    ) {
      navigation.navigate('Home', {user: username});
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default Login;
