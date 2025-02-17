const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
    const url = process.env.SCRAPE_URL;
    if (!url) {
        console.error('SCRAPE_URL environment variable is required');
        process.exit(1);
    }

    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Wikipedia-specific selectors
        const title = await page.title();
        const heading = await page.$eval('#firstHeading', el => el.textContent.trim());
        
        // Get first visible paragraph after infobox
        const firstParagraph = await page.evaluate(() => {
            const content = document.querySelector('#mw-content-text .mw-parser-output');
            const paragraphs = Array.from(content.querySelectorAll('p'));
            const visibleParagraph = paragraphs.find(p => 
                p.offsetParent !== null && 
                p.textContent.trim().length > 0
            );
            return visibleParagraph ? visibleParagraph.textContent.trim().replace(/\s+/g, ' ') : '';
        });

        const data = { 
            url, 
            title, 
            heading, 
            firstParagraph 
        };

        fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
        console.log('Scraped data saved successfully');
    } catch (error) {
        console.error('Scraping failed:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();