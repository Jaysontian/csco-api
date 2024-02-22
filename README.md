# CSCO - Your Personal Media Board
#### Shareable collections for your digital snapshots

This is the backend repo for CSCO. The frontend repo can be found [here](https://github.com/cs35l-group/csco).

![image](https://github.com/cs35l-group/csco/assets/48577877/0e331320-2500-47f1-89ce-c9b929533168)

## About this Project
### Built With
#### Tech Stack
- [![MongoDB][MongoDB]][MongoDB-url]
- [![Express][Express.js]][Express-url]
- [![React][React.js]][React-url]
- [![Node][Node.js]][Node-url]

#### Libraries/APIs
- mongoose (MongoDB for database)
- openai (OpenAI API for vibe generation)
- bcrypt (password hashing)
- jwt (user token generation)
- multer (file storage)
- cors (middleware between frontend and backend)
- react-dropzone (image drag and drop)
- react-color-extractor (extracting dominant color from image)
  
### Description/Motivation
CSCO is a social media web application built with the MERN tech stack. Users can create authenticated accounts and post images (either through URL or file upload) onto their profile. Using OpenAI’s GPT 4 Vision Preview API, CSCO automatically generates “vibe” words for each image. Users can search for posts by searching for other users or by searching by image “vibe”.

This project was built for UCLA’s CS 35L course.


## Getting Started
### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
### Installing the frontend 
1. Clone the repo
   ```sh
   git clone https://github.com/cs35l-group/csco
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Installing the backend
1. Clone the repo
   ```sh
   git clone https://github.com/Jaysontian/csco-api
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create an Open AI API Key (preferably with a GPT 4 account) at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) 
4. Create a 32-byte JWT hash by running 
	```sh
	openssl rand -hex 32 
	```
5. Create a MongoDB deployment and save the connection string and replace `<password>` with your database password

6. Create a `.env` file in the main project folder and enter your API Key in it
   ```js
   const API_KEY = 'ENTER YOUR API KEY’;
   const JWT_SECRET = 'ENTER YOUR JWT HASH’;
   const MONGO_URI = 'ENTER YOUR MONGO CONNECTION STRING’; 
   ```
### Launch on localhost

1. Launch the backend
   ```sh
   npm start
   ```
	- If backend connection to MongoDB fails, you might have to go to your MongoDB database page and enable all IP Addresses

2. Launch the frontend repo
   ```sh
	npm start
   ```

<!-- USAGE EXAMPLES -->
## Usage
- Once launched, you will be navigated to the Landing page (login page)
- Login (if you have previously created an account) or Sign Up to create a new account
- Once logged in, you will be at the homepage where you will see all users posts
- Navigate to the profile page to see your personal posts and upload/delete posts
- Search for other user's pages through the homepage search feature

### Demos
#### Landing page:
![landing page](https://github.com/cs35l-group/csco/assets/52262619/052e5ba3-65e3-4d93-ba43-331351868bfb)

#### Posts with caption and vibes:
![csco-demo2](https://github.com/cs35l-group/csco/assets/52262619/2add8d9b-0dc1-4145-9383-02bc0377119e)

#### Post staging:
![csco-demo3](https://github.com/cs35l-group/csco/assets/52262619/8ce1428d-4434-4a9f-b86b-3cf3391ff03b)


<!-- ROADMAP -->
## Roadmap
- [X] Created login page and login route
	- [X] Defined user schema for MongoDB
 	- [X] Used bcrypt and jwt for login/signup authentication and encryption
        - [X] Created frontend login buttons
        - [X] Added styling and images to login page
- [X] Created home page and post routes
	- [X] Defined post schema for MongoDB
 	- [X] Created post-retrieval routes
	- [X] Created frontend home page to display posts
- [X] Created profile page
	- [X] Created routes for posting
 	- [X] Added post upload feature
  		- [X] Upload through URL
		- [X] Upload through file
 		- [X] User-inputted caption
 	- [X] Display user posts with frontend
- [X] Added navigation buttons (Home, Profile, Signout)
- [X] Added search functionality on home page to search for other users
	- [X] Navigate to other user's page upon search
- [X] Added feature to delete posts
- [X] Added AI "vibe" words generation per post
	- [X] Integrated OpenAI Vision Preview API
	- [X] Displayed generated vibe under posts
- [ ] Feature to search by vibe
- [ ] Hosting and deployment

<!-- CONTRIBUTING -->
## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE.txt` for more information.


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* UCLA CS 35L and Professor Eggert
* [Open AI Chat Completions Docs](https://platform.openai.com/docs/guides/text-generation)
* [Bcrypt and JWT encryption](https://dev.to/eidorianavi/authentication-and-jwt-in-node-js-4i13)
* [MongoDB Docs](https://www.mongodb.com/docs/)
* [README Template](https://github.com/othneildrew/Best-README-Template)

[Node.js]: https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[OpenAI]: https://img.shields.io/badge/OpenAI-412991.svg?style=for-the-badge&logo=OpenAI&logoColor=white
[OpenAI-url]: https://platform.openai.com/docs/guides/text-generation
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

