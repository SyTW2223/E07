FROM node:16-alpine

WORKDIR .

COPY . .

RUN --mount=type=secret,id=ENV_PARAMS \
  --mount=type=secret,id=ENV_PARAMS_FRONT \
  cat /run/secrets/ENV_PARAMS > backend/.env.local && \
  cat /run/secrets/ENV_PARAMS_FRONT > .env.local 

RUN chmod +x ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]