/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';

import axios from 'axios';

const ChatScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const openAIServiceCall = async () => {
      const apiKey = 'apiKey';
      const prompt = props.route.params.message;
      try {
        const result = await axios.post(
          'https://api.openai.com/v1/engines/text-davinci-003/completions',
          {
            prompt: prompt,
            max_tokens: 50,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          },
        );
        console.log(result);
        setResponse(result.data.choices[0].text);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    };

    openAIServiceCall();
  }, [props.route.params.message]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <View style={styles.container}>
          <View>
            <Text style={styles.largeTitleTextStyle}>{'Bored AI'}</Text>
          </View>
          <View style={styles.avatarContainerStyle}>
            <Image
              style={styles.avatar}
              source={require('../../assest/icAvatar.png')}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'flex-end',
          backgroundColor: '#EFEFF4',
          padding: 10,
          margin: 5,
          borderRadius: 10,
        }}>
        <Text style={{color: 'black'}}>{props.route.params.message}</Text>
      </View>

      {isLoading ? (
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#ccc',
            padding: 10,
            margin: 5,
            borderRadius: 10,
          }}>
          <Text>Thinking...</Text>
        </View>
      ) : null}

      {response !== '' && !isLoading ? (
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'white',
            padding: 10,
            margin: 5,
            borderRadius: 10,
            borderColor: 'black',
          }}>
          <Text style={{color: 'black'}}>{response}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EFEFF4',
    borderBottomWidth: 1,
  },
  container: {
    paddingTop: 64,
    paddingBottom: 8,
    flexDirection: 'row',
    marginHorizontal: 16,

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  largeTitleTextStyle: {
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 41,
    color: '#000',
    letterSpacing: Platform.OS === 'ios' ? 0.41 : undefined,
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  avatarContainerStyle: {
    alignSelf: 'center',
  },
});

export default ChatScreen;
