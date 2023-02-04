# Rock(0) PAPER(1) SCISSORS(2)

RULES: Rock > Scissors, Paper > Rock, Scissors > Paper

## TO Play

```
    1.Player needs to create an account using <userName> & <password> as input on a POST call to /player

    2. Make a POST api call to /player/login with the body {userName,password}. a session token will be generated

    3. Use the session token in the header as 'authorization' key with the value `Bearer <token>`

    the game takes the <input> => 0,1,2 where 0 = ROCK, 1=Paper, 3=Scissors

    make a POST to /game with the body
    {choice: <input>}

```

## Leaderboard

    With user session token, make a GET to /game/leaderboard

## CPU transparency

    Using user session token, make a GET to /game/cpu

## Extra - Get all games played by player

    Using user session token, make GET to /game/mygames

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ docker compose up


# production mode
$ yarn run start:prod
```

## Test

```bash
# Tests
$ yarn test

# test coverage
$ yarn test:cov
```

## License

Nest is [MIT licensed](LICENSE).
