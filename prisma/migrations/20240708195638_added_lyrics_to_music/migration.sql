/*
  Warnings:

  - Added the required column `lyrics` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Music" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "lyrics" TEXT NOT NULL
);
INSERT INTO "new_Music" ("artist", "id", "title") SELECT "artist", "id", "title" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
CREATE UNIQUE INDEX "Music_title_artist_key" ON "Music"("title", "artist");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
