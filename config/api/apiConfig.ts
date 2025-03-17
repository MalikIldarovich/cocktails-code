import type { $Fetch } from "ofetch";

class HTTPInstance {
    private readonly $fetch: $Fetch;

    constructor(fetcher: $Fetch) {
        this.$fetch = fetcher;
    }

    async request<T>(method: string, url: string, data: object | FormData = {}, extras = {}): Promise<T> {
        const options: {baseURL?: string} = {};
        const requestData = data instanceof FormData ? { body: data } : data;
        const $res: T = await this.$fetch(url, { method, ...requestData, ...options, ...extras });
        return $res;
    }
}

export default HTTPInstance;
