## Step1: Remove `build` from docker compose file since it doesn't support build from source

```
build:
    context: .
    dockerfile: Dockerfile
```

Instead, use `image` like below:

```
services:
  evm-mcp:
    image: tolak/evm-mcp-server:v0.1.0
    ports:
      - "3000:3000"
```

## Step2: Build docker image and push to docker hub

Build docker image with `x86_64` arch and change `image` in docker compose file to image name on docker hub with exact tag name

```
docker build --platform linux/amd64 -t <user>/evm-mcp-server .
docker tag <user>/evm-mcp-server <user>/evm-mcp-server:v0.1.0
docker push <user>/evm-mcp-server:v0.1.0
```

## Step3: Deploy with docker-compose.yml

You can use the docker-compose file on Phala Cloud to deploy. Head to [Phala Cloud Doc](https://docs.phala.network/phala-cloud/getting-started) for more details.

### Set environments

Make sure your set the following two environments on the dashboard **Encrypted Secrets** section.

- EVM_PRIVATE_KEY
- RPC_URL

Below are optional environments.

- OPENAI_API_KEY=
- PERPLEXITY_API_KEY=
- COINGECKO_PRO_API_KEY=

After finished deployment, you will see a public endpoint at **Network** tab on the dashboard, which you can use to access the MCP server.

## Step4: Config MCP client

Config MCP client like Claude Desktop, set MCP server using `sse` transport with the public endpoint get from Phala Cloud. For example: `https://80a95d038daac93fb069730cf2465d7ed9e25b1d-3000.dstack-prod5.phala.network/sse`:

```
"EVM MCP": {
  "url": "https://80a95d038daac93fb069730cf2465d7ed9e25b1d-3000.dstack-prod5.phala.network/sse"
}
```