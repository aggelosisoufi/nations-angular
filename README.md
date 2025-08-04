# Nation Service Frontend

Frontend for **Nation Service**, built with **Angular 19.2.14** using **standalone components**, **signals**, and **Angular Material**.  
Implements a responsive dashboard with tables, filtering, pagination, and advanced search integrated with a Spring Boot backend.

---

## 📦 Tech Stack

- **Angular 19.2.14** (Standalone Components + Signals)
- **Angular Material**
- **Reactive Forms**
- **RxJS**
- **SCSS** styling
- **TypeScript**

---

## 🚀 Features

1. **Page 1 – Countries**
   - Material table displaying `name`, `area`, and `countryCode2`
   - Clicking a row navigates to **Languages page**

2. **Page 2 – Max GDP / Population**
   - Material table with columns: `name`, `year`, `population`, `gdp`
   - Supports **server-side sorting** and **pagination**

3. **Page 3 – Advanced Search**
   - Filters by:
     - **Region** (dynamic dropdown from backend)
     - **Year range**
   - **Reactive Forms** with validation and default values
   - **Search & Reset** buttons with dynamic states
   - Fully integrated with backend **pagination and sorting**

---

## 📂 Project Structure

```
src/
 └── app
      ├── layout/main-layout        # Main sidenav + toolbar layout
      ├── models                    # Shared interfaces and DTOs
      ├── pages
      │    ├── countries            # Countries table + Languages page
      │    └── stats                # Stats pages
      │         ├── country-stats   # Page 3 – Advanced Search
      │         └── max-gdp         # Page 2 – Max GDP/Population
      ├── services                  # API services (Countries, Stats, Regions)
      ├── app.component.ts
      ├── app.component.scss
      ├── app.routes.ts             # Angular standalone routing
      └── app.config.ts             # HttpClient + Router providers
 └── environments                   # Environment configs
```

---

## ⚙️ Setup & Run

1. **Install dependencies**

```bash
npm install
```

2. **Run the application**

```bash
ng serve --open
```

By default, the frontend runs on **http://localhost:4200**.

---

## 🔗 API Integration

- Backend: **Spring Boot 2.7.18 (Java 8)** at `http://localhost:8888`
- Example call in `country-stats.component.ts`:

```ts
this.statsService.search(this.buildFilter(), this.pageIndex, this.pageSize, this.sort)
  .subscribe(res => this.stats.set(res.content));
```

- CORS is already configured in the backend

---

## ✅ Notes

- **Standalone Components** (no NgModules) with Angular 19 best practices  
- **Signals** for state management (`signal<T>()`)  
- **Reactive Forms** with validation, default values, and reset logic  
- Material tables with **sorting, pagination, and filtering**  
- Future‑ready: easy to add **resolvers, pipes, and custom directives**  
- Ready to integrate with **mobile responsive layout** if needed
