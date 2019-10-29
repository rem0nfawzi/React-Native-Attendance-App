import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/global';
import Down from '../../assets/images/down.png';
const SelectBox = ({handleTypeChange, type}) => {
  const [showList, setShowList] = useState(false);
  const toggleList = x => {
    setShowList(!showList);
    if (x !== null) {
      handleTypeChange(x);
    }
  };
  return (
    <View
      style={{
        position: 'relative',
        marginLeft: 7,
        marginRight: 7,
        marginTop: 5,
        marginBottom: 10,
      }}>
      <TouchableOpacity
        style={styles.selectWrap}
        onPress={() => toggleList(null)}>
        <Image source={Down} style={styles.selectArrow} />
        <Text style={styles.selectLabel}>{type}</Text>
      </TouchableOpacity>
      {showList && (
        <View style={styles.selectItemsWrap}>
          <TouchableOpacity
            onPress={() => toggleList('خدمة')}
            style={{
              ...styles.selectItem,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}>
            <Text style={styles.selectItemLabel}>خدمة</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectItem}
            onPress={() => toggleList('إفتقاد')}>
            <Text style={styles.selectItemLabel}>إفتقاد</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SelectBox;
