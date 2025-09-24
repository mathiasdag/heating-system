# External Backend Development Workflow

## 🎯 Current Architecture

Your project now uses a **decoupled architecture** with an external Payload CMS backend.

### **Frontend (This Repository)**

- **Location**: `/Users/mathias/Dropbox/Apps/heating-system-1`
- **Purpose**: Next.js frontend application
- **Data Source**: External Payload CMS API
- **Admin Access**: External admin panel

### **Backend (External)**

- **Location**: `https://payload.cms.varmeverket.com`
- **Purpose**: Payload CMS with all collections and data
- **Admin Panel**: `https://payload.cms.varmeverket.com/admin`
- **API**: `https://payload.cms.varmeverket.com/api`

## 🚀 Development Workflow

### **1. Frontend Development**

```bash
# Start your frontend development server
npm run dev

# Your frontend will be available at:
# http://localhost:3001 (or 3000 if available)
```

### **2. Content Management**

- **Use External Admin**: `https://payload.cms.varmeverket.com/admin`
- **Create/Edit Content**: Pages, Articles, Spaces, etc.
- **See Changes Immediately**: Your local frontend will fetch live data

### **3. Backend Schema Changes**

- **Backend Dev Handles**: All schema modifications
- **Your Role**: Provide requirements and test the changes
- **Integration Package**: `backend-integration/` folder contains all schema definitions

## 📁 Repository Structure

### **Keep These (Backend Dev Needs Them)**

```
backend-integration/          # ✅ Keep - Backend dev pulls from this
├── collections/             # Schema definitions
├── blocks/                  # Custom blocks
├── fields/                  # Custom fields
├── access/                  # Access controls
└── utils/                   # Backend utilities
```

### **Frontend-Only (Your Development)**

```
src/
├── app/(frontend)/          # ✅ Your frontend pages
├── components/              # ✅ Your React components
├── lib/api.ts              # ✅ API client (already configured)
└── hooks/                  # ✅ Frontend hooks
```

### **Backend Code (Keep for Reference)**

```
src/
├── app/(payload)/          # ⚠️  Keep for reference
├── collections/            # ⚠️  Keep for reference
├── blocks/                 # ⚠️  Keep for reference
└── payload.config.ts       # ⚠️  Keep for reference
```

## 🔧 Environment Configuration

### **Your `.env.local`**

```env
NEXT_PUBLIC_USE_EXTERNAL_BACKEND=true
NEXT_PUBLIC_PAYLOAD_API_URL=https://payload.cms.varmeverket.com/api
```

### **No Local Backend Needed**

- ❌ No `PAYLOAD_SECRET` needed
- ❌ No `DATABASE_URI` needed
- ❌ No local database setup needed

## 🎯 What You Can Do Now

### **✅ Frontend Development**

- Build new pages and components
- Style and layout improvements
- User experience enhancements
- Performance optimizations

### **✅ Content Testing**

- Test with real production data
- Verify all content types work
- Check responsive design
- Test user interactions

### **✅ API Integration**

- All your existing API calls work
- Data fetching is automatic
- No changes needed to your code

## 🚫 What You Should NOT Do

### **❌ Don't Delete Backend Code Yet**

- Backend dev is pulling from your repo
- Keep `backend-integration/` folder
- Keep `src/collections/`, `src/blocks/` for reference

### **❌ Don't Modify Backend Schema**

- Schema changes go through backend dev
- Use external admin panel for content changes
- Report schema issues to backend dev

## 🔄 Switching Between Modes

### **Use External Backend (Current)**

```bash
./scripts/switch-to-external-backend.sh
npm run dev
```

### **Use Local Backend (If Needed)**

```bash
# Update .env.local
NEXT_PUBLIC_USE_EXTERNAL_BACKEND=false
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3000/api

# Start local backend (if you have it running)
npm run dev
```

## 📞 Team Communication

### **With Backend Developer**

- **Schema Changes**: Request through backend dev
- **New Collections**: Discuss requirements first
- **API Issues**: Report to backend dev
- **Integration**: Use `backend-integration/` folder

### **Content Management**

- **Content Changes**: Use external admin panel
- **User Management**: Handle through external admin
- **Media Uploads**: Use external admin panel

## 🎉 Benefits of This Setup

1. **Real Data**: Develop with actual production data
2. **No Sync Issues**: Single source of truth
3. **Team Collaboration**: Multiple developers can work together
4. **Production Parity**: Development matches production exactly
5. **Simplified Workflow**: No local backend management needed

---

**Last Updated**: January 2025  
**Status**: ✅ Active External Backend Development  
**Next Review**: When backend dev completes integration
