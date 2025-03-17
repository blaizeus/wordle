# Setup

- Clone repo
- Download and install Docker Desktop for your machine: https://docs.docker.com/desktop/
- Run docker desktop
- Open your terminal and CD to project root /wordle
- Run `docker-compose build` to build the app
- Run `docker-compose up` to run the app
- View the app at http://localhost:3000

# Troubleshooting

- This app requires the use of ports 3000 and 8000
- If those ports are already in use, free them up or change the port config in docker-compose.yml
