# Migration `20201103024243-init`

This migration has been generated at 11/2/2020, 6:42:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Timer" ALTER COLUMN "name" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201103022723-init..20201103024243-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -13,6 +13,6 @@
 model Timer {
   id          Int       @default(autoincrement()) @id
   createdAt   DateTime  @default(now())
   duration    Int
-  name        String
+  name        String?
 }
```


