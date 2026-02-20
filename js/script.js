class SiteHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
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
      </style>
      <header>
        <nav>
          <a href="/" class="logo">StudyHub</a>
          <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/tool.html">Review Tool</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
        </nav>
      </header>
    `;
    shadow.appendChild(template.content.cloneNode(true));
  }
}

class SiteFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
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
          <li><a href="/privacy.html">Privacy Policy</a></li>
          <li><a href="/terms.html">Terms of Service</a></li>
        </ul>
        <p>&copy; ${new Date().getFullYear()} StudyHub. All rights reserved.</p>
      </footer>
    `;
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);