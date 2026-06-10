# TodoLine

A lightweight, chronological daily to-do list that lays your tasks out on a horizontal timeline from 9 AM to 10 PM — so you can see your whole day at a glance.

![TodoLine](https://raw.githubusercontent.com/susantontr/todoline/main/preview.png)

## Features

- **Horizontal timeline** — 9 AM to 10 PM in 30-minute slots, all visible without scrolling
- **Drag to reschedule** — drag any task card left or right to move it to a different time slot
- **Resize duration** — drag the right edge of a card to extend or shorten it
- **Overlapping tasks** — tasks that overlap the same time slot automatically stack into separate lanes
- **Mark complete** — hit "Done" on a card and it moves to a completed zone below, still anchored to its original time slot
- **Undo** — restore a completed task back to the active timeline
- **Color coding** — pick from 8 colors when creating a task
- **Daily reset** — tasks automatically clear when a new day starts
- **Local storage** — no backend, no sign-in; everything is saved in your browser
- **Clear all** — one button to wipe all data and start fresh

## Usage

No install or build step needed. Just open `index.html` in any modern browser.

```
open index.html
```

Everything runs locally. Data persists across browser sessions via `localStorage` and resets automatically each day.

## How it works

- Single `index.html` file — no dependencies, no framework
- Tasks are stored as JSON in `localStorage` under the key `daily-timeline-v2`, tagged with today's date
- Card positions use percentage-based layout (`slot / 26 * 100%`) so they stay perfectly aligned with the grid at any screen width
- Lane assignment is a simple greedy interval-packing algorithm — each task goes into the first lane where it doesn't overlap an existing task
