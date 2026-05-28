# Email templates

When working on email templates:
- Use MJML as the source format.
- Compile MJML into final HTML.
- Do not implement emails as normal web pages.
- Avoid CSS Grid, JavaScript, complex Flexbox, absolute positioning, external CSS files.
- Prefer standard MJML components.
- If the Figma design contains unsafe email patterns, simplify them and explain the tradeoff.
- Final HTML must be generated and checked before completion.

## File structure

- Source MJML: emails/main.mjml
- Compiled HTML: emails/dist/main.html
- Assets: emails/assets

## Build commands

- Build email HTML: npm run email:build
- Watch email changes: npm run email:watch

## Email compatibility checklist

Before finishing:
- HTML was generated from MJML without errors.
- No JavaScript.
- No CSS Grid.
- No external CSS files.
- No complex Flexbox for layout.
- Images have alt attributes.
- Links have href attributes or clear TODO placeholders.
- Main desktop container is around 600px unless the Figma design clearly requires another width.
- Mobile layout stacks into one column.
- No horizontal scroll on mobile.
- Any unsafe Figma effects were simplified and mentioned in the final report.