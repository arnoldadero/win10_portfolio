# Windows 10 Portfolio

An interactive personal portfolio website designed to emulate the Windows 10 desktop experience. Built with React and optimized with Bun.

## 🚀 Features

- **Windows 10 Interface**: Fully functional Taskbar, Start Menu, and Desktop.
- **Interactive Applications**:
  - **Notepad**: Text editor built with Quill.js.
  - **Spreadsheet**: Interactive grid using React Spreadsheet.
  - **Music**: Integrated JioSaavn player.
  - **Code**: Embedded Github1s for project viewing.
- **Window Management**: Draggable, resizable, and minimizable windows.
- **Theming**: Authentic Windows 10 styles using Fluent UI and UIKit.
- **Performance**: Automated image optimization (WebP) and fast dependency management via Bun.
- **Analytics**: Google Analytics 4 integration.

## ⚡ Performance Optimizations (Mobile-First)

This portfolio has been heavily optimized for Core Web Vitals, achieving high Lighthouse scores (~90+ on Mobile).

- **Critical Rendering Path**: Inlined critical CSS and font preloads to minimize First Contentful Paint (FCP).
- **Code Splitting**: Route-based chunking for Desktop, LockScreen, and 404 pages reduces initial bundle size.
- **Lazy Loading**: Heavy components (like the Music player) and non-critical scripts (Google Analytics) are loaded only when needed or during browser idle time.
- **Modern Build**: Targets modern browsers to reduce legacy polyfill overhead, with `react-snap` for static pre-rendering.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Frontend**: [React 18](https://reactjs.org/)
- **State Management**: [Redux](https://redux.js.org/)
- **Styling**: [Sass](https://sass-lang.com/), [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/), [UIKit](https://getuikit.com/)
- **Components**: [React Draggable](https://github.com/react-grid-layout/react-draggable), [React Contexify](https://github.com/fkhadra/react-contexify)
- **Deployment**: [Render](https://render.com/)
- **Build Optimization**: [React Snap](https://github.com/stereobooster/react-snap)

## 🏁 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/win10_portfolio.git
cd win10_portfolio

# Install dependencies
bun install
```

### Running the Project

```bash
# Start development server
bun start
```

### Building for Production

```bash
# Build and optimize
bun run build
```

## 🖼️ Image Optimization

The project includes a custom script to optimize images into WebP format for better performance.

```bash
node scripts/optimize-images.js
```

## 📜 Credits

This project utilizes several open-source libraries:
- [React Spreadsheet](https://www.npmjs.com/package/react-spreadsheet)
- [React Draggable](https://www.npmjs.com/package/react-draggable)
- [React Contexify](https://www.npmjs.com/package/react-contexify)
- [React Live Clock](https://www.npmjs.com/package/react-live-clock)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Arnold Adero
