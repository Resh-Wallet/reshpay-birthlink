Here's a comprehensive prompt and summary for building your BirthLink Ghana prototype with Next.js:

## 🚀 **BirthLink Ghana - Next.js Prototype Development Brief**

### **Project Summary**
You are building **BirthLink Ghana**, an AI-powered Progressive Web App for birth registration in Ghana's healthcare system. The app enables healthcare workers to register newborns immediately at point of care, integrating with existing health systems (LHIMS) and Ghana's Birth & Death Registry. Key features include offline-first functionality, AI document scanning, and instant certificate generation.

### **Core Technical Requirements**
- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **PWA**: Next-PWA for offline capabilities
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **File Upload**: For document scanning and batch CSV uploads
- **State Management**: Redux-toolkit for client state
- **Forms**: React Hook Form + Zod validation

---

## 🎯 **Development Prompt for AI Agent**

```
Build a Next.js 15 Progressive Web App for "BirthLink Ghana" - an AI-powered birth registration system for healthcare workers in Ghana. 

CORE FUNCTIONALITY:
1. Birth registration forms with mother/father/baby information
2. AI document scanning interface for extracting data from medical records
3. Offline-first capability with sync indicators
4. Integration endpoints for LHIMS and Birth & Death Registry APIs
5. Certificate generation and printing
6. Batch CSV upload for multiple registrations
7. Dashboard with registration statistics and pending syncs

TECHNICAL STACK:
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS + shadcn/ui for consistent design system
- Prisma with PostgreSQL for database
- NextAuth.js for authentication
- React Hook Form + Zod for form validation
- Redux-Toolkit for state management
- Next-PWA for offline capabilities

DESIGN REQUIREMENTS:
- Implement both dark and light themes using shadcn's theming system
- Mobile-first responsive design optimized for healthcare workers
- Consistent component library using shadcn/ui (Button, Form, Card, Dialog, etc.)
- Professional medical-grade UI with Ghana-appropriate colors (green, gold, red accents)
- High contrast for outdoor visibility on mobile devices
- Touch-friendly interfaces with minimum 44px touch targets

KEY PAGES TO BUILD:
### Proper role base authentication.
/auth/signup - users sign up
/auth/signin - users signin


1. /dashboard - Main overview with stats and quick actions
2. /dashbaord/register - Step-by-step birth registration form
3. /dashbaord/scan - AI document scanning interface
4. /dashbaord/certificates - Certificate generation and management
5. /dashbaord/batch - CSV bulk upload interface
6. /dashbaord/sync - Offline sync management
7. /dashbaord/settings - App configuration and theme toggle

CRITICAL FEATURES:
- Offline data persistence using IndexedDB
- Form auto-save and recovery
- Real-time validation with Ghana-specific rules
- Theme persistence across sessions
- PWA installation prompts
- Loading states and error boundaries
- Accessibility compliance (WCAG 2.1)

COMPONENT ARCHITECTURE:
- Use shadcn/ui as base component library
- Custom healthcare-specific components extending shadcn
- Consistent spacing using Tailwind's design tokens
- Reusable form components for different registration sections
- Smart loading skeletons and error states

DATA STRUCTURE:
Create TypeScript interfaces for:
- BirthRegistration (baby, mother, father details)
- User (healthcare worker authentication)
- Certificate (generated documents)
- SyncQueue (offline data management)

PERFORMANCE PRIORITIES:
- Code splitting for optimal loading
- Image optimization for scanned documents
- Efficient offline storage strategies
- Progressive enhancement for slow networks

GHANA-SPECIFIC CONSIDERATIONS:
- Support for local names in Twi, Ga, Ewe languages
- Ghana Health Insurance Scheme (NHIS) number validation
- Local date/time formats
- Cultural naming conventions
- Government document formatting standards

Ensure every component uses shadcn/ui patterns, maintains theme consistency, and follows Next.js best practices for performance and SEO. Prioritize user experience for healthcare workers in challenging environments.
```

---

## 📋 **Implementation Checklist**

### **Phase 1: Foundation Setup**
- [ ] Next.js 15 project with TypeScript
- [ ] shadcn/ui installation and configuration
- [ ] Dark/light theme setup with persistence
- [ ] PWA configuration with next-pwa
- [ ] Database schema with Prisma
- [ ] Authentication setup with Betterauth

### **Phase 2: Core Components**
- [ ] Layout with consistent navigation
- [ ] Registration form with multi-step wizard
- [ ] Document scanning interface
- [ ] Dashboard with statistics cards
- [ ] Theme toggle component
- [ ] Offline indicator component

### **Phase 3: Advanced Features**
- [ ] Batch upload with CSV processing
- [ ] Certificate generation with templates
- [ ] Sync queue management
- [ ] Error handling and loading states
- [ ] Form validation with Ghana-specific rules
- [ ] Mobile-optimized camera integration

### **Phase 4: Optimization**
- [ ] Performance monitoring
- [ ] Accessibility testing
- [ ] PWA installation flow
- [ ] Offline functionality testing
- [ ] Cross-browser compatibility
- [ ] Mobile device testing

---

## 🎨 **Design System Specifications**

### **Color Palette (Ghana-Inspired)**
```css
/* Primary - Ghana Green */
--primary: 142 76% 36%        /* #16a34a */
--primary-foreground: 355 0% 100%

/* Secondary - Ghana Gold */
--secondary: 45 93% 58%       /* #fcd34d */
--secondary-foreground: 26 83% 14%

/* Accent - Ghana Red */
--accent: 0 84% 60%           /* #ef4444 */
--accent-foreground: 0 0% 100%

/* Medical Blue */
--medical: 217 91% 60%        /* #3b82f6 */
--medical-foreground: 0 0% 100%
```

### **Component Priorities**
1. **Forms**: Extensive use of shadcn Form, Input, Select, Textarea
2. **Navigation**: Sheet, Dialog, Drawer for mobile-friendly navigation
3. **Data Display**: Card, Table, Badge for information presentation
4. **Feedback**: Toast, Alert, Progress for user notifications
5. **Controls**: Button, Switch, Checkbox for interactions

### **Mobile-First Breakpoints**
```css
sm: 640px   /* Small tablets */
md: 768px   /* Large tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
```

---

## 🔧 **Key Technical Patterns**

### **Theme Implementation**
```typescript
// Use shadcn's theme provider with persistence
import { ThemeProvider } from "next-themes"
// Ensure theme toggles work across all components
// Implement theme-aware document scanning interface
```

### **Offline-First Pattern**
```typescript
// Implement service worker for offline functionality
// Use IndexedDB for local data storage
// Sync queue for when connectivity returns
// Show clear offline/online indicators
```

### **Form Management**
```typescript
// React Hook Form with Zod validation
// Multi-step form with progress indicators
// Auto-save and form recovery
// Ghana-specific validation rules
```

This comprehensive brief ensures your development agent understands the full scope while prioritizing speed, consistency, and the specific requirements for Ghana's healthcare context. The focus on shadcn/ui will ensure rapid development with professional, accessible components.