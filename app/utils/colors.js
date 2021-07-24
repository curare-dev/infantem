// Color primario #2B5F9F o rgba(43, 95, 159, 1)
// Titulo #000000 o rgba(0, 0, 0, 1)
// Slogan #5D5D5D o rgba(93, 93, 93, 1)
// Background #F2F2F2 o rgba(242, 242, 242, 1)
// Card Color #EBEBEB o rgba(235, 235, 235, 1)

export const getColor = (type) => {
  switch (type) {
    // Color de fondo
    case "backgroundColor":
      return "rgba(242, 242, 242, 1)";
    case "headerBackgroundColor":
      return "rgba(43, 95, 159, 1)";
    case "cardColor":
      return "rgba(235, 235, 235, 1)";  
    case "shadowColor":
      return "transparent";
    case "buttonColor":
      return "rgba(43, 95, 159, 1)";
    // Color de iconos inactivos
    case "inactiveIcon":
      return "rgba(242, 242, 242, 1)";
    // Color de iconos activos
    case "activeIcon":
      return "rgba(43, 95, 159, 1)";
    // Color de fondo activo
    case "activeBackgroundColor":
      return "rgba(242, 242, 242, 1)";
    case "inactiveBackgroundColor":
      return "rgba(43, 95, 159, 1)";
    // Color de texto de encabezado
    case "headerText":
      return "rgba(242, 242, 242, 1)";
    case "switchColor":
      return "rgba(43, 95, 159, 0.5)";
    default:
      return "#F2F2F2";
  }
};
