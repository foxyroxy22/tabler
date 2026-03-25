---
name: E-commerce Platform - Legacy jQuery Codebase
description: Tabler-based e-commerce system with significant security and performance debt
type: project
---

## Project Overview

This is a legacy jQuery-based e-commerce platform using the Tabler template framework. The codebase consists of 6,912 lines of JavaScript across 73 files and 404 HTML template files.

## Critical Security Issues Found

**Why**: This is a customer-facing e-commerce platform handling payments, user accounts, and sensitive information. Security issues here can expose customer data, enable unauthorized transactions, or lead to regulatory violations.

**How to apply**: All CRITICAL security findings (XSS, CSRF, PII exposure) must be resolved before any code merge to production. Prioritize these in development sprints above all other work.

### Key Vulnerabilities
1. **XSS Vulnerabilities** (innerHTML misuse, user input in DOM)
   - Files: basket.js (line 37), detail.js (lines 24-25, 48)
   - Risk: Stolen session tokens, credential harvesting, malware injection

2. **CSRF Token Missing** (AJAX requests unprotected)
   - Files: category.js (lines 15-32)
   - Risk: Unauthorized actions on behalf of users

3. **PII Exposure** (SSN and personal data in plaintext)
   - Files: member_findid.js (lines 9-10)
   - Risk: GDPR/privacy regulation violations

4. **URL Decoding Missing** (Query string injection)
   - Files: common.js (lines 18-19), category.js (lines 45-46)
   - Risk: Parameter tampering, logic bypass

## Memory Leak Patterns

**Why**: The codebase registers event listeners that are never cleaned up, causing browser memory to grow unbounded over time.

**How to apply**: When modifying scroll/resize/DOM events, always use `.off()` before `.on()` to prevent duplicate listeners.

### Common Patterns
- Global scroll listeners (common.js:36-52) attached multiple times
- No event cleanup on module disconnect
- localStorage manipulation without input validation

## Code Quality Issues

1. **Type Safety**: Using `!=` instead of `!==` throughout
2. **Global Variables**: Excessive global scope pollution (aBasketProductData, SHOP_PRICE_FORMAT)
3. **Magic Numbers**: Hardcoded values (54, 500ms) without explanation
4. **Error Suppression**: Empty catch blocks hiding bugs

## Performance Red Flags

1. **Attribute Selectors**: `$('[id^="basket_chk_id_"]')` in loops — slow on large DOM
2. **N+1 Pattern Risk**: category.js nested loops with potential data fetches
3. **setTimeout Polling**: 500ms hardcoded delays that fail on slow devices

## Development Standards to Enforce

1. All AJAX requests must include CSRF tokens (check backend integration)
2. All user input must be decoded with decodeURIComponent() before use
3. Event listeners must be cleaned up with .off() before re-adding
4. No innerHTML manipulation with user data — use textContent or template libraries
5. SSN and PII must never appear in client-side HTML

## Next Steps for Codebase Health

1. **Immediate** (Sprint 1): Fix all CRITICAL security issues
2. **Short-term** (Sprint 2-3): Add CSRF tokens, input validation, error logging
3. **Medium-term** (Sprint 4+): Migrate to ES6, add unit tests, remove jQuery dependency
4. **Long-term**: Consider modern SPA framework (React/Vue) rewrite for maintainability

## Testing Gaps

- No unit tests found in codebase
- No integration tests for order/payment flows
- No security regression tests
- Recommend: Jest for unit tests, Cypress for E2E, OWASP ZAP for security scanning
