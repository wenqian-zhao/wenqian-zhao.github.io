# Add a writing

1. Copy `content/writings/_template.md` and rename it with a lowercase, kebab-case filename, such as `my-new-note.md`.
2. Fill in the four front-matter fields and write the article underneath in Markdown.
3. Set `draft: false` when the article is ready.
4. Run `npm run publish:prepare`. This rebuilds the writing index, reader pages, tests, and GitHub Pages files.
5. Commit and push the changes to `main`.

For a local preview, run `npm run dev`.

Supported Markdown includes headings, paragraphs, bold and italic text, links, blockquotes, ordered and unordered lists, horizontal rules, inline code, and fenced code blocks. Raw HTML is intentionally displayed as text.

The filename becomes the public URL:

`content/writings/my-new-note.md` → `/writing/my-new-note/`
