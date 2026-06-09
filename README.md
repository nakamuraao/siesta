# Discord Guild Support Bot
Run `npm install` to install necessary packages

## Introduction
A bot for moderating and monitoring discord guilds.

## Setup

### Prerequisites
Required NodeJS v22.22.3

### Prepare config file

#### Bot related
1. Go to [Discord Developer Portal](https://discord.com/developers/home) and select your bot for development
2. Open `config.example.json` and fill in below info:
    - [General Information] Copy `Application ID` to `cid`
    - [Bot] Copy `Token` to `token`

#### Miaomi channel
- `miaomi`: Server ID
- `miaomiCh`: Channel ID
- `BDrole`: Birthday role ID

#### Rename file
Rename `config.example.json` to `config.json`

### Start dev server
Open your terminal:

```sh
# Install dependencies
npm install

# Register the commands
npm run cmdreg

# Start development
npm run dev
```

## Contact Us
Contact the developers with the following ways:
1. PR or Issues
2. Discord: 蒼アオ(@nkmrao)
3. [Twitter](https://twitter.com/nkmraoao/)
