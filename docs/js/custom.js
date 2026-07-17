/* Custom JavaScript for interactive Mermaid diagram zoom */

console.log("Custom.js for Mermaid Zoom loaded successfully!");

function initMermaidZoom() {
  console.log("Initializing Mermaid Zoom...");
  setupMermaidZoom();
}

// Run immediately if DOM is ready, or queue it
if (document.readyState === "complete" || document.readyState === "interactive") {
  initMermaidZoom();
} else {
  document.addEventListener("DOMContentLoaded", initMermaidZoom);
}

// Also subscribe to MkDocs Material's page navigation observable
if (typeof document$ !== 'undefined') {
  document$.subscribe(function() {
    console.log("MkDocs Material page navigation detected, re-initializing...");
    setupMermaidZoom();
  });
}

function setupMermaidZoom() {
  // First attempt to enhance existing diagrams
  enhanceExistingDiagrams();
  
  // Setup a global observer on document body to capture when Mermaid replaces or renders elements
  const observer = new MutationObserver(function(mutations) {
    enhanceExistingDiagrams();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function enhanceExistingDiagrams() {
  const containers = document.querySelectorAll('.mermaid');
  
  containers.forEach(container => {
    enhanceMermaidContainer(container);
  });
}

function enhanceMermaidContainer(container) {
  if (container.classList.contains('mermaid-zoom-enhanced')) return;
  container.classList.add('mermaid-zoom-enhanced');
  
  console.log("Enhancing Mermaid container:", container);
  
  // Ensure relative positioning for floating badge
  container.style.position = 'relative';
  container.style.cursor = 'pointer';
  
  // Create and append floating badge
  const badge = document.createElement('div');
  badge.className = 'mermaid-zoom-badge';
  badge.innerHTML = '🔍 Abrir en pantalla completa';
  container.appendChild(badge);
  
  // Click handler to open zoomable window
  container.style.pointerEvents = 'auto'; // Ensure container accepts pointer events
  container.addEventListener('click', function(e) {
    console.log("Mermaid container clicked!", container);
    
    // If user is selecting text, don't trigger click
    if (window.getSelection().toString() !== '') {
      console.log("Click ignored due to active text selection.");
      return;
    }
    
    // Find SVG in container (including shadow roots)
    const svg = findSvgInElement(container);
    if (svg) {
      console.log("Found SVG, opening interactive diagram...");
      openInteractiveDiagram(svg);
    } else {
      console.warn("No SVG found inside .mermaid container yet. Attempting delayed retry...");
      
      // Fallback: try to find it after a tiny delay in case rendering is in progress
      setTimeout(() => {
        const delayedSvg = findSvgInElement(container);
        if (delayedSvg) {
          console.log("Found SVG on delayed retry, opening...");
          openInteractiveDiagram(delayedSvg);
        } else {
          alert("El diagrama aún se está cargando. Por favor, inténtalo de nuevo en un instante.");
        }
      }, 300);
    }
  });
}

function findSvgInElement(element) {
  // 1. Try direct query
  let svg = element.querySelector('svg');
  if (svg) return svg;
  
  // 2. Check if the element itself has a shadow root (now open)
  if (element.shadowRoot) {
    svg = element.shadowRoot.querySelector('svg');
    if (svg) return svg;
  }
  
  // 3. Check all children recursively for any shadow roots containing the SVG
  const children = element.querySelectorAll('*');
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.shadowRoot) {
      svg = child.shadowRoot.querySelector('svg');
      if (svg) return svg;
    }
  }
  
  return null;
}

function openInteractiveDiagram(svgElement) {
  // Clone the SVG element to modify its sizing
  const svgClone = svgElement.cloneNode(true);
  
  // Fetch page heading for the title
  let headingText = "Modelo Entidad-Relación";
  const h1 = document.querySelector('h1');
  if (h1) {
    headingText = h1.innerText.replace(/[\n\r]+|^\s+|\s+$/g, '');
  }
  
  // Get parent html and body attributes
  const htmlAttrs = Array.from(document.documentElement.attributes)
    .map(attr => `${attr.name}="${attr.value}"`)
    .join(' ');
    
  const bodyAttrs = Array.from(document.body.attributes)
    .map(attr => `${attr.name}="${attr.value}"`)
    .join(' ');

  // Get parent styles, converting relative URLs to absolute URLs so they load in the Blob context
  const parentStyles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(el => {
      if (el.tagName === 'LINK' && el.getAttribute('href')) {
        const href = el.getAttribute('href');
        const absoluteHref = new URL(href, window.location.href).href;
        return `<link rel="stylesheet" href="${absoluteHref}">`;
      }
      return el.outerHTML;
    })
    .join('\n');
  
  const htmlContent = `
<!DOCTYPE html>
<html ${htmlAttrs}>
<head>
    <meta charset="utf-8">
    <title>${headingText} — Vista Ampliada</title>
    ${parentStyles}
    <style>
        /* Override body styles for full-screen layout */
        body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            width: 100vw !important;
            height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            user-select: none !important;
            background-color: var(--md-default-bg-color, #f8f9fa) !important;
        }
        
        .toolbar {
            background-color: var(--md-default-bg-color, #ffffff) !important;
            border-bottom: 1px solid var(--md-card-border, #e0e0e0) !important;
            padding: 12px 24px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            z-index: 100 !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }
        
        .title-container h1 {
            margin: 0 !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            color: var(--md-typeset-a-color, #1a237e) !important;
            border-bottom: none !important;
            padding-bottom: 0 !important;
        }
        
        .instructions {
            font-size: 0.8rem !important;
            color: var(--md-typeset-color, #666) !important;
            margin-top: 4px !important;
            opacity: 0.8 !important;
        }
        
        .actions {
            display: flex !important;
            gap: 12px !important;
        }
        
        .btn {
            background-color: var(--md-default-bg-color, #ffffff) !important;
            border: 1px solid var(--md-card-border, #ccc) !important;
            color: var(--md-typeset-color, #333) !important;
            padding: 8px 16px !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            font-size: 0.85rem !important;
            font-weight: 600 !important;
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
            transition: all 0.2s ease !important;
        }
        
        .btn:hover {
            background-color: var(--md-code-bg-color, #f0f0f0) !important;
            opacity: 0.9 !important;
        }
        
        .btn-primary {
            background-color: var(--md-typeset-a-color, #1a237e) !important;
            color: var(--md-default-bg-color, #ffffff) !important;
            border-color: var(--md-typeset-a-color, #1a237e) !important;
        }
        
        .canvas-container {
            flex: 1 !important;
            position: relative !important;
            cursor: grab !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background-color: var(--md-code-bg-color, #f8f9fa) !important;
        }
        
        .canvas-container:active {
            cursor: grabbing !important;
        }
        
        svg {
            transform-origin: center center;
            transition: transform 0.05s ease-out;
            max-width: 95% !important;
            max-height: 95% !important;
        }
    </style>
</head>
<body ${bodyAttrs}>
    <div class="toolbar">
        <div class="title-container">
            <h1>${headingText} — Vista Ampliada</h1>
            <div class="instructions">💡 Usa la <strong>rueda del ratón</strong> para hacer zoom y <strong>arrastra</strong> para moverte por el diagrama.</div>
        </div>
        <div class="actions">
            <button class="btn" onclick="resetZoom()">🔄 Restablecer Vista</button>
            <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
        </div>
    </div>
    <div class="canvas-container" id="canvas">
        ${svgClone.outerHTML}
    </div>

    <script>
        const canvas = document.getElementById('canvas');
        const svg = canvas.querySelector('svg');
        
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.maxWidth = '100%';
        svg.style.maxHeight = '100%';

        let scale = 1;
        let pointX = 0;
        let pointY = 0;
        let start = { x: 0, y: 0 };
        let isPanning = false;

        function setTransform() {
            svg.style.transform = 'translate(' + pointX + 'px, ' + pointY + 'px) scale(' + scale + ')';
        }

        function resetZoom() {
            scale = 1;
            pointX = 0;
            pointY = 0;
            setTransform();
        }

        canvas.addEventListener('wheel', function(e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const xs = (mouseX - pointX) / scale;
            const ys = (mouseY - pointY) / scale;
            
            const delta = -e.deltaY;
            if (delta > 0) {
                scale *= 1.15;
            } else {
                scale /= 1.15;
                if (scale < 0.1) scale = 0.1;
            }
            
            pointX = mouseX - xs * scale;
            pointY = mouseY - ys * scale;
            setTransform();
        }, { passive: false });

        canvas.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return;
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            isPanning = true;
        });

        window.addEventListener('mousemove', function(e) {
            if (!isPanning) return;
            pointX = e.clientX - start.x;
            pointY = e.clientY - start.y;
            setTransform();
        });

        window.addEventListener('mouseup', function() {
            isPanning = false;
        });
    </script>
</body>
</html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank');
}
