# Web Scraper & Server

Dockerized application that scrapes a URL using Node.js/Puppeteer and serves the data via Python/Flask.

## Requirements
- Docker

## Usage

1. Build the Docker image:
   ```bash
   docker build -t scraper-server --build-arg SCRAPE_URL=<your-url> .