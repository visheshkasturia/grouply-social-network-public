# Grouply.xyz - Social Network Group App

Grouply is a group social networking app with extensive Group, Post, Comment, Admin features. The frontend has been built using React, the backend utilises Node.js, Express.js and MongoDB, testing is done using Jest, SuperTest and Cypress and the app deployed to [grouply.xyz](https://www.grouply.xyz) using Heroku.

## Table of Contents

- [Setup](#Setup)
- [Features](#Features)
- [Technologies](#Technologies)
- [Models](#Models)
- [Routes](#Routes)
- [Security](#Security)
- [Testing](#Testing)
- [Screenshots](#Screenshots)

## Setup

Running the app locally.

**1. Setting up the front-end(React):** In main directory, open a new terminal and do

```
$ cd client
$ npm install
$ npm run build
```

**2. Setting up the back-end**

- Connect to MongoDB: edit the `.env` file

```
ATLAS_CONNECTION = #(Your MongoDB atlas connection
                     - example
                     -mongodb+srv://<user>:<pass>@<DBLINK>?retryWrites=true&w=majority)
```

- Setting up Express.js and Node.js: In main directory open a terminal window and do

```
$ npm install
```

**3. Running the app**: In main directory open a terminal window and do

```
$ npm start
```

**4. Testing**

- Backend testing

```
$ npm test -- --coverage
```

- Front end testing

```
$ cd client
$ npm test -- --coverage
```

- Integration testing

```
$ cd client
$ node_modules/.bin/cypress open
```

## Features

List of all app features. All features correspond to different endpoints in the app.

**1. User Features**

- User can register and login
- User passwords are securely encrypted and then stored at the backend
- Account lockout if too many unsuccessful login attempts
- Users can change password
- Users can deactivate their account
- User Profile View
- User can edit their own profile

**2. Group and Admin Features**

- Users can create public and private groups
- Group admins can promote and demote other admins, except the
  creator
- Users can request to join a public group
- Users can invite other users to join their group
- Admins need to approve a user they can join
- Users can leave a group
- Groups have hashtag support
- Users can filter public groups by tag
- User can see all posts in a group
- Users can make posts with audio, video, or image attachments
  within groups they’re in.
- Users can flag posts
- Admins can go through and delete flagged posts

**3. Post Features**

- Live updating posts
- Users can comment on other user's posts.
- Users can edit their own comments
- Users can delete their own comments
- Users can delete their own posts
- Users can hide other user's posts

**4. Other features**

- Group suggestion feature
- Several ways of sorting groups
- Group analytics
- Post analytics

## Technologies

The project primarily utilises React.js, Node.js and Express.js for some particular reasons:

- It facilitates the MVC architecture which makes web development process **scalable** and the front-end and back-end remain **decoupled**
- The framework provides lot of libraries which make development easy.
- Robust and support for testing libraries.
- Most libraries are installed locally and have low global dependencies
- One of the most popular frameworks for making web apps.
- Great documentation and support

**1. Front-end (React.js)**

- axios version 0.24.0 -- Making http requests
- eslint version 7.32.0 -- Code style (Airbnb)
- js-cookie version 3.0.1 -- Reading Cookie from react
- "cloudinary-react" version 1.7.0" -- Uploading and displaying media
- react version 17.0.2
- react-dom version 17.0.2
- "react-router version 6.0.2 -- Router for handling navigation
- "react-router-dom" version 6.0.2
- "react-scripts version 4.0.3
- "web-vitals version 1.1.2
- "@testing-library/user-event version 12.8.3 -- Unit Testing
- "@testing-library/jest-dom version 5.15.1 -- Unit Testing
- "axios-mock-adapter" version 1.20.0 -- Mocking api calls for testing

**2. Back-end (Node.js and Express.js)**

- "mongodb": version 4.2.0 MongoDB
- "mongoose": version 6.0.1 Ease of access MongoDB connector library
- "bcryptjs": version2.4.3 Encrypting passwords
- body-parser version 1.19.0 --Middleware for parsing request bodies
- cookie-parser version 1.4.6 --Middleware for handlig cookies
- cors version 2.8.5 --Allowing cross origin access
- dotenv version 10.0.0 -- Using .env file
- express version 4.17.1 -- Provides common utilities such as URL routing for building and creating servers & web applications
- nodemon version 2.0.15 -- ease in development restarts server upon save changes
- "supertest" version 6.1.6 -- Backend testing library

## Models

**1. Authorization:**

```
1. email: { type: String, required: true }
2. password: { type: String, required: true }
3. loginAttempts: { type: Number, required: true }
4. lockUntil: { type: String, required: true }
```

**2. User**

```
1. fullName: { type: String, required: true }
2. userName: { type: String, required: true }
3. email: { type: String, required: true }
4. dpURL: { type: String, default: '<default-img-link>'}
5. memberOf: { type : Array , default : [] }
6. invitations: { type : Array , default : [] }
```

**3. Group**

```
1. groupName: { type: String, required: true }
2. description: { type: String }
3. createdBy: {type: String, required: true}
4. privacy: { type: Number, required: true }
5. allMembers: { type : Array , default: [] }
6. allPosts: { type : Array , default: [] }
7. admins: { type : Array , default: [] }
8. pending: { type : Array , default: [] }
9. tags: { type : Array , default: [] }
10. dateCreated: {type: Number, default: Date.now()}
```

**4. Post**

```
1. postTitle: { type: String, required: true }
2. postContent: { type: String, required: true }
3. createdBy: { type: String, required: true }
4. partOf: { type: String, required: true}
5. likes: {type: Number, default: 0}
6. likedBy: { type : Array , default: [] }
7. hiddenBy: { type : Array , default: [] }
8. isFlagged: {type: Array, default: [] }
9. flaggedBy: { type : Array , default: [] }
10. allComments: { type : Array , default: [] }
11. allAttachment: { type : Array , default: [] }
12. hashTags: { type : Array , default: [] }
13. dateCreated: {type: Number, default: Date.now()}
```

**5. Comment**

```
1. postId: { type: String, required: true }
2. commentBy: { type: String, required: true }
3. commentContent: { type: String, required: true }
```

## Routes

TODO

## Security

- Account Lockout Policy: User is given 3 tries to login following which the account is locked for 15 minutes.
- Description of HTTP status codes used: Pretty straightforward methods for naming HTTP status codes. Most of the successful API calls will send 200 status, and most failed calls will send 400. A successful POST method call will send 201 status, and a database item not found in a database collection will send 404 status.
- Cookies: Whenever a user Logs in - If successful - a cookie is set containing identifying information which is used to fetch all the user information in the home page.
- Access Control: Access control is split into members and administrators - members can only control/ edit/ delete objects associated with themselves. Admins can modify, delete objects belonging to the group.
- Using .env: No sensitive information is stored anywhere in code and .env files containing sensitive information are not pushed to github.

## Testing

- Unit tests for all APIs called from Front-end
- Unit tests for all routes in the backend
- Snapshot tests for most front-end components

## Screenshots
