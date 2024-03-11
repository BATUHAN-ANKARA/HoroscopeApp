import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';

const ZodiacRelationship = ({navigation}) => {
  const countries = [
    'Oğlak',
    'Koç',
    'Balık',
    'Başak',
    'Kova',
    'Yengeç',
    'Boğa',
    'İkizler',
    'Terazi',
    'Yay',
    'Aslan',
    'Akrep',
  ];
  const [zodiac1, setZodiac1] = useState('');
  const [zodiac2, setZodiac2] = useState('');
  const [zodiac2Full, setZodiac2Full] = useState('');
  const [zodiac1Full, setZodiac1Full] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Burç Uyumu</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <Text style={styles.mainText}>
          Burcunuzu ve onun burcunu seçerek, birbirinize olan uyumunuzu hemen
          öğrenebilirsiniz.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Burcunuz</Text>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              setZodiac1Full(selectedItem);
              if (selectedItem === 'Oğlak') {
                setZodiac1('oglak');
              } else if (selectedItem === 'Koç') {
                setZodiac1('koc');
              } else if (selectedItem === 'Balık') {
                setZodiac1('balik');
              } else if (selectedItem === 'Başak') {
                setZodiac1('basak');
              } else if (selectedItem === 'Kova') {
                setZodiac1('kova');
              } else if (selectedItem === 'Yengeç') {
                setZodiac1('yengec');
              } else if (selectedItem === 'İkizler') {
                setZodiac1('ikizler');
              } else if (selectedItem === 'Terazi') {
                setZodiac1('terazi');
              } else if (selectedItem === 'Yay') {
                setZodiac1('yay');
              } else if (selectedItem === 'Aslan') {
                setZodiac1('aslan');
              } else if (selectedItem === 'Akrep') {
                setZodiac1('akrep');
              } else if (selectedItem === 'Boğa') {
                setZodiac1('boga');
              }
            }}
            defaultButtonText={'Burç Seçiniz'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <Ionicons
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#333'}
                  size={20}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={'Burcunuzu yazın'}
            searchPlaceHolderColor={'darkgrey'}
            renderSearchInputLeftIcon={() => {
              return <Ionicons name={'search'} color={'#444'} size={20} />;
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Onun Burcu</Text>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              setZodiac2Full(selectedItem);
              if (selectedItem === 'Oğlak') {
                setZodiac2('oglak');
              } else if (selectedItem === 'Koç') {
                setZodiac2('koc');
              } else if (selectedItem === 'Balık') {
                setZodiac2('balik');
              } else if (selectedItem === 'Başak') {
                setZodiac2('basak');
              } else if (selectedItem === 'Kova') {
                setZodiac2('kova');
              } else if (selectedItem === 'Yengeç') {
                setZodiac2('yengec');
              } else if (selectedItem === 'İkizler') {
                setZodiac2('ikizler');
              } else if (selectedItem === 'Terazi') {
                setZodiac2('terazi');
              } else if (selectedItem === 'Yay') {
                setZodiac2('yay');
              } else if (selectedItem === 'Aslan') {
                setZodiac2('aslan');
              } else if (selectedItem === 'Akrep') {
                setZodiac2('akrep');
              } else if (selectedItem === 'Boğa') {
                setZodiac2('boga');
              }
            }}
            defaultButtonText={'Burç Seçiniz'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <Ionicons
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#333'}
                  size={20}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={'Burcunuzu yazın'}
            searchPlaceHolderColor={'darkgrey'}
            renderSearchInputLeftIcon={() => {
              return <Ionicons name={'search'} color={'#444'} size={20} />;
            }}
          />
        </View>

        {zodiac1 && zodiac2 ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ZodiacRelationshipDetail', {
                zodiac1: zodiac1,
                zodiac2: zodiac2,
                zodiac1Full: zodiac1Full,
                zodiac2Full: zodiac2Full,
              })
            }
            style={styles.button}>
            <Text style={styles.buttonText}>Burç Uyumunu Göster</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default ZodiacRelationship;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.1,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
  },
  mainText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
  },
  inputArea: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#FFD29E',
    marginTop: 10,
  },
  labelText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    height: 60,
    backgroundColor: '#73DBC8',
    marginTop: 50,
  },
  buttonText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
    color: '#333',
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFD29E',
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: {
    color: '#333',
    textAlign: 'left',
    fontFamily: 'GothamRounded-Book',
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF', borderRadius: 15},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {
    color: '#333',
    textAlign: 'left',
    fontFamily: 'GothamRounded-Book',
  },
  dropdown1SelectedRowStyle: {backgroundColor: '#73DBC8'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});
