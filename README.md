# Remote Operator App

This Node.js application connects to remote VMs over SSH and oprates the installation, updating and removing of specified services.
Built with: [Express 4](http://expressjs.com/)

**<em>for the CLI instructions read [this file](https://github.com/kiavashzmk/remote-operator/tree/master/bin/README.md)</em>**

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## REST API

### Request

##### Uploades and install the app on the remote VM. Installation process can be monitored in the console

`POST /api/remote/install`

```sh
curl --location --request POST 'localhost:3000/api/remote/install' \
--header 'Content-Type: application/json' \
--data-raw '{
    "host": "host ip address",
    "port": port number,
    "username": "username",
    "password": "password"
}'
```

### Respone

``` json
  "success": true,
  "status": "files are uploaded and being installed..."
```

---

### Request

`DELETE /api/remote/unsintall`

```sh
curl --location --request DELETE 'localhost:3000/api/remote/uninstall' \
--header 'Content-Type: application/json' \
--data-raw '{
    "host": "host ip address",
    "port": portn number,
    "username": "username",
    "password": "password"
  }'
```

### Response

```json
"success": true,
"status": "files deleted from resource"
```
