---
name: Wael Qubaisi Portfolio
description: A bilingual Arabic–Latin screenprint poster in four flat inks, set on one grid and one centre axis, under a night sky of seven stars.
colors:
  night: "#1b2147"
  paper: "#f4f1ea"
  gold: "#e8c26a"
  ink: "#111111"
typography:
  display:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 7.8vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Readex Pro, Alexandria, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.03em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  axis-gap: "clamp(2.5rem, 7vw, 8rem)"
  plate-block: "clamp(3.5rem, 7vw, 6.5rem)"
  plate-max: "1360px"
  studio-sky: "clamp(6rem, 15vw, 13rem)"
components:
  tab:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.15rem 1rem"
    height: "6rem"
  tab-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.15rem 1rem"
    height: "6rem"
  printing-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0.75rem"
    height: "2.5rem"
  printing-toggle-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  marked-line:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.04em 0.28em"
  ticket:
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.6rem"
  dock-button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1rem"
    height: "3.5rem"
  cover-typographic:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
---

# Design System: Wael Qubaisi Portfolio

## Overview

**Creative North Star: "The Two-Script Poster"**

The site is printed, not rendered. Each section is one full-bleed band pulled in a single flat ink, and every band is set on the same 12-column plate. Crop-mark ticks along the top edge mark the 12 columns, and a 2px centre axis is the zero line of the grid. Arabic reads in from the right and Latin from the left, and the two scripts meet at that axis. The two tracks of work (web on the left, games on the right) fold onto the same mirror, so the composition itself says "two tracks, one person."

The field ink is a deep night indigo, so the field bands read as night sky, and the accent is a star-gold that only ever marks. Density is poster-loose at the top of each band (one huge bilingual heading, one marked line) and tightens to a ruled, tabular register below: spec tables, origin tickets, dashed dictionary lists. Nothing is soft. There are no tints, no gradients between inks, no shadows and no rounded corners. Depth comes from overprinting: a band, a knocked-out patch of the band colour, and a gold mark laid on top.

There is a day printing and a night printing. Between them, paper and ink swap places on the page, the paper bands and the ink bands, while the night-indigo field bands keep their inks. The masthead mark changes ink with the printing: indigo stars by day, gold stars by night.

**Key Characteristics:**
- Four locked inks, used flat and at full strength. Gold is the accent and never fills a band.
- One full-bleed ink band per section, each on a 12-column plate with crop-mark ticks and a centre axis.
- Matched Arabic and Latin display in Alexandria at weight 900; Readex Pro for running text.
- Mirrored composition: Latin and web align left, Arabic and games align right, and both read in toward the axis.
- Ruled spec tables, origin tickets and a perforated tear-off strip are the component vocabulary.
- Square corners everywhere. The seven Thurayya (Pleiades) four-point stars are the motif.

## Colors

Four screenprint inks: a calm night ground, a warm paper, a near-black and one star-gold accent. They are never tinted and never blended.

### Primary
- **Night Indigo** (night): The field ink and the night sky. It fills the hero, Studio and contact bands (the first, the signature and the last thing a visitor sees), the typographic project cover, the favicon ground and `theme-color`. Paper text sits on it. In day printing it is also the masthead mark's ink and half of the printing swatch.

### Secondary
- **Star Gold** (gold): The accent. It is used for the marked line in every band (gold ground, ink text), the primary tear-off tab and dock button (Download CV), the Thurayya stars in the hero, the Studio sky and the favicon, the masthead mark in night printing, link hover grounds inside bands, the nav underline in night printing, text selection, the scrollbar thumb, the skip link and the other half of the printing swatch.

### Neutral
- **Poster Paper** (paper): A warm off-white stock. It is the page and the paper bands in day printing, the text colour on night and ink bands, and the ground of the tear-off strip and dock in both printings.
- **Press Ink** (ink): A near-black. It is the text on paper and gold, the Education band in day printing, every rule and dashed perforation in the tear-off strip, the toast ground, and the page in night printing.

