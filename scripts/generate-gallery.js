#!/usr/bin/env node

/**
 * Static Gallery Generator
 * 
 * Generates a static HTML gallery from shadcn/ui components
 * Outputs to dev stuff/gallery.html for development reference
 */

import fs from 'fs';
import path from 'path';

const GALLERY_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>shadcn/ui Component Gallery</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 222.2 84% 4.9%;
            --primary: 222.2 47.4% 11.2%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --muted: 210 40% 96%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --accent: 210 40% 96%;
            --accent-foreground: 222.2 47.4% 11.2%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 210 40% 98%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --ring: 222.2 84% 4.9%;
            --radius: 0.5rem;
        }
        
        .dark {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --popover: 222.2 84% 4.9%;
            --popover-foreground: 210 40% 98%;
            --primary: 210 40% 98%;
            --primary-foreground: 222.2 47.4% 11.2%;
            --secondary: 217.2 32.6% 17.5%;
            --secondary-foreground: 210 40% 98%;
            --muted: 217.2 32.6% 17.5%;
            --muted-foreground: 215 20.2% 65.1%;
            --accent: 217.2 32.6% 17.5%;
            --accent-foreground: 210 40% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 210 40% 98%;
            --border: 217.2 32.6% 17.5%;
            --input: 217.2 32.6% 17.5%;
            --ring: 212.7 26.8% 83.9%;
        }
        
        * {
            border-color: hsl(var(--border));
        }
        
        body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            white-space: nowrap;
            border-radius: calc(var(--radius) - 2px);
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s;
            outline: none;
            border: none;
            cursor: pointer;
        }
        
        .btn:disabled {
            pointer-events: none;
            opacity: 0.5;
        }
        
        .btn-default {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        
        .btn-default:hover {
            background-color: hsl(var(--primary) / 0.9);
        }
        
        .btn-secondary {
            background-color: hsl(var(--secondary));
            color: hsl(var(--secondary-foreground));
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        
        .btn-secondary:hover {
            background-color: hsl(var(--secondary) / 0.8);
        }
        
        .btn-destructive {
            background-color: hsl(var(--destructive));
            color: hsl(var(--destructive-foreground));
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        
        .btn-destructive:hover {
            background-color: hsl(var(--destructive) / 0.9);
        }
        
        .btn-outline {
            border: 1px solid hsl(var(--border));
            background-color: hsl(var(--background));
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        
        .btn-outline:hover {
            background-color: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
        }
        
        .btn-ghost:hover {
            background-color: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
        }
        
        .btn-link {
            color: hsl(var(--primary));
            text-decoration: underline;
            text-underline-offset: 4px;
        }
        
        .btn-link:hover {
            text-decoration: underline;
        }
        
        .btn-sm {
            height: 2rem;
            border-radius: calc(var(--radius) - 2px);
            gap: 0.375rem;
            padding: 0 0.75rem;
        }
        
        .btn-default-size {
            height: 2.25rem;
            padding: 0.5rem 1rem;
        }
        
        .btn-lg {
            height: 2.5rem;
            border-radius: calc(var(--radius) - 2px);
            padding: 0 1.5rem;
        }
        
        .card {
            background-color: hsl(var(--card));
            color: hsl(var(--card-foreground));
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid hsl(var(--border));
            padding: 1.5rem 0;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        }
        
        .card-header {
            display: grid;
            grid-template-rows: auto auto;
            align-items: start;
            gap: 0.375rem;
            padding: 0 1.5rem;
        }
        
        .card-title {
            line-height: 1;
            font-weight: 600;
        }
        
        .card-description {
            color: hsl(var(--muted-foreground));
            font-size: 0.875rem;
        }
        
        .card-content {
            padding: 0 1.5rem;
        }
        
        .card-footer {
            display: flex;
            align-items: center;
            padding: 0 1.5rem;
        }
        
        .input {
            display: flex;
            height: 2.25rem;
            width: 100%;
            min-width: 0;
            border-radius: calc(var(--radius) - 2px);
            border: 1px solid hsl(var(--input));
            background-color: transparent;
            padding: 0.25rem 0.75rem;
            font-size: 0.875rem;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            transition: color, box-shadow;
            outline: none;
        }
        
        .input:disabled {
            pointer-events: none;
            cursor: not-allowed;
            opacity: 0.5;
        }
        
        .input::placeholder {
            color: hsl(var(--muted-foreground));
        }
        
        .input:focus {
            border-color: hsl(var(--ring));
            box-shadow: 0 0 0 3px hsl(var(--ring) / 0.5);
        }
        
        .code-block {
            background-color: hsl(var(--muted));
            border-radius: calc(var(--radius) - 2px);
            padding: 0.75rem;
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
            overflow-x: auto;
            margin: 1rem 0;
        }
        
        .toggle-dark {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 50;
        }
    </style>
</head>
<body class="min-h-screen bg-background text-foreground">
    <button class="toggle-dark btn btn-outline btn-sm" onclick="toggleDark()">🌙</button>
    
    <div class="container mx-auto p-8 space-y-8">
        <div class="text-center space-y-2">
            <h1 class="text-4xl font-bold">shadcn/ui Component Gallery</h1>
            <p class="text-muted-foreground">
                Static HTML showcase of all components in the design system
            </p>
            <p class="text-xs text-muted-foreground">
                Generated: {{TIMESTAMP}}
            </p>
        </div>

        {{COMPONENT_SECTIONS}}

        <!-- Design System Info -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold">Design System Rules</h2>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Enforcement Rules</div>
                    <div class="card-description">
                        These rules are enforced via ESLint and code reviews
                    </div>
                </div>
                <div class="card-content">
                    <ul class="list-disc list-inside space-y-1 text-sm">
                        <li>All UI components must use shadcn/ui primitives</li>
                        <li>Import components from <code class="bg-muted px-1 rounded">@/components/ui/*</code></li>
                        <li>No direct HTML elements where shadcn components exist</li>
                        <li>Use this gallery to reference component usage</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Usage Instructions -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold">Usage Instructions</h2>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">How to Use This Gallery</div>
                    <div class="card-description">
                        Reference guide for development
                    </div>
                </div>
                <div class="card-content">
                    <ol class="list-decimal list-inside space-y-2 text-sm">
                        <li><strong>View components:</strong> Browse all available shadcn/ui components</li>
                        <li><strong>Copy code:</strong> Use the code blocks to copy component markup</li>
                        <li><strong>Test interactions:</strong> See how components behave in different states</li>
                        <li><strong>Reference during development:</strong> Keep this open while coding</li>
                        <li><strong>Share with team:</strong> Use as a design system reference</li>
                    </ol>
                </div>
            </div>
        </section>
    </div>

    <script>
        function toggleDark() {
            document.documentElement.classList.toggle('dark');
            const btn = document.querySelector('.toggle-dark');
            btn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
        }
        
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Add click handlers to buttons for demo
            document.querySelectorAll('.btn').forEach(btn => {
                if (!btn.disabled) {
                    btn.addEventListener('click', function(e) {
                        if (this.textContent.includes('Send Message')) {
                            e.preventDefault();
                            alert('Form submitted! (Demo)');
                        }
                    });
                }
            });
        });
    </script>
</body>
</html>`;

function getComponents() {
  const componentsDir = path.join(process.cwd(), 'src/components/ui');
  
  if (!fs.existsSync(componentsDir)) {
    return [];
  }
  
  return fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => file.replace('.tsx', ''));
}

function generateComponentSection(componentName) {
  const sections = {
    button: `
        <!-- Buttons Section -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold">Buttons</h2>
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-default btn-default-size">Default</button>
                <button class="btn btn-secondary btn-default-size">Secondary</button>
                <button class="btn btn-destructive btn-default-size">Destructive</button>
                <button class="btn btn-outline btn-default-size">Outline</button>
                <button class="btn btn-ghost btn-default-size">Ghost</button>
                <button class="btn btn-link btn-default-size">Link</button>
                <button class="btn btn-default btn-sm">Small</button>
                <button class="btn btn-default btn-lg">Large</button>
                <button class="btn btn-default btn-default-size" disabled>Disabled</button>
            </div>
            
            <div class="code-block">
&lt;button class="btn btn-default btn-default-size"&gt;Default&lt;/button&gt;
&lt;button class="btn btn-secondary btn-default-size"&gt;Secondary&lt;/button&gt;
&lt;button class="btn btn-destructive btn-default-size"&gt;Destructive&lt;/button&gt;
&lt;button class="btn btn-outline btn-default-size"&gt;Outline&lt;/button&gt;
&lt;button class="btn btn-ghost btn-default-size"&gt;Ghost&lt;/button&gt;
&lt;button class="btn btn-link btn-default-size"&gt;Link&lt;/button&gt;
            </div>
        </section>`,
    
    card: `
        <!-- Cards Section -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold">Cards</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Basic Card</div>
                        <div class="card-description">
                            A simple card with header and content
                        </div>
                    </div>
                    <div class="card-content">
                        <p>This is the card content area where you can place any content.</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Interactive Card</div>
                        <div class="card-description">
                            Card with interactive elements
                        </div>
                    </div>
                    <div class="card-content" style="display: flex; flex-direction: column; gap: 1rem;">
                        <input class="input" placeholder="Enter text..." />
                        <button class="btn btn-default btn-default-size" style="width: 100%;">Action Button</button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Status Card</div>
                        <div class="card-description">
                            Card showing different states
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 0.5rem; height: 0.5rem; background-color: #10b981; border-radius: 50%;"></div>
                            <span style="font-size: 0.875rem;">Active</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="code-block">
&lt;div class="card"&gt;
  &lt;div class="card-header"&gt;
    &lt;div class="card-title"&gt;Card Title&lt;/div&gt;
    &lt;div class="card-description"&gt;Card description&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="card-content"&gt;
    &lt;p&gt;Card content goes here&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;
            </div>
        </section>`,
    
    input: `
        <!-- Inputs Section -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold">Inputs</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div class="space-y-2">
                    <label class="text-sm font-medium">Default Input</label>
                    <input class="input" placeholder="Enter text..." />
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium">Disabled Input</label>
                    <input class="input" placeholder="Disabled" disabled />
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium">Email Input</label>
                    <input class="input" type="email" placeholder="user@example.com" />
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium">Password Input</label>
                    <input class="input" type="password" placeholder="••••••••" />
                </div>
            </div>
            
            <div class="code-block">
&lt;input class="input" placeholder="Enter text..." /&gt;
&lt;input class="input" type="email" placeholder="user@example.com" /&gt;
&lt;input class="input" type="password" placeholder="••••••••" /&gt;
            </div>
        </section>

        <!-- Form Example -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold">Form Example</h2>
            <div class="card" style="max-width: 28rem;">
                <div class="card-header">
                    <div class="card-title">Contact Form</div>
                    <div class="card-description">
                        Example form using shadcn/ui components
                    </div>
                </div>
                <div class="card-content" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Name</label>
                        <input class="input" placeholder="Your name" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Email</label>
                        <input class="input" type="email" placeholder="your@email.com" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Message</label>
                        <input class="input" placeholder="Your message..." />
                    </div>
                    <button class="btn btn-default btn-default-size" style="width: 100%;">Send Message</button>
                </div>
            </div>
        </section>`
  };
  
  return sections[componentName] || '';
}

function main() {
  const components = getComponents();
  const timestamp = new Date().toLocaleString();
  
  let componentSections = '';
  components.forEach(component => {
    componentSections += generateComponentSection(component);
  });
  
  const gallery = GALLERY_TEMPLATE
    .replace('{{TIMESTAMP}}', timestamp)
    .replace('{{COMPONENT_SECTIONS}}', componentSections);
  
  const outputPath = path.join(process.cwd(), 'dev stuff', 'gallery.html');
  
  // Ensure dev stuff directory exists
  const devStuffDir = path.join(process.cwd(), 'dev stuff');
  if (!fs.existsSync(devStuffDir)) {
    fs.mkdirSync(devStuffDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, gallery);
  
  console.log(`✅ Generated gallery with ${components.length} components`);
  console.log(`📁 Output: ${outputPath}`);
  console.log(`🕒 Generated: ${timestamp}`);
}

// Run main function if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateComponentSection, getComponents };
