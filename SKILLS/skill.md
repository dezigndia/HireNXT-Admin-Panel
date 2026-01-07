# HireNXT Admin Panel - Development Skills & Standards

**Version:** 1.0
**Last Updated:** January 2026
**Purpose:** Prescriptive style guide defining enterprise-grade development standards for the HireNXT Admin Panel

---

## Table of Contents

1. [Typography System](#1-typography-system)
2. [Ant Design Customization](#2-ant-design-customization)
3. [Color System & Design Tokens](#3-color-system--design-tokens)
4. [Styling Standards](#4-styling-standards)
5. [Motion & Animation](#5-motion--animation)
6. [Layout & Spacing](#6-layout--spacing)
7. [Component Patterns](#7-component-patterns)
8. [Form Standards](#8-form-standards)
9. [Icons & Visual Elements](#9-icons--visual-elements)
10. [Enterprise Development](#10-enterprise-development)
11. [Code Quality & Best Practices](#11-code-quality--best-practices)
12. [Security Best Practices](#12-security-best-practices)
13. [Git Workflow & Version Control](#13-git-workflow--version-control)
14. [Development Workflow & Tooling](#14-development-workflow--tooling)

---

## 1. Typography System

### Font Families

```javascript
// Primary font family
fontFamily: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

// Monospace/Code
fontFamilyCode: 'source-code-pro', Menlo, Monaco, Consolas, 'Courier New', monospace
```

### Type Scale (T-shirt Sizing)

Use consistent font sizes across the application:

| Size | Value | Usage | Example |
|------|-------|-------|---------|
| `xs` | 12px | Captions, helper text, badges | Form helper text, timestamps |
| `sm` | 14px | Body text, form inputs | Paragraph text, input fields |
| `base` | 16px | Default body | Primary content |
| `lg` | 18px | Large body, subheadings | Section introductions |
| `xl` | 20px | Small headings | Card titles |
| `2xl` | 24px | H3 headings | Modal titles |
| `3xl` | 30px | H2 headings | Page titles |
| `4xl` | 36px | H1 headings | Landing page headings |
| `5xl` | 48px | Display headings | Hero sections |

### Font Weight Scale

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions |
| Medium | 500 | Emphasized text, labels |
| Semibold | 600 | Subheadings, important UI text |
| Bold | 700 | Headings, section titles |
| Extrabold | 800 | Display text, CTA buttons |

### Line Height Standards

| Name | Value | Usage |
|------|-------|-------|
| Tight | 1.25 | Headings, titles |
| Normal | 1.5 | Body text, descriptions |
| Relaxed | 1.75 | Long-form content, articles |

### Letter Spacing

```css
/* Headings */
letter-spacing: -0.02em;

/* Body text */
letter-spacing: normal;

/* Uppercase labels/buttons */
letter-spacing: 0.05em;
```

### Typography Components

**✅ DO:**
```javascript
import { Typography } from 'antd';
const { Title, Text, Paragraph } = Typography;

<Title level={2}>User Management</Title>
<Text type="secondary">Last updated: 2 hours ago</Text>
<Paragraph>Detailed description goes here...</Paragraph>
```

**❌ DON'T:**
```javascript
// Avoid using generic HTML tags without semantic meaning
<div style={{ fontSize: '24px', fontWeight: 700 }}>User Management</div>
<span style={{ color: '#666' }}>Last updated: 2 hours ago</span>
```

---

## 2. Ant Design Customization

### Theme Configuration

Configure Ant Design theme tokens in `App.js` using ConfigProvider:

```javascript
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      // Brand Colors
      colorPrimary: '#014C75',
      colorLink: '#01D9A9',
      colorSuccess: '#52C41A',
      colorWarning: '#FAAD14',
      colorError: '#FF4D4F',
      colorInfo: '#1890FF',

      // Typography
      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: 14,
      fontSizeHeading1: 36,
      fontSizeHeading2: 30,
      fontSizeHeading3: 24,
      fontSizeHeading4: 20,
      fontSizeHeading5: 16,

      // Layout
      borderRadius: 8,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,

      // Spacing
      padding: 16,
      paddingLG: 24,
      paddingSM: 12,
      paddingXS: 8,
      margin: 16,
      marginLG: 24,
      marginSM: 12,
      marginXS: 8,

      // Shadows
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
      boxShadowSecondary: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    },
    components: {
      Button: {
        controlHeight: 40,
        borderRadius: 8,
        fontWeight: 600,
      },
      Input: {
        controlHeight: 40,
        borderRadius: 8,
      },
      Table: {
        headerBg: '#F8F9FD',
        headerColor: '#014C75',
        rowHoverBg: '#F0F9FF',
      },
      Card: {
        borderRadius: 12,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
      },
    },
  }}
>
  {/* Your app */}
</ConfigProvider>
```

### Design Token Structure

Create centralized design tokens in `frontend/src/theme/`:

**colors.js:**
```javascript
export const colors = {
  // Brand
  primary: {
    50: '#E6F7FF',
    100: '#BAE7FF',
    500: '#014C75', // Main brand color
    700: '#003A5D',
    900: '#002B45',
  },
  secondary: {
    50: '#E6FFFB',
    100: '#B3FFF5',
    500: '#01D9A9', // Accent color
    700: '#00B88A',
    900: '#00976F',
  },
  // Neutral grays
  gray: {
    50: '#FAFAFA',
    100: '#F8F9FD',
    200: '#E4E7EB',
    300: '#CBD2D9',
    400: '#9AA5B1',
    500: '#6C6C6C',
    600: '#52606D',
    700: '#3E4C59',
    800: '#272727',
    900: '#191919',
  },
  // Semantic
  success: '#52C41A',
  warning: '#FAAD14',
  error: '#FF4D4F',
  info: '#1890FF',
  // Functional
  background: {
    light: '#FFFFFF',
    page: '#F8F9FD',
    dark: '#002B22',
  },
  text: {
    primary: '#191919',
    secondary: '#6C6C6C',
    inverse: '#FFFFFF',
  },
  border: {
    default: '#E4E7EB',
    focus: '#014C75',
    error: '#FF4D4F',
  },
};
```

**spacing.js:**
```javascript
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
};
```

**shadows.js:**
```javascript
export const shadows = {
  sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0px 2px 8px rgba(0, 0, 0, 0.08)',
  md: '0px 4px 16px rgba(0, 0, 0, 0.12)',
  lg: '0px 8px 24px rgba(0, 0, 0, 0.16)',
  xl: '0px 16px 48px rgba(0, 0, 0, 0.20)',
};
```

**borders.js:**
```javascript
export const borders = {
  radius: {
    none: '0px',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  width: {
    thin: '1px',
    base: '2px',
    thick: '3px',
  },
};
```

**index.js:**
```javascript
export { colors } from './colors';
export { spacing } from './spacing';
export { shadows } from './shadows';
export { borders } from './borders';
export { motion } from './motion';
```

### Component Customization Patterns

**When to use ConfigProvider vs Styled Components:**

- **ConfigProvider**: Global theme changes affecting all components
- **Styled Components**: Component-specific customization, unique variants

**✅ DO: Use ConfigProvider for global changes**
```javascript
<ConfigProvider theme={{ token: { colorPrimary: '#014C75' } }}>
  <Button type="primary">Primary Button</Button>
</ConfigProvider>
```

**✅ DO: Use Styled Components for specific overrides**
```javascript
import styled from 'styled-components';
import { Button } from 'antd';

const GradientButton = styled(Button)`
  background: linear-gradient(180deg, #00FFB2 0%, #01D9A9 100%);
  border: none;
  font-weight: 800;

  &:hover {
    background: linear-gradient(180deg, #01D9A9 0%, #00B88A 100%);
  }
`;
```

**❌ DON'T: Use !important to override styles**
```javascript
// AVOID THIS
const BadButton = styled(Button)`
  color: red !important; // Bad practice
`;

// DO THIS INSTEAD
const GoodButton = styled(Button)`
  && {
    color: red; // Increased specificity without !important
  }
`;
```

### Component Variants

**Button Variants:**
```javascript
// Primary (default)
<Button type="primary">Primary Action</Button>

// Secondary
<Button>Secondary Action</Button>

// Ghost
<Button type="text">Text Button</Button>

// Danger
<Button type="primary" danger>Delete</Button>

// Custom Gradient Button
<GradientButton size="large">Get Started</GradientButton>
```

**Card Variants:**
```javascript
// Elevated
<Card hoverable bordered={false} style={{ boxShadow: shadows.md }}>

// Outlined
<Card bordered>

// Interactive (clickable)
<Card hoverable onClick={handleClick}>
```

### Icon System

**Icon Sizing Standards:**
```javascript
// Small icons (badges, inline)
<UserOutlined style={{ fontSize: '16px' }} />

// Medium icons (buttons, menu items)
<DashboardOutlined style={{ fontSize: '20px' }} />

// Large icons (cards, features)
<FileTextOutlined style={{ fontSize: '24px' }} />

// Extra large (hero sections)
<RocketOutlined style={{ fontSize: '32px' }} />
```

**Icon Color Usage:**
```javascript
// Inherit from parent (preferred)
<SearchOutlined />

// Custom color (when necessary)
<CheckCircleOutlined style={{ color: colors.success }} />
```

**Icon Guidelines:**
- Use **outlined** icons by default for consistency
- Use **filled** icons for active/selected states
- Always provide accessible labels via `aria-label`

---

## 3. Color System & Design Tokens

### Brand Colors

```javascript
// Primary Brand Color
const PRIMARY = '#014C75'; // Dark Blue
// Use for: CTA buttons, links, primary actions, brand elements

// Secondary/Accent Color
const SECONDARY = '#01D9A9'; // Teal
// Use for: Active states, highlights, accents, success indicators

// Gradient
const BRAND_GRADIENT = 'linear-gradient(180deg, #00FFB2 0%, #01D9A9 100%)';
// Use for: Featured buttons, hero sections, special UI elements
```

### Neutral Palette (9-step scale)

| Step | Hex | Usage |
|------|-----|-------|
| 50 | `#FAFAFA` | Lightest backgrounds, hover states |
| 100 | `#F8F9FD` | Page backgrounds, cards |
| 200 | `#E4E7EB` | Borders, dividers |
| 300 | `#CBD2D9` | Disabled states |
| 400 | `#9AA5B1` | Placeholder text |
| 500 | `#6C6C6C` | Secondary text |
| 600 | `#52606D` | Body text |
| 700 | `#3E4C59` | Headings |
| 800 | `#272727` | Dark UI elements (sidebar) |
| 900 | `#191919` | Darkest text, high emphasis |

### Semantic Colors

Each semantic color should have tints and shades for various use cases:

```javascript
export const semanticColors = {
  success: {
    light: '#95DE64',  // Light green for backgrounds
    base: '#52C41A',   // Standard success green
    dark: '#389E0D',   // Dark green for text/icons
  },
  warning: {
    light: '#FFD666',
    base: '#FAAD14',
    dark: '#D48806',
  },
  error: {
    light: '#FF7875',
    base: '#FF4D4F',
    dark: '#CF1322',
  },
  info: {
    light: '#69C0FF',
    base: '#1890FF',
    dark: '#096DD9',
  },
};
```

### Functional Color Usage

| Context | Color | Usage |
|---------|-------|-------|
| **Backgrounds** | `#FFFFFF` | Card backgrounds, modals |
| | `#F8F9FD` | Page background |
| | `#002B22` | Dark mode background (login page) |
| **Text** | `#191919` | Primary text, headings |
| | `#6C6C6C` | Secondary text, descriptions |
| | `#FFFFFF` | Text on dark backgrounds |
| **Borders** | `#E4E7EB` | Default borders |
| | `#014C75` | Focus state borders |
| | `#FF4D4F` | Error state borders |

### Color Contrast Requirements

Follow WCAG 2.1 AA standards:

- **Normal text** (< 18px): Minimum contrast ratio of **4.5:1**
- **Large text** (≥ 18px or ≥ 14px bold): Minimum contrast ratio of **3:1**
- **Interactive elements**: Minimum contrast ratio of **3:1**

**Tool:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify contrast ratios.

---

## 4. Styling Standards

### Styled Components Pattern

Every page/component should follow this file structure:

```
ComponentName/
├── ComponentName.js        # Main component logic
└── ComponentName.style.js  # Styled components
```

**ComponentName.style.js:**
```javascript
import styled from 'styled-components';
import { colors, spacing, shadows } from '@/theme';

export const ComponentNameWrapper = styled.div`
  padding: ${spacing[6]};
  background: ${colors.background.light};
  border-radius: 12px;
  box-shadow: ${shadows.base};

  .header {
    margin-bottom: ${spacing[4]};

    h2 {
      color: ${colors.primary[500]};
      font-size: 30px;
      font-weight: 600;
    }
  }

  .content {
    /* Nested styles */
  }

  // Ant Design overrides
  .ant-table-thead > tr > th {
    background: ${colors.gray[100]};
    color: ${colors.primary[500]};
    font-weight: 600;
  }
`;
```

**ComponentName.js:**
```javascript
import React from 'react';
import { ComponentNameWrapper } from './ComponentName.style';

const ComponentName = () => {
  return (
    <ComponentNameWrapper>
      <div className="header">
        <h2>Component Title</h2>
      </div>
      <div className="content">
        {/* Content */}
      </div>
    </ComponentNameWrapper>
  );
};

export default ComponentName;
```

### Naming Convention

**✅ DO:**
```javascript
export const UserManagementWrapper = styled.div``;
export const PostNewJobContainer = styled.section``;
export const StyledButton = styled(Button)``;
```

**❌ DON'T:**
```javascript
export const Wrapper = styled.div``;  // Too generic
export const user_management = styled.div``; // Wrong case
export const UserManagementDiv = styled.div``; // Redundant suffix
```

### When to Use Inline Styles vs Styled Components

**Use Styled Components for:**
- Reusable component styling
- Complex CSS with pseudo-selectors, media queries
- Theme-aware styles
- Ant Design overrides

**Use Inline Styles for:**
- Dynamic styles based on props/state
- One-off conditional styles
- Quick prototyping

**✅ DO:**
```javascript
// Styled Component for static/theme styles
const Card = styled.div`
  background: ${props => props.theme.background};
  border-radius: 12px;
`;

// Inline for dynamic values
<Card style={{ width: `${progress}%` }} />
```

### Global Styles

**Location:** `frontend/src/index.css`

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
  color: #191919;
  background: #F8F9FD;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Improved text rendering */
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
  line-height: 1.25;
}

p {
  text-wrap: pretty;
}

/* Remove default button styles */
button {
  font-family: inherit;
}
```

---

## 5. Motion & Animation

### Animation Library: Framer Motion

**Installation:**
```bash
npm install framer-motion
```

**Basic Usage:**
```javascript
import { motion } from 'framer-motion';

const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
```

### Animation Timing Standards

| Speed | Duration | Usage |
|-------|----------|-------|
| Instant | 100ms | Micro-interactions, hover effects |
| Fast | 200ms | Tooltips, dropdowns, small UI changes |
| Base | 300ms | Modals, drawers, most transitions |
| Slow | 500ms | Page transitions, complex animations |
| Deliberate | 700ms | Emphasized state changes |

### Easing Functions

```javascript
export const easings = {
  // Default - smooth acceleration and deceleration
  default: [0.4, 0.0, 0.2, 1],

  // Ease in - elements exiting
  easeIn: [0.4, 0.0, 1, 1],

  // Ease out - elements entering
  easeOut: [0.0, 0.0, 0.2, 1],

  // Ease in-out - elements moving
  easeInOut: [0.4, 0.0, 0.2, 1],
};
```

### Animation Use Cases

**Page Transitions:**
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: easings.default }}
>
  {/* Page content */}
</motion.div>
```

**Modal/Drawer:**
```javascript
<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Modal */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Stagger List Animation:**
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Form Feedback Animations:**
```javascript
// Shake animation for errors
const shake = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.4 },
};

<motion.div animate={hasError ? shake : {}}>
  <Input status={hasError ? 'error' : ''} />
</motion.div>
```

**Loading State:**
```javascript
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
>
  <LoadingOutlined />
</motion.div>
```

**Hover Effects:**
```javascript
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click Me
</motion.button>
```

### Performance Guidelines

**✅ DO:**
- Animate **transform** and **opacity** only (GPU-accelerated)
- Use `will-change` sparingly and remove after animation
- Respect `prefers-reduced-motion` for accessibility

```javascript
const MotionDiv = styled(motion.div)`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;
```

**❌ DON'T:**
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Don't apply `will-change` to multiple elements simultaneously
- Don't animate heavy operations (box-shadow, filter) on scroll

### Motion Tokens

**frontend/src/theme/motion.js:**
```javascript
export const motion = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    base: 0.3,
    slow: 0.5,
    deliberate: 0.7,
  },
  easing: {
    default: [0.4, 0.0, 0.2, 1],
    easeIn: [0.4, 0.0, 1, 1],
    easeOut: [0.0, 0.0, 0.2, 1],
    easeInOut: [0.4, 0.0, 0.2, 1],
  },
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
    },
    scaleIn: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
    },
  },
};
```

---

## 6. Layout & Spacing

### Spacing Scale (8px base)

Use the standardized spacing scale for consistency:

| Token | Value | Usage |
|-------|-------|-------|
| `0` | 0px | No spacing |
| `1` | 4px | Tight spacing, icon gaps |
| `2` | 8px | Base unit, default gaps |
| `3` | 12px | Small component padding |
| `4` | 16px | Medium component padding |
| `5` | 20px | Section spacing |
| `6` | 24px | Large component padding |
| `8` | 32px | Section margins |
| `10` | 40px | Major section spacing |
| `12` | 48px | Large section spacing |
| `16` | 64px | Hero section spacing |
| `20` | 80px | Extra large spacing |

**Usage:**
```javascript
import { spacing } from '@/theme';

const Container = styled.div`
  padding: ${spacing[6]};        // 24px
  margin-bottom: ${spacing[8]};  // 32px
  gap: ${spacing[4]};            // 16px
`;
```

### Grid System

**24-column grid** (Ant Design standard):

```javascript
import { Row, Col } from 'antd';

<Row gutter={16}>
  <Col xs={24} sm={12} md={8} lg={6}>
    {/* Content */}
  </Col>
</Row>
```

**Gutter Options:**
- Small: 8px
- Default: 16px
- Large: 24px
- Extra Large: 32px

### Responsive Breakpoints

| Breakpoint | Range | Device |
|------------|-------|--------|
| `xs` | 0-575px | Mobile |
| `sm` | 576-767px | Large mobile |
| `md` | 768-991px | Tablet |
| `lg` | 992-1199px | Desktop |
| `xl` | 1200-1599px | Large desktop |
| `xxl` | 1600px+ | Extra large desktop |

**Media Queries:**
```javascript
const Container = styled.div`
  padding: ${spacing[4]};

  @media (min-width: 768px) {
    padding: ${spacing[6]};
  }

  @media (min-width: 1200px) {
    padding: ${spacing[8]};
  }
`;
```

### Layout Patterns

**Dashboard Layout:**
```
┌─────────────────────────────────────┐
│           Header (64px)             │
├────────┬────────────────────────────┤
│        │                            │
│ Sidebar│      Content Area          │
│(240px) │   (max-width: 1200px)      │
│        │                            │
│        │                            │
└────────┴────────────────────────────┘
```

**Card Padding:**
- Default: 24px
- Compact: 16px
- Large: 32px

**Section Spacing:**
- Vertical: 48px between major sections
- Horizontal: 24px between columns

### Z-Index Scale

Use consistent z-index values:

| Layer | Value | Usage |
|-------|-------|-------|
| Base | 0 | Default layer |
| Elevated | 10 | Elevated cards, dropdowns in cards |
| Dropdown | 100 | Dropdowns, popovers, tooltips |
| Modal | 1000 | Modals, drawers |
| Modal Backdrop | 1050 | Modal/drawer backdrops |
| Notification | 1100 | Notifications, toasts, alerts |
| Critical | 9999 | Critical overlays (rare) |

**Usage:**
```javascript
const Dropdown = styled.div`
  z-index: 100;
`;

const Modal = styled.div`
  z-index: 1000;
`;

const Backdrop = styled.div`
  z-index: 1050;
`;
```

---

## 7. Component Patterns

### Page Layout Pattern

**Standard Dashboard Page:**
```javascript
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

const DashboardLayout = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header>
      {/* Logo and top navigation */}
    </Header>
    <Layout>
      <Sider width={240} theme="dark">
        {/* Sidebar navigation menu */}
      </Sider>
      <Content style={{ padding: '24px', background: '#F8F9FD' }}>
        {/* Page content */}
      </Content>
    </Layout>
  </Layout>
);
```

### Tab/Button Pattern

**Active state with gradient:**
```javascript
const TabButton = styled.button`
  width: 357px;
  height: 88px;
  font-size: 30px;
  font-weight: 800;
  border: 3px solid transparent;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    border-color: #014C75;
    background: linear-gradient(180deg, #00FFB2 0%, #01D9A9 100%);
    color: #FFFFFF;
  }

  &:hover:not(.active) {
    color: #014C75;
  }
`;
```

### Card Pattern

**Hover-interactive card:**
```javascript
<Card
  hoverable
  bordered={false}
  style={{
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    transition: 'background 0.2s, border 0.2s',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = '#F0F9FF';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = '#FFFFFF';
  }}
>
  {/* Card content */}
</Card>
```

### Table Pattern

**Customized Ant Design Table:**
```javascript
<Table
  dataSource={data}
  columns={columns}
  pagination={{ pageSize: 10, showSizeChanger: true }}
  rowSelection={{
    type: 'checkbox',
    onChange: handleSelectionChange,
  }}
  style={{
    '.ant-table-thead > tr > th': {
      background: '#F8F9FD',
      color: '#014C75',
      fontWeight: 600,
    },
    '.ant-table-tbody > tr:hover': {
      background: '#F0F9FF',
    },
  }}
/>
```

### Modal Pattern

**Form modal with actions:**
```javascript
<Modal
  title="Add New User"
  open={isOpen}
  onCancel={handleClose}
  footer={[
    <Button key="cancel" onClick={handleClose}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={handleSubmit} loading={isLoading}>
      Submit
    </Button>,
  ]}
  centered
  width={600}
>
  <Form layout="vertical" form={form}>
    {/* Form fields */}
  </Form>
</Modal>
```

### Multi-step Form Pattern

**Using Steps component:**
```javascript
import { Steps, Form, Button } from 'antd';

const [current, setCurrent] = useState(0);

const steps = [
  { title: 'Basic Info', content: <BasicInfoForm /> },
  { title: 'Details', content: <DetailsForm /> },
  { title: 'Review', content: <ReviewForm /> },
];

<div>
  <Steps current={current} items={steps} />

  <div style={{ marginTop: '24px' }}>
    {steps[current].content}
  </div>

  <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
    {current > 0 && (
      <Button onClick={() => setCurrent(current - 1)}>
        Previous
      </Button>
    )}
    {current < steps.length - 1 && (
      <Button type="primary" onClick={() => setCurrent(current + 1)}>
        Next
      </Button>
    )}
    {current === steps.length - 1 && (
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    )}
  </div>
</div>
```

### Search & Filter Pattern

```javascript
const [searchText, setSearchText] = useState('');
const [filter, setFilter] = useState('all');

const filteredData = data
  .filter(item => filter === 'all' || item.status === filter)
  .filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

<div>
  <Input
    prefix={<SearchOutlined />}
    placeholder="Search..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    style={{ width: 300, marginBottom: '16px' }}
  />

  <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
    <Radio.Button value="all">All</Radio.Button>
    <Radio.Button value="active">Active</Radio.Button>
    <Radio.Button value="inactive">Inactive</Radio.Button>
  </Radio.Group>

  {/* Render filteredData */}
</div>
```

---

## 8. Form Standards

### Ant Design Form Component

**Basic vertical form:**
```javascript
import { Form, Input, Button, message } from 'antd';

const MyForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await apiCall(values);
      message.success('Form submitted successfully');
      form.resetFields();
    } catch (error) {
      message.error('Submission failed');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="email@example.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please enter your password' },
          { min: 8, message: 'Password must be at least 8 characters' },
        ]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

### Validation Patterns

**Common validation rules:**
```javascript
// Required field
{ required: true, message: 'This field is required' }

// Email
{ type: 'email', message: 'Please enter a valid email' }

// Min/Max length
{ min: 8, max: 20, message: 'Must be 8-20 characters' }

// Pattern matching
{ pattern: /^[0-9]{10}$/, message: 'Phone must be 10 digits' }

// Custom validator
{
  validator: (_, value) => {
    if (!value || value.includes('@')) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Must contain @'));
  }
}

// Async validation
{
  validator: async (_, value) => {
    const exists = await checkUsernameExists(value);
    if (exists) {
      throw new Error('Username already taken');
    }
  }
}
```

### Field Layouts

**Vertical (default for forms):**
```javascript
<Form layout="vertical">
  {/* Labels above inputs */}
</Form>
```

**Horizontal (for search/filter forms):**
```javascript
<Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
  {/* Labels beside inputs */}
</Form>
```

**Inline (for compact forms):**
```javascript
<Form layout="inline">
  {/* Fields in a row */}
</Form>
```

### File Upload Pattern

**Upload with FormData:**
```javascript
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);

  try {
    const response = await axios.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    message.success('File uploaded successfully');
  } catch (error) {
    message.error('Upload failed');
  }

  return false; // Prevent default upload behavior
};

<Form.Item label="Resume" name="resume">
  <Upload
    beforeUpload={handleUpload}
    maxCount={1}
    accept=".pdf,.doc,.docx"
  >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
</Form.Item>
```

### Input Types

| Type | Component | Usage |
|------|-----------|-------|
| Text | `<Input />` | Names, titles, short text |
| Email | `<Input type="email" />` | Email addresses |
| Password | `<Input.Password />` | Passwords (with visibility toggle) |
| Number | `<InputNumber />` | Numeric values, quantities |
| Textarea | `<Input.TextArea />` | Long text, descriptions |
| Search | `<Input.Search />` | Search queries |
| Phone | `<Input />` with pattern | Phone numbers |
| Date | `<DatePicker />` | Dates, date ranges |
| Select | `<Select />` | Dropdown selections |
| Checkbox | `<Checkbox />` | Boolean options |
| Radio | `<Radio.Group />` | Single selection from options |
| Switch | `<Switch />` | Toggle on/off states |

---

## 9. Icons & Visual Elements

### Ant Design Icons

**Installation:**
Already included in the project: `@ant-design/icons@^5.3.7`

**Basic Usage:**
```javascript
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';

<DashboardOutlined /> {/* Default size */}
<UserOutlined style={{ fontSize: '20px', color: '#014C75' }} />
```

### Icon Sizing Standards

```javascript
// Small (16px) - Inline, badges, tags
<CheckCircleOutlined style={{ fontSize: '16px' }} />

// Medium (20px) - Buttons, menu items
<SettingOutlined style={{ fontSize: '20px' }} />

// Large (24px) - Cards, prominent features
<FileTextOutlined style={{ fontSize: '24px' }} />

// Extra Large (32px) - Hero sections, empty states
<InboxOutlined style={{ fontSize: '32px' }} />
```

### Icon with Text Spacing

```javascript
const IconWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .anticon {
    font-size: 20px;
  }
`;

<IconWithText>
  <UserOutlined />
  <span>User Profile</span>
</IconWithText>
```

### Icon Color Usage

**✅ DO: Inherit color from parent**
```javascript
<Button type="primary">
  <PlusOutlined /> {/* Inherits button text color */}
  Add New
</Button>
```

**✅ DO: Use semantic colors for status**
```javascript
<CheckCircleOutlined style={{ color: colors.success }} />
<CloseCircleOutlined style={{ color: colors.error }} />
<ExclamationCircleOutlined style={{ color: colors.warning }} />
<InfoCircleOutlined style={{ color: colors.info }} />
```

### Outlined vs Filled Icons

**Default: Use outlined icons**
```javascript
<HeartOutlined />      // Inactive/default state
<StarOutlined />       // Not selected
<BellOutlined />       // No notifications
```

**Use filled icons for active/selected states:**
```javascript
<HeartFilled style={{ color: colors.error }} />      // Liked
<StarFilled style={{ color: '#FAAD14' }} />          // Favorited
<BellFilled style={{ color: colors.primary[500] }} /> // Has notifications
```

### Badge Pattern

```javascript
import { Badge, Avatar } from 'antd';

<Badge count={5} offset={[-5, 5]}>
  <Avatar icon={<UserOutlined />} />
</Badge>

<Badge dot>
  <BellOutlined style={{ fontSize: '20px' }} />
</Badge>

<Badge status="success" text="Active" />
<Badge status="error" text="Offline" />
<Badge status="processing" text="In Progress" />
```

### Tag Pattern

```javascript
import { Tag } from 'antd';

<Tag color="success">Active</Tag>
<Tag color="error">Rejected</Tag>
<Tag color="processing">Pending</Tag>
<Tag color="warning">On Hold</Tag>

// Custom tag
<Tag style={{ background: colors.primary[50], color: colors.primary[500], border: 'none' }}>
  Custom Tag
</Tag>
```

### Accessibility for Icons

**Always provide accessible labels:**
```javascript
// For decorative icons (with text)
<Button>
  <PlusOutlined aria-hidden="true" />
  Add New
</Button>

// For icon-only buttons
<Button
  icon={<DeleteOutlined />}
  aria-label="Delete item"
/>

// For status icons
<CheckCircleOutlined
  aria-label="Success"
  style={{ color: colors.success }}
/>
```

---

## 10. Enterprise Development

### State Management

**For Global State - Use React Context + useReducer:**

**auth/AuthContext.js:**
```javascript
import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: false,
  loading: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('authToken');
      return { ...initialState, token: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Usage:**
```javascript
const { state, dispatch } = useAuth();

const handleLogin = async (credentials) => {
  const response = await api.login(credentials);
  dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
};

const handleLogout = () => {
  dispatch({ type: 'LOGOUT' });
};
```

**Alternative: Zustand (for simpler state management)**
```bash
npm install zustand
```

```javascript
import create from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: false,

  login: (user, token) => {
    localStorage.setItem('authToken', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
```

### API Integration

**Create API Service Layer:**

**services/api.js:**
```javascript
import axios from 'axios';
import { API_CONST } from '@/const';

const api = axios.create({
  baseURL: API_CONST.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }

    if (error.response?.status === 500) {
      message.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default api;
```

**services/userService.js:**
```javascript
import api from './api';
import { API_CONST } from '@/const';

export const userService = {
  getUsers: async () => {
    const response = await api.post(API_CONST.GET_USER_MANAGEMENT);
    return response.data.Response;
  },

  createUser: async (userData) => {
    const response = await api.post(API_CONST.ADD_USER_MANAGEMENT, userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/api/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  },
};
```

**Usage in component:**
```javascript
import { userService } from '@/services/userService';
import { message } from 'antd';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      await userService.createUser(values);
      message.success('User created successfully');
      fetchUsers(); // Reload data
    } catch (error) {
      message.error('Failed to create user');
    }
  };

  return (
    <div>
      {/* UI */}
    </div>
  );
};
```

### React Query Integration (Recommended)

```bash
npm install @tanstack/react-query
```

**App.js:**
```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

**Usage:**
```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const UserManagement = () => {
  const queryClient = useQueryClient();

  // Fetch data
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Refetch users
      message.success('User created');
    },
    onError: () => {
      message.error('Failed to create user');
    },
  });

  const handleCreate = (values) => {
    createMutation.mutate(values);
  };

  if (isLoading) return <Spin />;
  if (error) return <Alert message="Error loading users" type="error" />;

  return <div>{/* Render users */}</div>;
};
```

### Error Handling

**Create Error Boundary:**
```javascript
import React from 'react';
import { Result, Button } from 'antd';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error reporting service (e.g., Sentry)
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="Something went wrong"
          subTitle="We're sorry for the inconvenience. Please try again later."
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Wrap app with Error Boundary:**
```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Loading States

**Skeleton Screens:**
```javascript
import { Skeleton, Card } from 'antd';

const UserCard = ({ loading, user }) => {
  if (loading) {
    return (
      <Card>
        <Skeleton active avatar paragraph={{ rows: 2 }} />
      </Card>
    );
  }

  return (
    <Card>
      {/* User content */}
    </Card>
  );
};
```

**Button Loading:**
```javascript
const [submitting, setSubmitting] = useState(false);

const handleSubmit = async (values) => {
  setSubmitting(true);
  try {
    await api.post('/endpoint', values);
  } finally {
    setSubmitting(false);
  }
};

<Button type="primary" htmlType="submit" loading={submitting}>
  {submitting ? 'Submitting...' : 'Submit'}
</Button>
```

**Global Loading Bar:**
```bash
npm install nprogress
```

```javascript
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Start on route change
NProgress.start();

// Complete when loaded
NProgress.done();
```

### Performance Optimization

**Code Splitting:**
```javascript
import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const UserManagement = lazy(() => import('./pages/Dashboard/UserManagement'));
const TalentProfiles = lazy(() => import('./pages/Dashboard/TalentProfiles'));

const App = () => (
  <Suspense fallback={<Spin size="large" />}>
    <Routes>
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/talent-profiles" element={<TalentProfiles />} />
    </Routes>
  </Suspense>
);
```

**Memoization:**
```javascript
import React, { useMemo, useCallback, memo } from 'react';

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components
const MemoizedComponent = memo(({ data }) => {
  return <div>{data}</div>;
});
```

### Testing Standards

**Install testing libraries:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**Component.test.js:**
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserManagement from './UserManagement';

describe('UserManagement', () => {
  // Render test
  it('renders user management page', () => {
    render(<UserManagement />);
    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  // User interaction test
  it('opens modal when add button is clicked', async () => {
    render(<UserManagement />);
    const addButton = screen.getByRole('button', { name: /add new/i });

    await userEvent.click(addButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // Async test
  it('loads and displays users', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  // Edge case test
  it('shows error message when API fails', async () => {
    // Mock API failure
    jest.spyOn(api, 'get').mockRejectedValue(new Error('API Error'));

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
```

---

## 11. Code Quality & Best Practices

### Component Structure

**Standard component template:**

```javascript
// 1. Imports (grouped)
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/userService';
import { UserManagementWrapper } from './UserManagement.style';

// 2. TypeScript interfaces (if using TS)
interface UserManagementProps {
  mode?: 'admin' | 'customer';
  onUserAdded?: (user: User) => void;
}

// 3. Constants
const PAGE_SIZE = 10;
const FILTER_OPTIONS = ['All', 'Active', 'Inactive'];

// 4. Component definition
const UserManagement: React.FC<UserManagementProps> = ({ mode = 'admin', onUserAdded }) => {
  // 5. Custom hooks
  const { state } = useAuth();

  // 6. State declarations
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // 7. Side effects
  useEffect(() => {
    fetchUsers();
  }, []);

  // 8. Event handlers
  const handleCreate = useCallback(async (values) => {
    try {
      const newUser = await userService.createUser(values);
      setUsers([...users, newUser]);
      onUserAdded?.(newUser);
      message.success('User created successfully');
    } catch (error) {
      message.error('Failed to create user');
    }
  }, [users, onUserAdded]);

  // 9. Helper functions
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  // 10. Render logic
  return (
    <UserManagementWrapper>
      {/* Component JSX */}
    </UserManagementWrapper>
  );
};

// 11. Export
export default UserManagement;
```

### Code Organization

**✅ DO:**
- One component per file (except tiny sub-components)
- Max 250 lines per component - split if larger
- Extract complex logic into custom hooks
- Keep business logic separate from UI logic

**Example: Extract complex logic into custom hook:**
```javascript
// hooks/useUsers.js
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    const newUser = await userService.createUser(userData);
    setUsers([...users, newUser]);
    return newUser;
  };

  return { users, loading, createUser, refetch: fetchUsers };
};

// Usage in component
const UserManagement = () => {
  const { users, loading, createUser } = useUsers();

  return <div>{/* Use users, createUser */}</div>;
};
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserProfile`, `DashboardLayout` |
| Functions/Variables | camelCase | `getUserData`, `isLoading` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_FILE_SIZE` |
| Private functions | _camelCase | `_handleInternalEvent` |
| Event handlers | handle + Action | `handleSubmit`, `handleClick` |
| Boolean variables | is/has/should + Noun | `isLoading`, `hasError`, `shouldUpdate` |
| Files | PascalCase (components) | `UserManagement.js` |
| Files | camelCase (utilities) | `formatDate.js`, `api.js` |

### Props Validation

**PropTypes (for JavaScript):**
```javascript
import PropTypes from 'prop-types';

const UserCard = ({ user, onEdit, onDelete, showActions }) => {
  // Component logic
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  showActions: PropTypes.bool,
};

UserCard.defaultProps = {
  showActions: true,
  onEdit: () => {},
  onDelete: () => {},
};

export default UserCard;
```

**TypeScript (preferred):**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit = () => {},
  onDelete = () => {},
  showActions = true,
}) => {
  // Component logic
};
```

### Comments & Documentation

**✅ DO: Use JSDoc for public functions**
```javascript
/**
 * Fetches user data from the API
 * @param {string} userId - The unique user identifier
 * @param {Object} options - Optional configuration
 * @param {boolean} options.includeInactive - Whether to include inactive users
 * @returns {Promise<User>} The user object
 * @throws {Error} If the user is not found
 */
async function fetchUser(userId, options = {}) {
  // Implementation
}
```

**✅ DO: Comment complex logic**
```javascript
// Calculate weighted score based on multiple factors
// Formula: (experience * 0.4) + (education * 0.3) + (skills * 0.3)
const weightedScore = calculateWeightedScore(candidate);
```

**❌ DON'T: Comment obvious code**
```javascript
// BAD: Obvious comment
// Increment counter by 1
count++;

// GOOD: No comment needed - code is self-explanatory
count++;
```

**TODO comments:**
```javascript
// TODO (JohnDoe, 2026-01-15): Refactor this function to use async/await
// FIXME (JaneDoe, 2026-01-10): This causes a memory leak on large datasets
// HACK: Temporary workaround until API is updated
// NOTE: This behavior is intentional per client request
```

### Accessibility (WCAG 2.1 AA)

**Semantic HTML:**
```javascript
// ✅ DO: Use semantic HTML
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<main>
  <article>
    <header><h1>Title</h1></header>
    <section>Content</section>
  </article>
</main>

// ❌ DON'T: Use generic divs for everything
<div className="nav">
  <div className="nav-item">Home</div>
</div>
```

**ARIA Labels:**
```javascript
// Icon-only button
<Button
  icon={<DeleteOutlined />}
  aria-label="Delete user"
  onClick={handleDelete}
/>

// Interactive element without visible text
<div
  role="button"
  tabIndex={0}
  aria-label="Close modal"
  onClick={handleClose}
  onKeyDown={(e) => e.key === 'Enter' && handleClose()}
>
  <CloseOutlined />
</div>
```

**Keyboard Navigation:**
```javascript
const handleKeyDown = (e) => {
  switch (e.key) {
    case 'Enter':
    case ' ': // Space
      handleSelect();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'ArrowDown':
      focusNext();
      break;
    case 'ArrowUp':
      focusPrevious();
      break;
  }
};

<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={handleSelect}
>
  Selectable Item
</div>
```

**Form Labels:**
```javascript
// ✅ DO: Associate labels with inputs
<Form.Item label="Email" name="email">
  <Input id="email" />
</Form.Item>

// Or for custom inputs
<label htmlFor="custom-input">
  Email Address
</label>
<input id="custom-input" type="email" />
```

**Color Contrast:**
Ensure minimum contrast ratios:
- Normal text: 4.5:1
- Large text (≥18px or ≥14px bold): 3:1
- Interactive elements: 3:1

```javascript
// ✅ Good contrast
<Text style={{ color: '#191919', background: '#FFFFFF' }}>
  Readable text (contrast: 16.1:1)
</Text>

// ❌ Poor contrast
<Text style={{ color: '#999999', background: '#FFFFFF' }}>
  Hard to read (contrast: 2.8:1)
</Text>
```

**Alt Text for Images:**
```javascript
<Image
  src="/logo.png"
  alt="HireNXT Company Logo"
/>

// Decorative images
<Image
  src="/decorative.png"
  alt=""
  role="presentation"
/>
```

---

## 12. Security Best Practices

### Authentication & Authorization

**❌ CURRENT (Insecure):**
```javascript
// Storing JWT in localStorage (vulnerable to XSS)
localStorage.setItem('authToken', token);
```

**✅ RECOMMENDED (Secure):**
```javascript
// Store JWT in httpOnly cookies (set by backend)
// Frontend only manages auth state, not token storage

// Backend should set cookie:
res.cookie('authToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});

// Frontend checks auth status via endpoint
const checkAuth = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data.isAuthenticated;
  } catch {
    return false;
  }
};
```

**Protected Routes:**
```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && state.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Usage
<Route
  path="/admin/*"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

**Role-Based Access Control (RBAC):**
```javascript
const permissions = {
  admin: ['create', 'read', 'update', 'delete'],
  customer: ['create', 'read', 'update'],
  partner: ['read'],
};

export const hasPermission = (userRole, action) => {
  return permissions[userRole]?.includes(action) || false;
};

// Usage
{hasPermission(user.role, 'delete') && (
  <Button danger onClick={handleDelete}>
    Delete
  </Button>
)}
```

### Input Validation & Sanitization

**Form Validation:**
```javascript
import DOMPurify from 'dompurify';

// Sanitize rich text from React Quill
const sanitizedContent = DOMPurify.sanitize(richTextValue, {
  ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'p', 'br', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target'],
});

// Ant Design validation rules
<Form.Item
  name="description"
  rules={[
    { required: true, message: 'Description is required' },
    { max: 500, message: 'Maximum 500 characters' },
    {
      validator: (_, value) => {
        // Custom validation - check for malicious patterns
        if (value && /<script|javascript:|onerror=/i.test(value)) {
          return Promise.reject('Invalid input detected');
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Input.TextArea />
</Form.Item>
```

**Prevent XSS:**
```javascript
// ❌ DANGEROUS: Rendering raw HTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SAFE: Sanitize before rendering
import DOMPurify from 'dompurify';

const SafeHTML = ({ html }) => {
  const sanitized = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};
```

### API Security

**HTTPS Only in Production:**
```javascript
// const.js
const PORT_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.hirenxt.com'  // HTTPS in production
  : 'http://localhost:4000';    // HTTP in development
```

**CORS Configuration (Backend):**
```javascript
// Backend: Configure CORS properly
app.use(cors({
  origin: ['https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
```

**Rate Limiting:**
```javascript
// Backend: Add rate limiting
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use('/api/', apiLimiter);
```

**Authentication in Headers:**
```javascript
// ✅ CORRECT: Token in Authorization header
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// ❌ WRONG: Token in URL parameters
fetch(`/api/users?token=${token}`); // Tokens logged in browser history
```

### Dependency Management

**Regular Security Audits:**
```bash
# Run npm audit regularly
npm audit

# Fix vulnerabilities automatically
npm audit fix

# For breaking changes
npm audit fix --force
```

**Keep Dependencies Updated:**
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update to latest versions
npx npm-check-updates -u
npm install
```

**Lock File:**
Always commit `package-lock.json` to ensure consistent installations.

### Environment Variables

**Create .env files:**
```bash
# .env.development
REACT_APP_API_URL=http://localhost:4000
REACT_APP_ENV=development

# .env.production
REACT_APP_API_URL=https://api.hirenxt.com
REACT_APP_ENV=production
```

**Usage:**
```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

**❌ NEVER commit:**
```
.env
.env.local
.env.*.local
```

**✅ Add to .gitignore:**
```
# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

---

## 13. Git Workflow & Version Control

### Branch Strategy

```
main (production)
  ↑
dev (development/staging)
  ↑
feature/user-authentication
feature/job-posting
bugfix/login-error
hotfix/critical-security-patch
```

**Branch Naming:**
- `feature/` - New features (feature/user-profile)
- `bugfix/` - Bug fixes (bugfix/table-pagination)
- `hotfix/` - Critical production fixes (hotfix/security-patch)
- `refactor/` - Code refactoring (refactor/api-service)
- `docs/` - Documentation updates (docs/readme-update)

### Commit Standards (Conventional Commits)

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring (no functionality change)
- `docs`: Documentation changes
- `style`: Code formatting (no logic change)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build config)
- `perf`: Performance improvements

**Examples:**
```bash
# Feature
git commit -m "feat(auth): add JWT token refresh mechanism"

# Bug fix
git commit -m "fix(user-table): resolve pagination issue on filter"

# Refactor
git commit -m "refactor(api): extract service layer from components"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With body and footer
git commit -m "feat(job-posting): add multi-step form wizard

- Add Steps component for navigation
- Implement form validation per step
- Add progress indicator

Closes #45"
```

### Pull Request Guidelines

**PR Template (.github/pull_request_template.md):**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guide
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Documentation updated
- [ ] No new warnings
```

**PR Best Practices:**
1. One feature/fix per PR
2. Keep PRs small (<400 lines)
3. Write descriptive PR title and description
4. Request review from at least 1 team member
5. Address all review comments
6. Squash commits before merging to main

### Code Review Checklist

**Reviewer Checklist:**
- [ ] Code follows project style guide
- [ ] No hardcoded values (API URLs, secrets)
- [ ] Proper error handling implemented
- [ ] Loading states added for async operations
- [ ] Accessibility standards met (ARIA labels, keyboard nav)
- [ ] No console.log statements left in code
- [ ] Tests included and passing
- [ ] Documentation/comments added for complex logic
- [ ] Mobile responsive (if UI changes)
- [ ] Performance considerations (memoization, code splitting)
- [ ] Security best practices followed

**Author Checklist Before Requesting Review:**
- [ ] Self-reviewed all changes
- [ ] Tested functionality manually
- [ ] Ran linter and fixed issues
- [ ] Formatted code with Prettier
- [ ] Updated documentation
- [ ] Added/updated tests
- [ ] No merge conflicts with target branch

### Git Commands Reference

```bash
# Create and switch to new branch
git checkout -b feature/user-authentication

# Stage changes
git add .
# or stage specific files
git add src/components/UserAuth.js

# Commit with message
git commit -m "feat(auth): add login form validation"

# Push to remote
git push origin feature/user-authentication

# Update local branch with latest from main
git checkout main
git pull origin main
git checkout feature/user-authentication
git rebase main

# Squash commits before merging
git rebase -i HEAD~3  # Squash last 3 commits

# Amend last commit
git commit --amend -m "Updated commit message"

# Stash uncommitted changes
git stash
git stash pop

# View commit history
git log --oneline --graph --all

# Cherry-pick specific commit
git cherry-pick <commit-hash>
```

---

## 14. Development Workflow & Tooling

### IDE Setup (VSCode Recommended)

**Essential Extensions:**
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "eamodio.gitlens",
    "bradlc.vscode-tailwindcss",
    "styled-components.vscode-styled-components"
  ]
}
```

**VSCode Settings (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.associations": {
    "*.js": "javascriptreact"
  }
}
```

### Code Formatting

**Install Prettier:**
```bash
npm install --save-dev prettier
```

**.prettierrc:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**.prettierignore:**
```
node_modules
build
coverage
.git
```

**ESLint Configuration (.eslintrc.json):**
```json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react/prop-types": "warn",
    "react/jsx-no-target-blank": "error"
  }
}
```

### Pre-commit Hooks

**Install Husky and lint-staged:**
```bash
npm install --save-dev husky lint-staged
npx husky install
```

**package.json:**
```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

**Create pre-commit hook:**
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

**Create pre-push hook:**
```bash
npx husky add .husky/pre-push "npm test"
```

### Environment Setup

**.nvmrc (Node version):**
```
18.17.0
```

**Usage:**
```bash
nvm use
```

**README.md Development Setup:**
```markdown
## Development Setup

### Prerequisites
- Node.js 18.17.0 (use nvm: `nvm use`)
- npm 9.x or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourorg/hirenxt-admin-panel.git
cd hirenxt-admin-panel
```

2. Install dependencies
```bash
cd frontend
npm install
```

3. Create environment file
```bash
cp .env.example .env.local
# Edit .env.local with your API URL
```

4. Start development server
```bash
npm start
```

5. Open http://localhost:3000

### Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
```

### Helpful npm Scripts

**Add to package.json:**
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "lint": "eslint src --ext .js,.jsx",
    "lint:fix": "eslint src --ext .js,.jsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  }
}
```

---

## Conclusion

This document defines the **prescriptive development standards** for the HireNXT Admin Panel. All new code should follow these guidelines to ensure consistency, maintainability, and scalability.

**Key Principles:**
1. **Consistency** - Use established patterns and conventions
2. **Accessibility** - Build for all users (WCAG 2.1 AA)
3. **Performance** - Optimize for speed and efficiency
4. **Security** - Follow security best practices
5. **Maintainability** - Write clean, documented, testable code

**When in doubt:**
- Refer to this guide
- Ask the team for clarification
- Propose improvements via PR to this document

**Document Updates:**
This is a living document. Propose changes through pull requests to keep it current with evolving best practices.

---

**Version History:**
- v1.0 (January 2026) - Initial prescriptive standards document
