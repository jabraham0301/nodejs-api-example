## Features
- Get users from third-party API and insert into local DB
- Modify user properties and if that user doesn't exists, retrieve from third-party API and inserto into local DB
- Delete user
- You can pass sort_key and order to the `GET /api/users/:ids?sort_key&order` (Bonus)

## Tech
- Nodejs

## Database
-MongoDB

## Frameworks/Libraries
- ExpressJS
- Nodemon (dev only)
- Dotenv
- Mongoose
- node-fetch

## Testing
- Jest

## Installation
This project requires **Node** to run

First, install dependencies and devDependencies:
```sh
git clone https://github.com/jabraham0301/skydropx-challenge.git
cd skydropx-challenge
npm i
```

Second, lets crash the project:
```sh
npm run start
```

## Developers
Follow **Installation** steps and run:
```sh
npm run dev
```

## Testing
Follow **Installation** steps and run:
```sh
npm run test
```