# MCData
Get minecraft player and server info

## Installation
```console
$ npm i mcdata
```

## Methods

`await mcdata.playerStatus(nickname)` | Gets the UUID, Nickname history and skin of the player.<br>
returns: **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**

`await mcdata.serverStatus(ip)` | Gets the Status, ping, version, motd and players of the server.<br>
returns: **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**

`await mcdata.mojangStatus()` | Gets the Mojang servers status.<br>
returns: **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**

`await mcdata.player.getUUID(nickname)` | Gets only the UUID of user.<br>
returns: **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

`await mcdata.player.getUsername(uuid)` | Gets only the formatted username.<br>
returns: **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

`await mcdata.player.getNameHistory(uuid)` | Gets only the name history of user.<br>
returns: **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

| Parameter | Type | Optional | Default |
|:-:|-|-|-|
| nickname | string | ❌ | undefined |
| ip | string | ❌ | undefined |
| uuid | string | ❌ | undefined |

## Outputs

`await mcdata.playerStatus('cracklizon')`
```js
{
  uuid: 'c86f8692f2124846903bdf1be737bf21',
  username: 'cracklizon',
  nameHistory: [
    { name: 'Leruan' },
    { name: 'cracklizon', changedToAt: 1598813222000 }
  ],
  skin: {
    avatar: 'https://crafatar.com/avatars/c86f8692f2124846903bdf1be737bf21?size=512&default=MHF_Steve&overlay',
    head: 'https://crafatar.com/renders/head/c86f8692f2124846903bdf1be737bf21?size=512&default=MHF_Steve&overlay',
    body: 'https://crafatar.com/renders/body/c86f8692f2124846903bdf1be737bf21?size=512&default=MHF_Steve&overlay',
    texture: 'https://crafatar.com/skins/c86f8692f2124846903bdf1be737bf21'
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
  'minecraft.net': 'red',
  'session.minecraft.net': 'green', 
  'account.mojang.com': 'green',    
  'authserver.mojang.com': 'green', 
  'sessionserver.mojang.com': 'red',
  'api.mojang.com': 'green',        
  'textures.minecraft.net': 'green',
  'mojang.com': 'red'
}
```

`await mcdata.player.getUUID('cracklizon')`
```js
'c86f8692f2124846903bdf1be737bf21'
```

`await mcdata.player.getNameHistory('c86f8692f2124846903bdf1be737bf21')`
```
[
  { name: 'Leruan' },
  { name: 'cracklizon', changedToAt: 1598813222000 }
]
```

`await mcdata.player.getUsername('c86f8692f2124846903bdf1be737bf21')`
```js
'cracklizon'
```
