export const getColorFromDepartment = (text: string): string => {
  switch (text) {
    case 'Học thuật':
      return '#EF4444';
    case 'Sự kiện':
      return '#60A5FA';
    case 'Truyền thông':
      return '#34D399';
    case 'Nhân sự':
      return '#FBBF24';
    default:
      return '#9CA3AF';
  }
};
