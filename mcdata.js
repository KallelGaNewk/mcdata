const request = require('request-promise');

async function apiRequest(url, focus) {
    return new Promise(async (resolve, reject) => {
        await request({
            url: url,
            json: true,
        }).then(res => {
            if (focus) {
                if (!res.hasOwnProperty(focus)) {
                    reject(`MCData Error: Response doesn't have the property of ${focus}`);
                } else {
                    resolve(res[focus]);
                }
            } else {
                resolve(res);
            }
        }).catch(err => {
            reject(`MCData Error: ${err.toString()}`);
        });
    });
}

module.exports = {
    playerStatus: async (username) => {
        var uuid = await apiRequest(`https://api.mojang.com/users/profiles/minecraft/${username}?at=${Math.round((new Date().getTime()) / 1000)}`, 'id')
        var nameHistory = await apiRequest(`https://api.mojang.com/user/profiles/${uuid.toString()}/names`, null)
        var nickname = await apiRequest(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`, 'name')

        return {
            uuid: uuid,
            username: nickname,
            nameHistory: nameHistory,
            skin: {
                avatar: `https://crafatar.com/avatars/${uuid}?size=512&default=MHF_Steve&overlay`,
                head: `https://crafatar.com/renders/head/${uuid}?size=512&default=MHF_Steve&overlay`,
                body: `https://crafatar.com/renders/body/${uuid}?size=512&default=MHF_Steve&overlay`,
                texture: `https://crafatar.com/skins/${uuid}`
            }
        };
    },
    mojangStatus: async () => {
        var status = await apiRequest('https://status.mojang.com/check', null);

        var newStatus = {
            'minecraft.net': status[0]['minecraft.net'],
            'session.minecraft.net': status[1]['session.minecraft.net'],
            'account.mojang.com': status[2]['account.mojang.com'],
            'authserver.mojang.com': status[3]['authserver.mojang.com'],
            'sessionserver.mojang.com': status[4]['sessionserver.mojang.com'],
            'api.mojang.com': status[5]['api.mojang.com'],
            'textures.minecraft.net': status[6]['textures.minecraft.net'],
            'mojang.com': status[7]['mojang.com'],
        };

        return newStatus;
    },
    serverStatus: async (ip) => {
        var status = await apiRequest(/*`https://eu.mc-api.net/v3/server/ping/${ip}`*/ `https://mcapi.xdefcon.com/server/${ip}/full/json`, null)
        return status;
    }
};