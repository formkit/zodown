#!/usr/bin/env node
// Advanced ASCII Box Builder that properly handles nested boxes
// This tool ensures inner boxes are calculated first, then outer boxes

import fs from 'fs';

class AdvancedASCIIBuilder {
  constructor(mobile = false) {
    this.mobile = mobile;
    this.TOTAL_WIDTH = mobile ? 40 : 74;
    this.INNER_WIDTH = mobile ? 38 : 72; // Total width minus outer borders
  }

  // Strip HTML tags for length calculation
  stripTags(str) {
    return str.replace(/<[^>]+>/g, '');
  }

  // Calculate visual length of a string (without HTML tags)
  visualLength(str) {
    return this.stripTags(str).length;
  }

  // Pad a line to exactly the target width
  padLine(content, targetWidth = this.INNER_WIDTH) {
    const currentLength = this.visualLength(content);
    const padding = targetWidth - currentLength;
    
    if (padding < 0) {
      console.warn(`Line too long by ${-padding} chars: "${this.stripTags(content).substring(0, 50)}..."`);
      return content;
    }
    
    return content + ' '.repeat(padding);
  }

  // Create a content line with borders
  contentLine(content, wrapInBorders = true) {
    const paddedContent = this.padLine(content, this.INNER_WIDTH);
    
    if (wrapInBorders) {
      return `<span class="dim">│</span>${paddedContent}<span class="dim">│</span>`;
    }
    return paddedContent;
  }

  // Create a horizontal divider
  divider(left = '├', right = '┤', fill = '─') {
    return `<span class="dim">${left}${fill.repeat(this.INNER_WIDTH)}${right}</span>`;
  }

  // Create top border
  topBorder() {
    return `<span class="dim">┌${'─'.repeat(this.INNER_WIDTH)}┐</span>`;
  }

  // Create bottom border
  bottomBorder() {
    return `<span class="dim">└${'─'.repeat(this.INNER_WIDTH)}┘</span>`;
  }

  // Create the features table with proper nested alignment
  createFeaturesTable() {
    // The table needs to fit within 72 chars (inner width)
    // We'll use exactly 69 chars for the table, leaving 3 for padding
    const tableLines = [];
    
    // Calculate exact spacing for three equal columns
    // Total table width: 69 (3 padding + 66 for table)
    const colWidth = 21; // Each column gets 21 chars
    
    // Top border of nested table - needs to be exactly 69 chars
    const topLine = `   <span class="dim">┌─────────────────────┬─────────────────────┬─────────────────────┐</span> `;
    
    // Content rows - each cell is exactly 21 chars
    const row1Col1 = ` <span class="success">✓</span> Type Safety      `;
    const row1Col2 = ` <span class="success">✓</span> Zero Config      `;
    const row1Col3 = ` <span class="success">✓</span> Tree-Shakeable   `;
    
    const row2Col1 = `   <span class="dim">Preserved</span>        `;
    const row2Col2 = `   <span class="dim">Required</span>         `;
    const row2Col3 = `   <span class="number">~1.3KB</span> <span class="dim">gzip</span>      `;
    
    const contentRow1 = `   <span class="dim">│</span>${row1Col1}<span class="dim">│</span>${row1Col2}<span class="dim">│</span>${row1Col3}<span class="dim">│</span> `;
    const contentRow2 = `   <span class="dim">│</span>${row2Col1}<span class="dim">│</span>${row2Col2}<span class="dim">│</span>${row2Col3}<span class="dim">│</span> `;
    
    // Bottom border
    const bottomLine = `   <span class="dim">└─────────────────────┴─────────────────────┴─────────────────────┘</span> `;
    
    return [topLine, contentRow1, contentRow2, bottomLine];
  }


