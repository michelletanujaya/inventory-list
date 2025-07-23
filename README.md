# Inventory Management System

A modern inventory management application built with React and Supabase for tracking stock levels, logs, and inventory operations.

## ✨ Features

- **Inventory Management** - Add, edit, and delete inventory items
- **Stock Tracking** - Record daily stock additions and sales
- **Running Totals** - Automatic calculation of inventory levels
- **Authentication** - Secure login with email/password and OAuth (Google, GitHub)
- **Responsive Design** - Optimized for desktop and tablet use
- **Real-time Data** - Powered by Supabase for instant updates

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Styled Components
- **Backend**: Supabase (Database, Auth, Real-time)
- **State Management**: TanStack Query (React Query)
- **UI Components**: Custom styled components with responsive design
- **Forms**: React Hook Form
- **Routing**: React Router DOM

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd inventory-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your Supabase credentials:

   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📋 Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Check code quality
- `npm run lint:fix` - Fix linting issues
- `npm run typecheck` - Check TypeScript types

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the database migrations (see `/sql` folder)
3. Configure authentication providers in Supabase dashboard
4. Set up Row Level Security (RLS) policies

### Authentication

Supports multiple authentication methods:

- Email/Password signup and login
- OAuth providers (Google, GitHub, Facebook)
- Email OTP (One-Time Password)
- Phone SMS OTP

## 📱 Mobile Support

The app is optimized for desktop and tablet use. Mobile devices receive simplified views or guidance to use larger screens for complex operations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the initial setup
- [Supabase](https://supabase.com/) for backend infrastructure
- [TanStack Query](https://tanstack.com/query) for data management
