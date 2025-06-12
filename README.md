
# TicketFlow - Multi-Channel Ticketing System

A modern, dockerized ticketing system built with Next.js frontend and Go backend, designed to handle tickets from multiple sources including WhatsApp, email, phone calls, and web submissions.

## 🚀 Features

### Frontend (Next.js)
- **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- **Real-time Updates**: Live ticket status updates
- **Multi-channel Support**: Handle tickets from various sources
- **Advanced Filtering**: Search and filter tickets by status, priority, source
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Toast Notifications**: User-friendly feedback system

### Backend (Go)
- **RESTful API**: Clean, well-documented API endpoints
- **Database**: PostgreSQL with GORM ORM
- **Caching**: Redis for performance optimization
- **Authentication**: JWT-based authentication
- **Webhooks**: Support for external integrations
- **Email Integration**: SMTP support for notifications
- **WhatsApp Integration**: Ready for WhatsApp Business API
- **Logging**: Structured logging with logrus

### Infrastructure
- **Docker**: Fully containerized application
- **Docker Compose**: Easy multi-service deployment
- **Nginx**: Reverse proxy and load balancing
- **Health Checks**: Built-in health monitoring
- **Scalable**: Ready for horizontal scaling

## 📋 Ticket Sources

1. **Web Portal**: Direct ticket creation through the web interface
2. **Email**: Automatic ticket creation from incoming emails
3. **WhatsApp**: Integration with WhatsApp Business API
4. **Phone Calls**: Manual ticket creation for phone support

## 🛠 Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Lucide Icons
- React Query

### Backend
- Go 1.21
- Gin Web Framework
- GORM (PostgreSQL)
- Redis
- JWT Authentication
- SendGrid (Email)
- WebSocket (Real-time)

### Infrastructure
- Docker & Docker Compose
- PostgreSQL 15
- Redis 7
- Nginx
- SSL/TLS Support

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git

### Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd ticketing-system
```

2. **Environment Configuration**
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgres://ticketing_user:secure_password@localhost:5432/ticketing?sslmode=disable
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key
WHATSAPP_TOKEN=your-whatsapp-token
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

3. **Start the application**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- API Documentation: http://localhost:8080/docs

### Production Deployment

1. **Update environment variables** for production
2. **Configure SSL certificates** in nginx/ssl/
3. **Run with production compose file**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📁 Project Structure

```
ticketing-system/
├── src/                          # Next.js frontend
│   ├── components/              # React components
│   ├── pages/                   # Next.js pages
│   └── hooks/                   # Custom hooks
├── backend/                     # Go backend
│   ├── cmd/api/                # Application entry point
│   ├── internal/               # Internal packages
│   │   ├── config/            # Configuration
│   │   ├── database/          # Database connection
│   │   ├── handlers/          # HTTP handlers
│   │   ├── middleware/        # HTTP middleware
│   │   ├── models/            # Data models
│   │   └── services/          # Business logic
│   └── migrations/            # Database migrations
├── nginx/                      # Nginx configuration
├── docker-compose.yml         # Development compose
└── docker-compose.prod.yml   # Production compose
```

## 🔧 API Endpoints

### Tickets
- `GET /api/v1/tickets` - List all tickets
- `POST /api/v1/tickets` - Create new ticket
- `GET /api/v1/tickets/:id` - Get specific ticket
- `PUT /api/v1/tickets/:id` - Update ticket
- `DELETE /api/v1/tickets/:id` - Delete ticket
- `POST /api/v1/tickets/:id/comments` - Add comment

### Webhooks
- `POST /api/v1/webhooks/whatsapp` - WhatsApp webhook
- `POST /api/v1/webhooks/email` - Email webhook
- `POST /api/v1/webhooks/call` - Call webhook

### Statistics
- `GET /api/v1/stats` - Get ticket statistics

## 🔌 External Integrations

### WhatsApp Business API
Configure webhook URL: `https://yourdomain.com/api/v1/webhooks/whatsapp`

### Email Integration
Configure SMTP settings and webhook: `https://yourdomain.com/api/v1/webhooks/email`

### Phone Integration
Manual ticket creation through API or web interface

## 📊 Monitoring & Logging

- **Health Checks**: `/health` endpoint for monitoring
- **Structured Logging**: JSON logs for easy parsing
- **Metrics**: Ready for Prometheus integration
- **Alerts**: Configurable alert system

## 🔐 Security Features

- JWT Authentication
- CORS Configuration
- Rate Limiting
- Input Validation
- SQL Injection Prevention
- XSS Protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🚀 Roadmap

- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] AI-powered ticket categorization
- [ ] Video call integration
- [ ] Advanced workflow automation
- [ ] Multi-language support

---

Built with ❤️ using Next.js and Go
