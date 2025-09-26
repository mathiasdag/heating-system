/**
 * Extract plain text from Payload CMS Lexical rich text data
 * Recursively traverses the rich text tree and extracts all text content
 *
 * @param data - Lexical rich text data from Payload CMS
 * @returns Plain text string with all formatting removed
 */
export function extractPlainText(data: any): string {
  if (!data || !data.root || !data.root.children) return '';

  const extractText = (nodes: any[]): string => {
    return nodes
      .map(node => {
        if (node.type === 'text') {
          return node.text || '';
        }
        if (node.children) {
          return extractText(node.children);
        }
        return '';
      })
      .join('');
  };

  return extractText(data.root.children);
}

/**
 * Check if rich text data is empty or contains no text
 *
 * @param data - Lexical rich text data from Payload CMS
 * @returns True if the rich text is empty or contains no text
 */
export function isRichTextEmpty(data: any): boolean {
  return extractPlainText(data).trim() === '';
}
