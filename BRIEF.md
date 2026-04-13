# FastForward Dashboard - Project Brief
An executive dashboard highlighting shipment volume, on-time delivery rates, regional performance, and open exceptions.

## Tech
- Use Vue with Vite, TypeScript, and Vue Router
- Skip pinia, testing, jsx, eslint, and prettifier for now 
- Fake data from local JSON file (no API calls)

## Data
Generate a fake dataset as a JSON file (src/data/metrics.json).
12 months of data (April 2025 - April 2026), each month containing:
- Shipment volume
- On-time delivery rates
- Regional performance
- open exception information 

## Layout
- v-app-bar at the top of the dashboard with the dashboard title and date range picker
- The date range picker should default to the full date range (April 2025 - April 2026)
- Include graphs for shipment volume, on-time delivery rates, regional performance, and open exceptions.
- When a date range is selected, all of the graphs and metrics should update to that date range
- Use v-container, v-row, v-col for a responsive grid layout

## Design
- Clean, modern design
- All colors align with WCAG accessibility standards
- Elements on the page should be accessible and readable by a screen reader
- Dark mode by default with the option to toggle
- Google Font: Inter
- Smooth hover animations on the graphs

## Nice-to-Haves
- Subtle gradient or animated background (dark purple and blue for dark mode, light purple and blue for light mode)
- Greeting to the user (i.e. "Good Morning, Kirsten") which should change based on the time of day
- Footer with "Made with Copilot"