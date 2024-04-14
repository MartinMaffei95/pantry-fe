import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PaginationInfo } from "../../interfaces";

type Props = {
  pagination: PaginationInfo;
  nextPageFx: Function;
  prevPageFx: Function;
};
const ListPagination: FC<Props> = ({ pagination, nextPageFx, prevPageFx }) => {
  console.log(pagination)
  return (
    <div className="bg-neutral-100 w-full p-4 flex items-center ">
      <div onClick={() => prevPageFx()} className="p-2">
        <FaChevronLeft />
      </div>
      <input
        className="!w-10 !text-black text-right !pr-1 !m-0 shadow-md border-b border-b-black bg-transparent outline-none"
        type="number"
        placeholder={`${pagination.page}`}
      />
      /{pagination.totalPages}
      <div onClick={() => nextPageFx()} className="p-2">
        <FaChevronRight />
      </div>
    </div>
  );
};

export default ListPagination;
