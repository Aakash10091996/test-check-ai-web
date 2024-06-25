# Folder Structure Explanation

This folder structure uses Next.js Route Groups to organize routes without affecting URL paths:

```
(componentspage)
|- layout.tsx
|- components
|   |- [framework]
|   |- [uielement]
|   |- page.tsx
|- uielements
|   |- [framework]
|   |- [uielement]
|   |- page.tsx
```

- `(componentspage)`: A route group that doesn't affect the URL path.
- `layout.tsx`: Common layout for all routes in the group.
- `components` & `uielements`: Organized sub-routes with dynamic segments `[framework]` and `[uielement]`.

This structure maintains clean URLs while organizing code effectively.
