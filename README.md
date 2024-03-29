# MCData
Get minecraft player and server info<br>
Thanks to [MCHeads](https://mc-heads.net) for providing Minecraft avatars.

## Where is player name history?
Read more: https://help.minecraft.net/hc/en-us/articles/8969841895693-Username-History-API-Removal-FAQ

## Installation
```console
$ npm i mcdata
```

## Methods

`await mcdata.playerStatus('KallelGaNewk', { renderSize: 512 })`
```js
{
  uuid: '4a096cb37bb841cb8a6bdb3dfa15b4ef',
  username: 'KallelGaNewk',
  nameHistory: [ { name: 'KallelGaNewk' } ],
  skin: {
    avatar: 'https://mc-heads.net/avatar/4a096cb37bb841cb8a6bdb3dfa15b4ef/512',
    renders: {
      head: {
        left: 'https://mc-heads.net/head/4a096cb37bb841cb8a6bdb3dfa15b4ef/left',
        right: 'https://mc-heads.net/head/4a096cb37bb841cb8a6bdb3dfa15b4ef/right'
      },
      body: {
        left: 'https://mc-heads.net/body/4a096cb37bb841cb8a6bdb3dfa15b4ef/left',
        right: 'https://mc-heads.net/body/4a096cb37bb841cb8a6bdb3dfa15b4ef/right'
      }
    },
    fullBody: 'https://mc-heads.net/player/4a096cb37bb841cb8a6bdb3dfa15b4ef/512',
    combo: 'https://mc-heads.net/combo/4a096cb37bb841cb8a6bdb3dfa15b4ef/512',
    texture: {
      get: 'https://mc-heads.net/skin/4a096cb37bb841cb8a6bdb3dfa15b4ef',
      download: 'https://mc-heads.net/download/4a096cb37bb841cb8a6bdb3dfa15b4ef',
      apply: 'https://mc-heads.net/change/4a096cb37bb841cb8a6bdb3dfa15b4ef'
    }
  }
}
```


`await mcdata.serverStatus('mc.hypixel.net')`
```js
{
  serverStatus: 'online',
  serverip: '172.65.201.224',
  version: 'Requires MC 1.8-1.16',
  protocol: 'v47',
  players: 82420,
  maxplayers: 110100,
  motd: {
    text: '             §aHypixel Network  §c[1.8-1.16]\n' +
        '  §d§lSKYBLOCK COMMUNITY CENTER UPDATE',
    legacy: true
  },
  ping: 5,
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAA[...]'
}
```

`await mcdata.player.getUUID('cracklizon')`
```js
'c86f8692f2124846903bdf1be737bf21'
```

`await mcdata.player.getUsername('c86f8692f2124846903bdf1be737bf21')`
```js
'cracklizon'
```