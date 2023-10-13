# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory's content into the container
COPY . .

# Install project dependencies
RUN npm install

# Specify the command to run when the container starts
CMD [ "npm", "run", "serve" ]
