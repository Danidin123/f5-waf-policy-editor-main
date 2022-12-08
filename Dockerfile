FROM node
WORKDIR /app
COPY . .
RUN npm install  --legacy-peer-deps
ENV NODE_OPTIONS=--openssl-legacy-provider
EXPOSE 3000
CMD ["npm", "start"]
