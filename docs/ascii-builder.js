// ASCII Box Builder Tool
// Helps create properly aligned ASCII art boxes

class ASCIIBoxBuilder {
  constructor(totalWidth = 74) {
    this.totalWidth = totalWidth;
    this.borderChars = {
      topLeft: '┌',
      topRight: '┐',
      bottomLeft: '└',
      bottomRight: '┘',
      horizontal: '─',
      vertical: '│',
      cross: '┼',
      teeDown: '┬',
      teeUp: '┴',
      teeRight: '├',
      teeLeft: '┤'
    };
  }

  // Calculate actual character length (for debugging)
  getVisualLength(text) {
    // Strip HTML tags if present
    const stripped = text.replace(/<[^>]+>/g, '');
    return stripped.length;
  }

  // Create a horizontal line
  horizontalLine(left, right, fill = '─') {
    const innerWidth = this.totalWidth - 2; // Account for left and right chars
    return left + fill.repeat(innerWidth) + right;
  }

  // Create a content line with proper padding
  contentLine(content, leftBorder = '│', rightBorder = '│') {
    const visualLength = this.getVisualLength(content);
    const innerWidth = this.totalWidth - 2; // Account for borders
    const contentLength = visualLength;
    const paddingNeeded = innerWidth - contentLength;
    
    if (paddingNeeded < 0) {
      console.warn(`Content too long: "${content}" is ${contentLength} chars, max is ${innerWidth}`);
      return leftBorder + content.substring(0, innerWidth) + rightBorder;
    }
    
    return leftBorder + content + ' '.repeat(paddingNeeded) + rightBorder;
  }

  // Create a box with multiple lines
  createBox(lines, options = {}) {
    const {
      title = '',
      align = 'left',
      padding = 1,
      border = true
    } = options;

    const result = [];
    
    if (border) {
      // Top border
      result.push(this.horizontalLine('┌', '┐'));
      
      // Title line if provided
      if (title) {
        result.push(this.contentLine(` ${title} `));
        result.push(this.horizontalLine('├', '┤'));
      }
      
      // Padding top
      for (let i = 0; i < padding; i++) {
        result.push(this.contentLine(''));
      }
      
      // Content lines
      lines.forEach(line => {
        const paddedLine = ' '.repeat(padding) + line;
        result.push(this.contentLine(paddedLine));
      });
      
      // Padding bottom
      for (let i = 0; i < padding; i++) {
        result.push(this.contentLine(''));
      }
      
      // Bottom border
      result.push(this.horizontalLine('└', '┘'));
    } else {
      lines.forEach(line => result.push(line));
    }
    
    return result;
  }

  // Create multiple columns
  createColumns(columns, options = {}) {
    const { 
      columnWidths = [],
      padding = 1,
      borders = true 
    } = options;

    // Calculate column widths if not provided
    const numColumns = columns.length;
    let widths = columnWidths;
    
    if (widths.length === 0) {
      // Equal width columns
      const availableWidth = this.totalWidth - 2 - (numColumns - 1); // Account for outer borders and separators
      const columnWidth = Math.floor(availableWidth / numColumns);
      widths = Array(numColumns).fill(columnWidth);
      // Add remaining space to last column
      widths[widths.length - 1] += availableWidth - (columnWidth * numColumns);
    }

    // Find max rows
    const maxRows = Math.max(...columns.map(col => col.length));
    
    const result = [];
    
    if (borders) {
      // Top border
      let topBorder = '┌';
      widths.forEach((width, i) => {
        topBorder += '─'.repeat(width);
        if (i < widths.length - 1) {
          topBorder += '┬';
        }
      });
      topBorder += '┐';
      result.push(topBorder);
    }

    // Content rows
    for (let row = 0; row < maxRows; row++) {
      let line = '│';
      
      columns.forEach((column, colIndex) => {
        const content = column[row] || '';
        const width = widths[colIndex];
        const visualLength = this.getVisualLength(content);
        const padding = width - visualLength;
        
        line += content + ' '.repeat(Math.max(0, padding));
        
        if (colIndex < columns.length - 1) {
          line += '│';
        }
      });
      
      line += '│';
      result.push(line);
    }

    if (borders) {
      // Bottom border
      let bottomBorder = '└';
      widths.forEach((width, i) => {
        bottomBorder += '─'.repeat(width);
        if (i < widths.length - 1) {
          bottomBorder += '┴';
        }
      });
      bottomBorder += '┘';
      result.push(bottomBorder);
    }

    return result;
  }

  // Test function
  test() {
    console.log('Testing ASCII Box Builder\n');
    
    // Test simple box
    const box1 = this.createBox(['Hello World', 'This is a test'], { title: 'TEST BOX' });
    box1.forEach(line => {
      console.log(`[${this.getVisualLength(line)}] ${line}`);
    });
    
    console.log('\n');
    
    // Test columns
    const col1 = [' ✓ Type Safety', '   Preserved'];
    const col2 = [' ✓ Zero Config', '   Required'];
    const col3 = [' ✓ Tree-Shakeable', '   ~1.3KB gzip'];
    
    const columns = this.createColumns([col1, col2, col3], { 
      columnWidths: [19, 19, 19] 
    });
    
    columns.forEach(line => {
      console.log(`[${this.getVisualLength(line)}] ${line}`);
    });
  }
}

// Test the builder
const builder = new ASCIIBoxBuilder(74);

// Build the features table
console.log('\n=== FEATURES TABLE ===\n');
const featuresTable = builder.createColumns([
  [' ✓ Type Safety', '   Preserved'],
  [' ✓ Zero Config', '   Required'],
  [' ✓ Tree-Shakeable', '   ~1.3KB gzip']
], { columnWidths: [19, 19, 19] });

featuresTable.forEach(line => {
  const padded = builder.contentLine('   ' + line + '      ');
  console.log(`[${builder.getVisualLength(padded)}] ${padded}`);
});

// Build the code examples
console.log('\n=== CODE EXAMPLES ===\n');

const example1 = [
  ' const Password = z',
  '   .string()',
  '   .min(8)',
  '   .regex(/[A-Z]/)',
  '   .refine(custom)',
  '',
  ' const v3 =',
  '   zodown(Password)',
  '',
  ' ✓ All refinements',
  '   preserved!'
];

const example2 = [
  ' const DateStr = z',
  '   .string()',
  '   .transform(s =>',
  '     new Date(s))',
  '',
  ' const v3 =',
  '   zodown(DateStr)',
  '',
  ' ✓ Transforms work!'
];

const example3 = [
  ' const Node = z.lazy',
  '   (() => z.object({',
  '     value:',
  '       z.string(),',
  '     children:',
  '       z.array(Node)',
  '   }))',
  '',
  ' const v3 =',
  '   zodown(Node)',
  '',
  ' ✓ Handles circular!'
];

// Create individual boxes first
const box1 = builder.createColumns([example1], { columnWidths: [22], borders: true });
const box2 = builder.createColumns([example2], { columnWidths: [21], borders: true });
const box3 = builder.createColumns([example3], { columnWidths: [19], borders: true });

console.log('Box 1:');
box1.forEach(line => console.log(`[${builder.getVisualLength(line)}] ${line}`));

console.log('\nBox 2:');
box2.forEach(line => console.log(`[${builder.getVisualLength(line)}] ${line}`));

console.log('\nBox 3:');
box3.forEach(line => console.log(`[${builder.getVisualLength(line)}] ${line}`));

export default ASCIIBoxBuilder;