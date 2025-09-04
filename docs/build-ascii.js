// Build properly aligned ASCII art for the documentation
import fs from 'fs';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get version from main package.json
const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../package.json'), 'utf-8')
);
const VERSION = packageJson.version;

// Helper to pad a string to exact length
function pad(str, len) {
  const visualLen = str.replace(/<[^>]+>/g, '').length;
  const needed = len - visualLen;
  if (needed > 0) {
    return str + ' '.repeat(needed);
  }
  return str;
}

// Build the three code example boxes (must fit within 68 chars total)
// 68 chars = 20 + 2 spaces + 20 + 2 spaces + 20 = 64 (plus padding = 68)
const codeBoxes = [
  `  ┌─ Refinements ──┐  ┌─ Transforms ──┐  ┌─ Recursive ───┐  `,
  `│                          │ │                          │ │                          │`,
  `│ const Password = z       │ │ const DateStr = z        │ │ const Node = z.lazy      │`,
  `│   .string()              │ │   .string()              │ │   (() => z.object({      │`,
  `│   .min(8)                │ │   .transform(s =>        │ │     value: z.string(),   │`,
  `│   .regex(/[A-Z]/)        │ │     new Date(s))         │ │     children:            │`,
  `│   .refine(custom)        │ │                          │ │       z.array(Node)      │`,
  `│                          │ │ const v3 =               │ │   }))                    │`,
  `│ const v3 =               │ │   zodown(DateStr)        │ │                          │`,
  `│   zodown(Password)       │ │                          │ │ const v3 = zodown(Node)  │`,
  `│                          │ │ ✓ Transforms work!       │ │                          │`,
  `│ ✓ All refinements        │ │                          │ │ ✓ Handles circular!      │`,
  `│   preserved!             │ │                          │ │                          │`,
  `└──────────────────────────┘ └──────────────────────────┘ └──────────────────────────┘`
];

// Build the features table - need exactly 63 chars for the table
const featuresTable = [
  `┌─────────────────────┬─────────────────────┬─────────────────────┐`,
  `│  ✓ Type Safety      │  ✓ Zero Config      │  ✓ Tree-Shakeable   │`,
  `│    Preserved        │    Required         │    ~1.3KB gzip      │`,
  `└─────────────────────┴─────────────────────┴─────────────────────┘`
];

