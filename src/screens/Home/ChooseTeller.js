import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import SmallLogoSvg from '../../../assets/svg/SmallLogoSvg';

const ChooseTeller = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Kahve Falı</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.description}>
            Kahve falı baktırarak hayatınıza dair merak ettiklerinizi öğrenmek
            istiyorsanız sanal kahve falı deneyimi yaşamak için hemen kahve
            falınızı uzman yorumcularımıza gönderebilirsiniz.
          </Text>
          <Text style={styles.description}>
            Kahvenizi için, fincanınızı kapatın ve soğuduktan sonra fincanın
            resimlerini ve tabağınızın resimlerini bize gönderin. Hemen uzman
            yorumcularımız kahve falınızı size özel yorumlasın.
          </Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={['#FFD29E', '#fff']}
                style={styles.linearGradient}>
                <View style={styles.avatar}></View>
                <View style={styles.badgeArea}>
                  <Ionicons name="star" color="#F6C001" size={16} />
                  <Ionicons name="star" color="#F6C001" size={16} />
                </View>
                <SmallLogoSvg />
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Fal Baktır</Text>
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={['#FFD29E', '#fff']}
                style={styles.linearGradient}></LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={['#FFD29E', '#fff']}
                style={styles.linearGradient}></LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={['#FFD29E', '#fff']}
                style={styles.linearGradient}></LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChooseTeller;

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
    padding: 10,
  },
  description: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '40%',
    height: 200,
    backgroundColor: 'red',
    marginRight: 10,
    marginTop: 10,
    borderRadius: 25,
    justifyContent: 'center',
  },
  linearGradient: {
    width: '100%',
    height: 200,
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#73DBC8',
  },
  badgeArea: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  button: {
    height: 30,
    width: '70%',
    backgroundColor: '#9789D4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