### Named Rules
**The Four Inks Rule.** Only night, paper, gold and ink are allowed. Never use a tint, a mix or a fifth colour. Hover states swap one ink for another rather than lightening it. Opacity only moves during a transition (the toast fade, the star-to-dot crossfade); no ink rests at partial strength.

**The Gold Marks Rule.** Gold is an accent and never fills a band. It marks lines, the primary tab, the stars and the selection, and nothing larger.

**The One Mark Rule.** Each band carries one marked line: a gold block behind ink text. The mark picks out the one sentence that matters in that band.

**The Swap Rule.** Night printing swaps paper and ink on the page, the paper bands and the ink bands, and turns the masthead mark from indigo to gold. The night bands, the tear-off strip and the dock stay as printed.

## Typography

**Display Font:** Alexandria (with Readex Pro, system-ui, sans-serif). Self-hosted variable woff2, split into Arabic and Latin subsets.
**Body Font:** Readex Pro (with Alexandria, system-ui, sans-serif). Self-hosted variable woff2, split into Arabic and Latin subsets.

**Character:** Alexandria carries matched Arabic and Latin at the same black weight, so the two scripts are equals on the poster. Readex Pro is a quieter companion with the same geometric build for running text. Any `lang="ar"` text is set in the display face.

### Hierarchy
- **Display** (900, clamp 3.25–7.5rem, line-height 0.86 for Latin caps): The bilingual name pair in the hero. Latin is uppercase. The Arabic name runs at 0.86em with line-height 1.32 and no tracking, so the dots of ق and the tail of و never meet. On mobile the names stack at clamp 3.5–5.5rem and the Arabic runs at 0.9em with line-height 1.34. The contact heading uses the same pairing at clamp 2.5–6rem (Latin line-height 0.92, Arabic 1.15).
- **Headline** (900, clamp 2.5–5rem, line-height 1, -0.02em): Band headings, always a Latin and Arabic pair split across the axis. The Arabic half runs at 1.06em with line-height 1.2. Education steps down to clamp 2.25–4rem.
- **Title** (900, clamp 1.75–2.5rem, -0.02em): Project titles and the uppercase column track headings. Lane titles in the hero run larger (clamp 1.875–3rem).
- **Lead** (Alexandria 500, clamp 1.125–1.375rem, line-height 1.5): The band line under each heading and the hero intro. It holds the marked line.
- **Body** (Readex Pro 400, 1.0625rem, line-height 1.6): Running text, kept to 40–46ch for promises and lane lines.
- **Label** (Alexandria 700, 0.8125–0.9375rem, uppercase, 0.03–0.04em tracking): Spec table row heads, ticket stubs and stack group terms. This is the only tracked uppercase in the system, and it is only used for table and list structure.

### Named Rules
**The Equal Scripts Rule.** Every heading at band level and above comes as a Latin and Arabic pair at the same weight and the same optical size. The Arabic half is sized by eye against the Latin (0.86–1.06em) and gets more line-height (1.15–1.34) and zero tracking so its ascenders, descenders and dots clear. Arabic is never shrunk into a caption.

**The No Tracking on Arabic Rule.** Negative tracking applies to Latin display only. Arabic and the Latin label tier reset it.

## Layout

Each section is a band that runs full-bleed, with a centred plate inside it (`min(100% − 2 × gutter, 1360px)`) and a block padding of clamp 3.5–6.5rem. The plate is a 12-column grid. Its top edge carries 0.75rem crop-mark ticks at every column, and bands marked as axis bands draw a 2px rule down the exact centre, behind the content.

Almost every composition is a two-column split with the axis gap (clamp 2.5–8rem) between the halves: band headings, lanes, the work grid, the studio body and the stack grid. Left-half content aligns left. Right-half content (Arabic, games, the mirrored stack column) aligns right and reads in toward the axis. Text that has to cross the axis (the hero intro, the Thurayya gloss) sits on a knocked-out patch of the band colour, so the axis appears to pass behind it.

In the Studio band, the axis stops at the open sky above ثريا. The sky is a padded stretch (clamp 6–13rem) on the band colour, so the signature owns that part of the band.

