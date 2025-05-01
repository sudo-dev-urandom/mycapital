#!/bin/sh

docker run -it --rm \
  -v "$PWD":/app \
  -w /app \
  -p 3000:3000 \
  --entrypoint sh \
  node:22-alpine