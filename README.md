```diff
- If you want to see the version published in npm, change the branch
```

# MCData

# Example

```js
const { MCData } = require('mcdata');
const mcdata = new MCData();

const main = async () => {
  await mcdata.apiStatus();
  await mcdata.getNameHistory('4a096cb37bb841cb8a6bdb3dfa15b4ef');
  await mcdata.getPlayerProfile('4a096cb37bb841cb8a6bdb3dfa15b4ef');
  await mcdata.getUUID('KallelGaNewk');
  await mcdata.getUUIDs([ 'kallelganewk', 'cracklizon' ]);
}

main()
```
