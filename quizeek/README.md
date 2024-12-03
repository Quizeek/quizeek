# Quizeek development

## Shadcn

New shadcn components can be added like so:

```
$ pnpm ui:add <component>
```

## Database

Dev DB can be started like so:

```
$ wsl
$ turso dev --db-file quizeek-dev.db
```

New migration can be created like so:

```
$ pnpm run db:migrate
```

DB studio can be launched like so:

```
$ pnpm run db:studio
```

## Dev .env example

```
DATABASE_URL=http://localhost:8080
AUTH_TOKEN=DOES_NOT_MATTER
```

## Design

![erd](../design/erd.png)
