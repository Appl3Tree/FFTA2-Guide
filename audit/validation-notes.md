# FFTA2 Data Validation Notes

Sources checked:

- GameFAQs Dev guide: https://gamefaqs.gamespot.com/ds/937330-final-fantasy-tactics-a2-grimoire-of-the-rift/faqs/53627
- GameFAQs warfreak guide: https://gamefaqs.gamespot.com/ds/937330-final-fantasy-tactics-a2-grimoire-of-the-rift/faqs/53370
- Final Fantasy Wiki / Fandom Behemoth page: https://finalfantasy.fandom.com/wiki/Behemoth_(Tactics_A2)

## 2026-06-04 Audit Pass

- Added `npm run audit:data`, which writes `audit/data-audit.json`.
- Used the rendered browser pages for the two GameFAQs guides after verification. Full-text scratch caches were removed from the repo workspace after validation.
- Split the two same-name `Sanctify` abilities into separate runtime IDs:
  - `sanctify-abyss` for the Abyss/Neukhia Wisp entry.
  - `sanctify` for Paladin/Chivalry, taught by Ogrenix.
- Removed the redundant duplicate `Critical: Evasion↑` ability record and normalized equipment references to the surviving `critical-evasion↑` ID.
- Normalized equipment references from `attack-up`, `defense-up`, `magick-up`, and `resistance-up` to the existing arrow-form ability IDs.
- Canonicalized mission aggregation through `ALL_MISSIONS`, merging duplicate story/per-arc entries by ID so the app renders and counts 258 missions instead of 264 raw records.
- Removed a placeholder enemy template accidentally left inside `The Next Step`; both GameFAQs sources identify it as a delivery mission rather than a battle roster.
- Normalized empty enemy reaction/passive ability slots from `""` to `null`.

Remaining intentional findings:

- `Sanctify` remains a duplicate display name because it represents two different mechanics in different ability sets.
- Dark Behemoth bestiary elemental fields remain `?`; Fandom's Behemoth (Tactics A2) stat table also lists `?` for Dark Behemoth's weak/half/null/absorb fields.
- Raw mission source files still include six duplicate IDs because mandatory story quests are represented in both `storyMain.ts` and the per-arc quest data. The runtime canonical list dedupes them.

## 2026-06-04 Type Safety Pass

- Updated `src/types/ffta2.ts` to match the data shapes currently used by missions, rewards, enemy loadouts, enemy equipment, RetroAchievements, mission tags, and race/job panels.
- Added `npm run typecheck`.
- Fixed type-level drift in mission tags, panel tone classes, ability descriptions, nullable bestiary fields, enemy equipment resolution, and global/mission search text indexing.
- Verified `npm run typecheck`, `npm run audit:data`, and `npm run build` all pass.

## 2026-06-04 A1/B2 Mission Source Pass

- Checked A1/B2 mission metadata, rewards, enemy rosters, and strategy summaries against the Dev and warfreak GameFAQs guides, with Fandom/other walkthrough lookups only for disputed monster identity checks.
- Normalized `Wanted: Ugohr` spelling and Moonwood reward quantity to the Dev guide/RetroAchievements spelling and reward count; the warfreak guide uses `Ughor` and Moonwood x2, so this is recorded as a source conflict.
- Corrected `Wanted: Gilmunto` story and optional records so Gilmunto is the Asp, with Worgen x2, Yellow Jelly x1, and Thunder Drake x1 support, and restored the source reward of 1330 Gil, CP 24, Succulent Fruit x3, Storm Stone x5, and Quality Pelt x2.
- Restored `Books of Magick` after a source-compare edit briefly inherited Gilmunto strategy/rewards; source values are 2370 Gil, CP 30, Storm Sigil x2, and Water Sigil x2.
- Corrected `Now That's a Fire!` optional metadata to a non-cancellable story battle with no day limit.
- Corrected `Pearls in the Deep` optional metadata to a non-cancellable escort/story battle with no day limit, Lord of the Flowsand as a Yowie, and Antlion support.
- Left A1-04 `The Next Step` required Negotiation at 4 because the included sources conflict: Dev lists 13, while warfreak/app data list 4.
- Left A1-06 `A Paw Full of Feathers` Tiny Mushrooms at x4 because the included sources conflict: Dev lists x2, while warfreak/app data list x4.

## 2026-06-04 C3 Mission Source Pass

- Added missing `C3-05 Monster Poaching` from the Dev and warfreak guides, including its protection objective, Beastmaster/Hellhound encounter notes, Defender dispatch recommendation, Teamwork/Adaptability requirements, and Mind Ceffyl reward.
- Added missing `C3-09 Stuck in the Muck`, including its item-recovery objective, ranged-weapon law, Chocobo/Great Tortoise/Sprite enemy roster, and Mythril/Spiral Incisor rewards.
- Corrected `C3-13 Kyrra, Dragoon` required talents from Negotiation/Adaptability to Negotiation/Teamwork.

## 2026-06-04 C4 Mission Source Pass

- Added missing `C4-10 Sleight of Hand`, including Trickster enemy notes, Earth Sigil reward, treasure-chest/Ribbon note, and Trickster job-unlock tags.
- Added missing `C4-11 Kidnapping!?`, including the Sant D'alsa Bluff objective, Prima Donna enemy roster, Prime Pelt reward, and source prerequisite notes.
- Added missing `C4-15 The Storage Shed`, including the late low-rank enemy roster and High Arcana reward.
- Corrected `C4-07 Instrument of Inspiration` name, fee, and Leucojum spelling.
- Corrected `C4-14 The Cat's Meow` rank from 28 to 27.

