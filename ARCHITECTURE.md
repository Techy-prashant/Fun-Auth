# 🏗️ Architecture & Technical Design

This document outlines the structural and technical decisions behind **Fun Auth**.

## 🧠 Core Philosophy
The application is designed modularly. Instead of one monolithic file handling all authentication steps, the app acts as a **State Orchestrator**, selectively mounting and unmounting independent puzzle components.

## 📂 Directory Structure
```text
src/
├── app/
│   ├── page.tsx          # The Main State Orchestrator
│   ├── layout.tsx        # Global HTML wrapper and Metadata
│   └── globals.css       # Tailwind entry and custom utility classes
├── components/
│   ├── IntroPopup.tsx    # Step 0: The entry gate
│   ├── Auth1.tsx         # Step 1: Teleporting checkbox
│   ├── Auth2.tsx         # Step 2: Reverse typing
│   ├── Auth3.tsx         # Step 3: Precision drag slider
│   ├── Auth4.tsx         # Step 4: 3.0s exact hold
│   ├── Auth5.tsx         # Step 5: The decoy grid
│   ├── SuccessScreen.tsx # Step 6: Victory & routing
│   ├── ShantiScreen.tsx  # Step 7: Physics playground
│   └── ThemeWidget.tsx   # Global theme controller
```

## ⚙️ The State Machine
The core routing is handled entirely client-side via a simple React state machine in `src/app/page.tsx`.

```tsx
const [step, setStep] = useState(0);
```
- By mapping steps `0` through `7` to specific components, we avoid full page reloads.
- We wrap the component switch statement in Framer Motion's `<AnimatePresence mode="wait">`. This ensures that when a user solves a puzzle, the current component smoothly exits the DOM before the next puzzle elegantly springs into view.

## 🎨 Styling & Glassmorphism
The aesthetic relies heavily on **Glassmorphism**:
- Containers use `bg-white/5` and `backdrop-blur-xl` to create a frosted glass effect.
- The global background utilizes a massive, heavily blurred `div` (`blur-[150px]`) whose color is controlled by the `ThemeWidget` to cast a dynamic ambient glow across the entire application.

## 🚀 Physics & Interactivity (Framer Motion)
Framer Motion is the backbone of this project's interactivity, utilized far beyond simple fade-ins:
1. **useMotionValueEvent:** Used in `Auth3` to track exact pixel dragging and convert it into a `0-100` dial value without triggering React re-renders on every pixel movement.
2. **Custom Physics Loops:** `ShantiScreen.tsx` utilizes `useAnimationFrame` to create a DVD-screensaver style bouncing box. It calculates velocity vectors manually and applies custom friction math to act as "brakes" when the box is thrown too hard.
3. **Drag constraints & Snapping:** Components utilize `dragSnapToOrigin` to allow users to throw elements around the screen and watch them physically spring back to their mathematical origin point.

## 🛡️ Build Stability Considerations
Due to local development constraints (like paths containing `#`), the project strictly avoids Next.js loader-dependent features for static assets. For instance, the favicon bypasses the Next.js Metadata API asset loader by being placed directly in the `public/` folder and referenced statically as an absolute string `/favicon.png`, ensuring rock-solid compilation.
