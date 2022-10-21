# Wilders server

## Clear and start stack

```bash
docker rm wilders_db wilders_adminer wilders_api && docker image rm wilders_server-api && docker compose up --build
```

## Start stack

```bash
docker compose up --build
```

## Stop stack

```bash
docker compose down
```
