# Web Masters Internship – Task 4: Todo List Application

## Task Overview

This repository contains the solution for Task 4 of the Web Masters internship. The objective was to build a Todo List web application that demonstrates clean code practices, modular JavaScript, and persistent task management using local storage.
[Live Demo](https://refactor-messy-todo-logic.netlify.app/)

## What Was Accomplished

- **Modern Code Structure:** All JavaScript logic is separated from HTML, residing in a dedicated file `app.js`, while the HTML `index.html` focuses on structure and layout.
- **Descriptive Naming:** Variables and functions use clear, meaningful names for readability and maintainability.
- **Event Handling:** Utilizes `addEventListener` for all user interactions, avoiding inline event handlers.
- **Array Management:** Task operations use array methods like `splice` to ensure clean data handling.
- **Modular Functions:** Logic is broken into small, reusable functions for adding, deleting, toggling, and rendering tasks.
- **Persistent Storage:** Tasks are saved to and loaded from local storage, ensuring persistence across browser sessions.

## Technical Highlights

- **Local Storage Integration:**
  - Tasks are automatically saved to local storage after every change.
  - On page load, tasks are restored from local storage if available.
- **User Experience:**
  - Clean, responsive UI for adding, completing, and deleting tasks.
  - Reliable task management with data persistence.

## How This Meets Internship Requirements

- Demonstrates clean code principles and modular design.
- Implements persistent client-side storage.
- Provides a user-friendly, maintainable web application.

## Usage

1. Open `index.html` in your browser.
2. Add, complete, or delete tasks as needed.
3. Tasks will remain saved even after closing or refreshing the browser.

---

See `app.js` for the full implementation of the application logic.
