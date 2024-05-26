# Webcam Capture App

A React application for capturing webcam frames and saving them to a server. This app uses `react-webcam` for accessing the webcam and a custom hook for managing frame capture, saving, and error handling.

## Features

- Capture frames from a webcam.
- Save frames to a server in different formats (PNG, JPEG, BMP).
- Toggle frame saving using the `Q` key.
- Modular and clean code using custom hooks.

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/webcam-capture-app.git
   cd webcam-capture-app
   ```

2. run the BE using bun and the FE using PNPM

## Usage

1. Allow the browser to access your webcam when prompted.

2. Use the controls to select the image format and set the stream folder.

3. you can set the folder to save in the PC (default to BE/public)

4. Press the `Q` key to toggle frame saving.
