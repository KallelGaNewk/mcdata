# MCData
Get minecraft player and server info

## Methods

`await .playerStatus([nickname])` - Gets the UUID, Nickname history and skin of the player.</br>
`await .serverStatus([ip])` - Gets the Status, ping, version, motd and players of the server.</br>
`await .mojangStatus()` - Gets the Mojang servers status.</br>

| Parameter | Type | Optional | Default |
|:-:|-|-|-|
| nickname | string | ❌ | undefined |
| ip | string | ❌ | undefined |

## Outputs

`await .playerStatus('fratta_gamer')`
```js
{
  uuid: 'd9a6f51f5706488b97397fb4a5045ae2',
  username: 'Fratta_Gamer',
  nameHistory: [
    { name: 'Shawn_REY' },
    { name: 'Katchan2003', changedToAt: 1515343951000 },    
    { name: 'NainterGalactik', changedToAt: 1520793463000 },
    { name: '_Dark_26903', changedToAt: 1523603683000 },    
    { name: '_Monkey_DLuffy', changedToAt: 1536076288000 }, 
    { name: 'XQC_Psykoz', changedToAt: 1542822850000 },     
    { name: 'xQc_Mushi', changedToAt: 1545421128000 },      
    { name: 'SubAWayS', changedToAt: 1549716527000 },       
    { name: 'Oksko', changedToAt: 1563284272000 },
    { name: 'LaBANANASplit', changedToAt: 1566481344000 },
    { name: 'Warxer', changedToAt: 1569099206000 },
    { name: 'VAIP3R', changedToAt: 1571692745000 },
    { name: 'ThrasHersS', changedToAt: 1574347028000 },
    { name: 'ClaquetteNeige', changedToAt: 1577999654000 },
    { name: '5_6_K', changedToAt: 1580648443000 },
    { name: 'Stouplatch', changedToAt: 1583250854000 },
    { name: 'ClaquetteNeige', changedToAt: 1585923103000 },
    { name: 'Fratta_Gamer', changedToAt: 1588684270000 }
  ],
  skin: {
    avatar: 'https://crafatar.com/avatars/d9a6f51f5706488b97397fb4a5045ae2?size=512&default=MHF_Steve&overlay',
    head: 'https://crafatar.com/renders/head/d9a6f51f5706488b97397fb4a5045ae2?size=512&default=MHF_Steve&overlay',
    body: 'https://crafatar.com/renders/body/d9a6f51f5706488b97397fb4a5045ae2?size=512&default=MHF_Steve&overlay',
    texture: 'https://crafatar.com/skins/d9a6f51f5706488b97397fb4a5045ae2'
  }
}
```


`await .serverStatus('mc.hypixel.net')`
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

`await .mojangStatus()`
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
````