# Web Scraper & Content Server

A Dockerized application that scrapes a user-specified URL using Node.js/Puppeteer and serves the scraped data via a Python/Flask web server. Built with multi-stage Docker containers for optimal size.

## Requirements
- Docker

## Features
- **Browser Automation**: Uses Chromium/Puppeteer for headless scraping
- **Lightweight API**: Serves scraped data via Python/Flask
- **Multi-Stage Build**: Separate build and runtime stages in Docker
- **Dynamic URL**: Specify target URL at build time

## Prerequisites
- Docker: [Installation Guide](https://docs.docker.com/get-docker/)
- (Optional) Git: To clone this repository:   
```bash
git clone https://github.com/dilliramshah4/scraper_project
```

## Usage

### 1. Build the Docker Image
```bash
sudo docker build --no-cache -t scraper-server--build-arg SCRAPE_URL=<your-target-url> .
```

Example (Wikipedia DevOps page):
```bash
sudo docker build --no-cache -t scraper-server \
  --build-arg SCRAPE_URL=https://en.wikipedia.org/wiki/DevOps .
```

Note:  `--no-cache`is use to flag to force fresh scrape:


### 2. Run the Container
```bash
sudo docker run -p [HOST_PORT]:5000 scraper-server
```

Example (map host port 5000 → container port 5000):
```bash
sudo docker run -p 5000:5000 scraper-server
```



### 3. Passing the URL
The target URL must be provided during build:
```bash
--build-arg SCRAPE_URL=<your-url>
```

Example for  Wikipedia documentation:
```bash
sudo docker build --no-cache -t scraper-server   --build-arg SCRAPE_URL=https://en.wikipedia.org/wiki/Internet_of_things .
```

Important: To change URLs, you need to rebuild the image.

### 4. Access Scraped Data
Once the container is running, access the data via:

Browser:
```bash
http://localhost:[HOST_PORT]
```

curl:
```bash
curl http://localhost:[HOST_PORT]
```

Sample Output
For https://en.wikipedia.org/wiki/DevOps:

![Screenshot from 2025-02-18 02-31-41](https://github.com/user-attachments/assets/aa74b62c-907c-4975-87f5-0c9cc6525663)

<br> <br>



![Screenshot from 2025-02-18 02-39-17](https://github.com/user-attachments/assets/347222fa-823e-4778-9d43-175fd0f2300d)



<br> <br>

Sample Output
For:  https://en.wikipedia.org/wiki/Television
<br> <br>
![Screenshot from 2025-02-18 03-23-44](https://github.com/user-attachments/assets/a6ccd821-21b5-4cbf-8c2f-410abf7318dc)

<br> <br>

Sample Output
For:   https://en.wikipedia.org/wiki/Internet_of_things
<br> <br>
![Screenshot from 2025-02-18 03-29-56](https://github.com/user-attachments/assets/45434c5b-8f96-4e95-a7ca-36ac23be3e5e)

<br> <br>
<br> <br>


## Technical Notes
- **Data Freshness**: Scraped data is captured at build time.
- **CSS Selectors**: Currently optimized for Wikipedia pages.
- **Dependencies**:
  - Node.js 18 + Puppeteer
  - Python 3.10 + Flask

## Troubleshooting
- **Port Already in Use**:
  ```bash
  docker run -p 5001:5000 scraper-server  # Use different host port
  ```
