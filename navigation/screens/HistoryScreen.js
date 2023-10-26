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
  Modal,
} from 'react-native';

const HistoryScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      icon: '../../assest/icRandomize.png',
      name: 'Learn a new receipe',
      type: 'Cooking',
      date: 'Today 20:30',
    },
    {
      id: 2,
      icon: '../../assest/icRandomize.png',
      name: 'Social',
      type: 'Cooking',
      date: 'Yesterday 20:30',
    },
  ]);

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const clearSearch = () => {
    setSearchTerm('');
    searchInputRef.current.blur();
    setIsFocused(false);
  };

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    setData([]);
    setShowDeleteConfirmation(false);
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.largeTitleTextStyle}>{'History'}</Text>
          <View style={{position: 'absolute', right: 10}}>
            <TouchableOpacity onPress={openDeleteConfirmation}>
              <Image
                source={require('../../assest/trashIcon.png')}
                style={styles.trashCanIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

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
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.type + '•' + item.date}</Text>
            </View>
            <Image
              source={require('../../assest/arrow.png')}
              style={styles.arrowIcon}
            />
          </View>
        )}
      />
      {/* Delete Confirmation Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteConfirmation}>
        <View style={styles.deleteConfirmationModal}>
          <View style={styles.deleteConfirmationContent}>
            <Image
              source={require('../../assest/trashIcon.png')}
              style={{
                width: 36,
                height: 36,
              }}
            />
            <Text style={styles.deleteConfirmationText}>Delete History</Text>
            <Text style={styles.deleteConfirmationSubText}>
              Are you sure to remove all history items, this action is
              irreversible!
            </Text>
            <View style={styles.deleteConfirmationButtons}>
              <TouchableOpacity
                style={[styles.deleteConfirmationButton, styles.cancelButton]}
                onPress={() => setShowDeleteConfirmation(false)}>
                <Text style={styles.deleteConfirmationButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteConfirmationButton, styles.deleteButton]}
                onPress={handleDelete}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 41,
    color: '#000',
    letterSpacing: Platform.OS === 'ios' ? 0.41 : undefined,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    padding: 8,
    backgroundColor: '#EFEFF4',
    borderRadius: 10,
    borderWidth: 1,
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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    paddingTop: 4,
  },
  arrowIcon: {
    width: 8,
    height: 8,
    marginLeft: 'auto',
  },
  trashCanIcon: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
  },
  deleteConfirmationModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  deleteConfirmationContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteConfirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deleteConfirmationSubText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  deleteConfirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteConfirmationButton: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  deleteConfirmationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    color: 'black',
  },
  deleteButton: {
    backgroundColor: 'black',
    color: 'white',
  },
});

export default HistoryScreen;
