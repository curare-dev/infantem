import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
    AdMobBanner,
    AdMobInterstitial,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';

const Ads = () => {
    return (
    <AdMobBanner
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={"No se encontró anuncio"} 
        style={styles.ad}
    />
    )
}

export const showAd = async () => {
await setTestDeviceIDAsync('EMULATOR');
await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
await AdMobInterstitial.showAdAsync();
}

export default Ads;

const styles = StyleSheet.create({})
  
  