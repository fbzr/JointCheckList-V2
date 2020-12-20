import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import {addItem, removeList} from '../../redux/slices/collection';
// Components
import AddInput from '../AddInput';
import ListItem from '../ListItem';
// Icon
import Icon from 'react-native-vector-icons/Feather';

// list id is passed through the route param
const List = ({navigation, route}) => {
  const list = useSelector((state) => state.collection.lists[route.params.id]);
  const items = list ? Object.values(list.items) : null;
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteList}>
          <View>
            <Icon name="trash" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleDeleteList = async () => {
    await dispatch(removeList({id: list.id}));
    navigation.push('Collection');
  };

  const handleAddItem = async (title) => {
    await dispatch(addItem({listId: route.params.id, title}));
    setSelectedItem('');
  };

  return list ? (
    <View style={{flex: 1}}>
      {items.length ? (
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={items}
          renderItem={({item}) => (
            <ListItem
              item={item}
              setSelected={setSelectedItem}
              selected={item.id === selectedItem}
            />
          )}
        />
      ) : (
        <Text style={styles.emptyText}>This list is empty</Text>
      )}

      <AddInput placeholder="Add a new item" actionFunc={handleAddItem} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  deleteButton: {
    marginRight: 10,
  },
  emptyText: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default List;
