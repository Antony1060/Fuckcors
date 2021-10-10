# FuckCors
A simple http proxy that removes CORS headers without sacrificing security.

## Public preview
### Note: This is not recommended for use in production

The preview is available [here](https://fuckcors.app) and as a ratelimit of 60 requests/minute with a burst of 10.

## Self-hosting
### Docker
```bash
docker pull antony1060/fuckcors
```
The image exposes the port 8080.

### Manually
1. Clone the repo
2. Change directory 
3. `cp .env.example .env` and edit the enviornment varaibles to your liking
4. `yarn` to install the needed packages
5. `yarn start` to start the app

### Enviornment variable
|Key|Description|
|---|---|
|DEBUG|true or false, will display more logging information|
|PORT|number, the port the application is listening on|
