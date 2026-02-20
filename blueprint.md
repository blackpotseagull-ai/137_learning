# Project Blueprint: StudyHub

## Overview

StudyHub is a web application designed to help users learn and retain information more effectively. It's built on the principles of cognitive science, specifically the forgetting curve and spaced repetition. The application provides users with a tool to schedule and track their study sessions, along with a blog that offers valuable insights and strategies for effective learning. The entire application is built with modern, framework-less web technologies, including Web Components, to ensure a lightweight and maintainable codebase.

## Core Features

### 1. **Learning Review Tool**

- **Functionality:** Allows users to add learning topics and automatically schedules review sessions based on the 1-3-7 day spaced repetition model.
- **Technology:** Uses LocalStorage to save and manage user data, making it a client-side only tool.
- **UI:** The interface is divided into "Today's Review Items" and "Upcoming Review Items" for a clear overview.
- **Files:** `tool.html`, `css/tool.css`, `js/tool.js`

### 2. **Educational Blog**

- **Content:** A series of 15 high-quality articles focused on effective study methods, memory techniques, and productivity. The content is optimized for SEO to attract organic traffic.
- **Topics Covered:
    - 137 Learning Method
    - Ebbinghaus Forgetting Curve
    - Creating a Study Routine
    - 2-Week Exam Preparation
    - Spaced Repetition
    - Memorization Techniques
    - Math Study Tips
    - Civil Servant Exam Strategy
    - TOEIC Study Plan
    - 3-Hour Study Routine
    - Concentration Tips
    - Overcoming Slumps
    - Note-Taking Methods
    - Error Analysis Notebooks
    - Long-Term Memory
- **Files:** All articles are located in the `blog/` directory.

### 3. **Reusable Web Components**

- **Header (`<site-header>`):** Provides consistent navigation across all pages. Includes links to Home, Review Tool, and the main blog page.
- **Footer (`<site-footer>`):** Contains links to privacy/terms pages and the copyright notice.
- **Technology:** Built with Custom Elements and Shadow DOM for encapsulation.
- **File:** `js/script.js`

## Project Structure

```
/
|-- index.html
|-- tool.html
|-- about.html
|-- contact.html
|-- privacy.html
|-- terms.html
|-- css/
|   |-- style.css
|   |-- tool.css
|   |-- blog.css
|-- js/
|   |-- script.js
|   |-- tool.js
|-- blog/
|   |-- 137-method.html
|   |-- memory-curve.html
|   |-- ... (13 more articles)
|-- blueprint.md
```

## Design and Styling

- **Aesthetics:** Clean, modern, and user-friendly. The design prioritizes readability and ease of use.
- **Layout:** Responsive design that works well on both desktop and mobile devices.
- **Typography:** Uses a system font stack for performance and a native feel.
- **Color Palette:** A simple and clean palette with a primary color used for highlights and calls-to-action.
- **File:** `css/style.css`

## Current Plan: Finalization and Deployment

1.  **Review and Refine:** The core structure, features, and content are now complete. The next step would be a thorough review of all pages and functionality to ensure there are no broken links or bugs.

2.  **Deployment:** Once the site is confirmed to be working correctly, it will be deployed to a web server. (This step would typically involve using a service like Firebase Hosting or Netlify).

3.  **AdSense Application:** With the site live and populated with high-quality content, the final step is to apply for Google AdSense.