The sticky masthead is 4rem tall, on the page colour, with a 3px bottom rule. The tear-off strip sits at the foot of the hero and contact bands, at plate width. It has five tabs on desktop and four below 1100px, where the static location tab drops out. The email column is `minmax(max-content, 1.2fr)` so the address never wraps.

At 760px and below, the axis rule is hidden and every split collapses to one column. Body content, lanes, the games column and the mirrored stack column align left. The Arabic halves of the hero name, the band headings and the contact heading stay flush right. The hero names stack with the Latin first and the Arabic below it, and the cluster drops beneath them on the left. The axis gap becomes 1.5rem and the nav becomes a drop-down panel with hairline separators. The tear-off strip reflows to two columns, with CV and Email at full width. A fixed two-button dock (Download CV, Email) appears, and it hides while a tear-off strip is on screen.

## Elevation & Depth

The system is flat. There is no `box-shadow` anywhere. Depth comes from overprinting: a band ink, then a knocked-out patch of the same ink to interrupt the axis, then a gold mark on top. The masthead is separated from the page by a 3px rule, not a shadow.

### Named Rules
**The Overprint Rule.** Layers stack as flat ink on flat ink. When something has to read as "above" (the intro over the axis, the cluster over the axis, the Studio sky over the axis), give it a background of the band colour rather than a shadow or blur.

**The Misregistration Exception.** A hard offset text shadow (0.045em 0.03em) is a screenprint misprint. Its colour is gold on night and ink bands and indigo on paper bands. It appears only in the Konami easter-egg state and is never used as elevation.

## Shapes

Every corner is square (0px). Rules come in two weights. The 3px rule is for structure: lane and column tops, stack groups, the studio body and the masthead foot. The 1.5px hairline is for table rows, ticket outlines and list items. Dashed lines mean perforation: the tear-off tab seams, ticket stub dividers and stack term separators.

The one non-square form is the four-point star (the `i-star` symbol, four concave sides). Seven of them make the Thurayya cluster, placed as the Pleiades with Alcyone at the centre and drawn larger. The cluster appears in the hero, the masthead mark, the favicon and the Studio sky. The round dots in the system are the letter dots of the Arabic face itself.

## Components

### Tear-off Strip
A perforated row of tabs, the system's call to action. It sits on paper in both printings, with a 2px dashed ink seam along the top and between tabs.
- **Shape:** Square, no gaps; tabs divided only by dashed 2px seams.
- **Primary tab:** Gold ground, ink text (Download CV). Every other tab is paper with ink text.
- **Content:** A 1.35rem stroked icon pinned at the top, a 1.125rem Alexandria 700 label and a 0.875rem note. The email note never wraps. In the contact band, the large variant uses 9rem tabs and a label that scales to 1.75rem.
- **Hover / Focus:** The tab tears: `translateY(0.35rem) rotate(-1.25deg)` from its top edge over 0.35s with the out-expo ease. The inks don't change. The focus outline is inset by 5px. Reduced motion removes the tear.

### Buttons
- **Printing toggle:** Transparent with a 2px currentColor border, Alexandria 700 at 0.875rem, and a square swatch split hard between indigo and gold. On hover it inverts to a page-fg ground with page text. On mobile it collapses to a 2.75rem icon square.
- **Menu toggle:** A 2.75rem square with a 2px currentColor border and a stroked icon. Mobile only.
- **Dock buttons:** 3.5rem tall, Alexandria 700, square. The primary (Download CV) is gold with ink text and the secondary is paper with ink text, split by a dashed seam.

### Links
- **In bands and the colophon:** A printed rule drawn as a 2px currentColor background-image along the foot of the link. It runs under the trailing arrow icon too, rather than breaking at it the way text-decoration does. It is cloned across line breaks.
- **Hover:** The rule thickens to 4px and the link takes the band's mark inks (a gold ground with ink text).
- **Elsewhere:** Inherit colour, with a 2px underline at a 0.22em offset that thickens to 4px on hover.
- **Focus:** A 3px solid currentColor outline at a 3px offset, used site-wide.

