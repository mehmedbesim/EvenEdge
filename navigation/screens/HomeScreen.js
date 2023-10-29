/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useDispatch, useSelector} from 'react-redux';
import {getBoredAPI} from './redux/actions';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [activity, setActivity] = useState('Stop being bored!');
  const [subText, setSubText] = useState(
    'Configure parameters to find activities',
  );
  const [type, setType] = useState('All');
  const [price, setPrice] = useState(0.5);
  const [participiant, setParticipiant] = useState(2);
  const [accesibility, setAccesibility] = useState(0.5);

  const isLoading = useSelector(state => state.isLoading);
  const data = useSelector(state => state.data);

  const handleFindActivity = () => {
    if (!isLoading) {
      dispatch(getBoredAPI());
      setActivity(data?.activity);
      setType(data?.type);
      setAccesibility(data?.accessibility);
      setParticipiant(data?.participants);
      setPrice(data?.price);
      setSubText(
        data?.type +
          ' • ' +
          data?.participants +
          ' Person' +
          ' • ' +
          (data?.price > 0.5 ? ' Expensive' : ' Cheap'),
      );
    } else {
      setActivity('Loading....');
      setSubText('Searching for activities');
    }
  };

  const typeList = [
    {title: 'All', active: true},
    {title: 'Recreational', active: false},
    {title: 'Relaxation', active: false},
    {title: 'Cooking', active: false},
    {title: 'Charity', active: false},
    {title: 'Busywork', active: false},
    {title: 'Education', active: false},
    {title: 'Social', active: false},
    {title: 'Music', active: false},
    {title: 'Diy', active: false},
  ];

  const toggleButton = index => {
    const updatedButtons = buttons.map((button, i) => {
      if (i === index) {
        // Activate the clicked button
        setType(button.title);
        return {...button, active: true};
      } else {
        // Deactivate all other buttons
        return {...button, active: false};
      }
    });
    setButtons(updatedButtons);
  };
  const generateRandomValues = () => {
    const randomTypeIndex = Math.floor(Math.random() * buttons.length);
    const randomPrice = Math.random();
    const randomParticipant = Math.floor(Math.random() * 5) + 1;
    const randomAccessibility = Math.random();

    const updatedButtons = buttons.map((button, index) => {
      if (index === randomTypeIndex) {
        return {...button, active: true};
      } else {
        return {...button, active: false};
      }
    });

    setType(buttons[randomTypeIndex].title);
    setPrice(randomPrice);
    setParticipiant(randomParticipant);
    setAccesibility(randomAccessibility);
    setButtons(updatedButtons);
  };

  const [buttons, setButtons] = useState(typeList);

  return (
    <View style={styles.allPage}>
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
        <FlatList
          data={buttons}
          horizontal
          contentContainerStyle={styles.swipeButton}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.scrollableButton,
                item.active
                  ? {backgroundColor: 'black'}
                  : {backgroundColor: 'white'},
              ]}
              onPress={() => toggleButton(index)}>
              <Text
                style={[
                  styles.buttonText,
                  item.active ? {color: 'white'} : {color: 'black'},
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <TouchableOpacity
        style={styles.bigButton}
        onPress={() => {
          navigation.navigate('Chat', {
            message: 'I want to activity'.replace('activity', activity),
          });
        }}>
        <View style={styles.buttonContent}>
          <Image
            source={require('../../assest/searchIcon.png')}
            style={styles.buttonIcon}
          />
          <View>
            <Text style={styles.buttonTitle}>{activity}</Text>
            <Text style={styles.buttonSubtitle}>{subText}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderSection}>
          <Text style={styles.sliderTitle}>Price</Text>
          <Text style={styles.sliderValue}>{price?.toFixed(1)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#0098FD"
            maximumTrackTintColor="#000000"
            value={price}
            onValueChange={value => setPrice(value)}
          />
        </View>

        <View style={styles.sliderSection}>
          <Text style={styles.sliderTitle}>Participiant</Text>
          <Text style={styles.sliderValue}>{participiant?.toFixed(0)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            minimumTrackTintColor="#0098FD"
            maximumTrackTintColor="#000000"
            value={participiant}
            onValueChange={value => setParticipiant(value)}
          />
        </View>

        <View style={styles.sliderSection}>
          <Text style={styles.sliderTitle}>Accesibility</Text>
          <Text style={styles.sliderValue}>{accesibility?.toFixed(2)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#0098FD"
            maximumTrackTintColor="#000000"
            value={accesibility}
            onValueChange={value => setAccesibility(value)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={generateRandomValues}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assest/icRandomize.png')}
              style={styles.buttonIcon}
            />
            <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Randomize Values
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blackButton}
          onPress={handleFindActivity}
          disabled={isLoading}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Find Activity
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderColor: '#EFEFF4',
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
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderSection: {
    marginBottom: 16,
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  slider: {
    width: 350,
    height: 60,
  },
  sliderValue: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    margin: 16,
    alignItems: 'center',
  },
  whiteButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 350,
    height: 50,
  },
  blackButton: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 350,
    height: 50,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  bigButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    width: 350,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonSubtitle: {
    color: 'black',
    fontSize: 16,
  },
  swipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollableButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
