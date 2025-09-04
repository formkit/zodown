// Test script to verify ASCII art line lengths
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

// Remove HTML tags for length counting
function stripTags(line) {
  return line.replace(/<[^>]+>/g, '');
}

// Split into lines and check each
const lines = asciiArt.split('\n');
const lineLengths = [];

console.log('Checking ASCII art line lengths...\n');

lines.forEach((line, index) => {
  const stripped = stripTags(line);
  const length = stripped.length;
  lineLengths.push({ line: stripped, length, index: index + 1 });
  
  if (length !== 0 && length !== 74) { // 74 is our target width
    console.log(`Line ${index + 1}: ${length} chars (should be 74)`);
    console.log(`  "${stripped}"`);
    console.log();
  }
});

// Find the most common length (should be 74)
const lengthCounts = {};
lineLengths.forEach(({ length }) => {
  if (length > 0) {
    lengthCounts[length] = (lengthCounts[length] || 0) + 1;
  }
});

const sortedLengths = Object.entries(lengthCounts)
  .sort((a, b) => b[1] - a[1]);

console.log('\nLength distribution:');
sortedLengths.forEach(([length, count]) => {
  console.log(`  ${length} chars: ${count} lines`);
});

console.log('\nTarget width should be 74 characters');