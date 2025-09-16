# Environment Setup for External Backend Connection

## 🔧 Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# External Backend Configuration
# Set to 'true' to use external Payload backend, 'false' for local development
NEXT_PUBLIC_USE_EXTERNAL_BACKEND=false

# External Payload API URL
# Replace with your backend developer's API URL
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3000/api

# Local Development (when USE_EXTERNAL_BACKEND=false)
PAYLOAD_SECRET=your-secret-here
DATABASE_URI=your-database-uri
```

## 🌐 External Backend URLs

Replace `NEXT_PUBLIC_PAYLOAD_API_URL` with your backend developer's actual API URL:

```env
# Example external backend URLs:
NEXT_PUBLIC_PAYLOAD_API_URL=https://your-backend.vercel.app/api
NEXT_PUBLIC_PAYLOAD_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_PAYLOAD_API_URL=https://api.yourdomain.com/api
```

## 🔄 Switching Between Local and External

### For Local Development (Current Setup)
```env
NEXT_PUBLIC_USE_EXTERNAL_BACKEND=false
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3000/api
```

### For External Backend Testing
```env
NEXT_PUBLIC_USE_EXTERNAL_BACKEND=true
NEXT_PUBLIC_PAYLOAD_API_URL=https://your-backend-domain.com/api
```

## 🚀 Quick Setup Steps

1. **Create `.env.local`** file in project root
2. **Add environment variables** (see examples above)
3. **Get backend URL** from your backend developer
4. **Update `NEXT_PUBLIC_PAYLOAD_API_URL`** with their API endpoint
5. **Set `NEXT_PUBLIC_USE_EXTERNAL_BACKEND=true`** to enable external connection
6. **Restart your development server** (`npm run dev`)

## 🧪 Testing the Connection

Once configured, you can test the connection by:

1. **Check the browser console** for API calls
2. **Visit your pages** to see if data loads from external backend
3. **Check Network tab** in browser dev tools to see API requests

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Backend needs to allow your frontend domain
2. **404 Errors**: Check if API endpoints are correct
3. **Authentication Errors**: Verify if backend requires auth headers
4. **Data Format**: Ensure external API returns same data structure

### Debug Steps:

1. **Check environment variables** are loaded correctly
2. **Verify API URL** is accessible in browser
3. **Test API endpoints** directly (e.g., `https://your-backend.com/api/pages`)
4. **Check browser console** for error messages

## 📞 Next Steps

1. **Get backend URL** from your backend developer
2. **Update environment variables** with their API endpoint
3. **Test the connection** with a simple page load
4. **Verify data structure** matches expected format
5. **Update any missing fields** or handle differences
