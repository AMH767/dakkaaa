class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(255, 255, 255, 0.98);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 15px rgba(0,0,0,0.08);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .logo {
          color: #b58f76;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.5rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        .logo:hover {
          color: #85654d;
          transform: scale(1.02);
        }
.logo-icon {
          margin-right: 0.5rem;
        }
        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: #6b513a;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }
        a:hover {
          color: #b58f76;
          background: rgba(181, 143, 118, 0.08);
          transform: translateY(-2px);
        }
        a::before {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: #b58f76;
          transition: width 0.3s ease;
        }
        a:hover::before {
          width: 80%;
        }
        a.active {
          color: #b58f76;
        }
        a.active::before {
          width: 80%;
          background-color: #b58f76;
        }
        .nav-button {
          display: none;
          background: none;
          border: none;
          color: #6b513a;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem;
        }
        .nav-button:hover {
          color: #b58f76;
          transform: scale(1.1);
        }
        @media (max-width: 1024px) {
          ul {
            gap: 1rem;
          }
        }
        
        @media (max-width: 768px) {
          nav {
            padding: 1rem;
          }
          .logo {
            font-size: 1.3rem;
          }
          ul {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            flex-direction: column;
            align-items: center;
            padding-top: 2rem;
            gap: 1.5rem;
            transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(12px);
          }
          ul.active {
            left: 0;
          }
          a {
            font-size: 1.2rem;
            padding: 0.8rem 1.5rem;
          }
          .nav-button {
            display: block;
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .logo {
            font-size: 1.2rem;
          }
          a {
            font-size: 1.1rem;
            padding: 0.7rem 1.2rem;
          }
        }
</style>
        <nav>
        <a href="/" class="logo">
          <i data-feather="compass" class="logo-icon"></i> <span>DACeramic</span>
        </a>
        <button class="nav-button" id="menu-toggle" aria-label="Меню">
          <i data-feather="menu"></i>
        </button>
        <ul id="nav-menu">
          <li><a href="#about" class="transition-all">О студии</a></li>
          <li><a href="#gallery" class="transition-all">Галерея</a></li>
          <li><a href="#classes" class="transition-all">Мастер-классы</a></li>
          <li><a href="#contact" class="transition-all">Контакты</a></li>
        </ul>
      </nav>
`;
    
    // Initialize menu toggle for mobile
    const menuToggle = this.shadowRoot.getElementById('menu-toggle');
    const navMenu = this.shadowRoot.getElementById('nav-menu');
    
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      feather.replace();
    });
    
    // Close menu when clicking a link (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Set active state
        navMenu.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      });
    });
    
    // Highlight current section in nav
    window.addEventListener('scroll', () => {
      const fromTop = window.scrollY + 100;
      const navLinks = this.shadowRoot.querySelectorAll('ul li a');
      
      navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (
          section &&
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    });
}
}
// Initialize first active link
setTimeout(() => {
  const nav = document.querySelector('custom-navbar').shadowRoot;
  if (nav) {
    const firstLink = nav.querySelector('ul li a');
    if (firstLink) firstLink.classList.add('active');
  }
}, 300);

customElements.define('custom-navbar', CustomNavbar);
