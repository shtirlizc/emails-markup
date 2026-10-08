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

const secondOutputPath = new URL(
  '../emails/dist/dialog-x5-second.html',
  import.meta.url,
);
const secondHtml = await readFile(secondOutputPath, 'utf8');
const secondInlineHtml = secondHtml
  // Preserve MJML's body reset after removing its generated stylesheet.
  .replace(/(<body\b[^>]*style=")/i, '$1margin:0;padding:0;')
  // Keep the desktop MJML/Outlook columns; inline sizing stacks them below 600px.
  // Clients that do not support calc retain the safe, single-column width:100%.
  .replace(
    /(<div\b[^>]*class="[^"]*\bdialog-second-speaker-(two|three)\b[^"]*"[^>]*style="[^"]*?)width:100%/gi,
    (_, prefix, count) =>
      `${prefix}width:100%;width:calc((552px - 100%) * 1000);min-width:${count === 'two' ? '50%' : '33.333333%'};max-width:100%`,
  )
  // MJML emits fixed-width image tables; make these fluid without a media query.
  .replace(
    /(<td\b[^>]*class="[^"]*\bdialog-second-fluid-image\b[^"]*"[^>]*>\s*<table\b[^>]*style=")([^"]*)("[^>]*>[\s\S]*?<td\b[^>]*style=")width:([\d.]+)px/gi,
    (_, prefix, style, inner, width) =>
      `${prefix}${style};width:100%;max-width:${Math.max(264, Number(width))}px${inner}width:100%`,
  )
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/\sclass=(?:"[^"]*"|'[^']*')/gi, '');

if (/<style\b|\sclass=/i.test(secondInlineHtml)) {
  throw new Error(
    'dialog-x5-second.html contains a style block or class attribute',
  );
}

await writeFile(secondOutputPath, secondInlineHtml);
