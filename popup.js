// popup.js - No changes needed from the previous version
const themeButtons = document.querySelectorAll('button[id^="theme-"]');
const THEME_STORAGE_KEY = 'leetcodeEditorTheme';
let currentTheme = 'default'; // Default assumes no theme applied

// Function to apply visual state to buttons
function updateButtonStates() {
    themeButtons.forEach(btn => {
        const theme = btn.id.replace('theme-', '');
        if (theme === currentTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Function to send theme change message to content script
function applyTheme(theme) {
    currentTheme = theme; // Update local state
    // Save the selected theme
    chrome.storage.sync.set({ [THEME_STORAGE_KEY]: theme }, () => {
        console.log('Theme saved:', theme);
    });

    // Send message to active tab's content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].id) {
             // Check if the tab is a LeetCode problem page before sending
             if (tabs[0].url && tabs[0].url.includes("leetcode.com/problems/")) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "applyTheme",
                    theme: theme // Will be 'default' or 'catppuccin-macchiato'
                }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error sending message:", chrome.runtime.lastError.message);
                    } else {
                        console.log("Theme apply message sent. Response:", response);
                    }
                });
             } else {
                 console.log("Not a LeetCode problem page, not sending theme message.");
             }
        } else {
            console.error("Could not get active tab ID.");
        }
    });

    updateButtonStates(); // Update button visuals immediately
}

// --- Event Listeners ---
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.id.replace('theme-', '');
        applyTheme(theme);
    });
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(THEME_STORAGE_KEY, (data) => {
        currentTheme = data[THEME_STORAGE_KEY] || 'default';
        console.log("Loaded theme:", currentTheme);
        updateButtonStates();
    });
});