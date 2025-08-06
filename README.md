# Welcome to your Lovable project

# NaWe-SMS - School Management System

A comprehensive, multi-tenant school management system designed specifically for Nigerian educational institutions.

## Features

- **Multi-tenant Architecture**: Support for multiple schools with isolated data
- **Role-based Access Control**: 9 distinct user roles with appropriate permissions
- **Nigerian Term System**: Built-in support for the three-term academic system
- **Modern UI/UX**: Clean, responsive design with dark/light mode support
- **Real-time Updates**: Live data synchronization across all users
- **Comprehensive Testing**: Built-in test suite for system validation

## User Roles

1. **Super Admin** - System-wide administration
2. **School Admin** - School-level administration
3. **Principal** - School leadership and oversight
4. **Teacher** - Classroom management and instruction
5. **Student** - Learning and academic tracking
6. **Parent** - Child progress monitoring
7. **Accountant** - Financial management
8. **Cashier** - Payment processing
9. **Auditor** - Financial auditing and compliance

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database and authentication)

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. Start the development server:
```bash
npm run dev
```

### Testing the System

1. Visit `/test` to access the comprehensive test suite
2. Run automated tests to verify system functionality
3. Create demo users for testing different roles
4. Use the demo accounts provided in the authentication page

## Demo Accounts

For testing purposes, the following demo accounts are available:

- **School Admin**: admin@demo.school / demo123
- **Principal**: principal@demo.school / demo123
- **Teacher**: teacher@demo.school / demo123
- **Student**: student@demo.school / demo123
- **Parent**: parent@demo.school / demo123

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Built-in test suite with automated validation

## Database Schema

The system uses a multi-tenant PostgreSQL database with the following key tables:

- `schools` - School information and settings
- `profiles` - User profiles extending Supabase auth
- `academic_sessions` - Academic year management
- `terms` - Nigerian three-term system
- `classes` - Class/grade management
- `subjects` - Subject/course management

## Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Multi-tenant Isolation**: Complete data separation between schools
- **Role-based Permissions**: Granular access control per user role
- **Secure Authentication**: Supabase Auth with email/password
- **Input Validation**: Comprehensive client and server-side validation

## Development

### Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility functions and constants
├── pages/              # Route components
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

### Key Files

- `src/hooks/useAuth.tsx` - Authentication logic
- `src/lib/constants.ts` - Application constants and demo data
- `src/pages/Test.tsx` - Comprehensive test suite
- `src/utils/validation.ts` - Form validation schemas
- `src/utils/formatters.ts` - Data formatting utilities

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `src/App.tsx`
4. Add database migrations in `supabase/migrations/`
5. Update TypeScript types in `src/types/`

## Testing

The system includes a comprehensive test suite accessible at `/test`:

- **Database Connection Tests**: Verify Supabase connectivity
- **Authentication Tests**: Test user registration and login
- **Role-based Access Tests**: Validate permission systems
- **Data Isolation Tests**: Ensure multi-tenant security
- **Data Integrity Tests**: Verify database relationships

## Deployment

### Production Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting platform:
   - Vercel (recommended)
   - Netlify
   - AWS Amplify
   - Any static hosting service

3. Set up environment variables in your hosting platform

### Database Setup

1. Create a new Supabase project
2. Run the provided migrations in `supabase/migrations/`
3. Configure Row Level Security policies
4. Update environment variables with your Supabase credentials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the test suite
5. Submit a pull request

## Support

For support and questions:
- Check the test suite at `/test` for system validation
- Review the demo data and accounts
- Consult the comprehensive documentation

## License

This project is licensed under the MIT License.

---

**NaWe-SMS** - Empowering Nigerian Education Through Technology