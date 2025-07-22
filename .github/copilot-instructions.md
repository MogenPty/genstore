# GenStore - AI Coding Agent Instructions

## Project Overview

GenStore is a Next.js 15 e-commerce application using:

- **Payload CMS** (v3) with MongoDB for content management and API
- **tRPC** for type-safe API routes with React Query integration
- **Module-based architecture** in `src/modules/` with feature-specific organization
- **Radix UI + Tailwind** for components with shadcn/ui patterns
- **App Router** with route groups: `(app)` for public pages, `(payload)` for admin

## Architecture Patterns

### Module Structure

Follow the established pattern in `src/modules/`:

```
modules/[feature]/
├── types.ts          # tRPC output types using inferRouterOutputs
├── schemas.ts        # Zod validation schemas
├── server/
│   └── procedures.ts # tRPC router definitions
└── ui/
    ├── components/   # Feature-specific React components
    └── views/        # Page-level components
```

### tRPC Integration

- **Server**: Define procedures in `modules/[feature]/server/procedures.ts`
- **Client**: Use `useTRPC()` hook with React Query patterns
- **Types**: Extract types using `inferRouterOutputs<AppRouter>["router"]["procedure"]`
- **Context**: All procedures get Payload CMS instance via `ctx.payload`

### Payload CMS Patterns

- Collections defined in `src/collections/` with TypeScript configs
- Use `ctx.payload.find()`, `ctx.payload.create()` etc. in tRPC procedures
- Relationships use `type: "relationship"` and joins use `type: "join"`
- Access control via collection-level `access` configuration

### Route Organization

- Route groups: `(app)` for public pages, `(payload)` for admin interface
- Dynamic routes: `[category]/[subcategory]` for nested category navigation
- Layout inheritance: `(app)/layout.tsx` wraps with TRPCReactProvider

## Development Workflows

### Key Commands

```bash
bun dev                    # Start development server
bun run generate:types     # Generate Payload types after schema changes
bun run db:fresh          # Reset database with fresh migrations
bun run db:seed           # Seed database with sample data
```

### Database Operations

- After modifying Payload collections, run `generate:types` to update `payload-types.ts`
- Use `db:fresh` for schema changes that require migration reset
- MongoDB connection via `DATABASE_URI` environment variable

### Component Development

- UI components in `src/components/ui/` follow shadcn/ui patterns
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes
- Feature components in module-specific `ui/components/` directories

## Project-Specific Conventions

### Category System

- Hierarchical categories with parent/child relationships
- Categories collection supports `subcategories` join field
- Navigation uses category `slug` and optional `color` for theming
- Route pattern: `/[category]` or `/[category]/[subcategory]`

### State Management

- React Query for server state via tRPC
- Local state with useState for UI interactions
- No global state management library - prefer server state and local state

### File Naming

- React components: PascalCase (e.g., `CategoriesSidebar.tsx`)
- Route files: lowercase (e.g., `page.tsx`, `layout.tsx`)
- Utility files: kebab-case (e.g., `use-mobile.ts`)
- Collection configs: PascalCase (e.g., `Categories.ts`)

### Import Patterns

- Use absolute imports with `@/` alias for `src/`
- Group imports: external libs, internal modules, relative imports
- Import types with `type` keyword when possible

## Integration Points

### Payload Admin

- Admin interface at `/admin` route group `(payload)`
- Custom admin styles in `(payload)/custom.scss`
- Admin user collection defined in `collections/Users.ts`

### Authentication

- Payload handles auth with session-based approach
- tRPC `authRouter` provides session management procedures
- Cookie-based authentication with custom cookie prefix "genstore"

### Media Handling

- Media collection for file uploads
- Sharp.js configured for image processing
- File storage via Payload's default local storage

## Critical Files

- `src/payload.config.ts` - Main Payload configuration
- `src/trpc/init.ts` - tRPC setup with Payload context
- `src/trpc/routers/_app.ts` - Main router composition
- `src/app/(app)/layout.tsx` - Client-side providers setup
- `src/collections/` - Data model definitions
