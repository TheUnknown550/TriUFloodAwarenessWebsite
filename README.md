# 🌊 Flood Safety Trainer

A gamified web application for practicing safe flood evacuation through interactive scenarios. Built with React, Vite, and Tailwind CSS. This was a workshop project during the The 31st Tri-U International Joint Seminar & Symposium (Tri-U 2025)

## Features

### 🏠 Welcome Page
- Clear explanation of the app's purpose
- Interactive start button to begin scenarios
- Clean, user-friendly design with flood safety theming

### 🗺️ Interactive Evacuation Scenarios
- **Neighborhood Map Simulation**: Navigate through Home → Street A → Street B → Shelter
- **Dynamic Route Choices**: Choose between multiple paths with different safety levels
- **Real-time Feedback**: Immediate responses for safe and flooded routes
- **Flood Hazard Detection**: Some streets are flooded and require alternative routes

### 🎮 Gamification Elements
- **Point System**: Earn +10 points per safe step
- **Efficiency Bonus**: Extra points for optimal route selection
- **Step Tracking**: Monitor your evacuation progress
- **Visual Progress Tracker**: See your route progression in real-time

### 🎯 Scenario Completion
- Success screen with total points and performance metrics
- Option to retry scenarios for better scores
- Next scenario placeholder (for future expansion)

### 🎨 User Interface
- **Tailwind CSS Styling**: Clean, responsive, and modern design
- **Visual Feedback**: Color-coded routes (green for safe, red for flooded)
- **Interactive Elements**: Hover effects and smooth transitions
- **Progress Visualization**: Step-by-step route tracking
- **Responsive Design**: Works on all screen sizes

## Game Mechanics

### State Management
The app tracks:
- Current location/step in evacuation
- Safe vs. flooded route choices
- Points earned and steps taken
- Real-time feedback messages
- Route progression history

### Scoring System
- **Safe Route**: +10 points per successful navigation
- **Efficiency Bonus**: +5-20 points based on optimal path selection
- **Flood Penalty**: No points lost, but requires finding alternative routes

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FloodAwaressnessWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production
```bash
npm run build
```

## Technology Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: React useState hooks
- **Development**: ESLint for code quality

## Project Structure

```
FloodAwaressnessWebsite/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main app component with game logic
│   ├── main.jsx         # Application entry point
│   ├── index.css        # Global styles
│   └── assets/
│       └── react.svg
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Game Flow

1. **Welcome Screen**: User learns about flood evacuation training
2. **Scenario Start**: User begins at "Home" location
3. **Route Selection**: Choose between available paths (some may be flooded)
4. **Feedback Loop**: Receive immediate feedback on route safety
5. **Progress Tracking**: Visual indicator shows evacuation progress
6. **Completion**: Success screen with scoring and option to retry

## Educational Value

This app teaches:
- **Flood Safety Awareness**: Understanding flood risks during evacuation
- **Route Planning**: Importance of having multiple evacuation routes
- **Quick Decision Making**: Practice making safe choices under pressure
- **Emergency Preparedness**: Familiarization with evacuation procedures

## Future Enhancements

- Multiple scenario types (urban, rural, coastal flooding)
- Weather condition variables
- Time pressure elements
- Multiplayer evacuation coordination
- Integration with real flood data
- Achievement system and progress tracking
- Educational content and flood safety tips

## Browser Compatibility

This application is built with modern web standards and supports:
- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
