import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getHoroscope} from '../services/api';

const SignDetailScreen = props => {
  const {route} = props;
  const {signName} = route.params;
  const [signDetails, setSignDetails] = useState({});

  const handleSignPress = async sign => {
    const response = await getHoroscope(sign);
    console.log(response);
    setSignDetails(response);
  };

  useEffect(() => {
    handleSignPress(signName);
  }, [signName]);

  return (
    <View>
      <Text>{signDetails && JSON.stringify(signDetails)}</Text>
    </View>
  );
};

export default SignDetailScreen;
