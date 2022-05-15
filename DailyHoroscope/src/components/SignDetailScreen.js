import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {getHoroscope} from '../services/api';
import _ from 'lodash';
import {IMAGES} from '../constants/ImagesConstant';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
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
    fontSize: 16,
    paddingBottom: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: 'sans-serif',
  },

  bannerImg: {
    maxWidth: 400,
    maxHeight: 370,
  },
  headingText: {
    fontSize: 20,
    color: '#f88700',
    paddingRight: 10,
    fontFamily: 'sans-serif',
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
      <View style={styles.container}>
        <Image style={styles.bannerImg} source={IMAGES[signName].src} />
        {signDetails && (
          <View style={styles.txtContainer}>
            <Text style={styles.today}>Today - {signDetails.current_date}</Text>
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
      </View>
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