  // Build mobile-optimized ASCII art (no borders for more space)
  buildMobileArt() {
    const lines = [];
    
    // Simplified header
    lines.push(`<span class="accent">zodown</span> <span class="dim">v1.0.0</span>`);
    lines.push(`<span class="comment">Write Zod v4, use in v3 libs</span>`);
    lines.push(``);
    lines.push(`<span class="dim">────────────────────────────────────────</span>`);
    
    // Quick Start
    lines.push(`<span class="bright">QUICK START</span>`);
    lines.push(``);
    lines.push(`<span class="dim">$</span> <span class="function">npm</span> install zodown`);
    lines.push(``);
    lines.push(`<span class="keyword">import</span> { z } <span class="keyword">from</span> <span class="string">'zod'</span>`);
    lines.push(`<span class="keyword">import</span> { zodown } <span class="keyword">from</span> <span class="string">'zodown'</span>`);
    lines.push(``);
    lines.push(`<span class="keyword">const</span> Schema = z.object({`);
    lines.push(`  id: z.string().uuid(),`);
    lines.push(`  email: z.string().email()`);
    lines.push(`})`);
    lines.push(``);
    lines.push(`<span class="comment">// Convert for v3 libraries</span>`);
    lines.push(`<span class="keyword">const</span> v3 = <span class="function">zodown</span>(Schema)`);
    lines.push(``);
    lines.push(`<span class="dim">────────────────────────────────────────</span>`);
    
    // Features (simplified)
    lines.push(`<span class="bright">KEY FEATURES</span>`);
    lines.push(``);
    lines.push(`<span class="success">✓</span> Type Safety Preserved`);
    lines.push(`<span class="success">✓</span> Zero Config Required`);
    lines.push(`<span class="success">✓</span> Tree-Shakeable (~1.3KB)`);
    lines.push(`<span class="success">✓</span> All Validations Work`);
    lines.push(`<span class="success">✓</span> Handles Circular Refs`);
    lines.push(``);
    lines.push(`<span class="dim">────────────────────────────────────────</span>`);
    
    // MCP Example (simplified)
    lines.push(`<span class="bright">MCP EXAMPLE</span>`);
    lines.push(``);
    lines.push(`<span class="comment">// Zod v4 schema</span>`);
    lines.push(`<span class="keyword">const</span> Args = z.object({`);
    lines.push(`  query: z.string().min(1),`);
    lines.push(`  limit: z.number().max(100)`);
    lines.push(`})`);
    lines.push(``);
    lines.push(`<span class="comment">// MCP needs v3</span>`);
    lines.push(`server.addTool({`);
    lines.push(`  inputSchema: <span class="function">zodown</span>(Args)`);
    lines.push(`})`);
    lines.push(``);
    lines.push(`<span class="dim">────────────────────────────────────────</span>`);
    
    // Footer
    lines.push(``);
    lines.push(`<a href="https://github.com/justinschroeder/zodown"><span class="accent">[GitHub]</span></a> <a href="https://npmjs.com/package/zodown"><span class="accent">[NPM]</span></a>`);
    lines.push(``);
    lines.push(`<span class="dim">Made with ♥ by the</span> <a href="https://formkit.com"><span class="accent">FormKit team</span></a>`);
    
    return lines.join('\n');
  }

