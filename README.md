# GTM dataLayer for Iframe Form Interactions and Submissions

This version of the script is a **forked and modified version** of Md Hasanuzzaman's original script. It is adapted to work specifically with a **[Dripjobs](https://www.dripjobs.com/) appointment request form** embedded in an iframe on a Next.js 14 site. This modified version detects form submissions by observing changes to the iframe's attributes and presence, rather than relying on form height changes.

## How the Script Works

The script monitors various events to track user interactions and form submissions within an iframe:
- **MutationObserver** is used to detect attribute changes (such as style or class changes) in the iframe.
- A periodic check is conducted to see if the iframe is removed from the DOM (e.g., after a form submission and redirect).
- `mouseover` and `blur` events are used to track when the user interacts with the iframe.
- When the script detects a form submission, it pushes an event (`iframe_form_submit`) to the `dataLayer` in Google Tag Manager.

### Key Features of this Script:
- **`iframe_form_start`**: Triggered when the user first interacts with the form inside the iframe.
- **`iframe_form_submit`**: Triggered when the form submission is detected through attribute changes or the iframe's removal from the DOM.
- It also logs the **method of detection** (e.g., "iframe removed", "iframe attributes changed", etc.).

## How to Implement

1. **In Google Tag Manager**, create a new tag as a Custom HTML tag.
2. **Paste the modified script** into the Custom HTML tag. Make sure the script is wrapped within `<script>` tags.
3. Set the trigger to fire on **All Pages** page views.
4. Ensure that the Dripjobs form is set to **redirect to a page on the same origin site** (where Google Tag Manager is installed).
5. Once configured, you will begin receiving the following `dataLayer` events in Google Tag Manager:
    - **`iframe_form_start`**: Triggered when the user first interacts with the iframe form.
    - **`iframe_form_submit`**: Triggered when the form submission is detected (through attribute changes or iframe removal).

## Recommendations

- **Multiple iframes**: If your webpage contains multiple iframes, it's highly recommended to adjust the `iframeSelector` on line 3 of the script to properly target the correct iframe. You can use CSS class selectors or ID selectors for precise targeting.
- **Check Period**: The script checks the presence of the iframe every 1000ms (1 second). If you want a faster detection, you can decrease the interval by modifying the value in the `setInterval` function.

## Special Thanks

Special thanks to **Md Hasanuzzaman** for creating the original version of this script and for the helpful [YouTube video](https://www.youtube.com/watch?v=ladW4ayW840&t=197s) explaining how to configure Google Tag Manager and Google Analytics for iframe tracking. You can check out his YouTube channel [here](https://www.youtube.com/@leomeasure).

