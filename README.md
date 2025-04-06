# LeetCode Editor Themer

This is a simple Chrome extension that allows you to apply custom themes to the code editor on LeetCode problem pages. It targets the Monaco editor used by LeetCode, offering a visual alternative to the default styling.

## Included Themes

The extension currently includes the following themes:

*   **Default LeetCode:** Allows you to easily revert to the standard LeetCode editor appearance.
*   **Catppuccin Macchiato:** A light, pastel theme from the Catppuccin collection.
*   **Catppuccin Mocha:** A dark, pastel theme from the Catppuccin collection.
*   **Atom One Dark:** A theme inspired by the popular Atom One Dark colors.

## Installation

To install this extension locally:

1.  **Download the Files:** Make sure you have the extension files (`manifest.json`, `popup.html`, `popup.js`, `content.js`, `themes.css`, and the `icons` folder) in a dedicated folder on your computer.
2.  **Open Chrome/Chromium Extensions:** Open your Chrome or Chromium-based browser and navigate to `chrome://extensions/`.
3.  **Enable Developer Mode:** Find the "Developer mode" toggle switch (usually in the top-right corner) and make sure it is enabled.
4.  **Load Unpacked Extension:** Click the "Load unpacked" button (usually appears in the top-left after enabling Developer mode).
5.  **Select Folder:** In the file dialog that opens, navigate to and select the folder where you saved the extension files (the folder containing `manifest.json`). Click "Select Folder" or "Open".
6.  **Installation Complete:** The extension ("LeetCode Editor Themer") should now appear in your list of extensions, and its icon should be visible in your browser's toolbar.

## Usage

1.  Navigate to any LeetCode problem page (e.g., `https://leetcode.com/problems/two-sum/`).
2.  Click the **LeetCode Editor Themer** icon in your browser toolbar.
3.  A popup menu will appear listing the available themes.
4.  Click on the name of the theme you want to apply (e.g., "Catppuccin Mocha").
5.  The LeetCode code editor's colors and style should update immediately to reflect the selected theme.
6.  To go back to the original look, select "Default LeetCode" from the popup.

## Note

LeetCode may update its website structure or CSS, which could potentially break the styling provided by this extension. If themes stop working correctly after a LeetCode update, the CSS selectors within `themes.css` might need to be adjusted.