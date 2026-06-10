# Startup Graveyard: Failure Intelligence & Due Diligence Canvas

A comprehensive full-stack analytical platform designed to compile historical startup failures and evaluate new concepts against established risk dimensions. This documentation details the project's conceptual architecture, directory layouts, the underlying theories of the chosen technology stack, and local operational workflows.

---

## Table of Contents
1. [Core Architectural Overview](#1-core-architectural-overview)
2. [Project Layout & Structural Flow](#2-project-layout--structural-flow)
3. [Deep Dive: Technologies & Theoretical Foundations](#3-deep-dive-technologies--theoretical-foundations)
   - [Next.js 15 App Router Architecture](#nextjs-15-app-router-architecture)
   - [React 19 Rendering Model](#react-19-rendering-model)
   - [Tailwind CSS v4 Utility Architecture](#tailwind-css-v4-utility-architecture)
   - [Prisma ORM & PostgreSQL Database Layer](#prisma-orm--postgresql-database-layer)
   - [Recharts Visual Representation Layer](#recharts-visual-representation-layer)
   - [TypeScript Static Verification System](#typescript-static-verification-system)
4. [Environment Configuration Theory](#4-environment-configuration-theory)
5. [Getting Started & Local Setup](#5-getting-started--local-setup)
6. [Database Lifecycle & Synchronizations](#6-database-lifecycle--synchronizations)
7. [Development and Deployment Workflows](#7-development-and-deployment-workflows)

---

## 1. Core Architectural Overview

The **Startup Graveyard** follows a modular full-stack architecture built on a single-repository layout. The system relies on a **three-tier architecture**:

```mermaid
graph TD
    subgraph Client Tier [UI & Interaction Layer]
        A[Landing Page]
        B[Dashboard Console]
        C[Interactive Idea Canvas]
        D[Database Explorer]
    end

    subgraph Service Tier [Application Logic Layer]
        E[API Endpoints Routing]
        F[Heuristic Classification Engine]
        G[Statistical Risk Evaluator]
        H[Pivot Generation Service]
    end

    subgraph Database Tier [Persistence Layer]
        I[PostgreSQL Database]
        J[Prisma ORM Layer]
    end

    Client Tier -->|HTTP Requests / JSON API| Service Tier
    Service Tier -->|Object Relations / SQL Client| Database Tier
```

*   **Client Tier (User Interface)**: Fully responsive layouts displaying graphical metrics, validation fields, and tables. It coordinates rendering states and themes (Light/Dark mode) across user routes.
*   **Service Tier (Application Logic)**: Handles incoming client payloads. It extracts keyphrase patterns, determines target industries, calculates risk categories, correlates database records of historical analogues, and drafts strategic pivot configurations.
*   **Database Tier (Persistence)**: Houses structured relational data, logging startup histories, market metrics, and past user idea analyses.

---

## 2. Project Layout & Structural Flow

The codebase divides directories to isolate backend schema declarations, reusable utility libraries, API handlers, and visual page components:

*   **Database Module (`prisma/`)**: Declares the operational structure of the application. Contains the database schema definitions, automatic migration scripts, and seed files.
*   **Utility & Services Library (`src/lib/`)**: The core engine of the application.
    *   **Database Client (`db.ts`)**: Initializes the connection pools and handles database access controls.
    *   **Analytics Engine (`services/analytics.ts`)**: Implements mathematical and heuristic equations to categorize ideas, compute risk percentages, and determine pivots.
    *   **Global Context (`context/`)**: Controls environment-wide state machines such as visual styles and display theme toggles.
*   **Application Routing & Views (`src/app/`)**: Maps physical directory paths to browser URLs (using Next.js App Router).
    *   **Core Landing Page (`page.tsx`)**: Promotes application services, displays case study models, and provides navigation triggers.
    *   **Dashboard Shell (`dashboard/`)**: Features analytical views, interactive pages, database browsing, and application settings.
    *   **Serverless Handlers (`api/`)**: Houses backend REST API routing mechanisms.

---

## 3. Deep Dive: Technologies & Theoretical Foundations

### Next.js 15 App Router Architecture

#### Conceptual Theory
Next.js utilizes file-system routing built on top of React Server Components (RSC). It introduces a hybrid model:
*   **React Server Components (RSC)**: Pages are evaluated and rendered on the server. The server transmits pre-built UI components directly to the browser, reducing initial bundle sizes, removing client-side layout rendering times, and optimizing Search Engine Optimization (SEO).
*   **Client Components**: Subsections of the page that contain user interactions (e.g., text inputs, buttons, sliders) are marked for execution in the browser. During rendering, the framework handles the communication between static server code and dynamic client code.
*   **Turbopack Compiler**: A Rust-based successor to Webpack. It compiles modules in parallel and uses incremental caching, resulting in instant hot-reloading in local development environments.

#### How it is used in the project
Next.js handles all client routes (such as the main landing page, dashboard explorer, and setting screens) and exposes backend endpoints. For instance, submission routes process startup ideas on the server, interact with the PostgreSQL database, and return formatted results without requiring a separate server daemon.

---

### React 19 Rendering Model

#### Conceptual Theory
React operates on a declarative UI paradigm using a Virtual Document Object Model (Virtual DOM). When UI states change, React computes the structural difference between the existing display state and the target layout, then performs optimized operations to update the browser window. React 19 optimizes data loading, UI hydration, hook executions, and concurrent rendering cycles.

#### How it is used in the project
React coordinates interactive states across the analytical console:
*   Locks input forms and displays animated loading blocks while calculations are computed.
*   Swaps tabs dynamically to toggle between list views, opportunity scores, and recommendations.
*   Updates visual themes by distributing settings down the component tree using React Context.

---

### Tailwind CSS v4 Utility Architecture

#### Conceptual Theory
Tailwind CSS v4 replaces traditional style compilation with a utility-first compilation engine written in Rust. Instead of writing custom CSS selectors, developers apply utility classes directly in the HTML layout. At build time, the compiler scans all files, detects active classes, and creates a minimized stylesheet containing only the styling rules that are actually used.

Version 4 does away with separate configuration files. It uses native CSS custom properties defined in the main stylesheet to build and extend theme parameters.

#### How it is used in the project
All styles, colors, layouts, and animations are handled via Tailwind v4 utility values:
*   **Color Palette**: Custom colors (deep slate, dark blue-blacks, indigo accents) are bound to CSS variables to support seamless Dark and Light modes.
*   **Glassmorphism Effects**: Cards employ backdrop-filter blur parameters and semi-transparent borders to present a premium look.
*   **Micro-Animations**: Shimmer gradients animate loading placeholders, and pulse rules indicate ongoing background tasks.

---

### Prisma ORM & PostgreSQL Database Layer

#### Conceptual Theory
*   **Object-Relational Mapping (ORM)**: Translates database rows into native language objects. Developers define database structures inside a central schema file, and the ORM auto-generates query clients, preventing SQL-injection vulnerabilities and database mismatch errors.
*   **Relational Model (PostgreSQL)**: Organizes data into structured tables with strict column definitions, unique IDs (UUIDs), and constraints.
*   **Connection Pooling**: Managing database connections can consume system resources. A connection pool keeps a set of active connections open, reusing them for incoming requests instead of opening and closing a new connection for every query.

#### How it is used in the project
The database schema tracks five core objects:
1.  **Startup**: Houses fields for names, statuses, and funding amounts.
2.  **FailureReason**: Connects failures directly to startups using one-to-many relationships.
3.  **LessonLearned**: Logs recommendations linked to corresponding failed startups.
4.  **MarketTrend**: Details industry growth rates used in market evaluations.
5.  **StartupAnalysis**: Persists records of validated ideas for later review.

To protect system resources, a connection pool manager wraps the Postgres client driver, sharing connections across the Next.js API endpoints. Relationships are configured with cascade deletes, ensuring that deleting a startup automatically cleans up all associated records.

---

### Recharts Visual Representation Layer

#### Conceptual Theory
Recharts uses Scalable Vector Graphics (SVG) instead of HTML Canvas to draw graphs. Each graph component is a native React node, making it easy to handle hover actions, scale dynamically inside flexible layouts, and apply CSS transition animations.

#### How it is used in the project
Recharts displays the analytical data from the evaluation engine:
*   **Failure Reasons Distribution**: A vertical bar chart on the main dashboard showing which failure reasons are most common.
*   **Heuristic Risk Mappings**: Bar graphs detailing risks across dimensions (such as timing, operations, and competition) with colors that shift based on risk levels.

---

### TypeScript Static Verification System

#### Conceptual Theory
TypeScript introduces static type verification to JavaScript. Developers declare strict structures for variables, API calls, and component props. The compiler verifies these structures during coding, catching typos and missing parameters before execution.

#### How it is used in the project
TypeScript acts as the quality gatekeeper for the app's analytical service:
*   Defines models for metrics, recommendations, and analysis scores.
*   Ensures that database queries return fields matching the structures expected by the React components.

---

## 4. Environment Configuration Theory

The application uses environment variables to keep sensitive credentials and system endpoints outside of version control.
*   `DATABASE_URL`: Contains credentials, host locations, and target database parameters used by the database driver.
*   `NEXT_PUBLIC_APP_URL`: Declares the base path for client requests and asset links, ensuring absolute URLs resolve correctly in different environments.

---

## 5. Getting Started & Local Setup

### Step 1: Initialize Node.js Environment
Make sure Node.js v20.x or higher is installed. This runtime compiles the project modules and executes the local server environment.

### Step 2: Set Up Project Dependencies
Use the package manager to install all required libraries (Next.js, React, Tailwind, Prisma, Recharts, Lucide, and TypeScript compilation tools) into the local folder.

### Step 3: Configure Database Server
Ensure a PostgreSQL database is active. You can run PostgreSQL locally using standard database software, or start a pre-configured database container using Docker.

---

## 6. Database Lifecycle & Synchronizations

All schema updates and database operations are managed via the command line using Prisma:

### Step A: Push Schema Definitions
To sync your database tables with the layout defined in the schema file (ideal for development environments).

### Step B: Load Initial Seed Data
Run the database seed script to import historical startup failure studies and industry trends.

### Step C: Inspect Data visually
To browse database records, run queries, and modify tables in a visual interface, open the database studio.

---

## 7. Development and Deployment Workflows

### Run Local Development Server
Start the development server with Turbopack enabled. Open the local address inside your browser. Edits to the pages will hot-reload automatically.

### Compile Build Package
To compile the codebase for production deployment, run the compiler. It performs code optimization, compresses images, bundles CSS variables, and outputs a ready-to-run package.

### Run Production Server
Once built, launch the production server. This runs the optimized, compiled version of the application.
