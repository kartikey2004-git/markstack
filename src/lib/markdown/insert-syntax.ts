export interface MarkdownSyntax {
  type: string;
  prefix: string;
  suffix?: string;
  placeholder?: string;
}

export const markdownSyntaxes: Record<string, MarkdownSyntax> = {
  h1: { type: 'heading', prefix: '# ', placeholder: 'Heading 1' },
  h2: { type: 'heading', prefix: '## ', placeholder: 'Heading 2' },
  h3: { type: 'heading', prefix: '### ', placeholder: 'Heading 3' },
  bold: { type: 'wrap', prefix: '**', suffix: '**', placeholder: 'Bold text' },
  italic: { type: 'wrap', prefix: '*', suffix: '*', placeholder: 'Italic text' },
  inlineCode: { type: 'wrap', prefix: '`', suffix: '`', placeholder: 'code' },
  bulletList: { type: 'line', prefix: '- ', placeholder: 'List item' },
  numberedList: { type: 'line', prefix: '1. ', placeholder: 'List item' },
  blockquote: { type: 'line', prefix: '> ', placeholder: 'Quote' },
  codeBlock: { type: 'block', prefix: '```\n', suffix: '\n```', placeholder: '// code here' },
  divider: { type: 'line', prefix: '---' },
  image: { type: 'line', prefix: '![', suffix: '](url)', placeholder: 'Alt text' },
  link: { type: 'wrap', prefix: '[', suffix: '](url)', placeholder: 'Link text' },
};

export function insertMarkdownSyntax(
  text: string,
  selection: { start: number; end: number },
  syntax: MarkdownSyntax
): { text: string; selection: { start: number; end: number } } {
  const { start, end } = selection;
  const selectedText = text.slice(start, end) || syntax.placeholder || '';

  let newText: string;
  let newSelection: { start: number; end: number };

  switch (syntax.type) {
    case 'line':
      newText = text.slice(0, start) + syntax.prefix + selectedText + '\n' + text.slice(end);
      newSelection = {
        start: start + syntax.prefix.length,
        end: start + syntax.prefix.length + selectedText.length,
      };
      break;

    case 'wrap':
      newText = text.slice(0, start) + syntax.prefix + selectedText + (syntax.suffix || '') + text.slice(end);
      newSelection = {
        start: start + syntax.prefix.length,
        end: start + syntax.prefix.length + selectedText.length,
      };
      break;

    case 'block':
      newText = text.slice(0, start) + syntax.prefix + selectedText + (syntax.suffix || '') + text.slice(end);
      newSelection = {
        start: start + syntax.prefix.length,
        end: start + syntax.prefix.length + selectedText.length,
      };
      break;

    default:
      newText = text;
      newSelection = selection;
  }

  return { text: newText, selection: newSelection };
}
