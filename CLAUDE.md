# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building
```bash
npm run build
```
Compiles TypeScript to JavaScript in the `build/` directory.

### Development Server
```bash
npm start
```
Runs the application using nodemon with hot reload. Watches `src/` directory for `.ts` and `.js` files.

### Publishing
```bash
npm run release
```
Builds the project and publishes to npm.

## Architecture Overview

### Core Structure

The project is a TypeScript-based LLM querying library that provides both programmatic API and Express server endpoints for querying multiple AI providers.

### Key Components

1. **Multi-Provider Support** (`src/core/handlers/AIHandler.ts`): 
   - Unified interface for querying DeepSeek, Google AI (Gemini), and OpenAI
   - Provider configuration handled via environment variables or API keys
   - Supports text prompts with optional images and videos (Google AI only)

2. **Query Processing Pipeline** (`src/core/handlers/Query.ts`):
   - Main entry point for all queries
   - Processes context, references (scraped URLs, file URLs), and examples
   - Enhances prompts before sending to AI providers

3. **Context Enhancement**:
   - **Context Handler** (`src/core/handlers/context.ts`): Processes context arrays
   - **References Handler** (`src/core/handlers/references.ts`): Handles URL scraping and file downloads
   - **Examples Handler** (`src/core/handlers/examples.ts`): Formats examples for prompts

4. **Express API** (`src/app.ts`):
   - `/health` - Health check endpoint
   - `/ai/query` - Main query endpoint accepting JSON body with prompt and options

### Provider Configuration

Providers can be configured via:
- Environment variables: `PROVIDER` and `MODEL`
- Runtime parameters in query requests
- API keys via environment or request parameters

### Export Structure

The package exports all core functionality through `index.ts`, with direct access to:
- `query` function for programmatic use
- All handlers, utilities, and constants for advanced usage
- PDF parsing utilities (`src/services/ai/pdfParser.ts`)

### TypeScript Configuration

- Target: ES2020
- Module: CommonJS
- Strict mode enabled (with `noImplicitAny` disabled)
- Output directory: `build/`
- Includes type declarations and source maps