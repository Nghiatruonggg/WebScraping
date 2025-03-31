const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://kenh14.vn/", { waitUntil: "networkidle2" });

  const articles = await page.evaluate(() => {
    let titleLinks = document.querySelectorAll("h3.klwfnl-title > a");
    titleLinks = [...titleLinks];
    let articles = titleLinks.map((link) => ({
      title: link.getAttribute("title"),
      url: link.getAttribute("href"),
    }));
    return articles;
  });

  console.log(articles);
  await browser.close();
})();
