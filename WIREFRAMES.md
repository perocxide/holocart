# HoloCart UI Wireframes

## 1. Authentication Screen
```
┌─────────────────────────────────────────────────────────────┐
│                        🛒 HoloCart                          │
│                                                             │
│           Welcome to Collaborative Shopping                 │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  📧 Email Address                                   │   │
│   │  [email@example.com...........................]     │   │
│   │                                                     │   │
│   │  🔒 Password                                        │   │
│   │  [••••••••••••••••••••••••••••••••••••••••••••]     │   │
│   │                                                     │   │
│   │              [Sign In / Register]                   │   │
│   │                                                     │   │
│   │         Don't have an account? Sign up              │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 2. Main Layout with Navigation
```
┌─────────────────────────────────────────────────────────────┐
│ 🛒 HoloCart                     Welcome, John    🚪 Logout │
├─────────────────────────────────────────────────────────────┤
│  🛒 Shopping Cart  👥 Groups  📈 Activity                  │
│  ════════════════                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    [Main Content Area]                     │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 3. Shopping Cart View
```
┌─────────────────────────────────────────────────────────────┐
│                    Budget Summary                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   $47.85    │  │   $100.00   │  │   $15.95    │         │
│  │Total Spent  │  │   Budget    │  │ Per Member  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  47.85% of budget used                                     │
├─────────────────────────────────────────────────────────────┤
│                  Add Products to Cart                      │
│                                                             │
│  🔍 [Search products.....................] [Categories ▼]  │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   [IMG]     │  │   [IMG]     │  │   [IMG]     │         │
│  │ Bananas     │  │ Bread       │  │ Yogurt      │         │
│  │ $2.99       │  │ $3.49       │  │ $4.99       │         │
│  │ ⭐ 4.5 ★    │  │ ⭐ 4.2 ★    │  │ ⭐ 4.7 ★    │         │
│  │ [+ Add]     │  │ [+ Add]     │  │ [+ Add]     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                Shopping Cart (3 items)                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [IMG] Bananas                            $5.98          │ │
│  │       Added by John • 2 min ago                        │ │
│  │       [−] 2 [+]  💬 Comments(1)  🗑️ Remove           │ │
│  │                                                         │ │
│  │       💬 "Make sure they're ripe!" - Sarah             │ │
│  │          [Add comment.....................] [Post]     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [IMG] Bread                              $3.49          │ │
│  │       Added by Sarah • 5 min ago                       │ │
│  │       [−] 1 [+]  💬 Comments(0)  🗑️ Remove           │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 4. Groups Management View
```
┌─────────────────────────────────────────────────────────────┐
│  Shopping Groups                      [Join Group] [+ Create] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Create New Group                         │ │
│  │                                                         │ │
│  │  Group Name: [Family Grocery Shopping..............] │ │
│  │  Description: [Weekly family grocery shopping.......] │ │
│  │  Budget ($): [100.00]                                 │ │
│  │                                                         │ │
│  │                        [Cancel] [Create Group]         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Family Grocery  │  │ Office Supplies │  │ Party Planning  │ │
│  │ Weekly shopping │  │ Q3 restocking   │  │ Birthday party  │ │
│  │                 │  │                 │  │                 │ │
│  │ 👥 4 members    │  │ 👥 6 members    │  │ 👥 8 members    │ │
│  │ 💰 $47/$100     │  │ 💰 $234/$500    │  │ 💰 $156/$200    │ │
│  │ 📅 2 days ago   │  │ 📅 1 week ago   │  │ 📅 3 days ago   │ │
│  │                 │  │                 │  │                 │ │
│  │ ████████░░░░░░░░ │  │ ████████████░░░ │  │ ████████████░░░ │ │
│  │ 📋 [ACTIVE]     │  │ 📋 [ACTIVE]     │  │ 📋 [ACTIVE]     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Roommate Essentials │ Holiday Shopping │ [+ Join Group]    │ │
│  │ Monthly supplies    │ Gift coordination │ Enter Group ID   │ │
│  │                     │                   │                   │ │
│  │ 👥 3 members        │ 👥 12 members     │ [ID: ............] │ │
│  │ 💰 $89/$150         │ 💰 $1,234/$2,000  │ [Join]            │ │
│  │ 📅 1 week ago       │ 📅 2 weeks ago    │                   │ │
│  │                     │                   │                   │ │
│  │ ████████████░░░     │ ████████░░░░░░░░░ │                   │ │
│  │ 📋 [ACTIVE]         │ 📋 [ACTIVE]       │                   │ │
│  └─────────────────────┘ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 5. Activity Feed View
```
┌─────────────────────────────────────────────────────────────┐
│                      Activity Feed                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🛒 Sarah added Bananas to cart              2 minutes ago │
│     Family Grocery Shopping                                │
│                                                             │
│  💬 John commented on Bread                  5 minutes ago │
│     "Get the whole grain version"                          │
│                                                             │
│  🗑️ Mike removed Cookies from cart            8 minutes ago │
│     Family Grocery Shopping                                │
│                                                             │
│  👥 Emma joined Office Supplies              15 minutes ago │
│     Welcome to the group!                                  │
│                                                             │
│  ✏️ Sarah updated Milk quantity               1 hour ago    │
│     Changed from 1 to 2 gallons                           │
│                                                             │
│  🛒 John added Pasta Sauce to cart           2 hours ago   │
│     Family Grocery Shopping                                │
│                                                             │
│  💬 Sarah commented on Avocados              3 hours ago   │
│     "Make sure they're ripe!"                             │
│                                                             │
│  👥 David joined Family Grocery Shopping     1 day ago     │
│     Welcome to the group!                                  │
│                                                             │
│  🛒 Sarah created Family Grocery Shopping    2 days ago    │
│     Group created with $100 budget                        │
│                                                             │
│                                                             │
│                    [Load More Activity]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 6. Mobile Responsive Layout
```
┌─────────────────────────────────┐
│  🛒 HoloCart        John    🚪  │
├─────────────────────────────────┤
│  🛒 Cart   👥 Groups  📈 Feed  │
│  ═══════                       │
├─────────────────────────────────┤
│                                 │
│        Budget Summary           │
│  ┌─────────┐ ┌─────────┐       │
│  │ $47.85  │ │ $100.00 │       │
│  │ Spent   │ │ Budget  │       │
│  └─────────┘ └─────────┘       │
│                                 │
│  ████████████████░░░░░░░░░░░░░  │
│  47.85% used                   │
│                                 │
├─────────────────────────────────┤
│        Add Products             │
│  🔍 [Search products.........]  │
│  [Categories ▼]                │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ [IMG] Bananas      $2.99    │ │
│  │ ⭐ 4.5 ★    [+ Add]        │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ [IMG] Bread        $3.49    │ │
│  │ ⭐ 4.2 ★    [+ Add]        │ │
│  └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│        Cart (3 items)           │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ [IMG] Bananas      $5.98    │ │
│  │ by John • 2 min ago        │ │
│  │ [−] 2 [+]  💬 🗑️          │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ [IMG] Bread        $3.49    │ │
│  │ by Sarah • 5 min ago       │ │
│  │ [−] 1 [+]  💬 🗑️          │ │
│  └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

