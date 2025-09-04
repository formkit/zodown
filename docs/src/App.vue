<template>
  <div class="ascii-container">
    <pre class="ascii-page desktop" v-html="desktopArt"></pre>
    <pre class="ascii-page mobile" v-html="mobileArt"></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const desktopArt = ref(`<span class="dim">┌────────────────────────────────────────────────────────────────────────┐</span>
<span class="dim">│</span>  <span class="accent">zodown</span> <span class="dim">v1.0.0</span>                                                         <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">███████╗ ██████╗ ██████╗  ██████╗ ██╗    ██╗███╗   ██╗</span>                <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">╚══███╔╝██╔═══██╗██╔══██╗██╔═══██╗██║    ██║████╗  ██║</span>                <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">  ███╔╝ ██║   ██║██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║</span>                <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent"> ███╔╝  ██║   ██║██║  ██║██║   ██║██║███╗██║██║╚██╗██║</span>                <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">███████╗╚██████╔╝██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║</span>                <span class="dim">│</span>
<span class="dim">│</span>  <span class="accent">╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝</span>                <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <span class="comment">// Runtime converter: Write Zod v4, use in v3 libraries</span>               <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">QUICK START</span>                                                            <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">═══════════</span>                                                            <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">$</span> <span class="function">npm</span> install zodown                                                 <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> <span class="dim">Added 1 package in 0.5s</span>                                            <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">import</span> { z } <span class="keyword">from</span> <span class="string">'zod'</span>                                              <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">import</span> { zodown } <span class="keyword">from</span> <span class="string">'zodown'</span>                                      <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="comment">// Write modern Zod v4 schemas</span>                                       <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">const</span> <span class="function">UserSchema</span> = z.object({                                        <span class="dim">│</span>
<span class="dim">│</span>     id: z.string().uuid(),                                             <span class="dim">│</span>
<span class="dim">│</span>     email: z.string().email(),                                         <span class="dim">│</span>
<span class="dim">│</span>     age: z.number().int().positive()                                   <span class="dim">│</span>
<span class="dim">│</span>   })                                                                   <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="comment">// Convert to v3 when needed</span>                                         <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">const</span> v3Schema = <span class="function">zodown</span>(UserSchema)                                  <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">KEY FEATURES</span>                                                           <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">════════════</span>                                                           <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">┌─────────────────────┬─────────────────────┬─────────────────────┐</span>  <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">│</span> <span class="success">✓</span> Type Safety      <span class="dim">│</span> <span class="success">✓</span> Zero Config      <span class="dim">│</span> <span class="success">✓</span> Tree-Shakeable   <span class="dim">│</span>     <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">│</span>   <span class="dim">Preserved</span>        <span class="dim">│</span>   <span class="dim">Required</span>         <span class="dim">│</span>   <span class="number">~1.3KB</span> <span class="dim">gzip</span>      <span class="dim">│</span>     <span class="dim">│</span>
<span class="dim">│</span>   <span class="dim">└─────────────────────┴─────────────────────┴─────────────────────┘</span>  <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">WHY ZODOWN?</span>                                                            <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">═══════════</span>                                                            <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   Many libraries still depend on Zod v3 (like <span class="accent">@modelcontextprotocol</span>)   <span class="dim">│</span>
<span class="dim">│</span>   while you want to use the latest Zod v4 features and improvements.   <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="accent">zodown</span> bridges this gap by converting schemas at runtime:            <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>      <span class="bright">[Zod v4 Schema]</span> ──<span class="function">zodown()</span>──▶ <span class="bright">[Zod v3 Schema]</span>                     <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">EXAMPLE: MCP SERVER WITH ZOD V4</span>                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">════════════════════════════════</span>                                       <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="comment">// Define your tool arguments with Zod v4 features</span>                   <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">const</span> QueryArgsSchema = z.object({                                   <span class="dim">│</span>
<span class="dim">│</span>     query: z.string().min(1).describe(<span class="string">'Search query'</span>),                 <span class="dim">│</span>
<span class="dim">│</span>     limit: z.number().int().positive().max(100).default(10),           <span class="dim">│</span>
<span class="dim">│</span>     filters: z.object({                                                <span class="dim">│</span>
<span class="dim">│</span>       category: z.enum([<span class="string">'docs'</span>, <span class="string">'api'</span>, <span class="string">'examples'</span>]).optional(),        <span class="dim">│</span>
<span class="dim">│</span>       dateRange: z.tuple([z.date(), z.date()]).optional()              <span class="dim">│</span>
<span class="dim">│</span>     }).optional()                                                      <span class="dim">│</span>
<span class="dim">│</span>   })                                                                   <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="comment">// Create MCP server (requires Zod v3)</span>                               <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">import</span> { Server } <span class="keyword">from</span> <span class="string">'@modelcontextprotocol/sdk/server/index.js'</span>   <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="keyword">const</span> server = <span class="keyword">new</span> Server({                                          <span class="dim">│</span>
<span class="dim">│</span>     name: <span class="string">'search-server'</span>,                                             <span class="dim">│</span>
<span class="dim">│</span>     version: <span class="string">'1.0.0'</span>                                                   <span class="dim">│</span>
<span class="dim">│</span>   })                                                                   <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   server.setRequestHandler(ListToolsRequestSchema, () => ({            <span class="dim">│</span>
<span class="dim">│</span>     tools: [{                                                          <span class="dim">│</span>
<span class="dim">│</span>       name: <span class="string">'search'</span>,                                                  <span class="dim">│</span>
<span class="dim">│</span>       description: <span class="string">'Search the knowledge base'</span>,                        <span class="dim">│</span>
<span class="dim">│</span>       inputSchema: <span class="function">zodown</span>(QueryArgsSchema)  <span class="comment">// ← Convert v4 to v3!</span>     <span class="dim">│</span>
<span class="dim">│</span>     }]                                                                 <span class="dim">│</span>
<span class="dim">│</span>   }))                                                                  <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">SUPPORTED TYPES</span> <span class="dim">(31 total)</span>                                             <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">════════════════════════════</span>                                           <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> string     <span class="success">✓</span> number     <span class="success">✓</span> boolean    <span class="success">✓</span> date       <span class="success">✓</span> bigint         <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> symbol     <span class="success">✓</span> undefined  <span class="success">✓</span> null       <span class="success">✓</span> void       <span class="success">✓</span> any            <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> unknown    <span class="success">✓</span> never      <span class="success">✓</span> literal    <span class="success">✓</span> enum       <span class="success">✓</span> nativeEnum     <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> object     <span class="success">✓</span> array      <span class="success">✓</span> tuple      <span class="success">✓</span> record     <span class="success">✓</span> map            <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> set        <span class="success">✓</span> union      <span class="success">✓</span> intersect  <span class="success">✓</span> optional   <span class="success">✓</span> nullable       <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> default    <span class="success">✓</span> lazy       <span class="success">✓</span> promise    <span class="success">✓</span> function   <span class="success">✓</span> refine         <span class="dim">│</span>
<span class="dim">│</span>   <span class="success">✓</span> transform  <span class="success">✓</span> preprocess                                            <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span> <span class="bright">API REFERENCE</span>                                                          <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">═════════════</span>                                                          <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="function">zodown</span>(schema: ZodV4Type): ZodV3Type                                 <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   Converts a Zod v4 schema to a Zod v3 schema at runtime.              <span class="dim">│</span>
<span class="dim">│</span>   Returns a v3-compatible schema with all validations preserved.       <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="accent">Parameters:</span>                                                          <span class="dim">│</span>
<span class="dim">│</span>     • <span class="accent">schema</span>: Any Zod v4 schema instance                               <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>   <span class="accent">Returns:</span>                                                             <span class="dim">│</span>
<span class="dim">│</span>     • Equivalent Zod v3 schema with type inference                     <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">├────────────────────────────────────────────────────────────────────────┤</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <a href="https://github.com/justinschroeder/zodown" target="_blank"><span class="accent">[GitHub]</span></a>  <a href="https://npmjs.com/package/zodown" target="_blank"><span class="accent">[NPM]</span></a>  <span class="accent">[Documentation]</span>                                      <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">Made with ♥ by the</span> <a href="https://formkit.com" target="_blank"><span class="accent">FormKit team</span></a>                                       <span class="dim">│</span>
<span class="dim">│</span>                                                                        <span class="dim">│</span>
<span class="dim">└────────────────────────────────────────────────────────────────────────┘</span>`)

