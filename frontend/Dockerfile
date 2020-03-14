FROM node:current-slim as webapp
WORKDIR /app

RUN apt-get update

RUN apt-get install -y git

RUN git clone https://github.com/maximillianfx/arctouch-challenge.git

RUN git checkout development

RUN git pull

RUN cd frontend

RUN npm install
RUN npm install -g @angular/cli
COPY ./ /app/
RUN ng build --prod=true --output-path=./dist/out

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:stable
COPY --from=webapp /app/dist/out /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf