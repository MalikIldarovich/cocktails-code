export const NUMS_MAP = 
    "0123456789";

export const LATIN_MAP = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const KATANA_MAP = 
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";

export const ERROR_DATA_404 = {
    fatal: false,
    unhandled: false,
    statusCode: 404,
    name: "Not Found",
    message: "Страница не найдена",
};

export const ERROR_DATA_500 = {
    fatal: false,
    unhandled: false,
    statusCode: 500,
    name: "Iternal Server Error",
    message: "Ошибка на стороне сервера",
};

export const ERROR_IMAGES = {
    404: "/images/error-placeholder-404.png",
    500: "/images/error-placeholder-500.png",
    502: "/images/error-placeholder-502.png",
    505: "/images/error-placeholder-500.png",
} as const;

export const ERROR_TITLES = {
    404: "Ресурс не найден",
    500: "Ошибка сервера",
    502: "Технические работы",
    505: "Непредвиденная ошибка",
} as const;

export const ERROR_DESCRIPTIONS = {
    404: "Запрашиваемая страница не найдена",
    500: "Попробуйте перезагрузить страницу, через некоторое время",
    502: "Скоро всё починим, попробуйте перезагрузить страницу позже",
    505: "Попробуйте перезагрузить страницу, через некоторое время",
} as const;

export type TErrorCode = 
    keyof typeof ERROR_IMAGES |
    keyof typeof ERROR_TITLES |
    keyof typeof ERROR_DESCRIPTIONS; 
