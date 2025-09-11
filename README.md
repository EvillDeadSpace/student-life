# 🎓 Student Life Platform

Modern student community platform where students can share experiences about faculty life, internships, scholarships, and student housing.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC)
![Prisma](https://img.shields.io/badge/Prisma-2D3748)

## ✨ Features

- **📚 Category-based Content**: Faculty, Student Housing, Scholarships, Internships & Jobs
- **👥 User Authentication**: Registration and login system with localStorage sessions
- **🔄 Real-time Updates**: Automatic content refresh and cache invalidation
- **📱 Responsive Design**: Modern, mobile-friendly interface with dark mode support
- **🎯 Dynamic Routing**: SEO-friendly slug-based URLs for individual posts
- **📍 Location Tracking**: User location display with JOIN queries
- **💾 Database Integration**: Prisma ORM with SQLite database

## 🚀 Tech Stack

- **Frontend**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Database**: SQLite with Prisma ORM
- **Authentication**: localStorage-based sessions

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/student-life-platform.git
cd student-life-platform
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup database**

```bash
npx prisma generate
npx prisma db push
```

4. **Run development server**

```bash
npm run dev
```

5. **Open application**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 🗃️ Database Schema

### Users Table

- `id` - Unique identifier
- `ime` (firstName) - User's first name
- `prezime` (lastName) - User's last name
- `email` - User's email address
- `password` - Encrypted password
- `lokacija` (location) - User's location

### Posts Table

- `id` - Unique identifier
- `userId` - Foreign key to users
- `naslov` (title) - Post title
- `tekst` (content) - Post content
- `kategorija` (category) - Post category
- `datum` (date) - Creation timestamp
- `likes` - Number of likes
- `comments` - Number of comments

## 🎯 API Endpoints

### Posts

- `GET /api/posts` - Fetch all posts with user location (JOIN query)
- `POST /api/posts` - Create new post (with revalidation)

### Authentication

- `POST /api/auth/registration` - User registration

## 🏗️ Project Structure

```
student-life/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/registration/    # User registration
│   │   └── posts/               # Posts CRUD operations
│   ├── kategorije/              # Category pages
│   │   ├── fakultet/            # Faculty category
│   │   ├── praksa-i-posao/      # Internships category
│   │   ├── stipendije/          # Scholarships category
│   │   ├── studentski-dom/      # Student housing category
│   │   └── [slug]/              # Dynamic post pages
│   ├── dodaj-iskustvo/          # Add new experience form
│   └── login/                   # Authentication page
├── components/                   # React components
│   ├── fakultet/                # Post display components
│   ├── form/                    # Form components
│   └── header/                  # Navigation components
├── lib/                         # Utilities
│   ├── api.ts                   # API helper functions
│   └── prisma.ts                # Database connection
└── prisma/                      # Database schema and migrations
```

## 🔧 Key Features Implementation

### Auto-refresh System

- **Focus-based refresh**: Data updates when user returns to tab
- **Interval refresh**: Automatic updates every 30 seconds
- **Cache invalidation**: `revalidatePath` after new posts
- **No-cache headers**: Always fetch fresh data

### Dynamic Routing

- Slug generation from post titles
- SEO-friendly URLs (`/kategorije/[slug]`)
- Title to slug conversion utilities

### Modern UI/UX

- Glassmorphism design elements
- Smooth animations and transitions
- Loading states and skeleton screens
- Mobile-responsive grid layouts

## 🌟 Usage

1. **Registration**: Create account with name, email, password, and location
2. **Browse Categories**: Explore faculty, housing, scholarships, or jobs content
3. **Add Experience**: Share your student experiences and tips
4. **Real-time Updates**: Content automatically refreshes as new posts are added
5. **Individual Posts**: Click any post to view detailed content with slug URLs

## 🚀 Deployment

### Build for production

```bash
npm run build
npm run start
```

### Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

---

**Student Life Platform** - Connecting students, sharing experiences! 🎓✨
