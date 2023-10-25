/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';

const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);
  const [data, setData] = useState([
    {
      id: 1,
      icon: '../../assest/icRandomize.png',
      name: 'Learn a new receipe',
      type: 'Cooking',
      participant: '1 Person',
      accesibility: 'Cheap',
    },
    {
      id: 2,
      icon: '../../assest/icRandomize.png',
      name: 'Social',
      type: 'Cooking',
      participant: '1 Person',
      accesibility: 'Cheap',
    },
    // Add more items as needed
  ]);

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const clearSearch = () => {
    setSearchTerm('');
    searchInputRef.current.blur();
    setIsFocused(false);
  };

  const searchBarStyle =
    searchTerm.length > 0
      ? {
          width: 350,
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 8,
          alignItems: 'center',
        }
      : {
          width: 380,
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 8,
          alignItems: 'center',
        };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.largeTitleTextStyle}>{'Search'}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            ref={searchInputRef}
            style={[
              searchBarStyle,
              {
                borderColor: isFocused ? '#000' : '#ccc',
              },
            ]}
            placeholder="Search activity"
            clearButtonMode="always"
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(!!searchTerm)}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Text>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        style={{
          backgroundColor: 'white',
        }}
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image
              source={require('../../assest/icRandomize.png')}
              style={styles.icon}
            />
            <View
              style={{
                width: 340,
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle}>
                {item.type + '•' + item.participant + '•' + item.accesibility}
              </Text>
            </View>
            <Image
              source={require('../../assest/arrow.png')}
              style={styles.arrowIcon}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 8,
    paddingLeft: 8,
    flexDirection: 'column',
    backgroundColor: '#EFEFF4',
    borderColor: '#EFEFF4',
  },
  largeTitleTextStyle: {
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 41,
    color: '#000',
    letterSpacing: Platform.OS === 'ios' ? 0.41 : undefined,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
    // Add your icon styles here
  },
  clearIcon: {
    width: 8,
    height: 8,
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    paddingBottom: 10,
  },
  arrowIcon: {
    width: 8,
    height: 8,
    marginLeft: 'auto', // This will push the arrow icon to the far right of the list item
    // Add any other styles you want for the arrow icon
  },
});

export default SearchScreen;
