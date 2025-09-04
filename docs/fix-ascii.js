// Script to fix ASCII art line lengths to exactly 74 characters
import fs from 'fs';

// Read the App.vue file
const content = fs.readFileSync('./src/App.vue', 'utf8');

// Extract the ASCII art between backticks
const match = content.match(/const asciiArt = ref\(`([^`]+)`\)/);
if (!match) {
  console.error('Could not find ASCII art in App.vue');
  process.exit(1);
}

const asciiArt = match[1];

// Function to strip HTML tags for length counting
function stripTags(line) {
  return line.replace(/<[^>]+>/g, '');
}

// Function to fix a line to exactly 74 characters
function fixLine(line) {
  const stripped = stripTags(line);
  
  // Skip empty lines
  if (stripped.length === 0) return line;
  
  // If it's a border line (starts and ends with box chars), leave it
  if (stripped.startsWith('┌') || stripped.startsWith('├') || stripped.startsWith('└')) {
    return line; // These are already 74
  }
  
  // For content lines, we need to adjust the spacing
  if (stripped.startsWith('│') && stripped.endsWith('│')) {
    const currentLength = stripped.length;
    const targetLength = 74;
    const diff = targetLength - currentLength;
    
    if (diff === 0) return line; // Already perfect
    
    // Find the last closing tag before the final │
    const lastPipeIndex = line.lastIndexOf('│');
    
    if (diff > 0) {
      // Need to add spaces
      const spaces = ' '.repeat(diff);
      return line.substring(0, lastPipeIndex) + spaces + line.substring(lastPipeIndex);
    } else {
      // Need to remove spaces (this shouldn't happen much)
      // Find spaces before the last │ and remove them
      const beforePipe = line.substring(0, lastPipeIndex);
      const spacesMatch = beforePipe.match(/(\s+)$/);
      if (spacesMatch) {
        const numSpacesToRemove = Math.min(-diff, spacesMatch[1].length);
        const newSpaces = spacesMatch[1].substring(numSpacesToRemove);
        return beforePipe.substring(0, beforePipe.length - spacesMatch[1].length) + newSpaces + line.substring(lastPipeIndex);
      }
    }
  }
  
  return line;
}

// Split into lines, fix each, and rejoin
const lines = asciiArt.split('\n');
const fixedLines = lines.map(fixLine);
const fixedAsciiArt = fixedLines.join('\n');

// Replace in the original content
const newContent = content.replace(
  /const asciiArt = ref\(`[^`]+`\)/,
  `const asciiArt = ref(\`${fixedAsciiArt}\`)`
);

// Write back to file
fs.writeFileSync('./src/App.vue', newContent);

console.log('Fixed ASCII art line lengths!');

// Verify the fix
const verifyLines = fixedAsciiArt.split('\n');
let allGood = true;
verifyLines.forEach((line, index) => {
  const stripped = stripTags(line);
  if (stripped.length > 0 && stripped.length !== 74) {
    console.log(`Line ${index + 1}: ${stripped.length} chars (should be 74)`);
    allGood = false;
  }
});

if (allGood) {
  console.log('✓ All lines are now exactly 74 characters!');
}