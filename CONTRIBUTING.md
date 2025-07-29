# Contributing to PWA Kit

Thank you for your interest in contributing to PWA Kit! We welcome contributions from the community and are excited to see what you'll bring to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Web Server** - Any static file server (Apache, Nginx, Node.js, Python, etc.)
- **HTTPS Support** - Required for service worker testing
- **Modern Browser** - Chrome, Firefox, Safari, or Edge
- **Git** - For version control
- **Text Editor** - VS Code, Sublime Text, or your preferred editor

### Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pwa_kit.git
   cd pwa_kit
   ```
3. **Set up the upstream remote**:
   ```bash
   git remote add upstream https://github.com/ftaisdeal/pwa_kit.git
   ```
4. **Test the setup** by serving the files locally with HTTPS

## 🛠️ Development Setup

### Local Development Server

Choose one of these methods to serve the PWA locally with HTTPS:

#### Option 1: Python HTTPS Server
```bash
# Generate self-signed certificate (first time only)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Serve with HTTPS
python3 -m http.server 8000 --bind 127.0.0.1
# Then use a reverse proxy for HTTPS or use a tool like mkcert
```

#### Option 2: Node.js with http-server
```bash
npm install -g http-server
http-server -S -C cert.pem -K key.pem -p 8000
```

#### Option 3: VS Code Live Server Extension
- Install the "Live Server" extension
- Configure it to use HTTPS
- Right-click `index.html` and select "Open with Live Server"

### Testing Your Setup

1. Open `https://localhost:8000` in your browser
2. Accept the self-signed certificate warning
3. Verify that:
   - Service worker registers successfully
   - Connectivity detection works
   - PWA can be installed
   - Offline functionality works

## 💡 How to Contribute

### Types of Contributions We Welcome

- 🐛 **Bug fixes** - Help us squash those pesky bugs
- ✨ **New features** - Enhance the PWA kit with new functionality
- 📚 **Documentation** - Improve our guides and examples
- 🎨 **UI/UX improvements** - Make the kit more user-friendly
- 🔧 **Performance optimizations** - Speed up load times and responsiveness
- 🧪 **Testing** - Add tests and improve test coverage
- 🌐 **Browser compatibility** - Ensure cross-browser support
- 📱 **Accessibility** - Make the kit more accessible

### Before You Start

1. **Check existing issues** to see if your idea/bug is already being worked on
2. **Create an issue** to discuss major changes before implementing
3. **Keep pull requests focused** - one feature/fix per PR
4. **Follow our coding standards** (see below)

## 🔄 Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clean, readable code
- Follow our coding standards
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

- Test in multiple browsers
- Verify service worker functionality
- Check offline capabilities
- Ensure Lighthouse PWA score remains high

### 4. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add network quality indicator to connectivity status"
# or
git commit -m "fix: resolve service worker update loop issue"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin your-branch-name
```

Then create a pull request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots/GIFs for UI changes
- Testing instructions

### 6. Code Review Process

- Maintainers will review your PR
- Address any feedback promptly
- Make requested changes in new commits
- Once approved, your PR will be merged

## 📝 Issue Guidelines

### Before Creating an Issue

- Search existing issues to avoid duplicates
- Check if the issue exists in the latest version
- Test in multiple browsers if it's a bug

### Bug Reports

Please include:
- **Clear description** of the bug
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Browser and version** information
- **Screenshots or recordings** if helpful
- **Console errors** if any

### Feature Requests

Please include:
- **Clear description** of the proposed feature
- **Use case** - why would this be beneficial?
- **Possible implementation** ideas (optional)
- **Alternatives considered**

## 📏 Coding Standards

### JavaScript

- Use **ES6+ features** where appropriate
- Use **async/await** instead of promises when possible
- Add **JSDoc comments** for functions
- Use **descriptive variable names**
- Follow **consistent indentation** (2 spaces)

```javascript
/**
 * Checks network connectivity using multiple endpoints
 * @returns {Promise<boolean>} True if connected, false otherwise
 */
async function checkConnectivity() {
  // Implementation here
}
```

### CSS

- Use **semantic class names**
- Follow **mobile-first** responsive design
- Use **CSS custom properties** for theming
- Keep **selectors simple** and avoid deep nesting

### HTML

- Use **semantic HTML5** elements
- Include **proper accessibility** attributes
- Ensure **valid markup**
- Optimize for **screen readers**

### Service Worker

- Handle **all error cases** gracefully
- Use **appropriate caching strategies**
- Include **meaningful console logs**
- Test **offline scenarios** thoroughly

## 🧪 Testing

### Manual Testing Checklist

- [ ] Service worker registers without errors
- [ ] Connectivity detection works online/offline
- [ ] PWA can be installed on mobile/desktop
- [ ] Offline functionality works as expected
- [ ] Lighthouse PWA score is 100
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Responsive design works on all screen sizes
- [ ] No console errors or warnings

### Performance Testing

- Run Lighthouse audits
- Test on slow network connections
- Verify fast loading times
- Check memory usage

## 📚 Documentation

When contributing:

- Update relevant documentation
- Add JSDoc comments to functions
- Update README if adding features
- Include examples for new functionality
- Keep documentation clear and concise

## 🌟 Community

### Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and general discussion
- **Email** - For security issues (see SECURITY.md)

### Recognition

Contributors will be:
- Listed in the contributors section
- Credited in release notes for significant contributions
- Invited to be maintainers for consistent, quality contributions

## 📜 License

By contributing to PWA Kit, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Your contributions make PWA Kit better for everyone. We appreciate your time and effort in helping improve this project!

---

**Questions?** Feel free to reach out by creating an issue or starting a discussion. We're here to help!
