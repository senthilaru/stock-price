# Google Stock Price Viewer

A React TypeScript application that displays Google (GOOGL) stock price data using the Alpha Vantage API.

## Features

- Real-time stock data from Alpha Vantage API
- Interactive line chart using Recharts
- 90-day historical price view
- Responsive design
- TypeScript support

## Prerequisites

- Node.js (v16.20.2 or higher)
- npm (v8.19.4 or higher)

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd stock-price
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Alpha Vantage API key:
```
VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

## Environment Variables

- `VITE_ALPHA_VANTAGE_API_KEY`: Your Alpha Vantage API key

## Built With

- React
- TypeScript
- Vite
- Recharts
- Styled Components
- Alpha Vantage API

## License

MIT