const mobileArt = ref(`<span class="accent">zodown</span> <span class="dim">v1.0.0</span>
<span class="comment">Write Zod v4, use in v3 libs</span>

<span class="dim">────────────────────────────────────────</span>
<span class="bright">QUICK START</span>

<span class="dim">$</span> <span class="function">npm</span> install zodown

<span class="keyword">import</span> { z } <span class="keyword">from</span> <span class="string">'zod'</span>
<span class="keyword">import</span> { zodown } <span class="keyword">from</span> <span class="string">'zodown'</span>

<span class="keyword">const</span> Schema = z.object({
  id: z.string().uuid(),
  email: z.string().email()
})

<span class="comment">// Convert for v3 libraries</span>
<span class="keyword">const</span> v3 = <span class="function">zodown</span>(Schema)

<span class="dim">────────────────────────────────────────</span>
<span class="bright">KEY FEATURES</span>

<span class="success">✓</span> Type Safety Preserved
<span class="success">✓</span> Zero Config Required
<span class="success">✓</span> Tree-Shakeable (~1.3KB)
<span class="success">✓</span> All Validations Work
<span class="success">✓</span> Handles Circular Refs

<span class="dim">────────────────────────────────────────</span>
<span class="bright">MCP EXAMPLE</span>

<span class="comment">// Zod v4 schema</span>
<span class="keyword">const</span> Args = z.object({
  query: z.string().min(1),
  limit: z.number().max(100)
})

<span class="comment">// MCP needs v3</span>
server.addTool({
  inputSchema: <span class="function">zodown</span>(Args)
})

<span class="dim">────────────────────────────────────────</span>

<a href="https://github.com/justinschroeder/zodown"><span class="accent">[GitHub]</span></a> <a href="https://npmjs.com/package/zodown"><span class="accent">[NPM]</span></a>

<span class="dim">Made with ♥ by the</span> <a href="https://formkit.com"><span class="accent">FormKit team</span></a>`)
</script>