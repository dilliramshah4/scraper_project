# Web Scraper & Content Server

A Dockerized application that scrapes a user-specified URL using Node.js/Puppeteer and serves the scraped data via a Python/Flask web server. Built with multi-stage Docker containers for optimal size.

## Features
- **Browser Automation**: Uses Chromium/Puppeteer for headless scraping
- **Lightweight API**: Serves scraped data via Python/Flask
- **Multi-Stage Build**: Separate build and runtime stages in Docker
- **Dynamic URL**: Specify target URL at build time

## Prerequisites
- Docker: [Installation Guide](https://docs.docker.com/get-docker/)
- (Optional) Git: To clone this repository

## Usage

### 1. Build the Docker Image
```bash
docker build -t scraper-server \
  --build-arg SCRAPE_URL=<your-target-url> .
