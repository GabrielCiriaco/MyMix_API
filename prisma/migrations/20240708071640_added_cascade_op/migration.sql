-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoritesPlaylist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "musicId" TEXT NOT NULL,
    CONSTRAINT "FavoritesPlaylist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FavoritesPlaylist_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FavoritesPlaylist" ("id", "musicId", "userId") SELECT "id", "musicId", "userId" FROM "FavoritesPlaylist";
DROP TABLE "FavoritesPlaylist";
ALTER TABLE "new_FavoritesPlaylist" RENAME TO "FavoritesPlaylist";
CREATE UNIQUE INDEX "FavoritesPlaylist_userId_musicId_key" ON "FavoritesPlaylist"("userId", "musicId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
