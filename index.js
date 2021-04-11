const axios = require('axios').default;
const buffer = require('buffer');

module.exports = {
  /**
   * Returns status of various Mojang services. Possible values are `green` (no issues), `yellow` (some issues), `red` (service unavailable). 
   * @returns {Promise<array>}
   * @example
   * ```
   * const MCData = require('mcdata');
   * const status = await MCData.APIStatus();
   * ```
   */
  APIStatus: () => {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get('https://status.mojang.com/check').catch(() => { });
      resolve(response.data);
    })
  },

  /**
   * Returns a object with UUID of the player
   * @param {string} username 
   * @returns {Promise<object>}
   * @example
   * ```
   * const MCData = require('mcdata');
   * const player = await MCData.getUUID('KallelGaNewk');
   * ```
   */
  getUUID: (username) => {
    return new Promise(async (resolve, reject) => {
      if (typeof username !== 'string' || username.length < 3 || username.length > 16) {
        return reject(new Error('Invalid username'))
      }

      const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username.trim()}`).catch(() => { });

      if (!response || response.status === 204) {
        return reject(new Error('This username does not exist'))
      }

      resolve(response.data)
    })
  },

  /**
   * Returns a array of objects containing nicknames and UUIDs
   * @param {string} uuid 
   * @returns {Promise<array>}
   */
  getNameHistory: (uuid) => {
    return new Promise(async (resolve, reject) => {
      if (typeof uuid !== 'string') {
        return reject(new Error('Invalid UUID'))
      }

      const response = await axios.get(`https://api.mojang.com/user/profiles/${uuid.trim()}`).catch(() => { });

      if (!response || response.status === 204) {
        return reject(new Error('This UUID does not exist'))
      }

      resolve(response.data)
    })
  },

  /**
   * This will return player UUIDs and some extras.
   * @param {array} usernames 
   * @returns {Promise<array>}
   * @example
   * ```
   * const MCData = require('mcdata');
   * const players = [ 'KallelGaNewk', 'cracklizon' ];
   * const playersData = await MCData.UsernamesToUUIDs(players);
   * ```
   * 
   */
  UsernamesToUUIDs: (usernames) => {
    return new Promise(async (resolve, reject) => {
      if (!Array.isArray(usernames) || usernames.length > 10 || !usernames.length ) {
        reject(new Error('The array of usernames must contain between 1 and 10 elements'))
      }

      for (const username of usernames) {
        if (typeof username !== 'string') {
          return reject(new Error('One or more elements in the array are different from a string'))
        }
      }

      const response = await axios.post('https://api.mojang.com/profiles/minecraft', usernames)

      resolve(response.data)
    })
  },

 /**
  * Returns the player's username plus any additional information about them (e.g. skins)
  * @param {string} uuid
  * @returns {Promise<object>}
  * @example
  * ```
  * const MCData = require('mcdata');
  * const playerProfile = await MCData.getPlayerProfile('4a096cb37bb841cb8a6bdb3dfa15b4ef');
  * ```
  */
 getPlayerProfile: (uuid) => {
  return new Promise(async (resolve, reject) => {
    if (typeof uuid !== 'string') {
      return reject(new Error('Invalid UUID'))
    }

    const response = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid.trim()}`).catch(() => { });

    if (!response || response.status === 204) {
      return reject(new Error('This UUID does not exist'))
    }

    resolve(response.data)
  })
 }
}
