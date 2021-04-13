import * as axios from 'axios';
import { createApi } from './api';
import { ChangeSkinPayload, AuthenticatePayload } from './types';

const { post } = createApi('https://authserver.mojang.com');

export class MCAuth {
  public authenticate({ email, password }: AuthenticatePayload) {
    return new Promise(async (resolve, reject) => {
      const payload = {
        agent: {
          name: 'Minecraft',
          version: 1,
        },
        username: email,
        password,
        requestUser: true,
      };

      const response = await post('/authenticate', payload);
      // console.log(response);

      if (!response) {
        return reject(new Error('Something goes wrong'));
      }

      if (response?.data?.error == 'ForbiddenOperationException') {
        return reject(
          new Error(`${response.data.error}: ${response.data.errorMessage}`),
        );
      }

      resolve(response.data);
    });
  }

  public changeSkin({ token, variant, skinUrl }: ChangeSkinPayload) {
    return new Promise(async (resolve, reject) => {
      const response = await post(
        'https://api.minecraftservices.com/minecraft/profile/skins',
        {
          variant,
          url: skinUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).catch(() => {});

      if (!response) {
        return reject(new Error('Something goes wrong'));
      }

      resolve(true);
    });
  }
}
