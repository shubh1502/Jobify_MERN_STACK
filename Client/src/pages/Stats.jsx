import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultValue, monthlyStats } = useLoaderData();

  return (
    <>
      <StatsContainer {...defaultValue} />
      {monthlyStats.length > 1 && <ChartsContainer {...monthlyStats} />}
    </>
  );
};
export default Stats;
