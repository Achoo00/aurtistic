# Aurtistic — Product Requirements Document (PRD)

**Project Title:** Aurtistic — Monthly Digital Art Showcase
**Owner:** Andrew
**Last Updated:** 2025-06-10
**Status:** On track
**Target Release:** July 2025

---

## **1. Overview & Value Proposition**

Aurtistic is a lightweight, private web application for a small group of friends to upload, organize, and view digital artwork. It provides a beautiful, fast, and mobile-friendly gallery for monthly submissions, with robust search/filter features and creative control—without the noise or risks of commercial social platforms.

**Problem:** Existing platforms are too public, cluttered, or lack archiving/search tools for small, trusted groups.
**Solution:** Aurtistic offers a private, ad-free, and organized way to share and revisit creative work within a trusted circle.

**Flexibility Option:** Aurtistic can also run in local-only mode without requiring authentication or database integration. This is ideal for demoing or static-use cases.

---

## **2. Goals & Objectives**

* **P0:**

  * Simple, clean web gallery for \~150 digital artworks
  * Optional authenticated uploads with metadata (via Supabase)
  * Filtering by artist, date, tags, title
  * Optimized image performance for mobile/desktop
  * Privacy and creative control outside ad-based platforms

* **P1:**

  * Custom upload UI (in addition to Supabase dashboard)
  * Fuzzy search

* **P2:**

  * Analytics, collaborative tagging, comments, PWA support

---

## **3. Target Personas**

* **Digital Artist:** Uploads and organizes their work monthly
* **Contributor/Friend:** Browses, filters, and enjoys the gallery
* **Admin (David):** Manages users and content
* **Local User (Optional):** Runs app without login or uploads

---

## **4. Assumptions & Constraints**

* All contributors are trusted friends, manually added by admin
* No public sign-up or invitation system; access shared by private link from admin
* No public sharing, comments, or likes in MVP
* Images <10MB, total image count \~150
* Mobile-first design
* Password resets via email (Supabase Auth)
* Optional local mode without login or Supabase connection

---

## **5. Features & Requirements**

| Feature                    | Priority | Description                                              | Acceptance Criteria                          |
| -------------------------- | -------- | -------------------------------------------------------- | -------------------------------------------- |
| Gallery grid               | P0       | Responsive grid view of all artworks                     | Loads on mobile/desktop, displays all images |
| Detail view/modal          | P0       | Modal or detail page with metadata for each artwork      | Shows image, title, artist, tags, date       |
| Image upload (Supabase UI) | P0       | Secure upload via Supabase dashboard                     | Uploads succeed, metadata stored             |
| Image upload (custom UI)   | P1       | Optional custom uploader with metadata input             | Uploads succeed, metadata stored             |
| Metadata schema            | P0       | Store title, description, tags, artist, date, image\_url | All fields available in database             |
| Filter UI                  | P0       | Filter by artist, tag, date (monthly groupings)          | Filtering adjusts visible artworks           |
| Search bar                 | P0       | Text search by title/description                         | Returns relevant artworks                    |
| Fuzzy search               | P1       | Optional: partial match search (Algolia or pg\_trgm)     | Finds near-matches                           |
| Mobile styling             | P0       | Responsive, touch-friendly layout using TailwindCSS      | Usable on phones/tablets                     |
| Deploy to Vercel           | P0       | Frontend hosted on Vercel                                | Site is live                                 |
| Local mode (no auth/db)    | P0       | Load artworks from local directory and disable auth      | App runs offline without errors              |

---

## **6. Non-Functional Requirements**

* Loads in under 2 seconds on 3G mobile
* Images optimized and delivered via CDN or public folder
* Accessible (WCAG AA compliance)
* Supports Chrome, Safari, Firefox, and mobile browsers
* Secure: Only authenticated users can upload (if enabled)
* Privacy: No public user data or sharing
* Graceful fallback to local mode if Supabase is not configured

---

## **7. Technical Stack**

| Layer       | Technology                                     |
| ----------- | ---------------------------------------------- |
| Frontend    | Next.js + Tailwind CSS                         |
| Backend/API | Supabase (optional)                            |
| Database    | Supabase PostgreSQL (optional)                 |
| Storage     | Supabase Storage or local public/images folder |
| Hosting     | Vercel                                         |
| Auth        | Supabase Auth (email/password, optional)       |

---

## **8. Image Handling & Data Schema**

* **Supabase Mode:**

  * Images stored in Supabase Storage
  * Metadata in PostgreSQL:

    * title: string
    * description: optional string
    * tags: array of strings
    * artist: string
    * date\_uploaded: timestamp
    * image\_url: string

* **Local Mode:**

  * Images stored in `/public/artworks`
  * Metadata optionally hardcoded or stored in a local JSON file

* Rendered using Next.js Image component

---

## **9. Success Metrics**

* 90% of invited users upload at least once in the first month
* Page load time <2s on mobile
* No reported privacy or access issues in first 3 months
* Local-only version works without errors

---

## **10. Milestones & Timeline**

| Week | Tasks                                      |
| ---- | ------------------------------------------ |
| 1    | Project setup, Supabase + Next.js scaffold |
| 2    | Implement metadata schema & gallery view   |
| 3    | Add filter/search and image optimizations  |
| 4    | Polish mobile UI and deploy to Vercel      |
| +    | Add fallback support for local-only mode   |

---

## **11. Out of Scope**

* No public sign-up, sharing, comments, or likes
* No open invitations; all contributors are manually added
* No advanced analytics or collaborative tagging in MVP

---

## **12. Design & Wireframes**

* \[Attach or link to Figma/Notion wireframes here if available]

---

## **13. Open Questions (Resolved)**

* **How will we invite new users?**
  No formal invitation system; admin (David) shares access links directly with trusted friends. All contributors are manually added.

* **How will users reset passwords?**
  Password resets are handled via email using Supabase Auth’s standard flow.

* **What if Supabase is not configured or user prefers static mode?**
  The app will run in "local mode" using static assets and optional JSON metadata.

---

## **14. Stretch Features (Optional, P2)**

* Image upload from mobile
* Monthly auto-categorization views (carousel, tabs)
* Basic analytics (views, uploads/month)
* Collaborative tagging or comments
* PWA (offline access)
