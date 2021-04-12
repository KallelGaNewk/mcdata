import * as axios from "axios";
import {ChangeSkinPayload, MojangNameHistory, MojangPlayerProfile, MojangStatusCheck, MojangUUID} from "./types";

const { get, post } = axios.default;



export class MCData {
  /**
   * Returns status of various Mojang services. Possible values are `green` (no issues), `yellow` (some issues), `red` (service unavailable).
   * @returns {Promise<MojangStatusCheck[]>}
   * @example
   * ```
   * const { MCData } = require('mcdata');
   * const mcdata = new MCData();
   * const status = await mcdata.apiStatus();
   * ```
   */
  public apiStatus() {
    return new Promise(async (resolve) => {
      const { data } = await get(
        "https://status.mojang.com/check"
      ).catch(() => {});

      resolve(data as MojangStatusCheck[]);
    });
  }

  /**
   * Returns a object with UUID of the player
   * @param {string} username
   * @returns {Promise<MojangUUID>}
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

      resolve(response.data as MojangUUID);
    });
  }

  /**
   * Returns a array of objects containing nicknames and UUIDs
   * @param {string} uuid
   * @returns {Promise<MojangNameHistory[]>}
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

      resolve(response.data as MojangNameHistory[]);
    });
  }

  /**
   * This will return player UUIDs and some extras.
   * @param {array} usernames
   * @returns {Promise<MojangUUID[]>}
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

      resolve(response.data as MojangUUID[]);
    });
  }

  /**
   * Returns the player's username plus any additional information about them (e.g. skins)
   * @param {string} uuid
   * @returns {Promise<MojangPlayerProfile>}
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

      const response = await get(
        `https://sessionserver.mojang.com/session/minecraft/profile/${uuid.trim()}`
      ).catch(() => {});

      if (!response || response.status === 204) {
        return reject(new Error("This UUID does not exist"));
      }

      resolve(response.data as MojangPlayerProfile);
    });
  }

  //TODO: Make a review
  public changeSkin({token, variant, skinUrl}: ChangeSkinPayload) {
    return new Promise(async (resolve, reject) => {
      const response = await post('https://api.minecraftservices.com/minecraft/profile/skins').catch(() => {});

      if (!response) {
        return reject(new Error('something goes wrong'))
      }

      resolve(true)
    })
  }
}
