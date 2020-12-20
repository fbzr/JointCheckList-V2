import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AddInput = ({placeholder, actionFunc}) => {
  const [value, setValue] = useState('');
  const [selected, setClicked] = useState(false);

  const onAdd = async () => {
    if (value) {
      await actionFunc(value);
      setValue('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="plus" size={20} color="#333" />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholder={placeholder || 'Add'}
        onSubmitEditing={onAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    margin: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
  input: {
    fontSize: 16,
    width: '100%',
  },
});

export default AddInput;
