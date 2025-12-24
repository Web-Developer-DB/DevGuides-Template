import { describe, expect, test } from 'vitest'
import { escapeHtml, highlightCode, markdownToHtml, normalizeLanguage } from './markdown'

describe('markdown utils', () => {
  test('escapeHtml schützt Sonderzeichen', () => {
    expect(escapeHtml('<div>"test"&</div>')).toBe('&lt;div&gt;&quot;test&quot;&amp;&lt;/div&gt;')
  })

  test('normalizeLanguage löst Aliase auf', () => {
    expect(normalizeLanguage('sh')).toBe('bash')
    expect(normalizeLanguage('jsx')).toBe('javascript')
    expect(normalizeLanguage('unknown')).toBe('unknown')
    expect(normalizeLanguage()).toBeNull()
  })

  const stripHtml = (html) => html.replace(/<[^>]+>/g, '')

  test('highlightCode liefert sicheren Fallback für unbekannte Sprachen', () => {
    const result = highlightCode('console.log("hi")', 'does-not-exist')
    const normalized = stripHtml(result).replace(/&quot;/g, '"')
    expect(normalized).toContain('console.log("hi")')
  })

  test('markdownToHtml wandelt Überschriften, Listen und Code-Blöcke um', () => {
    const md = [
      '# Titel',
      '',
      'Ein **fetter** Abschnitt mit `inline` Code.',
      '',
      '## Todo',
      '- Item eins',
      '- Item zwei',
      '',
      '```js',
      'const answer = 42',
      '```',
    ].join('\n')

    const html = markdownToHtml(md)

    expect(html).toContain('<h1>Titel</h1>')
    expect(html).toContain('<strong>fetter</strong>')
    expect(html).toContain('<code>inline</code>')
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>Item zwei</li>')
    expect(html).toContain('data-language="JS"')
    expect(stripHtml(html)).toContain('const answer = 42')
  })
})
