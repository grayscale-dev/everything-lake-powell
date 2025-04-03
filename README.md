# EverythingLakePowell

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## 📁 Project Structure

```text
src/
│
├── app/
│   ├── core/                      # Core services and singleton providers
│   │   ├── services/
│   │   │   └── data.service.ts
│   │   │   └── auth.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   └── core.config.ts         # provideHttpClient, interceptors, etc.
│
│   ├── shared/                    # Reusable UI components and utils
│   │   ├── components/
│   │   │   └── button/
│   │   │       ├── button.component.ts
│   │   │       ├── button.component.html
│   │   │       └── button.component.scss
│   │   ├── pipes/
│   │   │   └── format-date.pipe.ts
│   │   ├── directives/
│   │   │   └── autofocus.directive.ts
│   │   └── shared.config.ts       # provideSharedComponents(), etc.
│
│   ├── models/                    # All shared interfaces and types
│   │   ├── user.model.ts
│   │   ├── loan.model.ts
│   │   └── state.model.ts
│
│   ├── pages/                     # Top-level routeable pages
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   └── dashboard.config.ts
│   │   ├── get-started/
│   │   │   ├── get-started.component.ts
│   │   │   └── get-started.config.ts
│   │   └── quote-form/
│   │       ├── quote-form.component.ts
│   │       └── quote-form.config.ts
│
│   ├── app.component.ts          # Root component
│   ├── app.routes.ts             # Routing configuration
│   └── app.config.ts             # Application-level providers
│
├── assets/                       # Static assets (images, fonts, etc.)
│
├── environments/                 # environment.ts + environment.prod.ts
│
└── styles.css                    # Global Tailwind or SCSS styles