## 2026-06-04 C5 Mission Source Pass

- Added missing `C5-08 Goug Nightwatch`, including the timed Baknamy/Luchorpan battle, no-debuff law, and 6620 Gil/82 CP reward.
- Added missing `C5-16 Unplumbed Depths`, including the Neslowe Passage treasure objective, monster roster, Stormsoul Crystal reward, and Adelaide Heritor ability unlock.
- Corrected `C5-01 Geomancer's Way - Rain` prerequisite to `Geomancer's Way - Sun`.
- Corrected `C5-03 Starstruck` loot spelling from `Wayerwyrd Crystal` to `Waterwyrd Crystal`.
- Corrected `C5-06 A Lanista's Pride` talents to Negotiation 39 and Teamwork 39, added the Ranger/Berserker support enemies, and updated strategy priority around the Assassin/Ninja/Parivir.
- Added `Ring of Precepts` as an additional reward for `C5-13 A Lasting Peace`.
- Recorded source conflict: Dev lists `Unplumbed Depths` as 98 clan points, while warfreak lists 99; the app currently uses 98 from Dev.

## 2026-06-04 D1 Mission Source Pass

- Added missing `D1-02 Oh No, Kupo!`, including the Goug machinery-parts objective, Bomb/Grenade/Headless/Worgen roster, and Tanned Beast Hide reward.
- Added missing `D1-05 The Bangaa of the Rupies`, including the Nu Mou Nobles enemy roster, Fire law, Teamwork/Adaptability requirements, and Earth Sigil reward.
- Added missing `D1-14 'Tis the Season`, including the four-round Mimic survival objective, HP <= 20 law, Magick Fruit reward, and Mimic respawn notes.
- Expanded `D1-01 An Earnest Delight` with the Marnot impersonation objective, Harming Seeq law, full route locations, and the manual Goug battle context.
- Corrected `D1-07 The Rivalry of the Rupies` reward to 10030 Gil and added the Shining Lute reward; Dev and Fandom agree, while warfreak lists 10300 Gil.
- Clarified `D1-07` ally notes so Madreth is identified as an Arcanist with a Nu Mou Time Mage aiding the fight.
- Recorded source conflict: `D1-10 The Nu Mou of the Rupies` required talents differ across sources. Dev/Fandom list Teamwork 20 and Adaptability 20; warfreak/app data list Aptitude 20 and Teamwork 20, so the existing app values were left unchanged.
- Recorded source conflict: Dev lists `D1-14 'Tis the Season` fee as 500 Gil, while warfreak lists 400 Gil; the app currently uses 500 from Dev.

## 2026-06-04 D2 Mission Source Pass

- Added missing `D2-03 The Wonders of Loar`, including the 16-day wayfarer route, Adaptability 47 requirement, and 1750 Gil/40 CP reward.
- Added missing `D2-05 Chita on Weapons - Masters`, including the final speed-battle setup, piercing-weapons law, 7550 Gil/98 CP reward, and Materia Blade bonus reward.
- Added missing `D2-08 Fluffy Flier?`, including the Neslowe Passage monster roster, Scion ban, and 5410 Gil/76 CP reward.
- Added missing `D2-11 Cake: The Catastrophe`, including the Kthili Sands monster roster, bladed-weapons law, and 6830 Gil/74 CP reward.
- Added missing `D2-13 My Secret Shame`, including the exam-paper recovery objective, back-attack law, Sprite/Hoppy Bunny/Dreamhare/Deadly Nightshade roster, and Wyvern Wing reward.
- Corrected `D2-04 The Forgotten Places` days from 20 to 13 based on the Dev guide and the mission text; warfreak's table still lists 20, so this remains a source conflict.
- Expanded `D2-06 Bug Hunt` to include all three colored antlion objectives, stage laws, and the missing Zedlei Forest enemy roster.
- Recorded source conflict: `D2-07 The Show's Not Over` reward is Body Ceffyl x2 in Dev and x3 in warfreak/app data; left x3 unchanged.
- Recorded source conflict: `D2-10 Cake: The Ingredients` CP is 36 in Dev and 54 in warfreak/app data; left 54 unchanged.
- Recorded source conflict: `D2-11 Cake: The Catastrophe` rank is 27 in Dev and 37 in warfreak; the app uses warfreak's 37.

## 2026-06-04 D3 Mission Source Pass

- Added missing `D3-05 Rude Awakening`, including Malboro Vine/Foul Liquid requirements and Dev-guide location/talent data.
- Added missing `D3-06 Drowsy Draught`, including Succulent Fruit/Sweet Sap requirements and the Witch of the Fens route note.
- Added missing `D3-07 Teach a Man to Run`, including the Enchan escort objective, Copycat law, Rafflesia/Malboro roster, and Potion extra reward.
- Added missing `D3-10 Teach a Man to Fish`, including the Enchan escort objective, Harming Nu Mou law, Defender dispatch recommendation, monster roster, and 4260 Gil/56 CP reward.
- Corrected `D3-11 Love-Struck` reward from 5920 Gil to 2910 Gil based on Dev; warfreak lists 5920 Gil, so this remains a source conflict.
- Corrected `D3-12 All Good Things...` CP from 40 to 52 based on Dev; warfreak lists 40 CP, so this remains a source conflict.
- Recorded source conflict: `D3-05 Rude Awakening` has location/talent disagreement. Dev lists Tramdine Fens and Negotiation 18, while warfreak lists Fluorgis and Teamwork/Adaptability 9; the app uses Dev.
- Recorded source conflict: `D3-07 Teach a Man to Run` days are 20 in Dev and 4 in warfreak; the app uses Dev.
- Recorded source conflict: `D3-10 Teach a Man to Fish` days are 10 in Dev and 20 in warfreak; the app uses Dev.

