console.log("LeetCode Themer: Content script loaded.");

const THEME_STORAGE_KEY = 'leetcodeEditorTheme';
const CSS_FILE = chrome.runtime.getURL('themes.css');
// *** UPDATE THIS ARRAY with ALL theme classes ***
const THEME_CLASSES = [
    'leetcode-theme-catppuccin-macchiato',
    'leetcode-theme-catppuccin-mocha', // Added Mocha
    'leetcode-theme-atom-one-dark'     // Added Atom One Dark
];
let currentTheme = 'default';
let cssInjected = false;

// Function to inject the CSS file if not already done
function ensureCssInjected() {
    // ... (keep the existing ensureCssInjected function - no changes needed) ...
    if (cssInjected) return Promise.resolve();

    return new Promise((resolve, reject) => {
        if (document.getElementById('leetcode-themer-styles')) {
            console.log("LeetCode Themer: Stylesheet already injected.");
            cssInjected = true;
            resolve();
            return;
        }

        console.log("LeetCode Themer: Injecting stylesheet:", CSS_FILE);
        const link = document.createElement('link');
        link.id = 'leetcode-themer-styles';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = CSS_FILE;
        link.onload = () => {
            console.log("LeetCode Themer: Stylesheet loaded successfully.");
            cssInjected = true;
            resolve();
        };
        link.onerror = (e) => {
            console.error("LeetCode Themer: Failed to load stylesheet.", e);
            reject(e);
        };
        document.head.appendChild(link);
    });
}

// Function to apply the theme by adding/removing body classes
async function applyThemeClass(theme) {
    // ... (keep the existing applyThemeClass function - no changes needed) ...
    try {
        await ensureCssInjected();
        console.log("LeetCode Themer: Applying theme class for:", theme);
        document.body.classList.add('leetcode-themer-active'); // Add general active class

        // Remove ALL known theme classes first
        THEME_CLASSES.forEach(cls => document.body.classList.remove(cls));

        // Add the specific theme class if it's not default
        if (theme && theme !== 'default') {
            const themeClass = `leetcode-theme-${theme}`;
             if (THEME_CLASSES.includes(themeClass)) {
                 document.body.classList.add(themeClass);
                 console.log("Applied class:", themeClass);
             } else {
                 console.warn(`LeetCode Themer: Theme class not found in THEME_CLASSES array: ${themeClass}`);
             }
        } else {
             // If theme is 'default', remove the general active class too
             document.body.classList.remove('leetcode-themer-active');
             console.log("Applied default theme (removed classes).");
        }
         currentTheme = theme; // Update the tracking variable
    } catch (error) {
        console.error("LeetCode Themer: Error applying theme class:", error);
    }
}

// --- Event Listener for Messages from Popup ---
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // ... (keep the existing message listener - no changes needed) ...
    console.log("LeetCode Themer: Message received", request);
    if (request.action === "applyTheme") {
        applyThemeClass(request.theme)
            .then(() => sendResponse({ status: "Theme application initiated for " + request.theme }))
            .catch(err => sendResponse({ status: "error", message: err.message }));
        return true; // Indicates response will be sent asynchronously
    }
    return false;
});


// --- Initial Load ---
chrome.storage.sync.get(THEME_STORAGE_KEY, (data) => {
    // ... (keep the existing initial load logic - no changes needed) ...
    const savedTheme = data[THEME_STORAGE_KEY] || 'default';
    console.log("LeetCode Themer: Applying saved theme on load:", savedTheme);
    applyThemeClass(savedTheme); // Apply the theme when the script loads
});

// --- Handle potential SPA navigation (MutationObserver) ---
let observer = new MutationObserver(mutations => {
    // ... (keep the existing observer logic - no changes needed) ...
    // ... (This helps re-apply the theme if LeetCode redraws the editor dynamically) ...
    let editorAppeared = false;
    for (let mutation of mutations) {
        if (mutation.addedNodes) {
            for (let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && (node.classList.contains('monaco-editor') || node.querySelector('.monaco-editor'))) {
                    editorAppeared = true;
                    break;
                }
            }
        }
         if (editorAppeared) break;
    }

    if (editorAppeared) {
        console.log("LeetCode Themer: Monaco editor detected or re-rendered. Re-applying theme:", currentTheme);
        // Small delay can sometimes help ensure editor styles are ready
        setTimeout(() => {
             applyThemeClass(currentTheme);
        }, 150); // Slightly increased delay just in case
    }
});

observer.observe(document.body, { childList: true, subtree: true });