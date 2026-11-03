# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers screening Wael Qubaisi for a CS internship or COOP placement. Web/software companies and game studios count equally; neither is the "real" audience with the other as a bonus. They typically arrive from a CV, LinkedIn, or an application link, have a short window to judge fit, and need to confirm three things: what Wael has built, what tools Wael works with, and how to get in touch or grab the CV.

## Product Purpose

A single-page personal portfolio for Wael Qubaisi, a final-year Computer Science student at Imam Abdulrahman Bin Faisal University (IAU, expected graduation May 2027) and co-founder & game developer of Thurayya Studio. It exists to land an internship or COOP offer. Success means a visitor leaves with a clear read on Wael's range across full-stack web and game programming, and either downloads the CV or reaches out.

## Positioning

A student who already co-founded and runs a working game studio (Thurayya Studio, Jan 2025–present) while keeping a full course load, and who ships both full-stack web systems and game code. That combination of founder experience plus two distinct technical tracks is what a typical CS-student portfolio can't truthfully claim.

## Operating Context

- Visitors usually come from the CV (`assets/WaelQubaisiCV.pdf`), LinkedIn, or GitHub, so they arrive with some context.
- Based in Khobar, KSA; Thurayya Studio is in Dammam, KSA.
- Contact channels: email WaelQubaisi@hotmail.com, GitHub github.com/Waelaaq, LinkedIn linkedin.com/in/wael-qubaisi-08874733a, X x.com/Waelaaqa2.
- Languages: Arabic (native), English (fluent). The site is mostly English, with short Arabic for the name, nav and section heads.
- Thurayya Studio's own site (thurayyastudio.com, tagline "Crafting Timelines") is the public record for the studio. Its team page lists four co-founders: Fayhan Bin Rubaian (CEO), Soma (Game Director), Wael Qubaisi (Game Developer) and Ali Al Qahtani (CTO). Three freelancers work with them: Utam and Irumi (game art) and Marwan Al Ghamdi (game programming).

## Capabilities and Constraints

- **Stack constraint (confirmed):** stays static: plain HTML, CSS, and vanilla JS, no build step, no framework. Hosting target not specified beyond that.
- No other hard constraints on the stack or the look.
- Site content: poster hero with both tracks, work, studio, stack, education, contact.
- Day and night printings exist. They follow the system setting, and the visitor's choice is saved in `localStorage`.

## Brand Commitments

- Name: Wael Qubaisi; monogram "WQ".
- Thurayya Studio (thurayyastudio.com) is a real studio Wael co-founded and must be named accurately. Wael's studio title is **Co-founder & Game Developer**, and the portfolio uses the same title.
- The studio has its own identity: a dark starfield and a ثريّا / Thurayya wordmark ringed by star dots. The portfolio is Wael's own and doesn't copy it, but its Pleiades motif should stay compatible with it.
- **Palette preference (Wael, confirmed):** no orange, and no bright saturated blue fields; both are hard on Wael's eyes. Calm, deep grounds are preferred. No other voice or visual identity is binding.

## Evidence on Hand

- **Projects shown on the site:**
  - Iqraa Library: multi-vendor bookstore (PHP, MySQL, JavaScript), Jun 2026. Public repo: https://github.com/Waelaaq/IqraaLibrary. No real screenshot yet; a typographic cover stands in.
  - Event Management System: university events platform (Django REST Framework, MySQL, React, Vite, Tailwind), 2025. It was a team project: a colleague built the Django REST Framework backend, so Django belongs in this project's stack but **not** in Wael's skills. No public repo found. No real screenshot yet, so it is shown without a cover.
  - Pexet Inc: Thurayya Studio's debut game, in active development since 2025, built in **Unity with C#**. An earlier version was in Godot, which is no longer the stack, so Godot isn't listed for Pexet. It is **publicly announced**, with a Steam page at https://store.steampowered.com/app/3905840/Pexet_Inc/. The studio describes it as a top-down 2D survival-horror adventure:
    - shift between past, present and future in a corrupted research facility
    - retro pixel art and psychological horror
    - survival combat with firearms, stamina, parry and stun
    - puzzles across time
    - Thumbnail `assets/pexet.jpg` is real key art. The source code is not public. Use only what the studio publishes.
- **Skills Wael confirmed:** core languages are SQL, JavaScript, HTML/CSS, Python, Java and C#, with PHP and C++ familiar. Concepts include software engineering. Godot and GDScript stay in the general games skills.
- **Other public repos not shown on the site:** Pharmacy-Management-System-Java-MySQL (Java desktop app), ParallelProgramming (Python), OOP-project-1, Primitive_employee_registery_program (C++).
- **Achievements:** Game Development Unit at IAU (Game Developer & Tech Lead, Top Volunteer, 100+ service hours); founding Thurayya Studio.
- **CV:** `assets/WaelQubaisiCV.pdf`.
- **Absent, so never fabricate:**
  - testimonials or employer references
  - metrics or user counts for projects
  - live demo URLs
  - release dates or sales
  - Pexet/Thurayya details beyond what the studio publishes

## Product Principles

1. Both tracks count. Web and game work get equal weight, so neither kind of recruiter feels like an afterthought.
2. Show proof. Link to real repos and use real screenshots wherever they exist, and label placeholders honestly until they're replaced.
3. Make it fast to judge. A recruiter should see who Wael is, what Wael has built, and how to get in touch within the first screen or two.
4. Match the studio's public record. Pexet and Thurayya are described only as thurayyastudio.com and the Steam page describe them, and Wael's role there is stated the same way. Unpublished internals stay off the site.
5. Keep it light. Static and dependency-free, quick to load, and easy for one person to maintain.