## 2026-06-04 D4 Mission Source Pass

- Added missing `D4-12 A Small Favour`, including Ether requirement, five-repeat route notes, Tramdine Fens start, 7880 Gil/60 CP reward, and Wyvern Wing loot.
- Added missing `D4-14 Ordalia Airships Grounded`, including Fluorgis-only prerequisite note, Targeting Distant Units law, Bomb/Red Marshmallow/Grenade roster, and 4610 Gil/50 CP reward.
- Expanded `D4-08 Beneath the Sands` strategy with hidden charm-trap/Awareness guidance from Dev.
- Added unlock-chain context to `D4-07 I've Been Had, Kupo!` based on Dev's note that it is required for later postgame unlock chains.
- Recorded source conflict: `D4-04 Hors D'oeuvre of the Hour` location is The Bisga Greenlands in Dev and The Bisga Greenland in warfreak/app data; left the existing app spelling unchanged.
- Recorded source conflict: `D4-08 Beneath the Sands` enemy naming differs. Dev lists two Pit Beasts, while warfreak/app data lists two Antlions with Sandstorm/Saliva/Subsidence/Bonecrusher; left Antlion unchanged and noted the conflict.
- Recorded source conflict: `D4-09 Airship S.O.S.!` required talents are Teamwork/Adaptability 13 in Dev and 15 in warfreak/app data; left 15 unchanged.
- Recorded source conflict: `D4-12 A Small Favour/Favor` uses US spelling `Favor` and Delivery type in Dev, while warfreak uses `Favour` but labels the table as Defeat Mark; app uses `Favour` and Dev's Delivery type.

## 2026-06-04 D5 Mission Source Pass

- Added missing `D5-13 Bringer of Doom`, including Adelle/Elpe prerequisite, Smoldering Incubus mark, Reaction Abilities law, long-range strategy, and Gold Chalice/Chirijiraden reward.
- Added missing `D5-15 The Beast of Aisenfield`, including Adelle/Ljda prerequisite, Nesiaam/Zahak mark, < 20 Damage law, full support roster, and Nagrarok reward.
- Corrected `D5-08 A Lost Companion` truncated description and added rank 25 plus the A Lost Friend/Tiptaptwo/Viola context.
- Corrected `D5-12 Help!` with rank 42, Potion requirement, Adelle Viola prerequisite, and Whale Whisker/Wermut context.
- Corrected `D5-14 The Shrine of Paling Gods` with rank 38, Heritor-chain prerequisite, and Satisfy Petitioner type based on Dev/objective text.
- Corrected `D5-16 Woman of the Wood` with rank 31, Heritor-chain prerequisite, and reward spelling `Ayvuir Blue` to match Dev and the equipment data.
- Expanded `D5-03 Stowaways` with White Monk dispatch recommendation and fuller Ahriman/Bloody Orb notes.
- Corrected `D5-05 Wanted: Devotees!` prerequisites and roster to Devotee/Lanista, Devotee Jr./Time Mage, two Baknamys, and one Luchorpan.
- Recorded source conflict: `D5-01 Graszton Nightwatch` is rank 40/80 CP in Dev and rank 43/86 CP in warfreak/app data; left the existing app values unchanged.
- Recorded source conflict: `D5-13 Bringer of Doom` mark spelling is Smoldering Incubus in Dev and Smouldering Incubus in warfreak; app uses Dev.
- Recorded source conflict: `D5-14 The Shrine of Paling Gods` is Satisfy Petitioner in Dev but Defeat Mark in warfreak; the objective is to rekindle stones, so app uses Dev.
- Recorded source conflict: `D5-15 The Beast of Aisenfield` CP is 72 in Dev and 62 in warfreak; app uses Dev for this newly added mission.
- Recorded source conflict: `D5-16 Woman of the Wood` reward spelling is Ayvuir Blue in Dev/equipment data and Ayuvir Blue in warfreak; app uses Ayvuir Blue.

## 2026-06-04 E1 Mission Source Pass

