/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);
  const [data, setData] = useState(require('../activities.json'));

  const filteredData = data.filter(item =>
    item?.activity.toLowerCase().includes(searchTerm.toLowerCase()),
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
      {data && (
        <FlatList
          style={{
            backgroundColor: 'white',
          }}
          data={filteredData}
          keyExtractor={item => item?.key.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  message: 'I want to activity'.replace(
                    'activity',
                    item.activity,
                  ),
                })
              }>
              <View style={styles.listItem}>
                <Image
                  source={require('../../assest/icon2.png')}
                  style={styles.icon}
                />
                <View
                  style={{
                    width: 340,
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <Text style={styles.activity}>{item?.activity}</Text>
                  <Text style={styles.subtitle}>
                    {item.type +
                      ' • ' +
                      item.participants +
                      ' Person' +
                      ' • ' +
                      (item.price > 0.5 ? ' Expensive' : ' Cheap')}
                  </Text>
                </View>
                <Image
                  source={require('../../assest/arrow.png')}
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  },
  clearIcon: {
    width: 8,
    height: 8,
    marginRight: 8,
  },
  activity: {
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
    marginLeft: 'auto',
  },
});

export default SearchScreen;
