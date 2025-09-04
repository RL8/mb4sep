#!/usr/bin/env python3
"""
Simple HTTP server for the Documentation Hub
Scans directory for HTML files and serves them with auto-discovery
"""

import http.server
import socketserver
import json
import os
import urllib.parse
from pathlib import Path

class DocumentationHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Handle API endpoint for file discovery
        if self.path == '/api/files':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Scan current directory and subdirectories for HTML files
            html_files = []
            current_dir = Path('.')
            
            # Scan current directory
            for file_path in current_dir.glob('*.html'):
                if file_path.name != 'index.html':  # Don't include the index itself
                    html_files.append(file_path.name)
            
            # Scan subdirectories
            for subdir in ['frontend', 'backend']:
                subdir_path = current_dir / subdir
                if subdir_path.exists():
                    for file_path in subdir_path.glob('*.html'):
                        html_files.append(f"{subdir}/{file_path.name}")
            
            # Add gallery.html from parent directory
            parent_gallery = current_dir.parent / 'gallery.html'
            if parent_gallery.exists():
                html_files.append('../gallery.html')
            
            # Sort files for consistent ordering
            html_files.sort()
            
            response = {
                'files': html_files,
                'count': len(html_files)
            }
            
            self.wfile.write(json.dumps(response).encode())
            return
        
        # Handle all other requests normally
        super().do_GET()

def start_server(port=8000):
    """Start the documentation server"""
    try:
        with socketserver.TCPServer(("", port), DocumentationHandler) as httpd:
            print(f"🚀 Documentation Hub Server started!")
            print(f"📁 Serving files from: {os.getcwd()}")
            print(f"🌐 Open your browser to: http://localhost:{port}")
            print(f"📚 Documentation Hub: http://localhost:{port}/index.html")
            print(f"🔄 API endpoint: http://localhost:{port}/api/files")
            print(f"\n💡 Press Ctrl+C to stop the server")
            print("-" * 50)
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped.")
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Port {port} is already in use. Try a different port:")
            print(f"   python server.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    import sys
    
    # Allow custom port as command line argument
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ Invalid port number. Using default port 8000.")
    
    start_server(port)
