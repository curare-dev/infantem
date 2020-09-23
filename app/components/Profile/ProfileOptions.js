import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getColor } from "../../utils/colors";
import { Button, Icon } from "react-native-elements";
import Modal from "../../shared/Modal";
import ChangeAlias from "./ChangeData/ChangeAlias";
import ChangeName from "./ChangeData/ChangeName";
import ChangeLastName from "./ChangeData/ChangeLastName";
import ChangePassword from "./ChangeData/ChangePassword";
import ChangeAvatar from "./ChangeData/ChangeAvatar";
import ChangeAge from "./ChangeData/ChangeAge";
import ShareApp from "../../shared/ShareApp";
import UpgradeApp from "../../shared/UpgradeApp";
import LogOut from "../Session/LogOut";

const ProfileOptions = ({ setLogin, user, setReloadInfo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const [renderComponent, setRenderComponent] = useState(null);
  const getComponent = (component) => {
    switch (component) {
      case "alias":
        setRenderComponent(
          <ChangeAlias
            setIsVisible={setIsVisible}
            setReloadInfo={setReloadInfo}
          />
        );
        break;
      case "name":
        setRenderComponent(
          <ChangeName
            setIsVisible={setIsVisible}
            setReloadInfo={setReloadInfo}
          />
        );
        break;
      case "lastName":
        setRenderComponent(
          <ChangeLastName
            setIsVisible={setIsVisible}
            setReloadInfo={setReloadInfo}
          />
        );
        break;
      case "age":
        setRenderComponent(
          <ChangeAge
            setIsVisible={setIsVisible}
            setReloadInfo={setReloadInfo}
          />
        );
        break;
      case "password":
        setRenderComponent(
          <ChangePassword
            setIsVisible={setIsVisible}
            setReloadInfo={setReloadInfo}
          />
        );
        break;
      case "avatar":
        setRenderComponent(
          <ChangeAvatar
            setIsVisible={setIsVisible}
            setReloadInfo={setReloadInfo}
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

  return (
    <View>
      <View style={styles.optionsStyle}>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("alias");
            toggleModal();
          }}
        >
          <Text style={styles.title}>Cambiar Alias</Text>
          <Text style={styles.subtitle}>
            {user.username === undefined ? "Colocar Alias" : user.username}
          </Text>
        </TouchableOpacity>
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
          onPress={() => {
            getComponent("avatar");
            toggleModal();
          }}
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
          onPress={() => {
            getComponent("shareApp");
            toggleModal();
          }}
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
          onPress={() => {
            getComponent("upgradeApp");
            toggleModal();
          }}
        >
          <Text style={styles.title}>Versión: Gratuita</Text>
          <Text style={[styles.upgradeText]}>
            {user.suscription === "free"
              ? "Gratis"
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
