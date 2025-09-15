-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "ime" TEXT NOT NULL,
    "prezime" TEXT NOT NULL,
    "naslov" TEXT NOT NULL,
    "tekst" TEXT NOT NULL,
    "datum" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lajkovi" INTEGER NOT NULL DEFAULT 0,
    "kategorija" TEXT NOT NULL DEFAULT 'fakultet'
);
INSERT INTO "new_Post" ("datum", "id", "ime", "lajkovi", "naslov", "prezime", "tekst", "userId") SELECT "datum", "id", "ime", "lajkovi", "naslov", "prezime", "tekst", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