- Corrected Bonga Bugle post-interview rewards for `E1-05`, `E1-08`, `E1-12`, `E1-14`, and `E1-15`; the app previously showed only the 2 Gil interview step for several of these.
- Expanded `E1-01 Bonga Bugle - Goldsun` with Treasure Detector / large treasure guidance and recorded the days conflict.
- Expanded `E1-02 Bonga Bugle - Silversun` with tombstone removal guidance and later notice-chain context.
- Corrected `E1-03 Bonga Bugle - Ashleaf` typo in "assistants" and expanded the race strategy with the Galmia P.R. target detail.
- Corrected `E1-04 Bonga Bugle - Mistleaf` Dreamhare to Hoppy Bunny and added the variable fast-completion weapon reward note.
- Corrected `E1-05 Bonga Bugle - Coppersun` to Meet Objectives, added the Fluorgis battle reward, and retained the existing 20-day value pending source conflict resolution.
- Corrected `E1-08 Bonga Bugle - Emberleaf` with the missing objective/law and the real random-clan battle reward.
- Corrected `E1-09 Bonga Bugle - Rosefire` fee/days to Dev's 300 Gil / 4 days.
- Expanded `E1-12 Bonga Bugle - Plumfrost` with the full interview phrase, three possible battle routes, and the real battle reward.
- Corrected `E1-13 Bonga Bugle - Bloodfire` fee to Dev's 300 Gil and added bonus reward thresholds for shopkeeper performance.
- Corrected `E1-14 Bonga Bugle - Greenfire` roster/reward/CP using Dev and warfreak's text instead of the old app table values.
- Corrected `E1-15 Bonga Bugle - Skyfrost` type/reward/CP using Dev and warfreak's text instead of the old app table values.
- Expanded `E1-16 Bonga Bugle - Blackfrost` with the New Year's resolution survey strategy.
- Recorded source conflict: `E1-01 Bonga Bugle - Goldsun` days are 3 in Dev and 20 in warfreak/app data; app preserves 20.
- Recorded source conflict: `E1-05 Bonga Bugle - Coppersun` is Meet Objectives / 4 days in Dev and Satisfy Petitioner / 20 days in warfreak; app uses Dev's type/reward but preserves 20 days.
- Recorded source conflict: `E1-09 Bonga Bugle - Rosefire` fee/days are 300 Gil / 4 days in Dev and 200 Gil / 8 days in warfreak/app data; app uses Dev.
- Recorded source conflict: `E1-13 Bonga Bugle - Bloodfire` fee is 300 Gil in Dev and 200 Gil in warfreak/app data; app uses Dev.
- Recorded source conflict: `E1-14 Bonga Bugle - Greenfire` warfreak table/app data list 58 CP and four Thieves, while Dev and warfreak's text list 56 CP plus 3030 Gil/loot; Dev lists three Thieves, Soldier, and Viking, so app uses Dev/text.
- Recorded source conflict: `E1-15 Bonga Bugle - Skyfrost` warfreak table/app data list Meet Objectives and 62 CP, while Dev and warfreak's text list Satisfy Petitioner and 64 CP; app uses Dev/text.

## 2026-06-04 E2 Mission Source Pass

- Added missing `E2-11 Gimme That!`, including Darklord Crystal requirement, refuse-50-Gil battle trigger, Non-elemental Effects law, split-party flan/Seeq roster, and 5000 Gil/Blood-darkened Bone reward.
- Added missing `E2-13 Plea for Help`, including White Monk dispatch recommendation, Targeting an Area law, Ghost/Wraith undead roster, tombstone strategy, and Suspect Mushroom/Cod Scale reward.
- Corrected `E2-08 Survey No. 261` location spelling to Zellea, the Forbidden Land and required talents to Negotiation/Adaptability 54 based on Dev.
- Expanded `E2-16 Escort Wanted` with Defender dispatch recommendation, full Lamashtu/Deathscythe/Headless roster, and escort strategy.
- Corrected `E2-09 The Finest Blade` Dreamhare references to Hoppy Bunny and added Blade Biter Resonate/Disable context.
- Corrected `E2-10 A Charm for Luck` destination text and route note: pick up the rat-tail charm at Tramdine Fens, then deliver it in Nazan Mines.
- Corrected `E2-12 Vim, Vigor, and Go` description typos.
- Corrected `E2-14 A Treasured Heirloom` description typos and expanded Gil Snapper/Banshee notes.
- Expanded the Survey No. 258-260 strategy and rosters with tombstone, trap, Seer/Master Monk, and survey-point details.
- Recorded source conflict: `E2-05 Survey No. 258` location is The Galleria Deep in Dev and The Galerria Deep in warfreak/app data; app preserves the existing app spelling.
- Recorded source conflict: `E2-08 Survey No. 261` required talents are Negotiation/Adaptability 54 in Dev and Negotiation/Aptitude 54 in warfreak/app data; app uses Dev.
- Recorded source conflict: `E2-11 Gimme That!` warfreak's reward table omits 5000 Gil, but Dev and warfreak's text confirm the proper payout; app includes 5000 Gil.
- Recorded source conflict: `E2-15 Picnic Pleasure` Dev's quest-list entry has an apparent copied Bonga Bugle description/type/talent block, while warfreak and app data agree on the picnic battle; app preserves the picnic battle and Teamwork/Adaptability 18.
- Recorded source conflict: `E2-16 Escort Wanted` CP is 82 in Dev and 32 in warfreak/app data; app preserves 32 CP.

## 2026-06-04 E3 Mission Source Pass

