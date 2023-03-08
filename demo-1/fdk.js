const { setupFdk } = require("fdk-extension-javascript/express");
const { RedisStorage } = require("fdk-extension-javascript/express/storage");
const { appRedis } = require("./redis.init");

const getFdk = async function() {
    return setupFdk({
        api_key: "6406dc8ce54c41ab157df6a7",
        api_secret: "Tqy1Ryo0qy9NaPW",
        base_url: "https://2779-14-142-183-234.in.ngrok.io",
        callbacks: {
            auth: async (req) => {
                return `${req.extension.base_url}/company/?company_id=${req.query["company_id"]}`;
            },

            uninstall: async (req) => {
                
            },
        },
        storage: new RedisStorage(appRedis, "wizzy-demo-I"), // add your prefix
        access_mode: "offline",
        cluster: "https://api.fyndx1.de", // this is optional by default it points to prod.
    }, true)
}

module.exports = { getFdk }