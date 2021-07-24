const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
];
const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
];

export const formatedDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let hrs = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${date.getFullYear()}-${month}-${day}T${hrs}:${mins}:00.000Z`;
}

export const formatedUTCDate = (l) => {
    let date = new Date(l.date);
    let year = date.getUTCFullYear();
    let month = months[date.getUTCMonth()];
    let day = date.getUTCDate();
    let dayName = days[date.getUTCDay()];
    return `${dayName} ${day} de ${month} ${year}`;
}

export const formatedDreamingTitle = (type, quantity) => {
    if (type === "oz") {
        return `${quantity} Onzas`;
      } else if (type === "ml") {
        return `${quantity} Mililitros`;
      } else if (type === "Secs") {
        let d = Number(quantity);
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);
        const s = Math.floor((d % 3600) % 60);
        return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
          s < 10 ? "0" + s : s
        }`;
      }
}

export const formatedDiapersTitle = (type, quantity) => {
    if (type === "pee") {
      return `${quantity} de Pipi`;
    } else if (type === "poo") {
      return `${quantity} de Popo`;
    } else if (type === "mixed") {
      return `${quantity} Mixto`
    }
  };

export const formatedSeconds = (secs) => {
    let d = Number(secs);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
};

export const formatDateTime = (type) => {
    let date = new Date();
    let day = days[date.getDay()];
    let mins = date.getMinutes();
    let hrs = date.getHours();
    let dateF = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let ampm = "am";
    switch (type) {
      case "time":
        if (mins < 10) {
          mins = "0" + mins;
        }
        if (hrs > 12) {
          hrs -= 12;
          ampm = "pm";
        }
        return `${hrs}:${mins}:00`;
      case "date":
        return `${day} ${dateF}-${month}-${year}`;
    }
};
