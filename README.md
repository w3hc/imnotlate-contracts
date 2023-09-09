# I'm not late

Mint yours at: https://imnotlate.on.fleek.co/

## Install

```
pnpm i
```

## Test

```
npm test
```

## Deploy

Create a `.env` on the model of `.env.example`:

```js
cp .env.example .env
```

Add your own keys in your `.env` file. 

Deploy:

```
pnpm dontbelate
```

## Mint

```
npx hardhat run scripts/mint.ts --network arthera-testnet
```

## First deployment (v0.1.0)

- [June-25-2023 17:38:39 PM +02:00 UTC](https://explorer-test.arthera.net/address/0xe2c7afe278BD3B60798208F84281A4e4733d1688)

## Listing NFT holders

Run: 

```
npx hardhat run scripts/holders.ts --network arthera-testnet
```

It will create a `holders-list.json` file that will look like this: 

```
["0xE45079d379712E51408B00496D232407D9449F79","0x476E2651BF97dE8a26e4A05a9c8e00A6EFa1390c","0x9A4EA840a38bcfb341950e754d939DdE82b3d35b"]
```

Latest extract: Aug 18, 2023 at 5 pm Paris time.

## Versions

- Node [v18.15.0](https://nodejs.org/uk/blog/release/v18.15.0/)
- NPM [v9.5.0](https://github.com/npm/cli/releases/tag/v9.5.0)
- OpenZeppelin Contracts [v4.8.0](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.8.0)

## Support

You can contact me via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discord.com/invite/uSxzJp3J76), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).