## Design Principles

### Visual Hierarchy
- **Headers**: Bold, large font sizes (24px, 20px, 18px)
- **Body Text**: Regular weight, readable sizes (16px, 14px)
- **Secondary Info**: Lighter colors, smaller sizes (12px, 10px)

### Color Usage
- **Primary Blue**: Call-to-action buttons, active states
- **Green**: Success states, positive metrics
- **Orange**: Warning states, budget alerts
- **Red**: Error states, destructive actions
- **Gray**: Text hierarchy, neutral backgrounds

### Spacing System
- **Tight**: 4px, 8px for component internals
- **Normal**: 16px, 24px for component spacing
- **Loose**: 32px, 48px for section spacing

### Interactive Elements
- **Hover States**: Subtle color changes, shadows
- **Active States**: Pressed appearance, color shifts
- **Loading States**: Spinners, skeleton screens
- **Real-time Updates**: Smooth animations, badges

### Responsive Breakpoints
- **Mobile**: < 768px - Single column, stacked layout
- **Tablet**: 768px - 1024px - Two-column hybrid
- **Desktop**: > 1024px - Multi-column, full features

### Accessibility
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus States**: Visible keyboard navigation
- **Screen Reader**: Proper ARIA labels
- **Touch Targets**: Minimum 44px tap areas