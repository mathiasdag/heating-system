# Preview Functionality Documentation

## 🎯 Overview

The preview functionality allows content editors to preview draft content before publishing. This system works with the external Payload CMS backend and provides a seamless preview experience.

## 🚀 Features

- ✅ **Draft Content Access** - View unpublished content
- ✅ **Preview Mode Detection** - Automatic detection via cookies and URL parameters
- ✅ **Preview Banner** - Visual indicator when in preview mode
- ✅ **Exit Preview** - Easy way to exit preview mode
- ✅ **Secure Access** - Preview access controlled by secret token

## 🔧 How It Works

### 1. **Preview Activation**

Preview mode can be activated in two ways:

#### **Via API Route (Recommended)**

```bash
POST /api/preview
{
  "secret": "your-preview-secret",
  "collection": "pages",
  "slug": "about"
}
```

#### **Via URL Parameter**

```
/pages/about?preview=true
```

### 2. **Preview Mode Detection**

The system detects preview mode through:

- **Cookies**: `preview=true` cookie set by the API route
- **URL Parameters**: `?preview=true` in the URL
- **Server-side**: Detected in page components and layout

### 3. **Draft Content Fetching**

When in preview mode:

- API calls include `draft=true` parameter
- Payload CMS returns draft content instead of published content
- Content is fetched with the same structure as published content

## 📁 File Structure

```
src/
├── app/api/preview/route.ts          # Preview API endpoints
├── components/PreviewBanner.tsx      # Preview mode banner
├── utils/preview.ts                  # Preview utilities
└── lib/api.ts                       # Updated API client with draft support
```

## 🔑 Environment Variables

Add these to your `.env.local`:

```bash
# External Backend Configuration (already configured)
NEXT_PUBLIC_PAYLOAD_API_URL=https://payload.cms.varmeverket.com/api
NEXT_PUBLIC_USE_EXTERNAL_BACKEND=true

# Preview Functionality (NEW - add this)
PREVIEW_SECRET=your-secure-preview-secret-here

# Development
NODE_ENV=development
```

**Important**: Change `PREVIEW_SECRET` to a secure, random string in production!

## 🎨 Usage Examples

### **For Content Editors**

1. **In Payload Admin**: Create/edit content in draft mode
2. **Activate Preview**: Use the preview button (if implemented in admin) or manually call the API
3. **View Preview**: Navigate to the preview URL
4. **Exit Preview**: Click "Exit Preview" in the banner

### **For Developers**

#### **Check Preview Mode**

```typescript
import { getPreviewData } from '@/utils/preview';

const previewData = await getPreviewData();
if (previewData.isPreview) {
  // Show preview-specific content
}
```

#### **Fetch Draft Content**

```typescript
import PayloadAPI from '@/lib/api';

// Fetch published content
const publishedPage = await PayloadAPI.findBySlug('pages', 'about', 10);

// Fetch draft content
const draftPage = await PayloadAPI.findBySlug('pages', 'about', 10, true);
```

#### **Generate Preview URLs**

```typescript
import { generatePreviewUrl } from '@/utils/preview';

const previewUrl = generatePreviewUrl('pages', 'about');
// Returns: /pages/about?preview=true
```

## 🔒 Security

- **Secret Token**: Preview access requires a secret token
- **Cookie-based**: Preview state is stored in secure HTTP-only cookies
- **Time-limited**: Preview cookies expire after 1 hour
- **Server-side**: All preview logic runs server-side for security

## 🎯 Integration with Payload Admin

To integrate with Payload's admin interface, you can:

1. **Add Preview Button**: Customize the admin UI to include preview buttons
2. **Webhook Integration**: Use Payload webhooks to automatically generate preview URLs
3. **Custom Field**: Add a preview URL field to your collections

### **Example Admin Integration**

```typescript
// In your Payload collection config
{
  name: 'previewUrl',
  type: 'text',
  admin: {
    readOnly: true,
    description: 'Preview URL for this content',
  },
  hooks: {
    afterRead: [
      ({ data }) => {
        if (data.slug) {
          data.previewUrl = generatePreviewUrl('pages', data.slug);
        }
        return data;
      }
    ]
  }
}
```

## 🧪 Testing

### **Test Preview Mode**

1. **Create Draft Content**: Create a page in draft mode in Payload admin
2. **Activate Preview**:
   ```bash
   curl -X POST http://localhost:3000/api/preview \
     -H "Content-Type: application/json" \
     -d '{"secret":"your-preview-secret","collection":"pages","slug":"your-page-slug"}'
   ```
3. **Visit Preview URL**: Navigate to the returned URL
4. **Verify**: Check that draft content is displayed and preview banner is shown

### **Test Exit Preview**

1. **Click "Exit Preview"** in the banner
2. **Verify**: Preview banner disappears and published content is shown

## 🚨 Troubleshooting

### **Preview Not Working**

1. **Check Environment Variables**: Ensure `PREVIEW_SECRET` is set
2. **Check Backend**: Verify external Payload backend is accessible
3. **Check Cookies**: Ensure cookies are being set correctly
4. **Check API**: Verify `/api/preview` endpoint is working

### **Draft Content Not Loading**

1. **Check Draft Parameter**: Ensure `draft=true` is being sent to API
2. **Check Backend Access**: Verify backend supports draft content access
3. **Check Authentication**: Ensure proper authentication for draft access

## 🔄 Future Enhancements

- **Live Preview**: Real-time preview updates as content is edited
- **Preview Sharing**: Share preview links with stakeholders
- **Preview History**: Track preview sessions and changes
- **Preview Analytics**: Track preview usage and engagement
