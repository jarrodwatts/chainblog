# Chainblog

![banner.png](./banner.png)

A decentralized blogging platform built on top of the [Lens Protocol](https://www.lens.xyz/).

- Own your [Profile](https://docs.lens.xyz/docs/profile) as an NFT.
- Write posts in [markdown](https://www.markdownguide.org/), store them on [IPFS](https://portal.thirdweb.com/storage) and attach them to your profile NFT inside a [mapping](https://docs.soliditylang.org/en/v0.8.17/types.html#mapping-types).
- View Personalised [Feed](https://docs.lens.xyz/docs/timeline) of posts from creators you follow.

## Tech Stack

- [Next.js](https://nextjs.org/): 🐐 React framework for production.

- [TypeScript](https://www.typescriptlang.org/): 🦕 A better JavaScript.

- [Lens Protocol](https://www.lens.xyz/): 📡 Decentralized social graph for storing data for profiles, posts, comments, mirrors, etc.

- [GraphQL & GraphQL Codegen](https://the-guild.dev/graphql/codegen): 📜 Auto-generate strongly typed types and hooks for your GraphQL queries based on the Lens GraphQL schema. See [codegen.yaml](./codegen.yaml) for more details.

- [thirdweb](https://portal.thirdweb.com/sdk): 📦 All things web3.

  - [React SDK](https://portal.thirdweb.com/sdk) to connect to and interact with smart contracts in React hooks.

  - [Storage](https://portal.thirdweb.com/storage) to store files on IPFS.

  - [UI Components](https://portal.thirdweb.com/ui-components) to connect wallets, render content from IPFS, and interact with smart contracts:
    - [Connect Wallet Button](https://portal.thirdweb.com/ui-components/connectwalletbutton)
    - [Web3 Button](https://portal.thirdweb.com/ui-components/web3button)
    - [IPFS Media Renderer](https://portal.thirdweb.com/ui-components/ipfs-media-renderer)

- [Material UI](https://mui.com/): 🎨 Because I suck at tailwind.
