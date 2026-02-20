class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        /* Add your header styles here */
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .logo {
          font-weight: bold;
          font-size: 1.5rem;
        }
        .logo a {
            text-decoration: none;
            color: #333;
        }
        nav a {
          margin: 0 1rem;
          text-decoration: none;
          color: #555;
          font-weight: 500;
        }
        nav a:hover, nav a.active {
            color: #007bff;
        }
      </style>
      <header>
        <div class="logo"><a href="/">StudyHub</a></div>
        <nav>
          <a href="/" data-i18n="home_nav">홈</a>
          <a href="/blog.html" data-i18n="blog_nav">블로그</a>
          <a href="/tool.html" data-i18n="tool_nav">복습 도구</a>
        </nav>
      </header>
    `;
  }

  connectedCallback() {
    this.updateActiveLink();
    this.translate();
  }

  updateActiveLink() {
    const navLinks = this.shadowRoot.querySelectorAll('nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }

  async translate() {
      // Simple i18n implementation
      const response = await fetch(`/locales/ko.json`);
      const translations = await response.json();
      this.shadowRoot.querySelectorAll('[data-i18n]').forEach(elem => {
          const key = elem.getAttribute('data-i18n');
          if (translations[key]) {
              elem.textContent = translations[key];
          }
      });
  }
}

customElements.define('site-header', SiteHeader);
