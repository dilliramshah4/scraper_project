# Stage 1: Node.js Scraper
FROM node:18-slim AS scraper

# Install Chromium and dependencies
RUN apt-get update && \
    apt-get install -y chromium fonts-freefont-ttf && \
    rm -rf /var/lib/apt/lists/*

# Configure Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy and run the scraper script
COPY scrape.js ./
ARG SCRAPE_URL
ENV SCRAPE_URL=$SCRAPE_URL
RUN node scrape.js

# Stage 2: Python Server
FROM python:3.10-slim

WORKDIR /app

# Copy scraped data and server files
COPY --from=scraper /app/scraped_data.json .
COPY requirements.txt .
COPY server.py .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["python", "server.py"]