import type { EventHandler } from "h3";
import { createProxyEventHandler } from "h3-proxy";

const API_SLUGS = ["/api"];
const config = useRuntimeConfig();

function createHandler(targetUrl: string, pathPrefix: string, rewrite: string = "api"): EventHandler | null {    
    return defineEventHandler(async event => {
        event.node.req.headers["accept-encoding"] = "identity";
        event.node.req.headers["content-type"] = "application/json; charset=utf-8";

        const proxy = createProxyEventHandler({
            target: targetUrl,
            changeOrigin: true,
            pathRewrite: {
                [`^${pathPrefix}`]: rewrite,
            },
            pathFilter: path => path.startsWith(pathPrefix) && !path.includes("_nuxt_"),
        });

        return proxy(event);
    });
}

const firstProxyHandler = config.public.PROXY_URL ? createHandler(config.public.PROXY_URL, API_SLUGS[0]) : null;

function getProxyHandler(url: string | undefined): EventHandler | null {
    if (!url) {
        return null;
    }

    if (url.startsWith(API_SLUGS[0]) && firstProxyHandler) {
        return firstProxyHandler;
    }
    return null;
}

export default defineEventHandler(async event => {
    const proxyHandler = getProxyHandler(event.node.req.url);

    if (proxyHandler) {
        return proxyHandler(event);
    }
});
