const axios = require("axios");
const prompt = require("prompt-sync")();
const loginParams = prompt("Enter redurect link : ");
const taps = Number(prompt("enter tabs : "));
const time = Number(prompt("inter time ms : "));
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
                        "Content-Id": Math.floor(Math.random()*999999),
                        "Content-Type": "application/json",
                        "User-Agent":
                            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
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
  let user_id = token.player.id
  let timestamp = new Date().getTime()
    const config = {
        headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Id": (timestamp * user_id * user_id / user_id) % user_id % user_id,
            "Content-Type": "application/json",
            "User-Agent":
                "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
            "x-app": "tapswap_server",
            "x-cv": 607
        }
    };
    setInterval(async () => {
    const body = {
        taps,
        time: timestamp
    };
    try {
        let { data } = await axios.post(
            "https://api.tapswap.ai/api/player/submit_taps",
            body,
            config
        );
        console.log(`earned coin : ${data.player.stat.earned}`);
    } catch (e) {
        console.log(e)
        console.log("error");
    }
}, time)
}