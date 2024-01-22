# Stage 1: Build stage
FROM node:18 AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the docker image
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built app from the builder stage
COPY --from=builder /app/dist ./dist

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "run", "serve" ]

######
######

# Original dockerfile. larger image size, so the above code makes it smaller for production use 

# Starting with node:18 base image as parent image that is based on linux image
# FROM node:18

# # Set wd in the container to /app
# WORKDIR /app

# # Copy package and package-lock .json files into wd
# COPY package*.json ./

# # Install ffmpeg into container - remember container is based on linux !!
# RUN apt-get update && apt-get install -y ffmpeg

# # Install other packages specified in package.json
# RUN npm install

# # Copy app source code
# COPY . .

# # Make port 3000 available outside the container
# EXPOSE 3000

# # Define the command to run your app using CMD (only 1 CMD allowed!!)
# CMD ["npm", "start"]