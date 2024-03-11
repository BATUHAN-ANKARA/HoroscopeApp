import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const SignUp = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [birthDate, setBirthDate] = useState(null);

  const handleConfirm = date => {
    setSelectedDate(date);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    // Kontrol edip, gün ve ay kısmı 10'dan küçükse başına sıfır ekliyoruz
    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    const formattedDay = day < 10 ? `0${day}` : day.toString();

    setSelectedMonth(formattedMonth);
    setSelectedDay(formattedDay);
    setSelectedYear(year);
    // Seçilen tarihten yaş hesaplama
    const ageDiffMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    // Yaş kontrolü
    if (age < 16) {
      Alert.alert(
        'Uyarı',
        '16 yaşından küçüksünüz, lütfen doğru doğum tarihini seçin.',
        [{text: 'Tamam', onPress: () => setSelectedDate(null)}],
      );
      return;
    }

    setDatePickerVisibility(false);
    setBirthDate(year + '-' + formattedMonth + '-' + formattedDay);
    console.log(birthDate);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const next = () => {
    console.log(selectedYear);
    if (selectedDate === '' || selectedDate === null) {
      Alert.alert(
        'Doğum Tarihi Hatası',
        'Lütfen bilgilerinizi eksiksiz giriniz.',
        [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
      );
      return;
    } else {
      navigation.navigate('SignUpStep2', {birthDate});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.mainText}>Seni Tanımak İstiyoruz</Text>

        <Text style={styles.secondaryText}>
          Doğum tarihini öğrenebilir miyiz?
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.inputArea} onPress={showDatePicker}>
            <Text style={styles.textInput}>
              {selectedDate
                ? `${selectedDay}/${selectedMonth}/${selectedYear}`
                : 'Doğum Tarihiniz'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />
        </View>

        <TouchableOpacity onPress={() => next()} style={styles.button}>
          <Text style={styles.buttonText}>Başla</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Seni tanıyorsak, giriş yaparak devam et.{' '}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.loginButton}>
          <Text style={styles.loginTextBold}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainText: {
    alignSelf: 'center',
    marginTop: 70,
    fontFamily: 'GothamRounded-Book',
    fontSize: 24,
  },
  secondaryText: {
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
  },
  inputArea: {
    height: 60,
    width: '70%',
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: '#222',
    backgroundColor: '#FFD29E',
    marginRight: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: 40,
    justifyContent: 'center',
  },
  button: {
    height: 60,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#73DBC8',
    alignSelf: 'center',
    borderColor: '#222',
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    marginTop: 30,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  textInput: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 22,
  },
  loginText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    marginTop: 50,
    textAlign: 'center',
    color: '#333',
  },
  loginTextBold: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#fff',
  },
  loginButton: {
    height: 60,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#DEB9E2',
    alignSelf: 'center',
    borderColor: '#222',
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    marginTop: 30,
  },
});
