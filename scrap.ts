import request from 'request-promise';
import $, * as cheerio from 'cheerio';

request('https://en.wikipedia.org/wiki/List_of_graphic_adventure_games')
  .then(async (html: string) => {
    const games = $('table.wikitable > tbody > tr', html);

    const parsed = games.toArray().slice(400).map(parseGame);
    const images = await Promise.all(parsed.map(parseImage));

    console.log(buildPage(images));
  });

function parseGame(game: cheerio.Element) {
  const cells = $('td', game);
  const attrs = $('a', cells[0]).attr();
  const text = cells.text();
  const parts = text.split('\n');

  if (attrs === undefined) {
    return [parts[0], parts[4], '_'];
  }

  const link = attrs.href;

  return [parts[0], parts[4], link];
}

function parseImage(game: string[]) {
  const host = 'https://en.wikipedia.org';
  const link = game[2];
  const url = link.includes('https://') ? link : host + link;

  return request(url)
    .then(html => {
      const image = $('.infobox-image img', html);
      const attrs = image.attr();

      if (attrs === undefined) {
        return 'in ' + url + ' there is no attrs';
      }

      return attrs.src;
    })
    .catch(() => 'Bad url ' + url);
}

function buildPage(images: string[]) {
  const content = images.map((src) => `<img src="${src}" alt="${src}"></img>`).join('');

  return `
    <html>
      <head>
        <meta charset='UTF-8'>
        <meta name='viewport'
              content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
        <meta http-equiv='X-UA-Compatible' content='ie=edge'>
        <title>Document</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}
