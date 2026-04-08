

## Problem

When a user submits a Google Form embedded in the dialog iframe, Google redirects the iframe to a confirmation page. This renders as a mostly white/blank screen inside the dialog, making users think their submission failed.

## Solution

Add a success overlay that detects when the form has been submitted and shows a friendly confirmation message with a close button. Since we can't reliably detect cross-origin iframe navigation events due to browser security, the best approach is:

1. **Listen for iframe `load` events** — the iframe fires a second `load` event when Google redirects to the confirmation page after submission. Track load count: first load = form loaded, second load = form submitted.

2. **Show a success overlay** — when the second load is detected, overlay a success message on top of the iframe inside the dialog with a checkmark icon, "Form submitted successfully!" text, and a "Close" button that closes the dialog.

## Technical Details

**File: `src/components/ContactSection.tsx`**

- Convert each form dialog into a controlled `Dialog` (track `open` state per form index).
- Add an `onLoad` counter ref for each iframe. On first load, do nothing. On second load (post-submission redirect), set a `submitted` state to true.
- When `submitted` is true, render a success overlay (absolute positioned over the iframe) with a green checkmark, success message, and close button.
- Reset the `submitted` state and load counter when the dialog is closed (so re-opening shows the fresh form).

This approach requires no external dependencies and works within cross-origin iframe constraints.

