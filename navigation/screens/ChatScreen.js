/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';

const ChatScreen = ({route}) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const openAIServiceCall = async () => {
      setIsLoading(true);
      const apiKey = 'apiKey';
      const prompt = route.params.message;
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
        setResponse(result.data.choices[0].text);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    };

    openAIServiceCall();
  }, [route?.params?.message]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assest/backArrow.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.largeTitleTextStyle}>{'Bored AI'}</Text>
            </View>
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
        <Text style={{color: 'black'}}>{route.params.message}</Text>
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
    marginLeft: 8,
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
  arrowIcon: {
    width: 16,
    height: 16,
    marginRight: 'auto',
  },
});

export default ChatScreen;
