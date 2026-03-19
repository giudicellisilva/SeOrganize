import api from "../httpCommon";

export async function getTaskPeriod(startDate: string, endDate: string) {
  return await api.get("/task/period", {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
}