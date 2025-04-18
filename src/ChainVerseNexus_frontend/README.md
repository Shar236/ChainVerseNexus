# 🖼️ CHAIN VERSE NEXUS

A decentralized NFT (Non-Fungible Token) marketplace built using the Ethereum blockchain. This DApp allows users to connect their MetaMask wallets, mint unique NFTs, and buy/sell them using ETH.

## 🚀 Features

- 🔐 MetaMask wallet integration
- 🧾 Mint NFTs with metadata (name, image, description)
- 💱 Buy and sell NFTs using ETH
- 🌐 Interact with Ethereum smart contracts
- 📦 Decentralized metadata storage (IPFS ready)
- 🎨 Built using Solidity, Web3/Ethers.js, and modern frontend technologies

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Blockchain:** Ethereum
- **Wallet:** MetaMask
- **Libraries:** Web3.js / Ethers.js

---

## 🔧 Getting Started

### Prerequisites

- Node.js & npm
- MetaMask extension installed
- Ethereum testnet access (like Goerli or Sepolia)

### Installation

```bash
git clone https://github.com/your-username/chain-verse-nexus.git
cd chain-verse-nexus
npm install
```

### Running the DApp

```bash
npm start
```

Make sure MetaMask is connected and set to the correct test network.

---

## 📄 Smart Contract

The smart contract is written in Solidity and follows the ERC-721 standard for NFTs. It can be deployed using Remix or Hardhat.

### Example Functions

- `mintNFT(address recipient, string memory tokenURI)`
- `transferFrom(address from, address to, uint256 tokenId)`

---

## 🧪 Testing

If using Hardhat:

```bash
npx hardhat test
```

## 📁 Project Structure

```
.
├── contracts/          # Solidity smart contracts
├── src/                # Frontend code
├── public/             # Static files
├── scripts/            # Deployment scripts
├── README.md
├── package.json
└── hardhat.config.js
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🙌 Acknowledgements

- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Ethereum](https://ethereum.org)
- [MetaMask](https://metamask.io)
- [IPFS](https://ipfs.io)