### Navigation
Alexandria 500 at 0.9375rem, no underline at rest. Each item is the Latin word followed by its Arabic equivalent at 0.875rem. The hover and current states add a 3px underline at a 0.45em offset in the masthead's mark ink: indigo in day printing, gold in night printing, so the state reads against the masthead ground in both. Below 760px the nav becomes a full-width drop panel on the page colour, with 1.5px hairlines between items and a 3px foot rule.

### Spec Table
Ruled rows with a 1.5px hairline top and bottom. The row head is a 5.75rem column in the uppercase label tier, and cells are 0.9375rem body. A spec table always follows a one-sentence project promise. In the right-hand column, table text stays left-aligned for legibility while the surrounding text mirrors right.

### Origin Ticket
An inline stub with a 1.5px outline, divided into cells by dashed hairlines, in the uppercase label tier at 0.8125rem. It records track, date and provenance (for example: Web · Jun 2026 · Code public).

### Marked Line
An inline gold block behind ink text, with 0.04em × 0.28em padding, cloned across line breaks. One per band.

### Cover
A 460:215 frame. It holds either real key art (object-fit cover) or a typographic stand-in when no real screenshot exists. The stand-in is a night-indigo ground with the project's Arabic name at weight 900 in paper.

### Thurayya Cluster
Seven gold four-point stars on a knocked-out patch of the band colour, sitting on the hero axis between the two names. Alcyone, the centre star, is drawn at 27% of the cluster width and the rest at 20%. The stars twinkle: they scale to 0.68 and back over 3.6s, ease-in-out, each on its own offset. The masthead mark uses the same seven-star placement at 0.5rem, held still, in `--mark-ink`. Reduced motion stops every twinkle.

### Thurayya Word (signature)
The Studio band is the night sky. Seven gold stars hang in the open sky above a dotless ثريا set at clamp 7–22rem. On scroll, five of them fly down into the word's five letter dots (three on ث, two on ي). The flight uses a cubic in-out ease, staggered by 0.07 of scroll progress per star. Over the last 45% of each flight the star crossfades into its letter dot. The other two stars stay in the sky. The word is drawn to a canvas padded by 20% of its height on every side, so no dot clips. With reduced motion, the finished word shows with the two stars in the sky.

### Toast
Ink ground, paper text, 2px paper border, Alexandria 700. It rises 1rem and fades in over 0.3s.

## Do's and Don'ts

### Do:
- **Do** fill every section with a single full-bleed band in night, paper or ink, on the 12-column plate with crop-mark ticks.
- **Do** pair every band heading as Latin (left) and Arabic (right), split across the axis gap.
- **Do** mirror right-half content to align right and read in toward the axis. Below 760px, collapse content to left-aligned, but keep the Arabic heading halves flush right.
- **Do** mark exactly one line per band with gold behind ink text.
- **Do** keep gold to accents: marks, the primary tab, stars, selection and the night-printing nav underline.
- **Do** present project facts as a promise line, then a ruled spec table, then an origin ticket.
- **Do** use the 3px rule for structure, the 1.5px hairline for rows and dashes for perforations.
- **Do** use stroked line icons (2.25 stroke, square caps, mitre joins) and the four-point star from the inline sprite.
- **Do** keep night printing as a paper/ink swap that leaves the night bands untouched and turns the masthead mark gold.

### Don't:
- **Don't** tint, blend or alpha any ink at rest, or add a fifth colour.
- **Don't** fill a band, a cover or any large field with gold.
- **Don't** bring back orange or bright, saturated blue fields. Wael finds them hard on the eyes; grounds stay calm and deep.
- **Don't** round a corner.
- **Don't** use box-shadows, blurs or glass for depth. Overprint instead.
- **Don't** let Arabic read smaller than its Latin pair at heading level, or give it negative tracking.
- **Don't** put a small tracked uppercase kicker or eyebrow above a band heading. Uppercase tracking belongs to the label tier inside tables, tickets and lists.
- **Don't** use a hard offset shadow outside the Konami misprint state.