- Added missing `E3-06 Meeting the Quota`, including White Monk dispatch recommendation, Targeting an Area law, six licra ore collection points, Ghost/Zombie/Ghoul roster, traps/treasure note, and High Arcana reward.
- Added missing `E3-13 Rancher's Request - Green`, including Black Chocobo prerequisite, Greenfire/Zedlei Forest Open Wide capture route, and Gold Chalice reward.
- Added missing `E3-14 Rancher's Request - Brown`, including Green Chocobo prerequisite, Aldanna Range Formidable Strength capture route, and Unpurified Ether reward.
- Corrected `E3-07 Wish Upon a Star` description typo, Entz/undead/tortoise strategy, and elemental-law warning.
- Expanded `E3-10 Wanted: Hatchery Worker` with Greenfire/Green Chocobo prerequisite context and Chocobo Knight/Beastmaster dispatch strategy.
- Expanded `E3-11 Abducted!` with Blue Mage/Seer/Ninja/Archer loadout details and priority order.
- Corrected `E3-12 Eternal Rivalry` description typo while preserving the observation-only duel strategy.
- Corrected `E3-15 Rancher's Request - White` prerequisite and delivery objective.
- Corrected `E3-16 Rancher's Request - Red` description, prerequisite, delivery objective, and Dev rank/CP values.
- Recorded source conflict: `E3-07 Wish Upon a Star` location is Graszton in Dev but Sant D'alsa Bluff in warfreak and the mission text; app preserves Sant D'alsa Bluff.
- Recorded source conflict: `E3-14 Rancher's Request - Brown` warfreak's prerequisite table appears to repeat Brown, while Dev and mission order confirm Green; app uses Green.
- Recorded source conflict: `E3-16 Rancher's Request - Red` rank/CP are 46/92 in Dev and 42/84 in warfreak/app data; app uses Dev and notes the warfreak table also labels the row as White.

## 2026-06-04 E4 Mission Source Pass

- Added missing `E4-05 The Honorable Thing`, including Buffs law, Parivir/White Mage/Hunter/Cannoneer/Defender roster, and priority strategy.
- Added missing `E4-07 Training Wanted`, including >100 Damage law, full Goug Watch training roster, Tinker/Fusilier/Animist strategy, and Mysidia Alloy reward.
- Added missing `E4-08 Wall of Flame`, using Dev's Bomb survival version with Ice law, three-round endurance objective, endless Bomb behavior, and Gold Chalice reward.
- Added missing `E4-10 Watching the Watchers`, including Piercing Weapons law, Parivir/Fighter/Master Monk/Berserker loadouts, and Prime Pelt reward.
- Added missing `E4-11 Crying Eyeball`, including HP <= 20 law, barrel hold point, respawning eyeball wave, and Kuraisle Boxwood reward.
- Added missing `E4-12 Time to Act`, including one-member escort constraint, Goug Watch fail condition, Sniper/Arcanist/Illusionist/Parivir/Ninja enemy set, and Lightwing Crystal reward.
- Added missing `E4-15 Inspiration or Perspiration?`, including Defender dispatch recommendation, five-member escort setup, Bomb/Fire Drake/Red Marshmallow roster, volcano tremor damage, and Stradivari reward.
- Corrected `E4-01 Devilish Delight` prerequisites, added Fire Drake/Thief time-law strategy, and restored Fiend's Blood added reward.
- Corrected `E4-02 Shelling Out` prerequisites, dispatch jobs, Lamia/Adamantitan/Rocktitan notes, and restored Pink Tail added reward.
- Corrected `E4-03 Flantastic Finish` prerequisites, typo `desert` -> `dessert`, Red Marshmallow/Hoppy Bunny roster, White Chocobo capture note, and Sweet Sap added reward.
- Corrected `E4-06 From 'Cross the Sea` and `E4-09 'Cross the Sea` prerequisites and route directions.
- Expanded `E4-14 Drawn Bridge` with accept-in-Goug prerequisite, six sparkle spots, respawn/farming note, and bridge unlock note.
- Recorded source conflict: `E4-01 Devilish Delight` location is Goug in Dev but The Neslowe Passage in warfreak/app data; app preserves The Neslowe Passage.
- Recorded source conflict: `E4-08 Wall of Flame` is a Bomb survival quest in Dev but warfreak's E4-08 entry is a conflicting Grosso/Aisenfield Behemoth battle with Rank 47, 94 CP, and different rewards; app uses Dev for `Wall of Flame`.

## 2026-06-04 E5 Mission Source Pass

- Added missing `E5-15 A Dashing Duel`, including `Where Could He Be?` prerequisite, Harming Viera law, Al-Cid mark behavior, full Viera escort roster, and Snowcat Crystal reward.
- Corrected `E5-08 A Bride for Montblanc` CP from 94 to 72, expanded Blue Mage/White Monk/White Mage priorities, and preserved Actions by Gria law context.
- Corrected `E5-06 Through Another's Eyes` story strategy: Luso must talk to Adelle three times; killing or merely damaging Adelle is not the win condition.
- Expanded `E5-06 Through Another's Eyes` with Thunder Drake/Zaghnal/Pit Beast roster, Luso protection, and Lennart line-attack warning.
- Expanded `E5-11 Pirate Problems` with Cannoneer/Fighter/Ravager/Sniper/Penelo roster, trap note, and law-safe Cannoneer handling.
- Verified `E5-12 Wanted: Friends, Kupo!` against Dev and warfreak as the Montblanc recruitment quest.
- Recorded source conflict: `E5-08 A Bride for Montblanc` CP is 72 in Dev and 94 in warfreak/app data; app uses Dev because Rank 36 normally awards 72 CP.
- Recorded source conflict: `E5-15 A Dashing Duel` required talents are Negotiation 1 / Teamwork 1 in Dev and Teamwork 1 / Adaptability 1 in warfreak; app uses Dev.
- Recorded source conflict: `E5-15 A Dashing Duel` reward is Snowcat Crystal in Dev and Snowcay Crystal in warfreak; app uses Dev spelling.

