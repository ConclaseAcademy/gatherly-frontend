# Gatherly Frontend — Client Application Microservice

This directory contains the independent, single-page client application (SPA) for the Gatherly platform. Built using **React** and bundled via **Vite**, this microservice delivers a highly responsive UI/UX for event exploration, management dashboard tracking, and real-time ticketing checkouts.

---

## 🏗️ Architectural Pattern: Gateway Proxy Alignment

To circumvent the common limitation where client-side JavaScript applications cannot read native server host environments at runtime, this application employs a **Relative Gateway Routing Pattern**.

Instead of hardcoding absolute cloud server domains (e.g., `https://api.gatherly.com`) into the code logic, the application uses relative network mapping:
* **Base API Entry Route:** `/api/v1`

When running locally under Docker Compose or in our Azure Cloud Staging/Production environments, an **Nginx Reverse Proxy Gateway** intercepts these relative routes and shifts the traffic seamlessly across an isolated private bridge network directly into the backend service container.

---

## 🛠️ Local Development Setup

Follow these steps if you want to develop or run the frontend service independently on your machine (e.g., your MacBook Air) without spinning up the entire backend container stack.

### Prerequisites
* **Node.js:** v20.x (Active LTS recommended)
* **Package Manager:** `npm` (packaged alongside Node)

### 1. Install Dependencies
Navigate into the frontend microservice directory and pull down the verified package modules:
```bash
cd frontend
npm ci --quiet

```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
