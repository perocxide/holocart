# HoloCart - Collaborative Shopping Cart Web App

> **Real-time collaborative shopping for teams, families, and groups**

HoloCart is a modern web application that enables multiple users to shop together in real-time. Built for hackathons and MVP development, it provides a seamless collaborative shopping experience similar to popular e-commerce platforms like Walmart and Flipkart.

## 🚀 Features

### Core Functionality
- **Real-time Collaboration**: Live cart updates across all devices using Firebase Realtime Database
- **Group Management**: Create and join shopping groups with secure invite system
- **User Authentication**: Firebase Auth with email/password signup
- **Item Management**: Add, remove, and modify cart items with quantity controls
- **Budget Tracking**: Set group budgets with real-time spending tracking
- **Cost Splitting**: Automatic per-member cost calculation
- **Comments System**: Item-level comments for group discussions
- **Activity Feed**: Complete log of all group activities with timestamps
- **Product Search**: Built-in catalog with category filtering

### Technical Features
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Real-time Updates**: WebSocket-like functionality via Firebase
- **Progressive Web App**: Optimized for mobile and desktop use
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: TailwindCSS with Apple-inspired design principles

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Framer Motion** for animations

### Backend
- **Firebase Realtime Database** for real-time data sync
- **Firebase Auth** for user authentication
- **Firebase Hosting** for deployment

### Development
- **Vite** for build tooling
- **ESLint** for code quality
- **PostCSS** for CSS processing

## 🏗 Architecture

```
src/
├── components/          # React components
│   ├── AuthForm.tsx    # User authentication
│   ├── Layout.tsx      # App layout and navigation
│   ├── CartView.tsx    # Shopping cart interface
│   ├── GroupsView.tsx  # Group management
│   ├── ActivityView.tsx # Activity feed
│   └── ProductSearch.tsx # Product catalog
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication logic
│   └── useShoppingGroup.ts # Group operations
├── types/              # TypeScript definitions
├── config/             # Firebase configuration
└── App.tsx            # Main application component
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase account (for production)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/holocart.git
cd holocart
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
```bash
# Create a new Firebase project at https://console.firebase.google.com
# Enable Authentication (Email/Password)
# Enable Realtime Database
# Copy your config to src/config/firebase.ts
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🎯 Usage

### Creating a Shopping Group
1. Register/login to your account
2. Navigate to "Groups" tab
3. Click "Create Group"
4. Set group name, description, and budget
5. Share the Group ID with team members

### Joining a Group
1. Get Group ID from group admin
2. Click "Join Group" in Groups tab
3. Enter Group ID and join

### Collaborative Shopping
1. Select your group from Groups tab
2. Use Product Search to find items
3. Add items to shared cart
4. See real-time updates from all members
5. Add comments to items for discussion
6. Track budget and spending in real-time

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Actions and links
- **Success**: Green (#10B981) - Positive actions
- **Warning**: Orange (#F59E0B) - Budget alerts
- **Error**: Red (#EF4444) - Destructive actions
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: 120% line height, semibold weight
- **Body**: 150% line height, regular weight
- **Small**: 14px for secondary information

### Spacing
- **Base unit**: 8px grid system
- **Components**: 16px, 24px, 32px spacing
- **Layouts**: 48px, 64px, 80px spacing

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
# Build the project
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir dist

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Backend (Firebase)
```bash
# Firebase is already configured for real-time sync
# No additional backend deployment needed
```


### Technical Improvements
- **Performance**: Lazy loading and virtualization
- **Testing**: Unit and integration test suite
- **CI/CD**: Automated deployment pipeline
- **Analytics**: User behavior tracking
- **Security**: Enhanced data encryption

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for real-time database capabilities
- TailwindCSS for rapid UI development
- Lucide React for beautiful icons
- React ecosystem for powerful frontend tools

---

**Built with ❤️ for collaborative shopping experiences**

*HoloCart - Where teams shop together, seamlessly.*