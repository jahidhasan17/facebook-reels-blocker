// Main function to hide reels
function hideReels() {
  // Remove reels from stories section
  document.querySelectorAll('[aria-label="Reels"], [aria-label="Watch"]').forEach(reel => {
    removeElement(reel);
  });
  
  // Remove reels from left sidebar
  document.querySelectorAll('a[href*="/reel/"], a[href*="/watch/"]').forEach(reel => {
    removeElement(reel.closest('a') || reel);
  });
}

// Helper function to completely remove an element
function removeElement(element) {
  if (!element) return;
  
  // Try removing potential parent containers
  element.closest('[role="article"]')?.remove();
  element.closest('div[data-pagelet]')?.remove();
  element.closest('section')?.remove();
  
  // Remove the element itself if still exists
  element?.remove();
}

// Run immediately when loaded
hideReels();

// Set up MutationObserver to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    hideReels();
  });
});

// Start observing the entire document
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});

// Also observe the main feed specifically if it exists
const mainFeed = document.querySelector('div[role="feed"], [role="main"]');
if (mainFeed) {
  observer.observe(mainFeed, {
    childList: true,
    subtree: true
  });
}

// Add periodic check as backup (in case observer misses something)
setInterval(hideReels, 3000);