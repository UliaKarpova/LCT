export function getDeclension(number, words_arr) {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    let options = [2, 0, 1, 1, 1, 2];
    return words_arr[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : options[number % 10 < 5 ? number % 10 : 5]
    ];
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
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export const createUserObject = (user) => {
  const timeForTask = {
    "Выезд на точку для стимулирования выдач": 4,
    "Обучение агента": 2,
    "Доставка карт и материалов": 1.5,
  };

  const tasks = user.assigned_offices.map((office) => {
    return {
      id: office._id,
      status: office.status,
      name: office.PriorityReason,
      priority: office.priority,
      time: timeForTask[office.PriorityReason],
      branch: {
        address: "Краснодар, " + office["Адрес точки, г. Краснодар"],
        location: [office["Координаты"].lon, office["Координаты"].lat],
        startedAt: office.startedAt,
      },
    };
  });

  return {
    id: user._id,
    name: user.ФИО,
    grade: user.Грейд,
    nativeBranch: {
      address: user["Адрес локации"],
      location: [user["Координаты офиса"].lon, user["Координаты офиса"].lat],
    },
    role: user.role,
    tasks,
  };
};