  // Build the complete ASCII art
  buildCompleteArt() {
    const lines = [];
    
    // Header
    lines.push(this.topBorder());
    lines.push(this.contentLine(`  <span class="accent">zodown</span> <span class="dim">v1.0.0</span>                                                      `));
    lines.push(this.divider());
    lines.push(this.contentLine(''));
    
    // Logo
    lines.push(this.contentLine(`  <span class="accent">███████╗ ██████╗ ██████╗  ██████╗ ██╗    ██╗███╗   ██╗</span>             `));
    lines.push(this.contentLine(`  <span class="accent">╚══███╔╝██╔═══██╗██╔══██╗██╔═══██╗██║    ██║████╗  ██║</span>             `));
    lines.push(this.contentLine(`  <span class="accent">  ███╔╝ ██║   ██║██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║</span>             `));
    lines.push(this.contentLine(`  <span class="accent"> ███╔╝  ██║   ██║██║  ██║██║   ██║██║███╗██║██║╚██╗██║</span>             `));
    lines.push(this.contentLine(`  <span class="accent">███████╗╚██████╔╝██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║</span>             `));
    lines.push(this.contentLine(`  <span class="accent">╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝</span>             `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`  <span class="comment">// Runtime converter: Write Zod v4, use in v3 libraries</span>             `));
    lines.push(this.contentLine(''));
    lines.push(this.divider());
    
    // Quick Start
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(` <span class="bright">QUICK START</span>                                                           `));
    lines.push(this.contentLine(` <span class="dim">═══════════</span>                                                           `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="dim">$</span> <span class="function">npm</span> install zodown                                               `));
    lines.push(this.contentLine(`   <span class="success">✓</span> <span class="dim">Added 1 package in 0.5s</span>                                         `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="keyword">import</span> { z } <span class="keyword">from</span> <span class="string">'zod'</span>                                         `));
    lines.push(this.contentLine(`   <span class="keyword">import</span> { zodown } <span class="keyword">from</span> <span class="string">'zodown'</span>                                `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="comment">// Write modern Zod v4 schemas</span>                                     `));
    lines.push(this.contentLine(`   <span class="keyword">const</span> <span class="function">UserSchema</span> = z.object({                                     `));
    lines.push(this.contentLine(`     id: z.string().uuid(),                                            `));
    lines.push(this.contentLine(`     email: z.string().email(),                                        `));
    lines.push(this.contentLine(`     age: z.number().int().positive()                                  `));
    lines.push(this.contentLine(`   })                                                                   `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="comment">// Convert to v3 when needed</span>                                      `));
    lines.push(this.contentLine(`   <span class="keyword">const</span> v3Schema = <span class="function">zodown</span>(UserSchema)                              `));
    lines.push(this.contentLine(''));
    lines.push(this.divider());
    
    // Key Features with nested table
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(` <span class="bright">KEY FEATURES</span>                                                          `));
    lines.push(this.contentLine(` <span class="dim">════════════</span>                                                          `));
    lines.push(this.contentLine(''));
    
    // Add the features table
    const featuresTable = this.createFeaturesTable();
    featuresTable.forEach(tableLine => {
      lines.push(this.contentLine(tableLine));
    });
    
    lines.push(this.contentLine(''));
    lines.push(this.divider());
    
    // Why Zodown
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(` <span class="bright">WHY ZODOWN?</span>                                                           `));
    lines.push(this.contentLine(` <span class="dim">═══════════</span>                                                           `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   Many libraries still depend on Zod v3 (like <span class="accent">@modelcontextprotocol</span>)   `));
    lines.push(this.contentLine(`   while you want to use the latest Zod v4 features and improvements.  `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="accent">zodown</span> bridges this gap by converting schemas at runtime:          `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`      <span class="bright">[Zod v4 Schema]</span> ──<span class="function">zodown()</span>──▶ <span class="bright">[Zod v3 Schema]</span>                `));
    lines.push(this.contentLine(''));
    lines.push(this.divider());
    
    // Examples section with practical MCP usage
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(` <span class="bright">EXAMPLE: MCP SERVER WITH ZOD V4</span>                                      `));
    lines.push(this.contentLine(` <span class="dim">════════════════════════════════</span>                                      `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="comment">// Define your tool arguments with Zod v4 features</span>                   `));
    lines.push(this.contentLine(`   <span class="keyword">const</span> QueryArgsSchema = z.object({                                   `));
    lines.push(this.contentLine(`     query: z.string().min(1).describe(<span class="string">'Search query'</span>),                 `));
    lines.push(this.contentLine(`     limit: z.number().int().positive().max(100).default(10),         `));
    lines.push(this.contentLine(`     filters: z.object({                                              `));
    lines.push(this.contentLine(`       category: z.enum([<span class="string">'docs'</span>, <span class="string">'api'</span>, <span class="string">'examples'</span>]).optional(),       `));
    lines.push(this.contentLine(`       dateRange: z.tuple([z.date(), z.date()]).optional()           `));
    lines.push(this.contentLine(`     }).optional()                                                    `));
    lines.push(this.contentLine(`   })                                                                  `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="comment">// Create MCP server (requires Zod v3)</span>                              `));
    lines.push(this.contentLine(`   <span class="keyword">import</span> { Server } <span class="keyword">from</span> <span class="string">'@modelcontextprotocol/sdk/server/index.js'</span>   `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="keyword">const</span> server = <span class="keyword">new</span> Server({                                         `));
    lines.push(this.contentLine(`     name: <span class="string">'search-server'</span>,                                            `));
    lines.push(this.contentLine(`     version: <span class="string">'1.0.0'</span>                                                 `));
    lines.push(this.contentLine(`   })                                                                  `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   server.setRequestHandler(ListToolsRequestSchema, () => ({          `));
    lines.push(this.contentLine(`     tools: [{                                                        `));
    lines.push(this.contentLine(`       name: <span class="string">'search'</span>,                                                `));
    lines.push(this.contentLine(`       description: <span class="string">'Search the knowledge base'</span>,                      `));
    lines.push(this.contentLine(`       inputSchema: <span class="function">zodown</span>(QueryArgsSchema)  <span class="comment">// ← Convert v4 to v3!</span>    `));
    lines.push(this.contentLine(`     }]                                                                `));
    lines.push(this.contentLine(`   }))                                                                 `));
    lines.push(this.contentLine(''));
    lines.push(this.divider());
    
    // Supported Types - reorganized into 5 columns with proper alignment
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(` <span class="bright">SUPPORTED TYPES</span> <span class="dim">(31 total)</span>                                          `));
    lines.push(this.contentLine(` <span class="dim">════════════════════════════</span>                                          `));
    lines.push(this.contentLine(''));
    
    // 5 columns, each type name padded to consistent width (11 chars per column with checkmark)
    lines.push(this.contentLine(`   <span class="success">✓</span> string     <span class="success">✓</span> number     <span class="success">✓</span> boolean    <span class="success">✓</span> date       <span class="success">✓</span> bigint     `));
    lines.push(this.contentLine(`   <span class="success">✓</span> symbol     <span class="success">✓</span> undefined  <span class="success">✓</span> null       <span class="success">✓</span> void       <span class="success">✓</span> any        `));
    lines.push(this.contentLine(`   <span class="success">✓</span> unknown    <span class="success">✓</span> never      <span class="success">✓</span> literal    <span class="success">✓</span> enum       <span class="success">✓</span> nativeEnum `));
    lines.push(this.contentLine(`   <span class="success">✓</span> object     <span class="success">✓</span> array      <span class="success">✓</span> tuple      <span class="success">✓</span> record     <span class="success">✓</span> map        `));
    lines.push(this.contentLine(`   <span class="success">✓</span> set        <span class="success">✓</span> union      <span class="success">✓</span> intersect  <span class="success">✓</span> optional   <span class="success">✓</span> nullable   `));
    lines.push(this.contentLine(`   <span class="success">✓</span> default    <span class="success">✓</span> lazy       <span class="success">✓</span> promise    <span class="success">✓</span> function   <span class="success">✓</span> refine     `));
    lines.push(this.contentLine(`   <span class="success">✓</span> transform  <span class="success">✓</span> preprocess                                            `));
    lines.push(this.contentLine(''));
    lines.push(this.divider());
    
    // API Reference
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(` <span class="bright">API REFERENCE</span>                                                         `));
    lines.push(this.contentLine(` <span class="dim">═════════════</span>                                                         `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="function">zodown</span>(schema: ZodV4Type): ZodV3Type                                 `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   Converts a Zod v4 schema to a Zod v3 schema at runtime.             `));
    lines.push(this.contentLine(`   Returns a v3-compatible schema with all validations preserved.      `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="accent">Parameters:</span>                                                        `));
    lines.push(this.contentLine(`     • <span class="accent">schema</span>: Any Zod v4 schema instance                             `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`   <span class="accent">Returns:</span>                                                           `));
    lines.push(this.contentLine(`     • Equivalent Zod v3 schema with type inference                    `));
    lines.push(this.contentLine(''));
    lines.push(this.divider());
    
    // Footer
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`  <a href="https://github.com/justinschroeder/zodown" target="_blank"><span class="accent">[GitHub]</span></a>  <a href="https://npmjs.com/package/zodown" target="_blank"><span class="accent">[NPM]</span></a>  <span class="accent">[Documentation]</span>                         `));
    lines.push(this.contentLine(''));
    lines.push(this.contentLine(`  <span class="dim">Made with ♥ by the</span> <a href="https://formkit.com" target="_blank"><span class="accent">FormKit team</span></a>                                  `));
    lines.push(this.contentLine(''));
    lines.push(this.bottomBorder());
    
    return lines.join('\n');
  }

  // Verify all lines are exactly 74 chars
  verify(asciiArt) {
    const lines = asciiArt.split('\n');
    let hasErrors = false;
    
    console.log('Verifying ASCII art alignment...\n');
    
    lines.forEach((line, idx) => {
      const visualLen = this.visualLength(line);
      if (visualLen !== this.TOTAL_WIDTH) {
        console.log(`Line ${idx + 1}: ${visualLen} chars (should be ${this.TOTAL_WIDTH})`);
        console.log(`  "${this.stripTags(line).substring(0, 60)}..."`);
        hasErrors = true;
      }
    });
    
    if (!hasErrors) {
      console.log(`✓ All ${lines.length} lines are exactly ${this.TOTAL_WIDTH} characters!`);
    } else {
      console.log('\n✗ Some lines need adjustment');
    }
    
    return !hasErrors;
  }
}

// Build desktop version
const desktopBuilder = new AdvancedASCIIBuilder(false);
const desktopArt = desktopBuilder.buildCompleteArt();

// Build mobile version
const mobileBuilder = new AdvancedASCIIBuilder(true);
const mobileArt = mobileBuilder.buildMobileArt();

// Verify desktop
console.log('Desktop version:');
const desktopValid = desktopBuilder.verify(desktopArt);

// Mobile version doesn't need strict width check since no borders
console.log('\nMobile version: No borders, variable width');
const mobileLines = mobileArt.split('\n');
const mobileValid = true; // Always valid since no fixed width
console.log(`✓ Mobile version has ${mobileLines.length} lines`);

// Update App.vue with both versions if valid
if (desktopValid && mobileValid) {
  const appVuePath = './src/App.vue';
  
  // Create responsive version with both
  const responsiveContent = `<template>
  <div class="ascii-container">
    <pre class="ascii-page desktop" v-html="desktopArt"></pre>
    <pre class="ascii-page mobile" v-html="mobileArt"></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const desktopArt = ref(\`${desktopArt}\`)

const mobileArt = ref(\`${mobileArt}\`)
</script>`;
  
  fs.writeFileSync(appVuePath, responsiveContent);
  console.log('\n✓ Successfully updated App.vue with responsive ASCII art!');
} else {
  console.log('\n✗ ASCII art has alignment issues, not updating App.vue');
}

export default AdvancedASCIIBuilder;