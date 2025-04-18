- https://lovable.dev/projects/c1b24f9f-6475-4f5f-8c45-cd0e74900691
- https://note-tweeter-layout.lovable.app/
  
# Zettle Tweet

<img width="1041" alt="Screenshot 2025-04-18 at 10 07 42 AM" src="https://github.com/user-attachments/assets/5555f0da-5a70-4812-8399-811fa15d5806" />

## Project Description
Zettle Tweet is a unique social media platform that combines the thoughtful, interconnected nature of Zettelkasten note-taking systems with the fast-paced, social aspects of Twitter. It allows users to create, connect, and explore bite-sized thoughts ("zettles") that form a network of knowledge rather than just an ephemeral feed.

## Installation Instructions

### Prerequisites
- Node.js (v16 or later)
- npm or yarn package manager

### Setup Steps
1. Clone the repository
   ```sh
   git clone <repository-url>
   cd zettle-tweet
   ```

2. Install dependencies
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Usage Instructions

### Browsing Zettles
- The home page displays a feed of zettles in chronological order
- Switch between "Feed" and "Network" views using the tabs
- The Network view shows a visual graph of connected zettles

### Interacting with Zettles
- Like a zettle by clicking the heart icon
- Save a zettle by clicking the bookmark icon
- Share a zettle using the share button
- View connections between zettles in the thread view

### Navigation
- Use the sidebar to navigate between different sections
- Browse popular tags to discover related content
- Click on usernames or tags to view related zettles

## Features
- **Zettle Cards**: Compact, Twitter-like cards for sharing thoughts
- **Knowledge Graph**: Visual representation of connected ideas
- **Thread View**: See how zettles connect in a linear format
- **Tag System**: Organize and discover content through hashtags
- **User Profiles**: Connect and follow other thinkers
- **Smooth Animations**: Enjoy a polished user experience with staggered animations
- **Responsive Design**: Works seamlessly across all device sizes

## Technologies Used
- **React**: UI library for building the interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling components
- **shadcn/ui**: Component library for consistent UI elements
- **React Router**: For navigation between pages
- **React Query**: For data fetching and state management
- **Lucide Icons**: High-quality icon set
- **Vite**: Fast bundling and development experience

## Project Structure
```
zettle-tweet/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── ui/             # UI primitives and shadcn components
│   │   └── zettle/         # Zettle-specific components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   └── utils/              # Utility functions and helpers
│       └── animation.ts    # Animation utilities
├── index.html              # Entry HTML file
└── package.json            # Project dependencies
```

## Contributing
We welcome contributions to Zettle Tweet! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```sh
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```sh
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```sh
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Guidelines
- Follow the existing code style
- Write clean, readable, and maintainable code
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Original Prompt
> if twitter was a zettelkasten

This project was initiated from a simple yet thought-provoking prompt: imagining what Twitter would look like if it were designed around the principles of a Zettelkasten note-taking system. The concept merges the interconnected, non-linear structure of Zettelkasten with the social, brief format of Twitter to create a new kind of social knowledge network.

## Troubleshooting

### Common Issues
1. **Build errors related to TypeScript types**
   - Solution: Make sure all type definitions are correctly imported and implemented

2. **Animation issues in older browsers**
   - Solution: Add appropriate polyfills or fallbacks for CSS animations

3. **Graph visualization not rendering correctly**
   - Solution: Check browser compatibility and ensure the canvas element has the correct dimensions

4. **Page transitions not working**
   - Solution: Verify that the animation utility functions are correctly imported and used

### Debugging Tips
- Check the browser console for errors
- Use React DevTools to inspect component state
- Monitor network requests for data fetching issues

## Future Improvements
- **Backend Integration**: Implement a complete backend with Supabase for data persistence
- **Authentication**: Add user authentication and profile management
- **Real-time Updates**: Implement WebSockets for real-time zettle updates
- **Advanced Graph Visualization**: Enhance the network view with more interactive features
- **Mobile App**: Develop native mobile applications for iOS and Android
- **AI Recommendations**: Add AI-powered zettle recommendations based on user interests
- **Collaborative Editing**: Allow multiple users to collaborate on zettles
- **Import/Export**: Support importing from and exporting to other note-taking systems
- **Advanced Search**: Implement full-text search with filtering options
- **Analytics Dashboard**: Provide insights into knowledge connections and growth
