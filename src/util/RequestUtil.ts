import { IncomingHttpHeaders } from "http";
import fetch, { Headers, Response } from "node-fetch";

const accessibleHeaders = ["content-type", "last-modified", "content-language", "cache-control", "expires", "pragma", "set-cookie"];

const REPLACER_JAVASCRIPT = (host: string) => `
<!-- Injected by fuckcors.app type app to ensure static resources load correctly -->
<script>
window.addEventListener('load', () => {
    const changable = {
        href: ["link", "a"],
        src: ["script", "iframe", "img", "audio", "video"]
    }

    for(let [prop, tags] of Object.entries(changable)) {
        for(let tag of tags) {
            for(let el of document.getElementsByTagName(tag)) {
                const propValItem = el.attributes.getNamedItem(prop);
                if (!propValItem) continue
                let propVal = propValItem.nodeValue
                if (propVal.startsWith("http://") || propVal.startsWith("https://")) continue
                if (propVal.startsWith("/")) propVal = propVal.slice(1);
                el[prop] = window.location.protocol + "//" + window.location.host + "/pretty/${host}/" + propVal;
            }
        }
    }
})
</script>
`;

export default class RequestUtil {

    static fetchUrl(url: string, method: string, headers: IncomingHttpHeaders, body: Buffer | null): Promise<Response> {
        const options: { [key: string]: any } = {
            method,
            headers
        };

        if(!["GET", "HEAD"].includes(method)) {
            options.body = body;
        }

        return fetch(url, options);
    }

    static parseFetchHeaders(headers: Headers): { [key: string]: string } {
        // Suggested by (luc)[https://github.com/lucemans]
        return Object.assign({}, ...Object.keys(headers.raw()).filter(it => accessibleHeaders.includes(it.toLowerCase())).map(it => ({[it]: headers.get(it)})));
    }

    // this will inject some js into the html page to replace all `link, script, img and a` tag sources to also go through the proxy
    // please if anyone has a better implementation of this, open a pull request
    static injectReplacerScript(host: string, htmlBody: string): string {
        const arr = htmlBody.split("<head>");
        arr[1] = REPLACER_JAVASCRIPT(host) + arr[1];
        return arr.join("<head>");
    }

}