// Now let's build the complete ASCII art with HTML tags
const fullAsciiArt = `<span class="dim">┌────────────────────────────────────────────────────────────────────────┐</span>
<span class="dim">│</span>  <span class="accent">zodown</span> <span class="dim">v${VERSION}</span>                                          <span class="dim">[</span><span class="error">_</span><span class="dim">]</span> <span class="dim">[</span><span class="warning">□</span><span class="dim">]</span> <span class="dim">[</span><span class="success">X</span><span class="dim">]</span>  <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">███████╗ ██████╗ ██████╗  ██████╗ ██╗    ██╗███╗   ██╗</span>             <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">╚══███╔╝██╔═══██╗██╔══██╗██╔═══██╗██║    ██║████╗  ██║</span>             <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">  ███╔╝ ██║   ██║██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║</span>             <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent"> ███╔╝  ██║   ██║██║  ██║██║   ██║██║███╗██║██║╚██╗██║</span>             <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">███████╗╚██████╔╝██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║</span>             <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝</span>             <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <span class="comment">// Runtime converter: Write Zod v4, use in v3 libraries</span>             <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">QUICK START</span>                                                           <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">═══════════</span>                                                           <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">$</span> <span class="function">npm</span> install zodown                                               <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> <span class="dim">Added 1 package in 0.5s</span>                                         <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">import</span> { z, zodown } <span class="keyword">from</span> <span class="string">'zodown'</span>                             <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="comment">// Write modern Zod v4 schemas</span>                                     <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">const</span> <span class="function">UserSchema</span> = z.object({                                     <span class="dim">│</span>
<span class="dim">│</span>     id: z.string().uuid(),                                            <span class="dim">│</span>
<span class="dim">│</span>     email: z.string().email(),                                        <span class="dim">│</span>
<span class="dim">│</span>     age: z.number().int().positive()                                  <span class="dim">│</span>
<span class="dim">│</span>   })                                                                   <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="comment">// Convert to v3 when needed</span>                                      <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">const</span> v3Schema = <span class="function">zodown</span>(UserSchema)                              <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">KEY FEATURES</span>                                                          <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">════════════</span>                                                          <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">┌─────────────────────┬─────────────────────┬─────────────────────┐</span> <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">│</span>  <span class="success">✓</span> Type Safety      <span class="dim">│</span>  <span class="success">✓</span> Zero Config      <span class="dim">│</span>  <span class="success">✓</span> Tree-Shakeable   <span class="dim">│</span> <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">│</span>    <span class="dim">Preserved</span>        <span class="dim">│</span>    <span class="dim">Required</span>         <span class="dim">│</span>    <span class="number">~1.3KB</span> <span class="dim">gzip</span>      <span class="dim">│</span> <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">└─────────────────────┴─────────────────────┴─────────────────────┘</span> <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">WHY ZODOWN?</span>                                                           <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">═══════════</span>                                                           <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   Many libraries still depend on Zod v3 (like <span class="accent">@modelcontextprotocol</span>)   <span class="dim">│</span>
<span class="dim">│</span>   while you want to use the latest Zod v4 features and improvements.  <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="accent">zodown</span> bridges this gap by converting schemas at runtime:          <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>      <span class="bright">[Zod v4 Schema]</span> ──<span class="function">zodown()</span>──▶ <span class="bright">[Zod v3 Schema]</span>                <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">ADVANCED USAGE</span>                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">══════════════</span>                                                        <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">┌─ Refinements ─┐   ┌─ Transforms ──┐   ┌─ Recursive ───┐</span>          <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span> <span class="keyword">const</span> Pass =  <span class="dim">│</span>   <span class="dim">│</span> <span class="keyword">const</span> Date =  <span class="dim">│</span>   <span class="dim">│</span> <span class="keyword">const</span> Node =  <span class="dim">│</span>          <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span> z.string()    <span class="dim">│</span>   <span class="dim">│</span> z.string()    <span class="dim">│</span>   <span class="dim">│</span> z.lazy(() =>  <span class="dim">│</span>          <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span>  .min(<span class="number">8</span>)      <span class="dim">│</span>   <span class="dim">│</span>  .transform(  <span class="dim">│</span>   <span class="dim">│</span>  z.object({   <span class="dim">│</span>          <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span>  .refine()    <span class="dim">│</span>   <span class="dim">│</span>   Date.parse) <span class="dim">│</span>   <span class="dim">│</span>   val: z.str(),<span class="dim">│</span>          <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span>               <span class="dim">│</span>   <span class="dim">│</span>               <span class="dim">│</span>   <span class="dim">│</span>   ch: z.array(<span class="dim">│</span>          <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span> <span class="success">✓</span> Validated  <span class="dim">│</span>   <span class="dim">│</span> <span class="success">✓</span> Transformed<span class="dim">│</span>   <span class="dim">│</span>    Node)}))<span class="dim">│</span>          <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">└───────────────┘</span>   <span class="dim">└───────────────┘</span>   <span class="dim">└───────────────┘</span>          <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">SUPPORTED TYPES</span> <span class="dim">(31 total)</span>                                          <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">════════════════════════════</span>                                          <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> string   <span class="success">✓</span> number   <span class="success">✓</span> boolean   <span class="success">✓</span> date     <span class="success">✓</span> bigint   <span class="success">✓</span> symbol     <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> undefined <span class="success">✓</span> null     <span class="success">✓</span> void      <span class="success">✓</span> any      <span class="success">✓</span> unknown  <span class="success">✓</span> never     <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> literal  <span class="success">✓</span> enum      <span class="success">✓</span> nativeEnum <span class="success">✓</span> object  <span class="success">✓</span> array    <span class="success">✓</span> tuple     <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> record   <span class="success">✓</span> map       <span class="success">✓</span> set       <span class="success">✓</span> union    <span class="success">✓</span> intersect <span class="success">✓</span> optional <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> nullable <span class="success">✓</span> default   <span class="success">✓</span> lazy      <span class="success">✓</span> promise  <span class="success">✓</span> function <span class="success">✓</span> refine    <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> transform <span class="success">✓</span> preprocess                                            <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">API REFERENCE</span>                                                         <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">═════════════</span>                                                         <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="function">zodown</span>(schema: ZodV4Type): ZodV3Type                                 <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   Converts a Zod v4 schema to a Zod v3 schema at runtime.             <span class="dim">│</span>
<span class="dim">│</span>   Returns a v3-compatible schema with all validations preserved.      <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="accent">Parameters:</span>                                                        <span class="dim">│</span>
<span class="dim">│</span>     • <span class="accent">schema</span>: Any Zod v4 schema instance                             <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="accent">Returns:</span>                                                           <span class="dim">│</span>
<span class="dim">│</span>     • Equivalent Zod v3 schema with type inference                    <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <a href="https://github.com/justinschroeder/zodown" target="_blank"><span class="accent">[GitHub]</span></a>  <a href="https://npmjs.com/package/zodown" target="_blank"><span class="accent">[NPM]</span></a>  <span class="accent">[Documentation]</span>                         <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">Made with ♥ for the TypeScript community</span>                            <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">└────────────────────────────────────────────────────────────────────────┘</span>`;

// Verify all lines
const lines = fullAsciiArt.split('\n');
console.log(`Total lines: ${lines.length}\n`);

let hasErrors = false;
lines.forEach((line, i) => {
  const stripped = line.replace(/<[^>]+>/g, '');
  if (stripped.length !== 74) {
    console.log(`Line ${i+1}: ${stripped.length} chars (should be 74)`);
    console.log(`  "${stripped}"`);
    hasErrors = true;
  }
});

if (!hasErrors) {
  console.log('✓ All lines are exactly 74 characters!');
  
  // Update App.vue
  const appVue = fs.readFileSync('./src/App.vue', 'utf8');
  const newAppVue = appVue.replace(
    /const asciiArt = ref\(`[^`]+`\)/,
    `const asciiArt = ref(\`${fullAsciiArt}\`)`
  );
  
  fs.writeFileSync('./src/App.vue', newAppVue);
  console.log('\n✓ Updated App.vue with properly aligned ASCII art');
} else {
  console.log('\n✗ Some lines need fixing');
}