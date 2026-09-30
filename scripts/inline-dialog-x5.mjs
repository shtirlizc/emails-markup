import { readFile, writeFile } from 'node:fs/promises';

const outputPath = new URL('../emails/dist/dialog-x5.html', import.meta.url);
const html = await readFile(outputPath, 'utf8');

const inlineHtml = html
  // The two columns wrap when their combined minimum width exceeds the row.
  .replace(
    /(<div\b[^>]*class="[^"]*\bmj-column-per-50\b[^"]*"[^>]*style="[^"]*?)width:100%/gi,
    '$1width:50%;min-width:175px;max-width:100%',
  )
  // MJML normally uses a class to make the hero image fluid on mobile.
  .replace('style="width:534px"', 'style="width:100%;max-width:534px"')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/\sclass=(?:"[^"]*"|'[^']*')/gi, '');

if (/<style\b|\sclass=/i.test(inlineHtml)) {
  throw new Error('dialog-x5.html contains a style block or class attribute');
}

await writeFile(outputPath, inlineHtml);
