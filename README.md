# MCData
Get minecraft player and server info<br>
Thanks to [MCHeads](https://mc-heads.net) for providing Minecraft avatars.

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
        left: 'https://mc-heads.net/head/4a096cb37bb841cb8a6bdb3dfa15b4ef/left/512',
        right: 'https://mc-heads.net/head/4a096cb37bb841cb8a6bdb3dfa15b4ef/right/512'
      },
      body: {
        left: 'https://mc-heads.net/body/4a096cb37bb841cb8a6bdb3dfa15b4ef/left/512',
        right: 'https://mc-heads.net/body/4a096cb37bb841cb8a6bdb3dfa15b4ef/right/512'
      }
    },
    fullBody: 'https://mc-heads.net/player/4a096cb37bb841cb8a6bdb3dfa15b4ef/512',
    combo: 'https://mc-heads.net/combo/4a096cb37bb841cb8a6bdb3dfa15b4ef/512',
    cape: 'https://mc-heads.net/cape/4a096cb37bb841cb8a6bdb3dfa15b4ef/512',
    texture: {
      get: 'https://mc-heads.net/skin/4a096cb37bb841cb8a6bdb3dfa15b4ef/512',
      download: 'https://mc-heads.net/download/4a096cb37bb841cb8a6bdb3dfa15b4ef/512',
      apply: 'https://mc-heads.net/change/4a096cb37bb841cb8a6bdb3dfa15b4ef/512'
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

`await mcdata.mojangStatus()`
```js
{
  v: 11,
  last_updated: '07:20:02 IST',
  report: {
    skins: { status: 'up', title: 'Online', uptime: '100.00' },
    session: { status: 'up', title: 'Online', uptime: '99.83' },
    api: { status: 'up', title: 'Online', uptime: '99.79' },
    login: { status: 'up', title: 'Online', uptime: '99.51' },
    realms: { status: 'up', title: 'Online', uptime: '99.25' },
    website: { status: 'up', title: 'Online', uptime: '99.85' }
  }
}
```

`await mcdata.player.getUUID('cracklizon')`
```js
'c86f8692f2124846903bdf1be737bf21'
```

`await mcdata.player.getNameHistory('c86f8692f2124846903bdf1be737bf21')`
```js
[
  { name: 'Leruan' },
  { name: 'cracklizon', changedToAt: 1598813222000 }
]
```

`await mcdata.player.getUsername('c86f8692f2124846903bdf1be737bf21')`
```js
'cracklizon'
```