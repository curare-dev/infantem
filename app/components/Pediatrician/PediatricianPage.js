import React, { useState } from "react";
import { Linking, StyleSheet, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { getColor } from "../../utils/colors";
import { Text, Button, Divider } from "react-native-elements";
import {
  AdMobBanner
} from 'expo-ads-admob';

const PediatricianPage = ({ pediatrician }) => {
  let { name, ubicacion } = pediatrician;
  const [isMedicRegistered, setIsMedicRegistered] = useState(false);

  const redirectGoogleMaps = (name) => {
    const URL = `https://www.google.com/maps/search/?api=1&query=${name}`;
    const supported = Linking.canOpenURL(URL);
    if (supported) {
      Linking.openURL(URL);
    } else {
      console.log("No se pudo abrir el link");
    }
  };

  return (
    <View style={styles.overlayContainer}>
      <Text style={styles.title}>{name}</Text>
      <Divider style={styles.divider} />
      <Text style={{ textAlign: "center" }}>{ubicacion}</Text>
      <TouchableOpacity onPress={()=>redirectGoogleMaps(name)} style={{
        margin: "5%",
      }}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: getColor("buttonColor"), textDecorationLine: "underline" }}>
          Redireccionar al Mapa
        </Text>
      </TouchableOpacity>
      <Button
        title={isMedicRegistered ? "Hacer Cita" : "Medico No Registrado"}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainer}
        disabled={!isMedicRegistered}
      />
      <AdMobBanner
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={"No se encontró anuncio"} 
          style={styles.ad}
      />
    </View>
  );
};

export default PediatricianPage;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  image: {
    height: 200,
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  divider: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  overlayContainer: {
    width: "100%",
  },
  mapStyle: {
    alignSelf: "center",
    width: 250,
    height: 250,
    margin: "5%",
  },
  ad: {
    marginTop: "3%",
    alignSelf: "center"
  }
});


// import React, { useState } from "react";
// import { StyleSheet, View, Linking } from "react-native";
// import { getColor } from "../../utils/colors";
// import { Text, Button, Divider, Overlay } from "react-native-elements";
// import Appointment from "./Appointment";
// import MapView, { Marker } from "react-native-maps";
// import {
//   AdMobBanner
// } from 'expo-ads-admob';
// const PediatricianPage = ({ pediatrician }) => {
//   let { uuid, name, ubicacion, coordinates } = pediatrician;
//   const [visible, setVisible] = useState(false);
//   const [isMedicRegistered, setIsMedicRegistered] = useState(false);
//   const toggleOverlay = () => {
//     setVisible(!visible);
//   };

//   const redirectGoogleMaps = (name) => {
//     const URL = `https://www.google.com/maps/search/?api=1&query=${name}`;
//     const supported = Linking.canOpenURL(URL);
//     if (supported) {
//       Linking.openURL(URL);
//     } else {
//       console.log("No se pudo abrir el link");
//     }
//   };

//   return (
//     <View>
//       <Text style={styles.title}>{name}</Text>
//       <Divider style={styles.divider} />
//       <Text style={styles.subtitle}>Ubicación: {ubicacion}</Text>
//       <MapView
//         customMapStyle={styles.customMapStyle}
//         initialRegion={{
//           latitude: coordinates.lat,
//           longitude: coordinates.lng,
//           latitudeDelta: 0.001,
//           longitudeDelta: 0.001,
//         }}
//         style={styles.mapStyle}
//         onPress={(e) => {
//           e.stopPropagation();
//           redirectGoogleMaps(name);
//         }}
//       >
//         <Marker
//           coordinate={{
//             latitude: coordinates.lat,
//             longitude: coordinates.lng,
//             title: "Foo Place",
//             subtitle: "1234 Foo Drive",
//           }}
//         ></Marker>
//       </MapView>
//       <Button
//         title={isMedicRegistered ? "Hacer Cita" : "Medico No Registrado"}
//         buttonStyle={styles.buttonStyle}
//         containerStyle={styles.buttonContainer}
//         onPress={toggleOverlay}
//         disabled={!isMedicRegistered}
//       />
//       <Overlay
//         isVisible={visible}
//         onBackdropPress={toggleOverlay}
//         overlayStyle={styles.overlayContainer}
//       >
//         <Appointment setVisible={setVisible} />
//       </Overlay>
//       <AdMobBanner
//           bannerSize="mediumRectangle"
//           adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
//           servePersonalizedAds // true or false
//           onDidFailToReceiveAdWithError={"No se encontró anuncio"} 
//           style={styles.ad}
//       />
//     </View>
//   );
// };

// export default PediatricianPage;

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 20,
//     alignSelf: "center",
//     textAlign: "center",
//   },
//   image: {
//     height: 200,
//     width: "100%",
//   },
//   buttonStyle: {
//     backgroundColor: getColor("buttonColor"),
//     width: "90%",
//   },
//   buttonContainer: {
//     alignItems: "center",
//   },
//   divider: {
//     marginTop: "5%",
//     marginBottom: "5%",
//   },
//   overlayContainer: {
//     width: "75%",
//   },
//   mapStyle: {
//     alignSelf: "center",
//     width: 250,
//     height: 250,
//     margin: "5%",
//   },
//   ad: {
//     marginTop: "3%",
//   }
// });
