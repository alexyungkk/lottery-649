# Lotto 6/49 Statistics & Distribution Visualizer

A web-based visualization tool for exploring Lotto 6/49 draw data, including number appearance frequencies and six-number draw sum distributions.

## Features

- **Number Appearance Frequency:** Visualizes historical draw counts using Chart.js.
- **Draw Sum Distribution:** Displays a histogram of six-number draw totals with interactive controls for bin width and normalization mode.
- **CSV Data Loading:** Parses draw datasets in the browser using PapaParse, with support for a full dataset (`data/lotto_649.csv`) and a smaller sample set (`data/sample.csv`).

## Project Structure

```text
.
├── index.html          # Main page layout, chart containers, and controls
├── script.js           # CSV parsing, statistical calculations, and chart rendering
├── style.css           # Styling for containers, dropdown controls, and charts
├── data/
│   ├── lotto_649.csv   # Historical Lotto 6/49 draw data
│   └── sample.csv      # Sample draw dataset for testing/previewing
└── images/
    └── arrow.png       # Custom dropdown indicator icon
