/** Функция получения размера шрифта */
export function getFontSize() {
    const 
        html = window.document.documentElement;
    const style = window.getComputedStyle(html, null).getPropertyValue("font-size");

    return parseFloat(style);
}


export function formatDate(dateString: string, locale: string = "ru-RU"): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error("Неверный формат даты");
    }  

    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
        .replace(" г.", ""); // Убираем лишний "г."
}
