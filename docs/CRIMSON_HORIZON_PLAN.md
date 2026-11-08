# CRIMSON HORIZON: THE ADVENTURES OF SAN AND JADE (the sequel; planning, nothing story-side built yet)
Author's direction: after the crossover (Tribute ends at the crossover's chapter 990) comes the sequel, **Crimson Horizon: The Adventures of San and Jade**: Jade and San combine forces. Inter-world exploration; **no Fifteen Evils counter** (Dima and Xima's story is over). A true crossover for both worlds: **each world builds its own equivalent in its own game, from shared chapters (the same pages) to save resources.** The sequel's chapter numbers **restart at 1**. Dima and Xima keep no fixed look (one golden/yellow, one dark).

## Built so far (infrastructure only)
- **Upload bot** (`.github/workflows/pages.yml`, same approach as Crimson Moon): drop PNG/JPG pages into `assets/horizon/` named `c001.png` (chapter 1), `c001_2.png` (its second page), `arc01.png` (a sequel arc cover); the next push to main converts them to WebP (quality 82), removes the PNG, commits the result and deploys. Tall images over WebP's 16,383 px limit are sliced into pages. Files that do not match those names (including everything in Tribute's `assets/comics/`) are never touched. Tested here with sample files; it has not yet run in GitHub Actions.
- Nothing else: no sequel chapter list, journal or screens exist yet.

## Assumptions (change any of these)
1. The sequel lives **inside this repo** as its own section (own chapter list, own numbering from 1), not a separate repo. If it should be its own repo, the bot above moves there and the plain `ch001.png` names can be used.
2. Shared chapters use the **same sequel chapter number in both repos**, so a page maps to the same file name on both sides.
3. Tribute shows the story from Jade's side (the Canon Five); San's inner side stays in the Crimson Tide repo.

## Needed from the author before building
- The sequel's first chapter pages and any brief (arc structure, cover).
- Whether the Tribute canon five stay Jade, Devon, Sky, Levi and Sally in the sequel, and who joins San's side.
- What marks the end of the Tribute chapters (the "chapters end" marker before the sequel).
