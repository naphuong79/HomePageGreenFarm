import { useEffect, useState } from 'react';

function Pagination({ totalPage, currentPage, handleSelectPage }) {
  const [delta, setDelta] = useState(1);
  const [range, setRange] = useState(0);
  const [numberTruncateLeft, setNumberTruncateLeft] = useState(0);
  const [numberTruncateRight, setNumberTruncateRight] = useState(0);

  let countTruncate = 0;
  let countTruncateLeft = 0;
  let countTruncateRight = 0;

  useEffect(() => {
    if (totalPage > 0) {
      setRange(delta + 4);
      setNumberTruncateLeft(currentPage - delta);
      setNumberTruncateRight(currentPage + delta);
    }
  }, [totalPage, currentPage]);

  return (
    <>
      <ul className="inline-flex items-center gap-2 text-sm">
        {currentPage > 1 && (
          <li onClick={() => handleSelectPage(currentPage - 1)}>
            <button
              href="#"
              className="flex justify-center items-center rounded-full h-8 w-8  hover:ring-2 hover:ring-offset-2 hover:ring-[#7aa93c] leading-tight text-gray-400 hover:text-gray-500 bg-white  hover:bg-gray-100"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}
        {/*  */}
        {totalPage > 1 &&
          currentPage > 0 &&
          Array(totalPage)
            .fill(0)
            .map((_, index) => {
              const page = index + 1;
              const className =
                page == currentPage
                  ? 'bg-[#7aa93c]/[.2] z-10 h-8 w-8 hover:ring-2 hover:ring-offset-2 hover:ring-[#7aa93c] rounded-lg leading-tight border border-sky-300 text-[#7aa93c]  focus:ring-4 focus:ring-[#7aa93c] focus:outline-none font-medium text-sm p-2 text-center'
                  : 'h-8 w-8 rounded-lg leading-tight text-gray-500 bg-white hover:ring-[#7aa93c]  hover:ring-2 hover:ring-offset-2  hover:bg-gray-100 hover:text-gray-700';

              if (totalPage >= range * 2 - 1) {
                if (numberTruncateLeft > 3 && numberTruncateRight < totalPage - 3 + 1) {
                  if (page == 1 || page == totalPage) {
                    return (
                      <li key={page} onClick={() => handleSelectPage(page)}>
                        <button href="#" className={className}>
                          {page}
                        </button>
                      </li>
                    );
                  }

                  if (page > 1 && page < numberTruncateLeft) {
                    countTruncateLeft++;
                    if (countTruncateLeft == 1) {
                      return (
                        <li key={page}>
                          <button href="#" className={className}>
                            {'...'}
                          </button>
                        </li>
                      );
                    }
                  } else if (page > numberTruncateRight && page < totalPage) {
                    countTruncateRight++;
                    if (countTruncateRight == 1) {
                      return (
                        <li key={page}>
                          <button href="#" className={className}>
                            {'...'}
                          </button>
                        </li>
                      );
                    }
                  }

                  if (page >= numberTruncateLeft && page <= numberTruncateRight) {
                    return (
                      <li key={page} onClick={() => handleSelectPage(page)}>
                        <button href="#" className={className}>
                          {page}
                        </button>
                      </li>
                    );
                  }
                } else {
                  if (
                    (currentPage < range && page <= range) ||
                    (currentPage > totalPage - range && page >= totalPage - range + 1) ||
                    page === 1 ||
                    page === totalPage
                  ) {
                    return (
                      <li key={page} onClick={() => handleSelectPage(page)}>
                        <button href="#" className={className}>
                          {page}
                        </button>
                      </li>
                    );
                  }
                  countTruncate += 1;
                  if (countTruncate === 1) {
                    return (
                      <li key={page}>
                        <button href="#" className={className}>
                          {'...'}
                        </button>
                      </li>
                    );
                  }
                }
              } else {
                return (
                  <li key={page} onClick={() => handleSelectPage(page)}>
                    <button href="#" className={className}>
                      {page}
                    </button>
                  </li>
                );
              }
            })}
        {/*  */}
        {currentPage < totalPage && (
          <li onClick={() => handleSelectPage(currentPage + 1)}>
            <button
              href="#"
              className="h-8 w-8 flex justify-center items-center leading-tight rounded-full text-gray-400 hover:text-gray-500 hover:ring-[#7aa93c]  hover:ring-2 hover:ring-offset-2 duration-100 bg-white  hover:bg-gray-100"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </>
  );
}

export default Pagination;
