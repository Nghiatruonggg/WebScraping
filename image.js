const puppeteer = require("puppeteer");
const download = require("image-downloader");

(async () => {
  const browser = await puppeteer.launch();
  console.log("browser opened");
  const page = await browser.newPage();
  const url =
    "https://nhiepanhdoisong.vn/tp-hcm-mua-noel-lung-linh-qua-ong-kinh-nghe-si-nhiep-anh-kim-cuong-15662.html";
  await page.goto(url);
  console.log("page loaded");

  const imgLinks = await page.evaluate(() => {
    let imgElements = document.querySelectorAll("figure > img");
    imgElements = [...imgElements];
    let imgLinks = imgElements.map((el) => el.getAttribute("src"));
    return imgLinks;
  });

  await Promise.all(
    imgLinks.map((imgUrl) => {
      download.image({
        url: imgUrl,
        dest: `${__dirname}/image-scraping`,
      });
    })
  );

  await browser.close();
})();
