import hljs from 'highlight.js/lib/common'

const languageAlias = {
  sh: 'bash',
  shell: 'bash',
  jsx: 'javascript',
  tsx: 'typescript',
  js: 'javascript',
}

export const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const normalizeLanguage = (lang) => {
  if (!lang) {
    return null
  }
  return languageAlias[lang] || lang
}

export const highlightCode = (code, lang) => {
  const normalized = normalizeLanguage(lang)
  if (normalized && hljs.getLanguage(normalized)) {
    try {
      return hljs.highlight(code, { language: normalized }).value
    } catch {
      // ignore and fall back to auto detection
    }
  }

  try {
    return hljs.highlightAuto(code).value
  } catch {
    return escapeHtml(code)
  }
}

const applyInlineFormatting = (value) =>
  value
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')

const renderCodeBlock = (block) => {
  const lang = block.lang || ''
  const langAttribute = lang ? ` data-language="${escapeHtml(lang.toUpperCase())}"` : ''
  const langClass = lang ? ` language-${lang}` : ''
  return `<pre${langAttribute}><code class="hljs${langClass}">${highlightCode(block.lines.join('\n'), lang)}</code></pre>`
}

export const markdownToHtml = (markdown) => {
  const lines = markdown.split(/\r?\n/)
  const parts = []
  let buffer = []
  let listType = null
  let codeBlock = null

  const flushParagraph = () => {
    if (buffer.length) {
      const paragraph = buffer.join(' ')
      parts.push(`<p>${applyInlineFormatting(escapeHtml(paragraph))}</p>`)
      buffer = []
    }
  }

  const flushList = () => {
    if (listType) {
      parts.push(`</${listType}>`)
      listType = null
    }
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd()

    if (line.startsWith('```')) {
      const lang = line
        .slice(3)
        .trim()
        .toLowerCase()
      if (codeBlock) {
        parts.push(renderCodeBlock(codeBlock))
        codeBlock = null
      } else {
        flushParagraph()
        flushList()
        codeBlock = { lang, lines: [] }
      }
      return
    }

    if (codeBlock) {
      codeBlock.lines.push(rawLine)
      return
    }

    if (!line.trim()) {
      flushParagraph()
      flushList()
      return
    }

    if (line.startsWith('# ')) {
      flushParagraph()
      flushList()
      parts.push(`<h1>${applyInlineFormatting(escapeHtml(line.slice(2).trim()))}</h1>`)
      return
    }

    if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      parts.push(`<h2>${applyInlineFormatting(escapeHtml(line.slice(3).trim()))}</h2>`)
      return
    }

    if (line.startsWith('### ')) {
      flushParagraph()
      flushList()
      parts.push(`<h3>${applyInlineFormatting(escapeHtml(line.slice(4).trim()))}</h3>`)
      return
    }

    const ordered = line.match(/^(\d+)\.\s+(.*)$/)
    if (ordered) {
      flushParagraph()
      if (listType && listType !== 'ol') {
        flushList()
      }
      if (!listType) {
        listType = 'ol'
        parts.push('<ol>')
      }
      parts.push(`<li>${applyInlineFormatting(escapeHtml(ordered[2].trim()))}</li>`)
      return
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph()
      if (listType && listType !== 'ul') {
        flushList()
      }
      if (!listType) {
        listType = 'ul'
        parts.push('<ul>')
      }
      parts.push(`<li>${applyInlineFormatting(escapeHtml(line.slice(2).trim()))}</li>`)
      return
    }

    buffer.push(line)
  })

  if (codeBlock) {
    parts.push(renderCodeBlock(codeBlock))
  }

  flushParagraph()
  flushList()

  return parts.join('\n')
}
