# <h1 align="center">BankApp</h1>

<div align="center">
  <img src="screenshot.png"  width="500"/>
</div>

<p align="center">
  <a href="#dart-description">Description</a> &#xa0; | &#xa0; 
  <a href="#art-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#toolbox-installation">Installation</a> &#xa0; | &#xa0;
  <a href="#joystickhow-to-play">How to Play</a> &#xa0; | &#xa0;
  <a href="#memo-features">Features</a> &#xa0; | &#xa0;
  <a href="#briefcase-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/arturomsoberanes" target="_blank">Author</a>
</p>

<br>


## :dart: Description ##

Bank App made with MongoDB, Express, React and Node.js



## :art: Technologies ##

### Client

- [HTML](https://www.w3schools.com/html/)
- [CSS](https://www.w3schools.com/css/)
- [JavaScript](https://www.w3schools.com/js/)
- [ReactJS](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Axios](https://axios-http.com/)
- [Formik](https://formik.org/)
- [React-Router-Dom](https://v5.reactrouter.com/web/guides/quick-start)
- [Firebase](https://firebase.google.com/)

### Server

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://mongodb.com/)
- [Firebase Admin](https://firebase.google.com/)


## :toolbox: Installation ##

For this project you will need firebase project created


Clone Repository

```bash
$ git clone https://github.com/arturomsoberanes/bankapp.git
```

Go to directory for client

```bash
$ cd client-bankapp
```

Install the dependencies

```bash
$ npm install 
```

Go to src

```bash
$ cd src 
```

Create a firebaseapp.js file

```bash
$ touch firebaseapp.js 
```

Go to the console.firebase > settings of project > general > create new app

Copy the SDK configuration

Your file most be like this

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "asdfasdfasdfas",
  authDomain: "asdfasdfasdfas.firebaseapp.com",
  projectId: "asdfasdfasdfas-54d68",
  storageBucket: "asdfasdfasdfas-54d68.appspot.com",
  messagingSenderId: "adsfasdfasdf",
  appId: "asdfasdf"
};

// Initialize Firebase
const conf = initializeApp(firebaseConfig);

export default conf;

```

Create a project for production

```bash
$ npm run build
```

Copy and rename "build" directory in "bank-project-back"

```bash
$ cp -r build ../server-bankapp/public
```

Go to "server-bankapp" directory

```bash
$ cd ../../server-bankapp
```

Create a key.json file

Go to the console.firebase > settings of project > accounts of services > generate a new private key

Save the file in server-bankapp/src/middlewares/key.json

Create a admin.js file in server-bankapp/src/middlewares/


```javascript
var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;

```

## :joystick:	How to Run ##

Run the server with Docker

In the "server-bankapp" run the command

```bash
$ docker-compose up
```




## :memo: Features ##

These are the list of currect improvements:

- :no_entry: Encrypt Passwords.	
- :no_entry: Add more options.	

## :briefcase:	 License ##

This project is under license from GNU. For more details, see the [LICENSE](LICENSE) file.


Made with :heart: by <a href="https://github.com/arturomsoberanes" target="_blank">Arturo Soberanes</a>

&#xa0;

<a href="#top">Back to top</a>



