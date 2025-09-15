# FAQ Grouping Test Guide

## How to Test FAQ Grouping

### Step 1: Access Admin Panel

1. Go to `http://localhost:3000/admin`
2. Navigate to Pages collection
3. Create a new page or edit an existing one

### Step 2: Add FAQ Block

1. In the page editor, add a new block
2. Select "FAQ" from the block types
3. You should see these fields:
   - **Headline** (optional)
   - **Description** (optional)
   - **Questions & Answers** (this is the improved label!)
   - **Layout** (Accordion or List)
   - **Enable grouping of Q&As by category** (NEW CHECKBOX)
   - **Groups** (NEW - only appears when grouping is enabled)

### Step 3: Test Without Grouping (Default)

1. Leave "Enable grouping" unchecked
2. Add some Q&As in the "Questions & Answers" section
3. Save and preview the page
4. You should see a normal FAQ with accordion/list layout

### Step 4: Test With Grouping

1. Check "Enable grouping of Q&As by category"
2. The "Groups" section should now appear
3. Click "Add Group"
4. Enter a group title (e.g., "General Questions")
5. Add Q&As to that group
6. Add another group (e.g., "Technical Support")
7. Add Q&As to the second group
8. Save and preview

### Expected Result

- Group titles should appear as headings
- Q&As should be organized under their respective groups
- Same accordion/list functionality within each group

## Troubleshooting

If grouping doesn't work:

1. Make sure you checked "Enable grouping"
2. Make sure you added at least one group
3. Make sure each group has at least one Q&A
4. Check browser console for any JavaScript errors

## What Changed

- ✅ Fixed "Qas" label to "Questions & Answers"
- ✅ Added grouping checkbox
- ✅ Added groups array with conditional display
- ✅ Updated FAQBlock component to handle groups
- ✅ Maintains backward compatibility
