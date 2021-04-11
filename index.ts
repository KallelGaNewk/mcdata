import * as axios from "axios";

const { get, post } = axios.default;

export class MCData {
  /**
   * Returns status of various Mojang services. Possible values are `green` (no issues), `yellow` (some issues), `red` (service unavailable).
   * @returns {Promise<array>}
   * @example
   * ```
   * const { MCData } = require('mcdata');
   * const mcdata = new MCData();
   * const status = await mcdata.apiStatus();
   * ```
   */
  public apiStatus() {
    return new Promise(async (resolve, reject) => {
      const response: any = await get(
        "https://status.mojang.com/check"
      ).catch(() => {});

      resolve(response.data);
    });
  }
  /**
   * Returns a object with UUID of the player
   * @param {string} username
   * @returns {Promise<object>}
   * @example
   * ```
   * const { MCData } = require('mcdata');
   * const mcdata = new MCData();
   * const player = await mcdata.getUUID('KallelGaNewk');
   * ```
   */
  public getUUID(username: string) {
    return new Promise(async (resolve, reject) => {
      if (username.length < 3 || username.length > 16) {
        return reject(new Error("Invalid username"));
      }

      const response = await get(
        `https://api.mojang.com/users/profiles/minecraft/${username.trim()}`
      ).catch(() => {});

      if (!response || response.status === 204) {
        return reject(new Error("This username does not exist"));
      }

      resolve(response.data);
    });
  }
  /**
   * Returns a array of objects containing nicknames and UUIDs
   * @param {string} uuid
   * @returns {Promise<array>}
   * @example
   * ```
   * const { MCData } = require('mcdata');
   * const mcdata = new MCData();
   * const nameHistory = await mcdata.getNameHistory('4a096cb37bb841cb8a6bdb3dfa15b4ef');
   * ```
   */
  public getNameHistory(uuid: string) {
    return new Promise(async (resolve, reject) => {
      if (typeof uuid !== "string") {
        return reject(new Error("Invalid UUID"));
      }

      const response = await get(
        `https://api.mojang.com/user/profiles/${uuid.trim()}/names`
      ).catch(() => {});

      if (!response || response.status === 204) {
        return reject(new Error("This UUID does not exist"));
      }

      resolve(response.data);
    });
  }
  /**
   * This will return player UUIDs and some extras.
   * @param {array} usernames
   * @returns {Promise<array>}
   * @example
   * ```
   * const { MCData } = require('mcdata');
   * const mcdata = new MCData();
   * const players = [ 'KallelGaNewk', 'cracklizon' ];
   * const playersData = await mcdata.UsernamesToUUIDs(players);
   * ```
   *
   */
  public getUUIDs(usernames: []) {
    return new Promise(async (resolve, reject) => {
      if (
        !Array.isArray(usernames) ||
        usernames.length > 10 ||
        !usernames.length
      ) {
        reject(
          new Error(
            "The array of usernames must contain between 1 and 10 elements"
          )
        );
      }

      for (const username of usernames) {
        if (typeof username !== "string") {
          return reject(
            new Error(
              "One or more elements in the array are different from a string"
            )
          );
        }
      }

      const response = await post(
        "https://api.mojang.com/profiles/minecraft",
        usernames
      );

      resolve(response.data);
    });
  }
  /**
   * Returns the player's username plus any additional information about them (e.g. skins)
   * @param {string} uuid
   * @returns {Promise<object>}
   * @example
   * ```
   * const { MCData } = require('mcdata');
   * const mcdata = new MCData();
   * const playerProfile = await mcdata.getPlayerProfile('4a096cb37bb841cb8a6bdb3dfa15b4ef');
   * ```
   */
  public getPlayerProfile(uuid: string) {
    return new Promise(async (resolve, reject) => {
      if (typeof uuid !== "string") {
        return reject(new Error("Invalid UUID"));
      }

      const response:any = await get(
        `https://sessionserver.mojang.com/session/minecraft/profile/${uuid.trim()}`
      ).catch(() => {});

      if (!response || response.status === 204) {
        return reject(new Error("This UUID does not exist"));
      }

      resolve(response.data);
    });
  }
}
