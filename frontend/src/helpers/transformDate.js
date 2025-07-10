export const transformDate = (date) => {

    return new Intl.DateTimeFormat('es-ES', { dateStyle: "medium" }).format(new Date(date));
}