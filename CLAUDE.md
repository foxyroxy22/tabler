# Project

Tabler E-Commerce Custom Design
Cafe24 skin customization — local files synced via SFTP

# Important: How to Preview

Local HTML files show unstyled — Cafe24 loads CSS via import at runtime
Use root CSS grammar written in custom.css
Do NOT remind the user to check on the live site — they already know.

# Cafe24 File Structure

- Root: sample08/base/
- layout.html holds the base structure (head, body tags)
- All pages reference layout.html and inject content into it
- CSS is imported/loaded by Cafe24 at runtime, not locally

# Cafe24 Variables & Syntax Rules

- Before writing any dynamic content (price, product name, images, etc),
  read the existing Cafe24 files first to find the correct variable syntax
- Always use Cafe24's native variables and template syntax as-is
- Never hardcode values that should be dynamic (prices, product codes, URLs)
- Preserving Cafe24 backend connections is top priority

# CSS Strategy

- Editing existing Cafe24 default CSS files is fine and preferred
- Avoid stacking !important overrides — fix the source instead
- For new custom pages: create a new CSS file and link it in layout.html
- For existing pages: modify the relevant existing CSS file directly

# Git Rules

- **Always work directly on master. No branches, no worktrees, no PRs.**
- Commit after each page or section is completed
- Commit message format: "feat: about us page layout"
- Push directly to master after committing

# Pages

- [x] index.html (main — done)
- [ ] about-us
- [ ] how-to-use
- [ ] vibe-test
- [ ] login
- [ ] cart
- [ ] checkout
- [ ] product-detail
