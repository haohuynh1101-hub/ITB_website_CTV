import BarChart from './components/chart/bar-chart';

/* eslint-disable prettier/prettier */
export const DashboardContainer = () => {
  return (
    <div className="flex-grow overflow-auto">
      <div
        className="h-full mx-4 my-4 bg-white border shadow-md"
        style={{ maxWidth: 600 }}
      >
        <BarChart
          data={[
            { _id: 'HOCTHUAT', count: 12 },
            { _id: 'SUKIEN', count: 12 },
            { _id: 'TRUYENTHONG', count: 12 },
            { _id: 'NHANSU', count: 12 },
          ]}
        />
      </div>
    </div>
  );
};
