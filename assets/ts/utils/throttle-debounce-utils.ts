/** Throttle */
export function throttle(func: (...args: any[]) => void, wait: number, immediate?: boolean): (...args: any[]) => void {
    let timeout: NodeJS.Timeout | null;

    return function(this: any, ...args: any[]) {
        if (!timeout) {
            // eslint-disable-next-line
            const self = this;
            const later = () => {
                timeout = null;
                if (!immediate) {
                    func.apply(self, args);
                }
            };

            timeout = setTimeout(later, wait);

            if (immediate) {
                func.apply(self, args);
            }
        }
    };
}

/** Debounce */
export function debounce(func: (...args: any[]) => void, wait: number, immediate?: boolean): (...args: any[]) => void {
    let timeout: NodeJS.Timeout | null | undefined;

    return function executedFunction(this: any, ...args: any[]) {
        // eslint-disable-next-line
        const context = this;

        function later() {
            timeout = undefined;

            if (!immediate) {
                func.apply(context, args);
            }
        }

        const callNow = immediate && !timeout;

        if (timeout !== undefined && timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
}
