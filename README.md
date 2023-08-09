# Finance Tracker


## Setting Up

1. Run `npm install`
2. Grab the [MySQL Docker image](https://hub.docker.com/_/mysql)
3. Run the following command:
```sh
docker run --name finance-tracker -p 3306:3306  \
    -e MYSQL_ROOT_PASSWORD=<your-password> \
    -e MYSQL_DATABASE=fi-tracker \
    -e MYSQL_USER=sandbox \
    -e MYSQL_PASSWORD=<your-password> \
    -d mysql:latest
```
4. Connect to the instance
```sh
docker exec -it finance-tracker bash
```

5. Connect to the database:
```sh
mysql --user=sandbox --password fi-tracker
```

6. Add environment variables
7. Grant database privileges:
```sh
GRANT ALL PRIVILEGES ON * . * TO 'sandbox'@'%'
```
8. Run prisma migrations
9. Start the app in dev mode with `npm run dev`