## 2026-06-04 A2 Mission Source Pass

- Replaced the A2 optional block with source-checked mission data for all 16 entries.
- Expanded `A2-01 Camoa Cup`, `A2-05 Graszton Cup`, `A2-09 Moorabella Cup`, and `A2-13 Fluorgis Cup` into full three-bout tournament records with multi-round laws, rosters, and recovery strategy.
- Restored missing Scion/accessory rewards: `A2-05 Corsage of Corruption`, `A2-09 Raging Brooch`, and `A2-13 Pin of Order`.
- Corrected `A2-02 The Sun Seal`, `A2-03 The Moon Seal`, and `A2-06 The Stone With No Name` to their multi-phase objectives/laws and second-battle rosters, including Demon Wall.
- Corrected `A2-07` name/rank to `To Whom Gods Bow`, Rank 15, and added source prerequisites.
- Corrected `A2-10 Odd Places` from the old Malboro/Coeurl roster to well-specific Axebeak, Fire Drake, Bomb, and Adamantitan encounters, plus repeatable well-route notes.
- Corrected `A2-12 The Way of the Meek` to an escort/protection record with Dayvis, high-ground enemy roster, chest/urn note, and non-item healing strategy.
- Corrected `A2-14 The Way of the Timid` to the full Dayvis/Archer/Warrior/White Monk/Berserker/Soldier roster and trap strategy.
- Corrected `A2-15 Pirate Attack` roster with Moogle Knight and Hume-law handling.
- Corrected `A2-16 Wanted: Big Eyes` roster from a generic Big Eyes/Floating Eye set to 2 Plagues and 3 Bloody Orbs.
- Recorded source conflict: A2 cup days are 10 in Dev and 20 in warfreak/app data; app preserves 20.
- Recorded source conflict: `A2-05 Graszton Cup` fee is 400 Gil in Dev and 300 Gil in warfreak/app data; app preserves 300 Gil.
- Recorded source conflict: `A2-11 What Was Lost` and `A2-14 The Way of the Timid` use Galleria spelling in Dev and Galerria spelling in warfreak/app data; app preserves Galerria for the location.
- Recorded source conflict: `A2-12 The Way of the Meek` quest type is Escort in Dev and Satisfy Petitioner in warfreak's table; app uses Escort because the objective is explicit protection.
- Recorded source conflict: `A2-16 Wanted: Big Eyes` fee is 300 Gil in Dev and 200 Gil in warfreak/app data; app preserves 200 Gil.

## 2026-06-04 A3 Mission Source Pass

- Replaced the A3 optional block with source-checked mission data for all 13 A3 entries present in both guides.
- Expanded `A3-01 Goug Cup`, `A3-05 Loar Cup`, `A3-09 Ordalia Cup`, and `A3-13 Jylland Cup` into full multi-bout tournament records with per-bout laws, opponent clans, priority targets, and recovery strategy.
- Restored missing Scion/accessory rewards: `A3-01 Ewer of Darkness`, `A3-05 Ring of the Wheel`, `A3-09 Tainted Cufflink`, and `A3-13 Gift of the Judge-Sal`.
- Corrected `A3-03 Wanted: Mirage Bunny` description typo, prerequisite, exact Hoppy Bunny/Red Marshmallow/Yellow Jelly/Fire Drake/Thunder Drake/Headless roster, Charm/Invisible behavior, and reinforcement urgency.
- Corrected `A3-06 Wanted: Florah` prerequisite context, plant roster, controlled-damage law handling, and Bad Breath/status strategy.

## 2026-07-03 RetroAchievement Mission Tie Pass

- Audited mission-specific RetroAchievement buckets against the global RetroAchievement list.
- Attached every mission-relevant global quest/job/recruit achievement to its corresponding mission card.
- Added missing special mission `EX-03 Gifted` so the Heritor unlock achievement is tied to the actual `Gifted` quest instead of a later Heritor weapon quest.
- Verified every achievement description that names a quoted quest is attached to the matching mission bucket.
- Verified no global `Unlock the ... job`, `Recruit ...`, `Clear Story Mission ...`, `During ...`, or `Complete Quest ...` achievement is left without a relevant mission tie.

## 2026-07-03 Prerequisite And Achievement Tie Pass

- Corrected cut-off prerequisite strings in the Step, Geomancer, Foodstuffs, Chita, Fen, and Rancher's Request chains.
- Added prerequisite integrity checks to `npm run audit:data`; the audit now fails on truncated prerequisites and unresolved mission-like prerequisite references.
- Preserved non-mission conditions such as notices, seasons, town visits, auctions, wells, and special events as prerequisite text rather than forcing them into false mission links.
- Removed the experimental chronological mission sort after the `Kyrra, Dragoon` availability check showed that prerequisite/region sorting could imply false availability. Mission display now stays with the app's stable arc/index order.
- Added audit coverage for advanced job/recruit achievement ties so expected unlock achievements fail validation if they are missing, duplicated across mission cards, or attached to the wrong quest.
- Corrected `A3-08 Death March, II` and `A3-11 Death March, III` exact movement-law text, recommended dispatch jobs, enemy loadouts, and priority order.
- Corrected `A3-10 Wanted: Tonberrion` reward quantity to Low Arcana x5 and added the four-round physical/ranged strategy.
- Corrected `A3-12 Wanted: Combatants` description typos and preserved White Monk as the reliable accepted petitioner.
- Corrected `A3-14 Wanted: Gaitsnipe` reward spelling to Malboro Wine, added trap warning, and expanded the all-ranged enemy crew.
- Corrected `A3-15 Something's Dropped!` to seven gemstones, respawning enemies, traps, and Dev's two-Thief/two-Yellow-Jelly/Beastmaster roster while noting warfreak's Yellow Flan/Thief wording.
- Corrected `A3-16 Hunting Season` Bronkrise spelling, prerequisite chain, monthly quarry/tag strategy, and Quality Pelt/White Thread reward.
- Recorded source conflict: A3 cup days are 10 in Dev and 20 in warfreak/app data; app preserves 20.
- Recorded source conflict: `A3-13 Jylland Cup` reward is 6720 Gil in Dev and 6270 Gil in warfreak/app data; app uses Dev's 6720 Gil and notes the conflict.
- Recorded source conflict: `A3-15 Something's Dropped!` roster uses Yellow Jellies and two Thieves in Dev, while warfreak calls them Yellow Flans and describes one Thief with Juggler-style skills; app uses Dev and notes the wording conflict.

