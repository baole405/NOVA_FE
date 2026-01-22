# Hướng dẫn Fix Mermaid Diagrams

## Vấn đề: Mermaid không hiển thị trong VS Code

### ✅ Giải pháp:

## 1. Install Mermaid Extension

**Recommended Extensions:**

- **Markdown Preview Mermaid Support** (Matt Bierner)
- **Mermaid Markdown Syntax Highlighting** (Bpruitt-goddard)

```bash
# Hoặc search trong VS Code Extensions:
Ctrl+Shift+X → search "mermaid"
```

## 2. Restart VS Code

Sau khi install extension, **restart VS Code** để apply changes.

## 3. Preview Markdown

- Open any `.md` file trong `docs/neon/`
- Press: `Ctrl+Shift+V` (Windows) hoặc `Cmd+Shift+V` (Mac)
- Mermaid diagrams sẽ render!

## 4. Alternative: Use Online Viewer

Nếu VS Code vẫn không hiển thị, dùng online viewer:

### Option A: Mermaid Live Editor

https://mermaid.live/

**Cách dùng:**

1. Copy mermaid code block từ `.md` file
2. Paste vào https://mermaid.live/
3. Xem diagram render real-time

### Option B: GitHub Preview

- Push code lên GitHub
- Open `.md` files trên GitHub
- Mermaid tự động render!

## 5. Test với file đơn giản

Tạo file `test-mermaid.md` với nội dung sau:

\`\`\`markdown

# Test Mermaid

\`\`\`mermaid
graph TD
A[Start] --> B[Process]
B --> C[End]
\`\`\`
\`\`\`

Nếu test file này hiển thị → docs của bạn sẽ hoạt động!

## 6. Common Issues & Fixes

### Issue 1: Subgraph không hiển thị

**Fix:** Ensure proper indentation

\`\`\`mermaid
graph TB
subgraph "Group Name"
A[Item 1]
B[Item 2]
end
\`\`\`

### Issue 2: Style không apply

**Fix:** Đảm bảo style declaration đúng format

\`\`\`mermaid
graph LR
A[Node]
style A fill:#51cf66
\`\`\`

### Issue 3: Special characters

**Fix:** Escape hoặc dùng quotes

\`\`\`mermaid
graph LR
A["Text with spaces"]
B["Text with 'quotes'"]
\`\`\`

## 7. VS Code Settings

Add to `settings.json`:

\`\`\`json
{
"markdown.mermaid.theme": "default",
"markdown.preview.breaks": true
}
\`\`\`

## 8. Browser-based Preview (Best Option)

Install **Markdown Preview Enhanced** extension:

1. Install extension: `shd101wyy.markdown-preview-enhanced`
2. Right-click `.md` file → "Markdown Preview Enhanced: Open Preview"
3. All Mermaid diagrams render perfectly!

## Quick Fix Script

Run trong terminal để check extensions:

\`\`\`bash

# Check installed extensions

code --list-extensions | grep -i mermaid

# Install recommended extension

code --install-extension bierner.markdown-mermaid
\`\`\`

## Verified Working Extensions:

✅ **bierner.markdown-mermaid** - Official support
✅ **shd101wyy.markdown-preview-enhanced** - Best preview
✅ **bpruitt-goddard.mermaid-markdown-syntax-highlighting** - Syntax highlight

## Alternative: Export to PDF/HTML

\`\`\`bash

# Install md-to-pdf

npm install -g md-to-pdf

# Convert with Mermaid support

md-to-pdf docs/neon/neon-auth.md
\`\`\`

---

**Note:** Mermaid syntax trong docs đã ĐÚNG. Chỉ cần extension để render!
