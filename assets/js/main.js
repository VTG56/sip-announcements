/**
 * Main application script
 * Handles rendering, interactions, and initialization
 */

// Icon mappings for each section
const SECTION_ICONS = {
  circulars: `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="m14,2 6,6"/>
    <path d="M16,13H8"/>
    <path d="M16,17H8"/>
    <path d="M10,9H8"/>
  </svg>`,
  
  bootkit: `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect width="18" height="18" x="3" y="3" rx="2"/>
    <path d="M9 12h6m-6 4h6m-6-8h6"/>
  </svg>`,
  
  counselors: `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="m22 21-3-3m0 0a2 2 0 1 1-3-3 2 2 0 0 1 3 3Z"/>
  </svg>`,
  
  venues: `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>`,
  
  clubs: `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>`
};

/**
 * Creates HTML for a single announcement card
 */
function createAnnouncementCard(item) {
  const icon = SECTION_ICONS[item.type] || SECTION_ICONS.circulars;
  
  return `
    <div class="announcement-card">
      <div class="card-header">
        ${icon}
        <div class="card-content">
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <span class="card-date">${escapeHtml(item.date)}</span>
        </div>
      </div>
      <div class="card-actions">
        <a href="#" data-drive="${escapeHtml(item.driveShare)}" class="btn btn-primary">
          Download
        </a>
        <a href="${escapeHtml(item.driveShare)}" target="_blank" rel="noopener" class="btn btn-ghost">
          View on Drive
        </a>
      </div>
    </div>
  `;
}

/**
 * Escapes HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Renders all announcements
 */
function renderAnnouncements() {
  const grid = document.getElementById('main-grid');
  if (!grid || !window.ANNOUNCEMENTS || !Array.isArray(window.ANNOUNCEMENTS)) {
    console.error('Grid element or ANNOUNCEMENTS data not found');
    return;
  }
  
  const html = window.ANNOUNCEMENTS
    .map(item => createAnnouncementCard(item))
    .join('');
  
  grid.innerHTML = html;
}

/**
 * Updates the last updated date in the footer
 */
function updateLastUpdated() {
  const lastUpdatedEl = document.getElementById('last-updated');
  if (lastUpdatedEl) {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    lastUpdatedEl.textContent = formatted;
  }
}

/**
 * Creates background particles
 */
function createParticles() {
  const container = document.querySelector('.bg-particles');
  if (!container) return;
  
  // Clear existing particles
  container.innerHTML = '';
  
  // Create 30 particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random size variation (5-8px)
    const size = 5 + Math.random() * 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 60 + 's';
    
    container.appendChild(particle);
  }
}

/**
 * Handles download link clicks with error handling
 */
function handleDownloadClick(event) {
  const link = event.target.closest('a[data-drive]');
  if (!link) return;
  
  // Add loading state
  link.classList.add('loading');
  
  // Remove loading state after a short delay
  setTimeout(() => {
    link.classList.remove('loading');
  }, 1000);
  
  // Log download attempt (for debugging)
  console.log('Download attempted:', link.getAttribute('data-drive'));
}

/**
 * Sets up event listeners
 */
function setupEventListeners() {
  // Handle download clicks
  document.addEventListener('click', handleDownloadClick);
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target;
      if (target.classList.contains('btn') && target.tagName === 'A') {
        event.preventDefault();
        target.click();
      }
    }
  });
}

/**
 * Initializes the application
 */
function init() {
  try {
    // Render all announcements
    renderAnnouncements();
    
    // Wire up download links
    if (window.DriveUtils && window.DriveUtils.wireDownloadLinks) {
      window.DriveUtils.wireDownloadLinks();
    }
    
    // Update footer date
    updateLastUpdated();
    
    // Create particles
    createParticles();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('Campus Announcements Hub initialized successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    
    // Show error message to user
    const main = document.querySelector('.main');
    if (main) {
      main.innerHTML = `
        <div class="container">
          <div class="error-message" style="text-align: center; padding: 2rem;">
            <h2>Unable to load announcements</h2>
            <p>Please refresh the page or try again later.</p>
          </div>
        </div>
      `;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateLastUpdated();
  }
});
window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("warning-modal");
  const closeBtn = document.getElementById("close-warning");

  // hide if already dismissed
  if (localStorage.getItem("hideWarning") === "true") {
    modal.style.display = "none";
  }

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    localStorage.setItem("hideWarning", "true"); // remember dismissal
  });
});