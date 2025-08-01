import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import PageNumberContainer from "../components/PageNumberContainer";

export const loader = async ({ request }) => {
  // console.log(request);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  // const totalJobs = Jobs.countDocu
  // console.log(params);
  // const searchParams = {...params};
  // console.log({ ...params });
  const { data } = await customFetch.get("/jobs", { params });
  // console.log(data);
  return { data, searchParams: params };
};

const AllJobsContext = createContext();
const AllJobs = () => {
  const { data, searchParams } = useLoaderData();
  const { totalJobs, page_UI } = data;
  return (
    <AllJobsContext.Provider value={{ data, searchParams }}>
      <SearchContainer />
      <JobsContainer />
      {totalJobs > 1 && <PageNumberContainer />}
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
