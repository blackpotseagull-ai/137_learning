
// --- I18n ---
const translations = {};

async function loadTranslations(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translation file for ${lang}`);
    }
    const data = await response.json();
    translations[lang] = data;
    return data;
  } catch (error) {
    console.error(error);
    // Fallback to English if loading fails
    if (lang !== 'en') {
      return await loadTranslations('en');
    }
  }
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  // Function to translate elements
  const translateElements = (rootElement) => {
    rootElement.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        // Handle specific attributes like placeholder or title
        if (el.hasAttribute('data-i18n-target')) {
            const targetAttr = el.getAttribute('data-i18n-target');
            el.setAttribute(targetAttr, t[key]);
        } else {
            // Default to textContent
            el.textContent = t[key];
        }
      }
    });
  };

  // Translate the main document
  translateElements(document);

  // Translate Web Components
  document.querySelectorAll('site-header, site-footer').forEach(component => {
      if (component.shadowRoot) {
          translateElements(component.shadowRoot);
      }
  });

  // Special case for meta tags and title
  const siteTitle = document.querySelector('title');
  if (siteTitle && t.site_title) siteTitle.textContent = t.site_title;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t.meta_description) metaDesc.setAttribute('content', t.meta_description);
  
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords && t.meta_keywords) metaKeywords.setAttribute('content', t.meta_keywords);
}

async function setLanguage(lang) {
  if (!translations[lang]) {
    await loadTranslations(lang);
  }
  applyTranslations(lang);
  localStorage.setItem('preferredLanguage', lang);
  // Update lang attribute on <html> for CSS selectors if needed
  document.documentElement.lang = lang;
}

// --- Web Components ---

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #f8f9fa;
          padding: 1rem;
          border-bottom: 1px solid #dee2e6;
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 960px;
          margin: 0 auto;
        }
        .logo {
          font-weight: bold;
          font-size: 1.5rem;
          text-decoration: none;
          color: #212529;
        }
        .nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .nav-links li {
          margin-left: 1.5rem;
        }
        .nav-links a {
          text-decoration: none;
          color: #495057;
          font-weight: 500;
        }
        .nav-links a:hover {
            color: #007bff;
        }
        .lang-switcher button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            color: #495057;
            padding: 0.25rem 0.5rem;
        }
         .lang-switcher button:hover, .lang-switcher button.active {
            color: #007bff;
            text-decoration: underline;
        }
      </style>
      <header>
        <nav>
          <a href="/" class="logo">StudyHub</a>
          <ul class="nav-links">
            <li><a href="/" data-i18n="nav_home">Home</a></li>
            <li><a href="/tool.html" data-i18n="nav_tool">Review Tool</a></li>
            <li><a href="/blog.html" data-i18n="nav_blog">Blog</a></li>
            <li><a href="/about.html" data-i18n="nav_about">About</a></li>
            <li class="lang-switcher">
                <button id="lang-en">EN</button>
                <span>|</span>
                <button id="lang-ko">KO</button>
            </li>
          </ul>
        </nav>
      </header>
    `;
    this.shadowRoot.innerHTML = ''; // Clear previous content
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addEventListeners();
  }

  addEventListeners() {
      this.shadowRoot.querySelector('#lang-en').addEventListener('click', () => setLanguage('en'));
      this.shadowRoot.querySelector('#lang-ko').addEventListener('click', () => setLanguage('ko'));
  }

  connectedCallback() {
      // Apply translation when component is ready
      const preferredLanguage = localStorage.getItem('preferredLanguage') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
      if (translations[preferredLanguage]) {
          applyTranslations(preferredLanguage);
      }
  }
}

class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #f8f9fa;
          padding: 2rem 1rem;
          border-top: 1px solid #dee2e6;
          text-align: center;
          color: #6c757d;
          font-size: 0.9rem;
          margin-top: 2rem;
        }
        .footer-links {
          list-style: none;
          margin: 0 0 1rem 0;
          padding: 0;
          display: flex;
          justify-content: center;
        }
        .footer-links li {
          margin: 0 1rem;
        }
        .footer-links a {
          text-decoration: none;
          color: #495057;
        }
        .footer-links a:hover {
            color: #007bff;
        }
      </style>
      <footer>
        <ul class="footer-links">
          <li><a href="/privacy.html" data-i18n="footer_privacy">Privacy Policy</a></li>
          <li><a href="/terms.html" data-i18n="footer_terms">Terms of Service</a></li>
        </ul>
        <p>&copy; ${new Date().getFullYear()} StudyHub. All rights reserved.</p>
      </footer>
    `;
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
  connectedCallback() {
      // Apply translation when component is ready
      const preferredLanguage = localStorage.getItem('preferredLanguage') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
      if (translations[preferredLanguage]) {
          applyTranslations(preferredLanguage);
      }
  }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  // Define custom elements
  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
  
  // Set the initial language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
  setLanguage(preferredLanguage);
});

// Expose setLanguage globally so components can call it
window.setLanguage = setLanguage;
