# Start with a base Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (and clean up the cache to keep the image slim)
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application code
COPY src/ ./src/

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "src/server.js"]

# Add some labels (because why not?)
LABEL maintainer="DevOps Rockstar <devops@coolcompany.com>"
LABEL version="1.0"
LABEL description="The coolest web app container you'll ever see!"

