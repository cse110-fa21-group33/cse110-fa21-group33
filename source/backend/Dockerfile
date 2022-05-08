# Pull node version 10
FROM node:10
# Set working directory in container
WORKDIR /usr/src/app
# Copy dependency configs over for install
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy all files
COPY . .
# Expose container port 3000
EXPOSE 3000
# Start the app
CMD ["npm","start"]
