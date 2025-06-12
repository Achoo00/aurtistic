| ID  | Title                                   | Score | # of Subtasks | Status      | # of Dependencies |
|-----|-----------------------------------------|-------|---------------|-------------|-------------------|
| 1.1 | Initialize Project Repository           | 1     | 3             | Done        | 0                 |
| 1.2 | Supabase Project Setup                  | 2     | 3             | Done        | 1 (1.1)           |
| 1.3 | Vercel Deployment Setup                 | 2     | 3             | Done        | 1 (1.1)           |
| 1.4 | Database Schema Definition (PostgreSQL) | 2     | 1             | In Progress | 1 (1.2)           |
| 2.1 | Implement User Sign-In/Sign-Up          | 3     | 2             | Done        | 2 (1.2, 1.4)      |
| 2.2 | Implement User Sign-Out                 | 1     | 1             | Done        | 1 (2.1)           |
| 2.3 | Protect Routes                          | 2     | 1             | Done        | 1 (2.1)           |
| 2.4 | Admin User Management (Manual)          | 1     | 1             | Done        | 1 (2.1)           |
| 2.5 | Password Reset Flow                     | 1     | 1             | Done        | 1 (2.1)           |
| 3.1 | Supabase Image Upload Integration       | 4     | 2             | Done        | 1 (1.2)           |
| 3.2 | Responsive Gallery Grid View            | 3     | 3             | Not Started | 0                 |
| 3.3 | Detail View/Modal                       | 3     | 1             | Not Started | 2 (3.1, 3.2)      |
| 4.1 | Filter UI Implementation                | 4     | 3             | Not Started | 0                 |
| 4.2 | Basic Search Bar                        | 3     | 2             | Not Started | 0                 |
| 5.1 | Tailwind CSS Integration                | 2     | 1             | Not Started | 0                 |
| 5.2 | Mobile Layout Refinement                | 3     | 1             | Not Started | 1 (5.1)           |
| 5.3 | Image Optimization                      | 3     | 2             | Not Started | 1 (3.1)           |
| 6.1 | Initial Vercel Deployment               | 2     | 1             | Not Started | 1 (1.3)           |
| 6.2 | Cross-Browser Compatibility Testing     | 2     | 1             | Not Started | 1 (5.2)           |
| 6.3 | Accessibility (WCAG AA) Checks          | 2     | 1             | Not Started | 1 (5.2)           |
| 6.4 | Security Review                         | 3     | 2             | Not Started | 2 (2.1, 1.4)      |
| 6.5 | Performance Benchmarking                | 3     | 1             | Not Started | 2 (3.1, 5.3)      |
| 7.1 | Custom Image Upload UI                  | 4     | 3             | Not Started | 2 (3.1, 3.2)      |
| 7.2 | Fuzzy Search Implementation             | 4     | 2             | Not Started | 1 (4.2)           |
| 8.1 | Analytics                               | 3     | 1             | Not Started | 1 (6.5)           |
| 8.2 | Collaborative Tagging/Comments          | 5     | 2             | Not Started | 2 (3.3, 7.1)      |
| 8.3 | PWA Support                             | 4     | 1             | Not Started | 2 (7.2, 8.1)      |
