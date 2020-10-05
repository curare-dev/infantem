export const getColor = (type) => {
  switch (type) {
    // Color de fondo
    case "backgroundColor":
      return "#D6D8FF";
    case "headerBackgroundColor":
      return "#51439D";
    case "cardColor":
      return "#ECEBFF";
    case "shadowColor":
      return "transparent";
    case "buttonColor":
      return "#51439D";
    // Color de iconos inactivos
    case "inactiveIcon":
      return "#D6D8FF";
    // Color de iconos activos
    case "activeIcon":
      return "#413873";
    // Color de fondo activo
    case "activeBackgroundColor":
      return "#6F62BC";
    case "inactiveBackgroundColor":
      return "#51439D";
    // Color de texto de encabezado
    case "headerText":
      return "#D6D8FF";
    default:
      return "#F2F2F2";
  }
};
