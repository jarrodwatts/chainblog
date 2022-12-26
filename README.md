# Chainblog

![banner.png](./banner.png)

A decentralized blogging platform built on top of the [Lens Protocol](https://www.lens.xyz/).

- Own your [Profile](https://docs.lens.xyz/docs/profile) as an NFT.
- Write posts in [markdown](https://www.markdownguide.org/), store them on [IPFS](https://portal.thirdweb.com/storage) and attach them to your profile NFT inside a [mapping](https://docs.soliditylang.org/en/v0.8.17/types.html#mapping-types).
- View a Personalised [Feed](https://docs.lens.xyz/docs/timeline) of posts from creators you follow.

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

- [Material UI](https://mui.com/): 🎨 Because I [suck at tailwind](https://twitter.com/jarrodWattsDev/status/1602741700472049667).

- [Tanstack (React) Query](https://tanstack.com/query/v4): 🐶 A powerful, flexible, and extensible data fetching and caching library for React.
  - [@graphql-codegen/typescript-react-query](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query) Auto-generate strongly typed React Query hooks for queries and mutations based on your `.graphql` files. [Demo](https://twitter.com/jarrodWattsDev/status/1602534171284426754).

## Roadmap

- ✅ Sign in with Lens
- ✅ Create a post
  - ❌ Wait for transaction to be indexed
- ✅ View a feed of posts
  - ✅ View a feed of posts from creators you follow
- ✅ View a profile
  - ✅ View a profile's posts
  - ❌ `/profile` route
  - ❌ Edit profile
  - ❌ Delete profile
  - ❌ View profile's followers
  - ❌ View profile's following
- ✅ View an individual post
- ✅ Discover profiles
- ✅ Follow a profile
  - ❌ Follow user who has a follow module setup
- 🚧 Unfollow a profile (Bugged atm)
- ❌ Choose which collection module to use on a post
- ❌ Collect a post
- ❌ View a post's collection info (price, supply, etc.)
- ✅ Add a reaction
  - ❌ Live updating reaction count
- ❌ View post reactions
- ❌ Comment on a post
- ❌ View post comments
- ❌ Mirror a post
- ❌ View a post's mirrors
- ❌ Hide post
- ❌ Report post
- ❌ Search publications
- ❌ Notifications

### Future

- 🤔 Use dispatcher for all transactions to have gasless transactions
- 🤔 Create Lens Profiles directly from Chainblog
- 🤔 E2EE Messaging using [XMTP](https://xmtp.org/)
- 🤔 Recommended profiles suggestion after following a user