## 2026-06-04 A4/A5 Mission Source Pass

- Validated all A4 and A5 mission IDs currently present in the app against both GameFAQs guides.
- Corrected `A4-01 Champions' Cup` prerequisite context and replaced generic strategy with Clan Centurio priority order.
- Corrected `A4-02 Wanted: Icicle Ark` description typo, prerequisite, and added non-fire strategy for its ice clan roster.
- Corrected `A4-03 Thieves in the Ruins` prerequisite context.
- Corrected `A4-11 Red King of Cinquleur` by restoring the Sequencer bonus reward and replacing generic strategy with Ribbon/Doublecast/Counter handling.
- Corrected `A4-12 Wanted: Tutor!` name punctuation, Marianna spelling, and Scholar dispatch guidance.
- Corrected `A4-15 Blue King of Cinquleur` by restoring the Peytral bonus reward and adding Stopshot/physical strategy.
- Corrected `A4-16 Wanted: Woodworker` description typo and Green Mage-with-hammer dispatch guidance.
- Corrected `A5-01 Wanted: Magick Weapon` prerequisite chain and Upsilon/Beguile/mist-explosion strategy.
- Corrected `A5-03 Green King of Cinquleur` description typo, prerequisite, and restored Save the Queen.
- Corrected `A5-04 Wanted: Marksman` prerequisite and Fusilier-only dispatch guidance.
- Corrected `A5-07 Black King of Cinquleur` description typo, prerequisite, physical/non-elemental strategy, and restored Crown Scepter.
- Corrected `A5-08 Wanted: Caretaker` prerequisite and Viera White Mage dispatch guidance.
- Corrected `A5-09 White King of Cinquleur` strategy and restored Cheer Staff.
- Corrected `A5-14 The Five Kings` prerequisite, HP law wording, level-99 king notes, endgame strategy, and restored Condemner's Choker.
- Recorded source conflict: `A4-01 Champions' Cup` days are 10 in Dev and 20 in warfreak/app data; app preserves 20.
- Recorded source conflict: `A5-04 Wanted: Marksman` fee is 300 Gil in Dev and 400 Gil in warfreak/app data; app preserves 400 Gil.
- Recorded source conflict: `A5-09 White King of Cinquleur` is `A5-11` with 500 Gil fee and added Pearls in the Deep/Graszton prerequisites in Dev, but `A5-09` with 300 Gil fee in warfreak/app data; app preserves `A5-09` and 300 Gil to avoid breaking existing mission references.

## 2026-06-04 B/C Remaining Mission Source Pass

- Validated the remaining uncovered mission arcs: B1, B3, B4, B5, C1, and C2.
- Corrected `B4-13 Wanted: Artillery` from an unrelated high-rank reward row to the source reward of 2680 Gil, 24 CP, and Gemsteel x5.
- Corrected `B5-14 Lethean Drought` prerequisite context, Dreamhare/Maquis strategy, reward Gil, and Aurea Pollen reward.
- Corrected `C1-04 An Earnest Multitude` spelling/description typos and reward from the mistakenly copied Foodstuffs reward to Hero Tonic.
- Corrected `C1-05 Foodstuffs: Nutrition` with the missing one-eyeball-for-four clue and exact four-Floating-Eye completion condition.
- Corrected `C2-04 Shipping Out` description typo.
- Corrected `C2-07 The Lands of Loar` region from a truncated `- Baptiste Hill` to all three expedition destinations.
- Recorded source conflict: `B1-05 Beetle in a Haystack` reward is 440 Gil in Dev and 690 Gil in warfreak/app data; app preserves 690 Gil.
- Recorded source conflict: `C1-05 Foodstuffs: Nutrition` rank/CP are 30/60 in Dev and 27/54 in warfreak/app data; app preserves 27/54.
- Recorded source conflict: `C1-16 It's the Thought` days are 20 in Dev and 4 in warfreak/app data; app preserves 4.
- Recorded source conflict: `C2-04 Shipping Out` reward is 7000 Gil in Dev and 700 Gil in warfreak/app data; app preserves 700.
- Recorded source conflict: `C2-06 The Forests of Loar` fee is 300 Gil in Dev and 200 Gil in warfreak/app data; app preserves 200.
- Recorded source conflict: `C2-08 The Towns of Loar` days are 20 in Dev and 7 in warfreak/app data; app preserves 7.
- Recorded source conflict: `C2-16 Kupoppy Flower` CP is 50 in Dev and 46 in warfreak/app data; app preserves 46.

