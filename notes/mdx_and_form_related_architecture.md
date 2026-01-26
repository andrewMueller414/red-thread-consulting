# Mdx & Form Related Architecture

> This architecture is a little atypical, so I'm leaving this here for the next dev.

After going over some project features with the client, we settled on mdx as the format to be used for the form-based components.

To make things editable, the form data is stored as a JSON record in the following form:

```ts
type FormData = Record<string, number | string | number[] | string[]>;
```

inside of a larger `mdxForm` schema and the associated `MdxForm` types.

This obviously breaks the typesafety provided by prisma taking away many of the advantages of working with Prisma, but there are several typable utility methods in the `features/mdx/methods` directory.
