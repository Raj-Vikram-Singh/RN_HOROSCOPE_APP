import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import SUN_SIGN_IMAGES, {IMAGES} from '../constants/ImagesConstant';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    backgroundColor: 'black',
    flex: 1,
  },
  backgroundImg: {
    opacity: 0.4,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'fantasy',
    paddingBottom: 20,
    color: 'white',
  },
  imgContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  imgText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 5,
    color: 'white',
    fontFamily: 'fantasy',
  },
  dateRangeText: {
    fontSize: 12,
    color: 'orange',
  },
  signImg: {
    width: 100,
    height: 100,
    borderRadius: 90 / 2,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = props => {
  const {navigation} = props;

  const handleSignPress = async sign => {
    const title = `Welcome ${_.capitalize(sign)}`;
    navigation.navigate('SignDetailScreen', {
      signName: sign,
      title: title,
    });
  };

  return (
    <ImageBackground
      style={styles.container}
      source={IMAGES.constellations.src}
      imageStyle={styles.backgroundImg}>
      <SafeAreaView>
        <Text style={styles.titleStyle}>Pick your zodiac sign</Text>
        <ScrollView>
          <View style={styles.row}>
            {SUN_SIGN_IMAGES.map(sign => (
              <TouchableOpacity
                onPress={() => handleSignPress(sign.name)}
                key={sign.id}>
                <View style={styles.imgContainer}>
                  <Image style={styles.signImg} source={sign.src} />
                  <Text style={[styles.imgText, styles.dateRangeText]}>
                    {sign.date_range}
                  </Text>
                  <Text style={styles.imgText}>{sign.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
