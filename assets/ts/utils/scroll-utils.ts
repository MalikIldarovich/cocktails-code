interface ObserverHTMLElement extends HTMLElement {
    __resizeListeners__?: (() => void)[];
    __ro__?: ResizeObserver;
}


/** Обработчик изменения размера */
export const resizeHandler: ResizeObserverCallback = entries => {
    for (const entry of entries) {
        /** Приводим target к ObserverHTMLElement */
        const listeners = (entry.target as ObserverHTMLElement).__resizeListeners__ || [];
        if (listeners.length) {
            listeners.forEach(fn => {
                fn();
            });
        }
    }
};

/** Добавляем обработчик изменения размера*/
export function addResizeListener(
    element: ObserverHTMLElement | null,
    fn: () => void,
): void {
    if (!element) {
        return;
    }

    /** Инициализируем свойства, если они не существуют */
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        element.__ro__ = new ResizeObserver(resizeHandler);
        if (element.__ro__) {
            element.__ro__.observe(element);
        }
    }

    /** Добавляем функцию-обработчик */
    element.__resizeListeners__.push(fn);
}

/** Удаляем обработчик изменения размера */
export function removeResizeListener(
    element: ObserverHTMLElement | null,
    fn: () => void,
): void {
    if (!element || !element.__resizeListeners__) {
        return;
    }

    /** Находим и удаляем функцию-обработчик */
    const index = element.__resizeListeners__.indexOf(fn);
    if (index > -1) {
        element.__resizeListeners__.splice(index, 1);
    }

    /** Отключаем ResizeObserver, если больше нет обработчиков */
    if (!element.__resizeListeners__.length && element.__ro__) {
        element.__ro__.disconnect();
    }
}
