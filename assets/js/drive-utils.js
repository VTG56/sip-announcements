/**
 * Google Drive Direct Download Utilities
 * 
 * This module provides functions to convert Google Drive sharing URLs
 * into direct download URLs for seamless file access.
 */

/**
 * Extracts the Google Drive file ID from various URL formats
 * @param {string} url - The Google Drive URL
 * @returns {string|null} - The extracted file ID or null if not found
 * 
 * Examples:
 * Input: "https://drive.google.com/file/d/1AbcDEF234567890fakeId/view?usp=sharing"
 * Output: "1AbcDEF234567890fakeId"
 * 
 * Input: "https://drive.google.com/open?id=1AbcDEF234567890fakeId"
 * Output: "1AbcDEF234567890fakeId"
 */
function extractDriveId(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }
  
  // Pattern 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const fileMatch = url.match(filePattern);
  if (fileMatch) {
    return fileMatch[1];
  }
  
  // Pattern 2: https://drive.google.com/open?id=FILE_ID
  const openPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
  const openMatch = url.match(openPattern);
  if (openMatch) {
    return openMatch[1];
  }
  
  // Pattern 3: https://drive.google.com/uc?id=FILE_ID&export=download
  const ucPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
  const ucMatch = url.match(ucPattern);
  if (ucMatch) {
    return ucMatch[1];
  }
  
  return null;
}

/**
 * Converts a Google Drive sharing URL to a direct download URL
 * @param {string} url - The original Google Drive URL
 * @returns {string|null} - The direct download URL or null if conversion fails
 * 
 * Examples:
 * Input: "https://drive.google.com/file/d/1AbcDEF234567890fakeId/view?usp=sharing"
 * Output: "https://drive.google.com/uc?export=download&id=1AbcDEF234567890fakeId"
 * 
 * Input: "https://drive.google.com/uc?id=1AbcDEF234567890fakeId&export=download"
 * Output: "https://drive.google.com/uc?id=1AbcDEF234567890fakeId&export=download"
 */
function toDriveDownload(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }
  
  // If already in download format, return as-is
  if (url.includes('uc?') && url.includes('export=download')) {
    return url;
  }
  
  const fileId = extractDriveId(url);
  if (!fileId) {
    return null;
  }
  
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/**
 * Wires up download links in the DOM by converting Google Drive URLs
 * @param {Element} root - Root element to search for links (defaults to document)
 * 
 * This function:
 * 1. Finds all anchor tags with data-drive attribute
 * 2. Converts their href to direct download URLs
 * 3. Sets appropriate attributes for external links
 * 4. Handles errors gracefully by keeping fallback links intact
 */
function wireDownloadLinks(root = document) {
  const driveLinks = root.querySelectorAll('a[data-drive]');
  
  driveLinks.forEach(link => {
    const originalUrl = link.getAttribute('data-drive');
    const downloadUrl = toDriveDownload(originalUrl);
    
    if (downloadUrl) {
      link.href = downloadUrl;
      link.setAttribute('rel', 'noopener');
      link.setAttribute('target', '_blank');
      link.setAttribute('aria-label', `Download ${link.textContent.trim()}`);
    } else {
      // Fallback: use original URL for viewing
      link.href = originalUrl;
      link.setAttribute('rel', 'noopener');
      link.setAttribute('target', '_blank');
      console.warn('Failed to convert Drive URL:', originalUrl);
    }
  });
}

// Export functions to global scope
window.DriveUtils = {
  extractDriveId,
  toDriveDownload,
  wireDownloadLinks
};