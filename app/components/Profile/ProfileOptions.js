import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Share } from "react-native";
import { getColor } from "../../utils/colors";
import { BottomSheet, Button, Icon, ListItem } from "react-native-elements";
import Modal from "../../shared/Modal";
import ChangeName from "./ChangeData/ChangeName";
import ChangeLastName from "./ChangeData/ChangeLastName";
import ChangePassword from "./ChangeData/ChangePassword";
import ChangeAge from "./ChangeData/ChangeAge";
import ShareApp from "../../shared/ShareApp";
import UpgradeApp from "../../shared/UpgradeApp";
import LogOut from "../Session/LogOut";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from 'expo-image-picker';
import {downloadImageOnS3, uploadImageOnS3} from "../../services/profile/image.service";
import { updateUserById } from "../../services/profile/user.service";
import {
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const ProfileOptions = ({ setLogin, user, setReloadProfileInfo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const [renderComponent, setRenderComponent] = useState(null);
  const [subject, setSubject] = useState("Seleccionar unidad de medida");
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  const showAd = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    await AdMobInterstitial.showAdAsync();
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      await uploadImageOnS3({
        uri: result.uri,
        name: "image-test",
        type: "image/jpeg"
      });
      downloadImageOnS3().then( response => {
          updateUserById({avatarURL: response.split("?")[0]});
          setReloadProfileInfo(true);
          showAd();
      }).catch( error => {
        "ERROR: ", error
      });
    }
  };

  const list = [
    {
      title: "Onzas",
      subject: "oz",
    },
    {
      title: "Mililitros",
      subject: "ml",
    },
  ];

  const getComponent = (component) => {
    switch (component) {
      case "name":
        setRenderComponent(
          <ChangeName
            setIsVisible={setIsVisible}
            setReloadProfileInfo={setReloadProfileInfo}
          />
        );
        break;
      case "lastName":
        setRenderComponent(
          <ChangeLastName
            setIsVisible={setIsVisible}
            setReloadProfileInfo={setReloadProfileInfo}
          />
        );
        break;
      case "age":
        setRenderComponent(
          <ChangeAge
            setIsVisible={setIsVisible}
            setReloadProfileInfo={setReloadProfileInfo}
          />
        );
        break;
      case "password":
        setRenderComponent(
          <ChangePassword
            setIsVisible={setIsVisible}
            setReloadProfileInfo={setReloadProfileInfo}
          />
        );
        break;
      case "shareApp":
        setRenderComponent(<ShareApp />);
        break;
      case "upgradeApp":
        setRenderComponent(<UpgradeApp />);
        break;
      case "closeSession":
        setRenderComponent(<LogOut setLogin={setLogin} />);
        break;
      default:
        break;
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Infantem, la aplicación que necesitas para tu bebé',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          showAd();
        } else {
          // shared
          showAd();
        }
      } else if (result.action === Share.dismissedAction) {
        showAd();
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <View style={styles.optionsStyle}>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("name");
            toggleModal();
          }}
        >
          <Text style={styles.title}>Cambiar Nombre</Text>
          <Text style={styles.subtitle}>
            {user.name === undefined ? "Colocar Nombre" : user.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("lastName");
            toggleModal();
          }}
        >
          <Text style={styles.title}>Cambiar Apellidos</Text>
          <Text style={styles.subtitle}>
            {user.lastname === undefined ? "Colocar Apellidos" : user.lastname}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("age");
            toggleModal();
          }}
        >
          <Text style={styles.title}>Cambiar Edad</Text>
          <Text style={styles.subtitle}>
            {user.age === undefined ? "Colocar Edad" : user.age}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("password");
            toggleModal();
          }}
        >
          <Text style={styles.title}>Cambiar Contraseña</Text>
          <Icon
            iconStyle={styles.subtitle}
            type="material-community"
            name="lock-outline"
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={pickImage}
        >
          <Text style={styles.title}>Cambiar Avatar</Text>
          <Icon
            iconStyle={styles.subtitle}
            type="material-community"
            name="account-edit"
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.title}>Cambiar Medida</Text>
          <Text style={styles.subtitle}>
            {user.feedingType === "oz"
              ? "Onzas"
              : user.feedingType === "ml"
              ? "Mililitros"
              : "No seleccionado"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={onShare}
        >
          <Text style={styles.title}>Compartir Aplicación</Text>
          <Icon
            iconStyle={styles.subtitle}
            type="material-community"
            name="share-variant"
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchableStyle, styles.versionButton]}
        >
          <Text style={styles.title}>Versión: Gratuita</Text>
          <Text style={[styles.upgradeText]}>
            {user.suscription === "free"
              ? "Gratuita"
              : user.suscription === "intermediate"
              ? "Intermedia"
              : user.suscription === "premium" && "Premium"}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Cerrar Sesión"
        containerStyle={[styles.buttonContainer]}
        buttonStyle={styles.buttonStyle}
        onPress={() => {
          getComponent("closeSession");
          toggleModal();
        }}
      />
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        {renderComponent}
      </Modal>
      <BottomSheet isVisible={visible}>
        {list.map((l, i) => {
          return (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={() => {
                setSubject(l.title);
                SecureStore.deleteItemAsync("mUnit");
                SecureStore.setItemAsync("mUnit", l.subject);
                setVisible(false);
                setIsVisible(false);
                setReloadProfileInfo(true);
                showAd();
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </BottomSheet>
    </View>
  );
};

export default ProfileOptions;

const styles = StyleSheet.create({
  touchableStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
    backgroundColor: getColor("cardColor"),
    width: "90%",
    padding: "3%",
    borderRadius: 5,
  },
  optionsStyle: {
    alignItems: "center",
  },
  closeSession: {
    backgroundColor: getColor("buttonColor"),
  },
  title: {
    fontWeight: "bold",
    opacity: 0.7,
    textAlignVertical: "center",
  },
  subtitle: {
    opacity: 0.5,
  },
  topText: {
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
  versionButton: {
    backgroundColor: "#FDFFC2",
  },
  upgradeText: {
    fontWeight: "bold",
    color: "#99DA44",
  },
});
