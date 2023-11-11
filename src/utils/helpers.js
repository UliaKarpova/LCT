export function getDeclension(number, words_arr) {
    number = Math.abs(number);
    if (Number.isInteger(number)) {
        let options = [2, 0, 1, 1, 1, 2];
        return words_arr[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]];
    }
    return words_arr[1];
}

export function setCookie(name, value, props) {
    props = {
        path: "/",
        ...props,
    };
    let exp = props.expires;
    if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
} else if (exp && exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
} else {
    const d = new Date();
    d.setTime(d.getTime() + 2592000e3);
    props.expires = d;
}
if (value) {
    value = encodeURIComponent(value);
}
let updatedCookie = name + "=" + value;
for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    updatedCookie += "=" + propValue;
}
document.cookie = updatedCookie;
}

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}