## 2026-06-04 Non-Mission Data Source Pass

- Validated the `???` ability set as the real Magick Pot enemy set containing Pester, Punish, and Reward; no placeholder removal needed.
- Corrected eight Arcanist abilities from `arcane-magick` to the real `arcane-magicks` ability set: Syphon, Death, Gravity, Drain, Graviga, Lv. 3 Dark, Lv. 5 Haste, and Lv. ? Shadow Flare.
- Rechecked duplicate ability display names: only `Sanctify` remains, and it is intentional because Abyss and Chivalry have different Sanctify mechanics.
- Compared Dev's equipment sections against app equipment counts: weapons, shields, headgear, body armor, and accessories are covered by count, with Dev guide spelling/case quirks recorded rather than blindly applied.
- Corrected body armor display names: `Maximillian` -> `Maximilian` and `Peytral *` -> `Peytral`.
- Corrected weapon display name `Xanqbras` -> `Xankbras` and recipe result `Ragetsu-denbu` -> `Ragetsu-Denbu` so all 355 bazaar recipe results resolve to equipment.
- Confirmed `Jack of Diamonds` is present in Dev's Dog-eared Cards formula list; the FAQ text joins it onto the previous row, which can fool line-based parsers.
- Corrected race/job summary typos for Fencer, Moogle Knight, and Tinker while preserving all 56 Dev job names plus the app's intentional special jobs Keeper and Nightshade.
- Corrected bestiary typos and display casing for Bomb, Chocobo, Red Chocobo, Green Chocobo, and Yowie.
- Reconfirmed the four Dark Behemoth `?` elemental fields as documented unknowns.

## 2026-06-08 Audit Closure

- Corrected the Dark Magick ability `Darkra`, whose record had drifted to the typo `Dakra`/`darka`.
- Tightened `npm run audit:data` so documented source exceptions are separated from actionable findings instead of being mixed into the main error buckets.
- Regenerated `audit/data-audit.json`; all actionable findings are now zero, with only the documented exceptions remaining: duplicate `Sanctify` display names, story/per-arc mission mirrors, and Dark Behemoth's unknown elemental fields.

## 2026-06-08 Metadata Closure

- Expanded `npm run audit:data` to validate mission tag IDs, missing tag-map coverage, duplicate tags, and RetroAchievements mission references against canonical mission IDs.
- Added source-confirmed missing mission records for `B4-14 Caravan Cry II`, `B5-02 Summons`, `B5-04 Geomancer's Way - Snow`, `B5-06 Three-Point Strategy`, `B5-15 Devil's Pact`, `B5-16 One Last Memory`, and `C2-05 Komodo Departure`.
- Corrected the `The Cat's Meow` RetroAchievement hook from `C4-04` to `C4-14`.
- Added tag-map coverage for `D3-16 Rancher's Request - Black` and the special finale records `EX-01 The Two Grimoires` and `EX-02 From the Rift`.
- Regenerated `audit/data-audit.json`; all actionable structural, reference, and metadata findings are zero.

## 2026-06-08 Fandom Source Pass

- Compared the app against Fandom's jobs category, recursive equipment categories, recursive abilities categories, Bazaar page, and the 300-label quests imagemap.
- Confirmed all 58 Fandom job pages are represented in the race/job overview, including Agent, Bard, Keeper, and Nightshade special jobs.
- Confirmed all Fandom equipment category entries are covered by app equipment. Recorded Fandom aliases/spelling quirks rather than reverting source-checked app spellings: `Lurebreaker` is the series page for FFTA2's `Luabreaker`, `Maximillian` conflicts with the app/GameFAQs `Maximilian`, `Xanqbras` conflicts with the app/GameFAQs `Xankbras`, and `Defender (Tactics A2 weapon)` maps to the app's `Defender`.
- Confirmed all Fandom Bazaar page results are covered. Fandom omits nine GameFAQs/Dev-guide recipes that remain in the app: Shining Lute, Brilliant Theorbo, Bronze Armor, Broadsword, Iron Armor, Iron Helm, Eight-Fluted Pole, Ivory Pole, and Circlet.
- Added Fandom-covered abilities missing from the app's ability hub: Antidote, Echo Grass, Eye Drops, Remedy, Archmage, Destroyer, Lifespring, Pugilist, and Reveal. Corrected `Sivler Disc` to `Silver Disc`.
- Corrected mission titles to match Fandom where it agreed with source context: `The White of Its Eye`, `Wanted: The Mirage Bunny`, `A Lady's Persistence`, `A Lady's Insistence`, `Rumors Abound`, `The Nu Mou of the Rupies`, `A Small Favor`, `Lethean Draught`, and `Shrine of the Paling Gods`.
- Recorded remaining Fandom quest-label conflicts: the imagemap uses `Nou Mou` spellings while the detailed Fandom text and app use `Nu Mou`; the imagemap labels `The Art of Gastronomy` and `Wanted: Musician!` conflict with source-checked `Hors D'oeuvre of the Hour` and `Wanted: Musicians!`; Fandom ability aliases `Arcane Magick` and `Critical: Evasion` map to app/GameFAQs `Arcane Magicks` and `Critical: Evasion↑`.
