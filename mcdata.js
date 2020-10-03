/**
 * @name MCData
 * @version 1.0.7
 * @file Get minecraft player and server info
 * @author KallelGaNewk
 * @copyright KallelGaNewk 2020
 */

const axios = require('axios').default;

async function newApiRequest(url, focus, debugging) {
    if (debugging) console.log(`MCData Debug: New request to ${url} ${focus ? `with focus ${focus}` : ''}`);
    return new Promise(async (resolve, reject) => {
        axios.get(url, { method: 'GET' }).then(async res => {
            if (focus) {
                if (!res.data.hasOwnProperty(focus)) {
                    reject(`MCData Error: Response doesn't have the property of ${focus}`);
                } else {
                    resolve(res.data[focus]);
                }
            } else {
                resolve(res.data);
            }
        }).catch(err => {
            reject(`MCData Error: ${err.toString()}`);
        });
    });
}

module.exports = {
    /**
     * Gets the UUID, Nickname history and skin of the player
     * @param {string} username The username of a Minecraft Player
     * @param {object} options.debug Log all requests
     * @returns {object} Player status
     */
    playerStatus: async (username, options = {}) => {
        if (!username) return;
        var uuid = await newApiRequest(`https://api.mojang.com/users/profiles/minecraft/${username}?at=${Math.round((new Date().getTime()) / 1000)}`, 'id', options.debug)
        var nameHistory = await newApiRequest(`https://api.mojang.com/user/profiles/${uuid.toString()}/names`, null, options.debug)
        var nickname = await newApiRequest(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`, 'name', options.debug)

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
    /**
     * Gets the Mojang servers status
     * @param {object} options.debug Log all requests
     * @returns {object} Mojang status
     */
    mojangStatus: async (options = {}) => {
        var status = await newApiRequest('https://status.mojang.com/check', null, options.debug);

        return {
            'minecraft.net': status[0]['minecraft.net'],
            'session.minecraft.net': status[1]['session.minecraft.net'],
            'account.mojang.com': status[2]['account.mojang.com'],
            'authserver.mojang.com': status[3]['authserver.mojang.com'],
            'sessionserver.mojang.com': status[4]['sessionserver.mojang.com'],
            'api.mojang.com': status[5]['api.mojang.com'],
            'textures.minecraft.net': status[6]['textures.minecraft.net'],
            'mojang.com': status[7]['mojang.com'],
        };
    },
    /**
     * Gets the Status, ping, version, motd and players of the server
     * @param {string} ip Minecraft server IP
     * @param {object} options.debug Log all requests
     * @returns {object} Server status
     */
    serverStatus: async (ip, options = {}) => {
        if (!ip) return;
        return await newApiRequest(`https://mcapi.xdefcon.com/server/${ip}/full/json`, null, options.debug);
    },
    player: {
        /**
         * Gets only the UUID of user
         * @param {string} username The username of a Minecraft Player
         * @param {object} options.debug Log all requests
         * @returns {string} User UUID
         */
        getUUID: async (username, options = {}) => {
            if (!username) return;
            return await newApiRequest(`https://api.mojang.com/users/profiles/minecraft/${username}?at=${Math.round((new Date().getTime()) / 1000)}`, 'id', options.debug);
        },
        /**
         * Gets only the formatted username
         * @param {string} uuid The UUID of a Minecraft Player
         * @param {object} options.debug Log all requests
         * @returns {string} User Username
         */
        getUsername: async (uuid, options = {}) => {
            if (!uuid) return;
            return await newApiRequest(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`, 'name', options.debug);
        },
        /**
         * Gets only the name history of user
         * @param {string} uuid The UUID of a Minecraft Player
         * @param {object} options.debug Log all requests
         * @returns {Array} User name history
         */
        getNameHistory: async (uuid, options = {}) => {
            if (!uuid) return;
            return await newApiRequest(`https://api.mojang.com/user/profiles/${uuid.toString()}/names`, null, options.debug);
        }
    }
};