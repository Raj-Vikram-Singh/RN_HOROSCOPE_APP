import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {getHoroscope} from '../services/api';
import _ from 'lodash';
import {IMAGES} from '../constants/ImagesConstant';

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
  backgroundImg: {
    opacity: 0.4,
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loader: {
    fontSize: 16,
    color: 'black',
  },
  imgContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  txtContainer: {
    textTransform: 'capitalize',
    padding: 10,
  },
  today: {
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 15,
    color: 'white',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  bannerImgContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bannerImg: {
    maxWidth: 415,
    maxHeight: 370,
  },
  headingText: {
    fontSize: 20,
    color: '#fdde6b',
    paddingRight: 10,
    fontWeight: 'bold',
  },
  row: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});

const SignDetailScreen = props => {
  const {route} = props;
  const {signName} = route.params;
  const [signDetails, setSignDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorMsg, setIsErrorMsg] = useState('');

  const handleSignPress = async sign => {
    setIsLoading(true);
    try {
      const response = await getHoroscope(sign);
      setSignDetails(response);
    } catch (e) {
      setIsErrorMsg(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSignPress(signName);
  }, [signName]);

  const renderData = () => {
    return (
      <ImageBackground
        style={styles.container}
        source={IMAGES.constellations.src}
        imageStyle={styles.backgroundImg}>
        <SafeAreaView>
          <View style={styles.bannerImgContainer}>
            <Image style={styles.bannerImg} source={IMAGES[signName].src} />
          </View>
          {signDetails && (
            <View style={styles.txtContainer}>
              <Text style={styles.today}>
                Today - {signDetails.current_date}
              </Text>
              <View>
                <Text style={styles.headingText}>Your Horoscope</Text>
                <Text style={styles.text}>{signDetails.description}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.headingText}>Your Lucky Number: </Text>
                <Text style={styles.text}>{signDetails.lucky_number}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.headingText}>Your Lucky Time: </Text>
                <Text style={styles.text}>{signDetails.lucky_time}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.headingText}>Your Mood: </Text>
                <Text style={styles.text}>{signDetails.mood}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.headingText}>Your Lucky Color: </Text>
                <Text style={styles.text}>{signDetails.color}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.headingText}>Your Compatibility: </Text>
                <Text style={styles.text}>{signDetails.compatibility}</Text>
              </View>
            </View>
          )}
        </SafeAreaView>
      </ImageBackground>
    );
  };

  const renderLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loader}>Loading...</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      {isLoading ? (
        renderLoader()
      ) : isErrorMsg ? (
        <Text>{isErrorMsg}</Text>
      ) : (
        renderData()
      )}
    </ScrollView>
  );
};

export default SignDetailScreen;
