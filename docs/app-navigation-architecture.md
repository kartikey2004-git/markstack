# App Navigation Architecture

## Overview

MarkStack has been refactored from a top navbar layout to a modern sidebar-first navigation pattern, similar to Linear, Vercel Dashboard, and Notion. This improves the user experience for content-heavy applications and provides better organization of features.

## Route Structure

### Public Routes `(public)`
- `/` - Landing page with hero, features, and FAQ
- `/blogs` - Public blog viewing
- `/share/[id]` - Shared content viewing
- `/canvas/[id]` - Public canvas viewing

### Protected Routes `(protected)`
All authenticated user routes are now organized under the protected route group:

#### Workspace
- `/dashboard` → redirects to `/dashboard/blogs`
- `/dashboard/blogs` - Blog management
- `/editor` - Markdown editor
- `/editor/[id]` - Edit specific post

#### Productivity
- `/canvases` - Canvas list and management
- `/canvas/new` - Create new canvas
- `/canvas/[id]` - Individual canvas editing
- `/todos` - Todo planner with calendar

#### Account
- `/settings` - User settings (route exists but needs implementation)

### Authentication Routes `(authentication)`
- `/auth/login` - User login
- `/auth/signup` - User registration

## Sidebar Navigation Groups

The sidebar is organized by user intent rather than technical implementation:

### Workspace Group
- **Dashboard**: Overview and entry point
- **Editor**: Content creation tools
- **Blogs**: Content management and publishing

### Productivity Group
- **Canvases**: Visual workspace and collaboration
- **Todo Planner**: Task management and organization

### Account Group
- **Settings**: User preferences and configuration

## Layout Architecture

### Root Layout (`app/layout.tsx`)
- Global providers (Theme, Tooltip)
- Font configuration
- Toast notifications

### Protected Layout (`app/(protected)/layout.tsx`)
- Uses `AppSidebar` component
- Wraps all authenticated routes

### Public Layout (`app/(public)/layout.tsx`)
- Uses traditional `Navbar` component
- Maintains marketing/landing page experience

### Authentication Layout (`app/(authentication)/layout.tsx`)
- Minimal header with branding
- Theme toggle
- Optimized for conversion

## Sidebar Component (`components/app-sidebar.tsx`)

### Features
- **Responsive Design**: Desktop sidebar + mobile drawer
- **Collapsible**: Users can collapse sidebar for more screen space
- **Active Route Highlighting**: Visual indication of current page
- **Grouped Navigation**: Logical organization of features
- **User Controls**: Theme toggle and user menu in footer

### Technical Implementation
- Built with shadcn/ui sidebar primitives
- Uses `SidebarProvider` for state management
- Implements `usePathname()` for active route detection
- Responsive design with mobile-first approach

## Navigation Behavior

### Desktop
- Sidebar always visible (256px width)
- Collapsible to icon-only mode (48px width)
- Main content area takes remaining space
- Sticky header with sidebar trigger

### Mobile
- Sidebar hidden by default
- Accessible via hamburger menu
- Full-screen drawer overlay
- Smooth transitions and animations

## Route Protection

Routes are organized using Next.js App Router route groups:

- `(protected)` - Requires authentication
- `(public)` - Accessible without authentication  
- `(authentication)` - Auth-specific pages

This ensures proper access control and clean URL structure.

## Migration Notes

### What Changed
- Replaced `DashboardShell` with `AppSidebar`
- Moved `/todos` and `/canvases` into protected route group
- Organized navigation into logical user groups
- Maintained all existing functionality

### What Stayed the Same
- All API routes unchanged
- Database logic intact
- Authentication flow preserved
- Public pages still use navbar

## Benefits

1. **Better UX**: Sidebar-first navigation for content apps
2. **Improved Organization**: Logical grouping of features
3. **Mobile Optimized**: Responsive drawer for mobile devices
4. **Modern Feel**: Consistent with modern SaaS applications
5. **Scalable**: Easy to add new navigation items

## Future Enhancements

- Keyboard shortcuts for navigation
- Search functionality in sidebar
- Recent items navigation
- Customizable sidebar sections
- Team/workspace switching
