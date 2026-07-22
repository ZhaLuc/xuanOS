# Apps: Registry and Types

**Paths:** `src/apps/types.ts`, `src/apps/registry.ts`

---

## `types.ts`

### `AppId`

String-literal union:

`"me" | "projects" | "programming-comps" | "school" | "music" | "deadlock"`

### `AppDefinition`

See [Apps Overview](./overview.md).

### `appOrder`

Canonical desktop icon order array of `AppId`.

---

## `registry.ts`

```ts
export const apps: Record<AppId, AppDefinition>;
export function getApp(id: AppId): AppDefinition;
export function listApps(): AppDefinition[];
```

- `getApp` - used by the window manager when opening.
- `listApps` - maps `appOrder` through `apps` for icon creation.

**No dynamic loading:** all apps are statically imported.

---

## Failure Modes

| Case | Result |
| --- | --- |
| Missing registry entry for an `AppId` | TypeScript should prevent; at runtime `apps[id]` would be `undefined` and crash on open |
| Order includes unknown id | Same |

---

## Related Documents

- [Apps Overview](./overview.md)
- [Development](../development.md)
