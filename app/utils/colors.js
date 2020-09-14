export const getColor = (type) => {
  switch (type) {
    case "backgroundColor":
      return "rgb(197, 194, 255)";
    case "cardColor":
      return "#ECEBFF";
    case "shadowColor":
      return "transparent";
    case "buttonColor":
      return "#9E99FF";
    default:
      return "#F2F2F2";
  }
};
