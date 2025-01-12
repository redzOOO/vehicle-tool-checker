# North Wales Auto Unlock Services

## Project Overview
This is a web application for North Wales Auto Unlock Services, providing auto locksmith services across North Wales. The application allows customers to check vehicle compatibility and submit contact requests for locksmith services.

## Features
- Vehicle compatibility checker
- Contact form with urgency levels
- Real-time tool compatibility verification
- Email notifications for new inquiries
- Mobile-responsive design

## Technology Stack
- **Frontend**: React with TypeScript
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **Backend**: Supabase (Edge Functions, Database)
- **Email Service**: Resend.com

## Development Setup

### Prerequisites
- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Supabase account
- Resend.com account for email functionality

### Local Development
```sh
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd north-wales-auto-unlock

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
The following environment variables are required:
- `RESEND_API_KEY` - For email functionality
- `DVLA_API_KEY` - For vehicle information lookup

These are managed through Supabase Edge Function secrets and do not require local configuration.

## Project Structure
```
├── src/
│   ├── components/     # React components
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── integrations/  # Third-party integrations
├── supabase/
│   └── functions/     # Supabase Edge Functions
```

## Deployment
The application can be deployed through:
1. Lovable's built-in deployment feature
2. Manual deployment to any static hosting service

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support
For support, please contact:
- Email: lee.redhead@outlook.com
- Website: [North Wales Auto Unlock](https://northwalesautounlock.co.uk)

## License
This project is proprietary software. All rights reserved.