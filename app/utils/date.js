export const day = () => {
    let arr = [];
    for(let i = 1; i <= 31; i++) arr.push(i);
    return arr;
}

export const dayOfWeek = () => {
    return ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
}

export const month = () => {
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
}

export const year = () => {
    let date = new Date();
    let arr = [];
    for (let i = 2000; i <= date.getFullYear(); i++) arr.push(i);
    return arr;
}

export const hours = () => {
    let arr = [];
    for( let i = 1; i <= 12; i++ ) arr.push(i);
    console.log(arr);
    return arr;
}

export const minutes = () => {
    let arr = [];
    for( let i = 1; i <= 60; i++) arr.push(i);
    return arr;
}

export const seconds = () => {
    let arr = [];
    for( let i = 1; i <= 60; i++) arr.push(i);
    return arr;
}