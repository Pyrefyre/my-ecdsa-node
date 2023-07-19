## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

# Specific Project Notes

This is actually a clone of the Alchemy University ECDSA-Node project, where it have been modified to now being able to accept and extract public key from signatures signed with a private key!

## Instructions on how to use just signed Signatures

Below are the steps on how you can use a signed signature with a private key, to access the related wallet balance with the corresponding public key.

1. Create a terminal instance and cd into ./server/scripts/signature.js.
2. Choose which private key that you want to use from the private_key variable, imported from server/index.js.
3. Run the generate.js script, then use the specialSig that will be printed on the terminal line.
4. Open the website on localhost:5173.
5. On the website, insert your special message that you used for signing the signature.
6. Last but not least, input your signed signature and the website should show the wallet's balance.
7. Then, you can test the transfer function also.
