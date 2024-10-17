export interface Task {
  id: string;
  name: string;
  costPerHour: number;
  timeSpent: number;
  isRunning: boolean;
  startTime: number | null;
}