/* eslint-disable prettier/prettier */
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

type Props = {
  data: { _id: string; count: number }[];
};

const BarChart: React.FC<Props> = ({ data }) => {
  const formatter = {
    HOCTHUAT: 'Học thuật',
    SUKIEN: 'Sự kiện',
    TRUYENTHONG: 'Truyền thông',
    NHANSU: 'Nhân sự',
  };

  // const colors = {
  //     DONE: '#3B82F6',
  //     ON_TRACK: '#34D399',
  //     OFF_TRACK: '#EF4444',
  //     AT_RISK: '#FBBF24',
  // };

  const colors = {
    HOCTHUAT: '#3B82F6',
    SUKIEN: '#34D399',
    TRUYENTHONG: '#EF4444',
    NHANSU: '#FBBF24',
  };
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      marginTop: 40,
    },
    title: {
      text: null,
    },
    // subtitle: {
    //   text: "Đây là subtitle",
    // },
    yAxis: {
      title: {
        text: null,
      },
    },
    xAxis: {
      tickLength: 0,
      labels: {
        enabled: false,
      },
    },
    tooltip: {
      headerFormat: null,
    },
    series: data.map((d) => ({
      name: formatter[d._id] ?? d._id,
      type: 'column',
      data: [d.count],
      pointPadding: 0,
      color: colors[d._id],
    })),
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BarChart;
