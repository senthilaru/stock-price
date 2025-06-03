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

const Home: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Using Alpha Vantage API for stock data
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=GOOGL&apikey=demo`
        );

        const monthlyData = response.data['Monthly Time Series'];
        const formattedData = Object.entries(monthlyData)
          .map(([date, values]: [string, any]) => ({
            date,
            close: parseFloat(values['4. close']),
          }))
          .reverse();

        setStockData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>Google Stock Price History</h1>
      </Header>

      <ChartContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#8884d8"
                name="Stock Price"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </HomeContainer>
  );
};

export default Home;
