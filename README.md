# 💄 GirlCult Store

> **"Freaky is good"** — A beauty e-commerce frontend built with HTML, CSS, and JavaScript.

---

## 📁 Project Structure

```
GirlCult-Store/
├── index.html
├── style.css
├── js/
│   └── script.js
└── assets/
    ├── GirlCult logo.png
    ├── Background.jpg
    ├── Girlcult Peaches Series Blush Cream.png
    ├── Girlcult 15-Color Eyeshadow Palette.png
    └── Girlcult Miao Witchcraft Series 8-Color Eyeshadow Palette.png
```

---

## ✨ Features

### 🌙 Dark Mode
- Toggle between light and dark mode via the navbar button
- Theme preference is **persisted using `localStorage`**, so it survives page refreshes

### 🛒 Buy / Stock Reduction
- Each product card has a **Buy** button that reduces stock count in real time
- Prompts a confirmation dialog before completing the purchase
- Automatically disables the button and shows **"Sold Out"** when stock reaches 0

### ❤️ Wishlist
- Add products to a wishlist stored in **`sessionStorage`**
- Wishlist is displayed in a Bootstrap modal accessible from the navbar
- Badge on the Wishlist button shows the current item count
- Supports **removing individual items** or **clearing the entire wishlist**
- Data resets when the browser tab/session is closed

### 📝 Suggestions & Feedback Form
- Form with fields: Name, Email, Phone (optional), Category, and Message
- Client-side validation using HTML5 `required` attributes

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure & semantics |
| CSS3 | Custom styling & dark mode |
| JavaScript (ES6+) | DOM manipulation, events, storage |
| Bootstrap 5.3 | UI components, grid, modal |
| Bootstrap Icons | Icon library |

---

## 💾 Web Storage Usage

| Storage | Data | Lifetime |
|---|---|---|
| `localStorage` | Dark/Light mode theme preference | Persists across sessions |
| `sessionStorage` | Wishlist items | Cleared when tab is closed |

---

## 🚀 How to Run

No build tools or installations needed.

1. Clone or download this repository
2. Make sure the `assets/` folder contains all image files
3. Open `index.html` directly in your browser

```bash
# Or serve locally with VS Code Live Server / any static server
npx serve .
```

---

## 📦 Products

| Product | Price |
|---|---|
| Peaches Series Blush Cream | Rp 365.000 |
| Girlcult 15-Color Eyeshadow Palette | Rp 522.000 |
| Girlcult Miao Witchcraft 8-Color Palette | Rp 522.000 |

---

## Infromation about the project

| | |
|---|---|
| **Course** | Praktikum ISB-310BB Sistem Informasi Web |
| **Year** | 2026 |
| **Theme** | Management System Makeup-GirlCult Store |

## 📄 License

© 2026 GirlCult Store. All rights reserved.
