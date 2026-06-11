# Todoline

A lightweight, chronological daily to-do list that lays your tasks out on a horizontal timeline — so you can see your whole day at a glance.

---

## Web version

Open `web/todoline.html` in any modern browser — no install needed.

![Todoline Web](web/todoline.gif)

### Features

- **Horizontal timeline** — 9 AM to 10 PM in 30-minute slots, all visible without scrolling
- **Drag to reschedule** — drag any task card left or right to move it to a different time slot
- **Resize duration** — drag the right edge of a card to extend or shorten it
- **Overlapping tasks** — tasks that overlap the same time slot automatically stack into separate lanes
- **Mark complete** — hit "Done" on a card and it moves to a completed zone below
- **Undo** — restore a completed task back to the active timeline
- **Color coding** — pick from 8 colors when creating a task
- **Daily reset** — tasks automatically clear when a new day starts
- **Local storage** — no backend, no sign-in; everything saved in your browser

### Usage

```
open web/todoline.html
```

---

## Mac version (Electron)

A native macOS app that lives as a floating timeline bar on your desktop.

![Todoline Mac](todoline_mac.gif)

> ⚠️ Work in progress — not yet enrolled in the Apple Developer Program.

### Features

- Everything in the web version, plus:
- **Floating window** — stays on your desktop, always visible
- **Horizontal & vertical layout** — toggle between a timeline bar and a vertical agenda view
- **Separate add-task window** — always full-size regardless of how small the timeline is
- **Quit button** — hover over the app to reveal controls including a quit button

### Download

Download the latest `.dmg` from the [Releases page](https://github.com/susantontr/todoline/releases), open it, and drag Todoline to your Applications folder.

### ⚠️ macOS "damaged" warning?

This happens because the app isn't yet enrolled in the Apple Developer Program. It's completely safe — just follow these steps to fix it:

1. Open **Terminal**
2. Type `xattr -cr ` (with a space at the end — don't hit Enter yet)
3. Open **Finder** → go to your **Applications** folder
4. Drag and drop **Todoline.app** into the Terminal window (it auto-fills the path)
5. Now hit **Enter**
6. Try opening the app again ✅
