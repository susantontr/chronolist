# Todoline — Mac App

A native macOS app that lives as a floating timeline bar on your desktop, letting you see and manage your whole day at a glance.

![Todoline Mac](../todoline_mac.gif)

> ⚠️ Work in progress — not yet enrolled in the Apple Developer Program.

## Features

- **Floating timeline bar** — stays on your desktop, always visible
- **Horizontal & vertical layout** — toggle between a timeline bar and a vertical agenda view
- **Drag to reschedule** — drag any task card to move it to a different time slot
- **Resize duration** — drag the edge of a card to extend or shorten it
- **Overlapping tasks** — tasks that overlap automatically stack into separate lanes
- **Mark complete** — hit "Done" on a card to mark it finished
- **Undo** — restore a completed task back to the active timeline
- **Color coding** — pick from 8 colors when creating a task
- **Daily reset** — tasks automatically clear when a new day starts
- **Separate add-task window** — always full-size regardless of how small the timeline is
- **Quit button** — hover over the app to reveal controls including a quit button

## Download

Download the latest `.dmg` from the [Releases page](https://github.com/susantontr/todoline/releases), open it, and drag Todoline to your Applications folder.

## ⚠️ macOS "damaged" warning?

This happens because the app isn't yet enrolled in the Apple Developer Program. It's completely safe — just follow these steps to fix it:

1. Open **Terminal**
2. Type `xattr -cr ` (with a space at the end — don't hit Enter yet)
3. Open **Finder** → go to your **Applications** folder
4. Drag and drop **Todoline.app** into the Terminal window (it auto-fills the path)
5. Now hit **Enter**
6. Try opening the app again ✅

## Build it yourself

If you'd rather build from source:

```
npm install
npm run dist
```

Requires [Node.js](https://nodejs.org) (v16+). The dmg will be output to `dist/`.
