export interface INavigationItem {
    id: number;
    to: string;
    icon: string;
    color: string;
    value: string;
    label: string;
}

export interface ISocialItem { 
    to: string;
    icon: string;
}

export const NAVIGATION_LIST: INavigationItem[] = [
    {
        id: 0,
        to: "/margarita",
        icon: "emojione-monotone:tropical-drink",
        color: "#fff",
        value: "margarita",
        label: "Margarita",
    },
    {
        id: 1,
        to: "/mojito",
        icon: "mdi:fruit-lime",
        color: "#fff",
        value: "mojito",
        label: "Mojito",
    },
    {
        id: 2,
        to: "/a1",
        icon: "pepicons-pop:coctail",
        color: "#fff",
        value: "a1",
        label: "A1",
    },
    {
        id: 3,
        to: "/kir",
        icon: "mdi:glass-wine",
        color: "#fff",
        value: "kir",
        label: "Kir",
    },
];

export const SOCIALS_LIST: ISocialItem[] = [
    {
        to: "http://t.me/d4rk_sid3/",
        icon: "akar-icons:telegram-fill",
    },
    {
        to: "https://www.linkedin.com/in/malik-ildarovich/",
        icon: "entypo-social:linkedin-with-circle",
    },
    {
        to: "https://github.com/MalikIldarovich/",
        icon: "uiw:github",
    },
    {
        to: "https://the-void-ruby.vercel.app/",
        icon: "vaadin:globe",
    },
];
