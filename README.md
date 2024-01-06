# Spotify API

![](https://img.shields.io/github/last-commit/cabrera-evil/spotify-backend/master)
![](https://img.shields.io/github/license/cabrera-evil/spotify-backend)
![](https://img.shields.io/github/languages/top/cabrera-evil/spotify-backend?label=javascript)
![](https://img.shields.io/github/repo-size/cabrera-evil/spotify-backend)
![](https://img.shields.io/github/contributors/cabrera-evil/spotify-backend)
![](https://img.shields.io/github/stars/cabrera-evil/spotify-backend?style=social)

Welcome to the Spotify API repository!

This repository contains the backend code for the Spotify API project. The project is a REST API that allows users to search for songs, albums, and artists. The API also allows users to create playlists and add songs to them.

## Table of Contents

- [Spotify API](#spotify-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)

## Installation

First of all, you will need to clone the repository:

```bash
git clone https://github.com/cabrera-evil/spotify-backend.git
```

Then you'll need to setup the environment variables. You can do this by creating a `.env.production` file in the root directory of the project. The `.env.production` file should contain the following variables:

```text
# POSTGRES
POSTGRES_USER=<your postgres username>
POSTGRES_PASSWORD=<your postgres password>
POSTGRES_DB=<your postgres database name>
POSTGRES_HOST=<your postgres host>
POSTGRES_PORT=<your postgres port>

# SERVER
PORT=<the port where the server will run>
JWT_SECRET=<the secret used to sign the JWT tokens>
```

To run the project, you will need to have [Docker](https://www.docker.com/) installed on your machine. Once you have Docker installed, you can run the following command to start the project:

```bash
docker-compose up
```

## Usage

The API endpoints are documented using [Postman](https://documenter.getpostman.com/view/23770643/2s9YsGjZha). You can use the Postman documentation to test the API.

## License

This repository is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the scripts as long as you include the original license text.

---

Happy Coding!
