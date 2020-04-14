import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Tooltip } from 'recharts';

import { loadDashboardData } from '../store/dashboard.store';
import { RootState } from '../store';

export function DashboardPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDashboardData());
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.dashboard.data);
  const isLoading = useSelector(
    (state: RootState) => state.dashboard.status.isLoading
  );
  const errors = useSelector(
    (state: RootState) => state.dashboard.status.errors
  );
  const dashboardChartData = data?.Trainings.map((training) => ({
    name: training.Name,
    value: training.Progress,
  }));

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      {(() => {
        if (isLoading) {
          return <div>Loading...</div>;
        }

        if (errors) {
          return <div>{errors.ErrorMessage}</div>;
        }

        return (
          <PieChart width={800} height={400}>
            <Pie
              isAnimationActive={false}
              data={dashboardChartData}
              nameKey={'name'}
              dataKey={'value'}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        );
      })()}
    </div>
  );
}
