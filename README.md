# Ffsd Travels React - Travel Booking Platform

A modern, feature-rich travel booking platform built with React, Vite, and Bootstrap. This application provides comprehensive travel services including hotel bookings, flight reservations, car rentals, property listings, and destination guides.

## Features

- **Multi-Service Booking Platform**
  - Hotel listings and detailed property pages
  - Flight search and booking
  - Car rental services
  - Vacation rental properties
  - Destination guides and travel information

- **User Management**
  - User authentication (Login, Register, Two-Factor Authentication)
  - Profile management
  - Booking history
  - Wishlist functionality
  - Payment details management
  - Traveler information management

- **Modern UI/UX**
  - Responsive design with Bootstrap 5
  - Multiple landing page variations
  - Interactive search components
  - Real-time form validation
  - Smooth navigation with React Router

- **Performance Optimizations**
  - Route-level code splitting with React.lazy()
  - Optimized bundle size
  - Fast page loads

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.5
- **UI Framework**: Bootstrap 5.3.8, React Bootstrap 2.10.10
- **Date Picker**: React Flatpickr 4.0.11
- **Styling**: SCSS/SASS

## Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Javascript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── assets/           # Static assets (images, CSS, SCSS)
├── components/       # Reusable React components
│   ├── Header/      # Header components including modals
│   ├── Footer/      # Footer components
│   ├── Layout/      # Layout wrapper components
│   └── TravelerSelector.jsx  # Traveler selection component
├── pages/           # Page components organized by feature
│   ├── Auth/        # Authentication pages
│   ├── Hotel/       # Hotel-related pages
│   ├── Flights/     # Flight-related pages
│   ├── Car/         # Car rental pages
│   ├── Property/    # Property rental pages
│   ├── Destination/ # Destination pages
│   ├── Profile/     # User profile pages
│   ├── Blog/        # Blog pages
│   └── Menu/        # Home page variations
├── App.jsx          # Main app component with routing
└── main.jsx         # Application entry point
```

## Key Components

### TravelerSelector
A React component for selecting travelers and rooms. Replaces the deprecated `useTravelerDropdown` hook with proper React state management.

**Usage:**
```jsx
import { TravelerSelector } from './components/TravelerSelector';

<TravelerSelector 
  hasRooms={false} 
  defaultValue="1 Adult"
  onApply={(rooms, summary) => console.log(rooms, summary)}
/>
```

### Route Configuration
All routes are configured in `App.jsx` with lazy loading for optimal performance. Each route is code-split and loaded on demand.

## Customization

### Styling
- Main stylesheet: `src/assets/scss/style.scss`
- Bootstrap customization: Modify SCSS variables in the stylesheet
- Component-specific styles: Use CSS modules or inline styles

### Adding New Pages
1. Create a new component in the appropriate `pages/` subdirectory
2. Add a lazy import in `App.jsx`
3. Add a route in the `<Routes>` component

### Environment Configuration
Create a `.env` file in the root directory for environment variables:
```
VITE_API_URL=your_api_url
VITE_APP_NAME=Ffsd Travels
```

## Development Guidelines

### Code Standards
- Use functional components with hooks
- Avoid direct DOM manipulation (use React refs and state)
- Remove unnecessary React imports (React 17+ doesn't require them)
- Use proper JSX attribute names (e.g., `tabIndex` not `tabindex`)
- Connect form inputs to React state for proper validation

### Best Practices
- Use React.lazy() for route-level code splitting
- Implement proper error boundaries
- Validate form inputs with React state
- Use semantic HTML elements
- Follow accessibility guidelines

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure code follows project standards
4. Test thoroughly
5. Submit a pull request

## License

[Add your license information here]

## Support

For issues, questions, or contributions, please [create an issue](link-to-issues) or contact the development team.
