import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import type { StockData } from '../types';

const HomeContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ChartContainer = styled.div`
  height: 500px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
`;

const Home: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&apikey=${apiKey}&outputsize=full`
        );

        if (response.data['Time Series (Daily)']) {
          const dailyData = response.data['Time Series (Daily)'];
          const formattedData = Object.entries(dailyData)
            .slice(0, 90) // Get last 90 days for better visualization
            .map(([date, values]: [string, any]) => ({
              date,
              close: Number(values['4. close'])
            }))
            .reverse();

          setStockData(formattedData);
        } else {
          setError('No data available');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Failed to fetch stock data. Please try again later.');
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>Google (GOOGL) Stock Price - Last 90 Days</h1>
      </Header>

      <ChartContainer>
        {loading ? (
          <LoadingMessage>Loading stock data...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={5}
              />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Stock Price']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#4285f4"
                name="Stock Price ($)"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </HomeContainer>
  );
};

export default Home;
