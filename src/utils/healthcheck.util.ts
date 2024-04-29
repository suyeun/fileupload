import v8 from 'v8';

export const healthcheck = () => {
  const processId = process.pid;
  const initialMemory = v8.getHeapStatistics().total_available_size;
  const usedMemory = process.memoryUsage().rss;

  return {
    processId,
    initialMemory,
    usedMemory,
    status: 'OK',
  };
};
