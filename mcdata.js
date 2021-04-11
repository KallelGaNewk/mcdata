/**
 * A Node.js module that allows you to interact with the Mojang API.
 * @module mcdata
 * @license Apache-2.0
 */

const { get } = require('axios').default;

module.exports = {
  /**
   * Gets the UUID, Nickname history and skin of the player
   * @param {string} username The username of a Minecraft Player
   * @param {object} options
   * @param {string} options.renderSize The size for avatars in pixels. `32 - 600`
   * @returns {Promise<object>} Player status
   */
  playerStatus: async (username, options = {}) => {
    if (!username) return;

    const res = await get(`https://mc-heads.net/minecraft/profile/${username}`);

    if (res.status !== 200) return;

    return {
        uuid: res.data.id,
        username: res.data.name,
        nameHistory: res.data.name_history,
        skin: {
          avatar: `https://mc-heads.net/avatar/${res.data.id}/${options.skinSize ? options.skinSize : '512'}`,
          renders: {
            head: {
              left: `https://mc-heads.net/head/${res.data.id}/left/${options.skinSize ? options.skinSize : '512'}`,
              right: `https://mc-heads.net/head/${res.data.id}/right/${options.skinSize ? options.skinSize : '512'}`
            },
            body: {
              left: `https://mc-heads.net/body/${res.data.id}/left/${options.skinSize ? options.skinSize : '512'}`,
              right: `https://mc-heads.net/body/${res.data.id}/right/${options.skinSize ? options.skinSize : '512'}`
            }
          },
          fullBody: `https://mc-heads.net/player/${res.data.id}/${options.skinSize ? options.skinSize : '512'}`,
          combo: `https://mc-heads.net/combo/${res.data.id}/${options.skinSize ? options.skinSize : '512'}`,
          cape: `https://mc-heads.net/cape/${res.data.id}/${options.skinSize ? options.skinSize : '512'}`,
          texture: {
            get: `https://mc-heads.net/skin/${res.data.id}/${options.skinSize ? options.skinSize : '512'}`,
            download: `https://mc-heads.net/download/${res.data.id}/${options.skinSize ? options.skinSize : '512'}`,
            apply: `https://mc-heads.net/change/${res.data.id}/${options.skinSize ? options.skinSize : '512'}`
          }
        }
      };
  },
  /**
   * Gets the Mojang servers status
   * @returns {Promise<object>} Mojang status
   */
  mojangStatus: async () => {
    const status = (await get('https://mc-heads.net/json/mc_status')).data;

    if (!status) return;

    return status;
  },
  /**
   * Gets the Status, ping, version, motd and players of the server
   * @param {string} ip Minecraft server IP
   * @returns {Promise<Object>} Server status
   */
  serverStatus: async (ip) => {
    if (!ip) return { serverStatus: 'offline' };
    return (await get(`https://mcapi.xdefcon.com/server/${ip}/full/json`)).data;
  },
  player: {
    /**
     * Gets only the UUID of user
     * @param {string} username The username of a Minecraft Player
     * @returns {Promise<string>} User UUID
     */
    getUUID: async (username) => {
      if (!username) return;
      return (await get(`https://api.mojang.com/users/profiles/minecraft/${username}?at=${Math.round((new Date().getTime()) / 1000)}`)).data.id;
    },
    /**
     * Gets only the formatted username
     * @param {string} uuid The UUID of a Minecraft Player
     * @returns {Promise<string>} User Username
     */
    getUsername: async (uuid) => {
      if (!uuid) return;
      return (await get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)).data.name;
    },
    /**
     * Gets only the name history of user
     * @param {string} uuid The UUID of a Minecraft Player
     * @returns {Promise<Object>} User name history
     */
    getNameHistory: async (uuid) => {
      if (!uuid) return;
      return (await get(`https://api.mojang.com/user/profiles/${uuid.toString()}/names`)).data;
    }
  }
};