import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageNumberContainer = () => {
  const { data } = useAllJobsContext();
  const { totalJobs, numOfPages, page_UI, jobs } = data;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  console.log(search, pathname);

  const handlePage = (pageNumber) => {
    console.log(pageNumber);
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  //   console.log(data);
  return (
    <Wrapper>
      {page_UI > 1 && (
        <button
          className="btn prev-btn"
          onClick={() => {
            let prev_page;
            prev_page = page_UI - 1;
            if (prev_page < 1) prev_page = numOfPages;
            handlePage(prev_page);
          }}
        >
          <HiChevronDoubleLeft />
          Prev
        </button>
      )}
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            className={`btn page-btn ${pageNumber === page_UI && "active"}`}
            key={pageNumber}
            onClick={() => handlePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {page_UI < numOfPages && (
        <button
          className="btn next-btn"
          onClick={() => {
            let nxt_page;
            nxt_page = page_UI + 1;
            if (nxt_page > numOfPages) nxt_page = 1;
            handlePage(nxt_page);
          }}
        >
          Next
          <HiChevronDoubleRight />
        </button>
      )}
    </Wrapper>
  );
};
export default PageNumberContainer;
