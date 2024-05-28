const axios = require("axios");
const prompt = require("prompt-sync")();
const loginParams = prompt("Enter redurect link : ");
const taps = Number(prompt("enter tabs : "));
const time = Number(prompt("inter time ms :"));
async function loginer() {
    try {
        let loginData = loginParams
            .split("tgWebAppData=")[1]
            .split("&tgWebAppVersion=")[0];
        loginData = decodeURIComponent(loginData);
        try {
            let { data } = await axios.post(
                "https://api.tapswap.ai/api/account/login",
                { init_data: loginData, referrer: "", bot_key: "app_bot_0" },
                {
                    headers: {
                        Accept: "*",
                        "Accept-Language":
                            "en-GB,en-US;q=0.9,en;q=0.8,fa;q=0.7",
                        Connection: "keep-alive",
                        "Content-Id": "6007480330",
                        "Content-Type": "application/json",
                        Origin: "https://app.tapswap.club",
                        Referer: "https://app.tapswap.club/",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "cross-site",
                        "User-Agent":
                            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
                        "sec-ch-ua": '"Not-A.Brand";v="99", "Chromium";v="124"',
                        "sec-ch-ua-mobile": "?1",
                        "sec-ch-ua-platform": '"Android"',
                        "x-app": "tapswap_server",
                        "x-cv": 607
                    }
                }
            );
            if (data.access_token) {
                console.log("login successfully");
                tapper(data);
            } else {
                console.log("login error");
            }
        } catch (e) {
            console.log(e);
        }
    } catch (e) {
        console.log("redurect link invalid.");
    }
}
loginer();
function tapper(token) {
    console.log(`
account name : ${token.player.full_name}
account username : ${token.player.name}
refral link : ${token.invite_url}
coin count : ${token.player.stat.earned}
ref count : ${token.player.stat.ref_cnt}
  `);
    const config = {
        headers: {
            Accept: "*",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,fa;q=0.7",
            Authorization: `Bearer ${token.access_token}`,
            Connection: "keep-alive",
            "Content-Id": "6007480330",
            "Content-Type": "application/json",
            Origin: "https://app.tapswap.club",
            Referer: "https://app.tapswap.club/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent":
                "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
            "sec-ch-ua": '"Not-A.Brand";v="99", "Chromium";v="124"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"Android"',
            "x-app": "tapswap_server",
            "x-cv": 607
        }
    };
    setInterval(async () => {
    const body = {
        taps,
        time: 1716882699043
    };
    try {
        let { data } = await axios.post(
            "https://api.tapswap.ai/api/player/submit_taps",
            body,
            config
        );
        console.log(`earned coin : ${data.player.stat.earned}`);
    } catch (e) {
        console.log("error");
    }
}, time)
}