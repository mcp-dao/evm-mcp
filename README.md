# EVM MCP

A Model Context Protocol server for interacting with the EVM blockchain, powered by the [EVM AI Kit](https://github.com/mcp-dao/evm-agent-kit).

## Overview

This project implements a Model Context Protocol (MCP) server that enables AI models to interact with the Ethereum Virtual Machine (EVM) blockchain. It leverages the EVM AI Kit to provide a robust interface for blockchain interactions.

## Features

- EVM blockchain interaction through MCP
- TypeScript implementation
- Express.js server
- Environment-based configuration

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Access to an EVM-compatible blockchain node

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mcp-dao/evm-mcp.git
cd evm-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration values.

## Development

To run the development server:

```bash
npm run dev
```

This will start the server with hot-reloading enabled.

## Building

To build the project:

```bash
npm run build
```

## Production

To start the production server:

```bash
npm start
```

## Dependencies

- `@modelcontextprotocol/sdk`: MCP SDK for protocol implementation
- `evm-ai-kit`: EVM interaction toolkit
- `express`: Web server framework
- `zod`: Schema validation
- `dotenv`: Environment variable management

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
