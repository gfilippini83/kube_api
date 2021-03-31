FROM node:15.0.1
RUN mkdir /src

WORKDIR /src
ADD ./package.json /src/package.json
ADD ./package-lock.json /src/package-lock.json

RUN npm set strict-ssl false
RUN npm install

COPY . /src

EXPOSE 3000

CMD bash /src/startapi.sh