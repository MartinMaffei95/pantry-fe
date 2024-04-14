import {
  ChangeEvent,
  ComponentType,
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input } from "@chakra-ui/react";
import { debounce } from "lodash";
import LoadingWrapper from "../Loader/LoadingWrapper";
import {  UseApiRequestStatus } from "../../interfaces";
import { ApiResponse } from "../../hooks/useApiRequest";
import { TbMoodSadSquint } from "react-icons/tb";
interface ListItemProps<T> {
  res: T;
  selectResult: <T>(res: T) => void;
}

interface Props<T> {
  onSelectResult: (result: T) => void;
  status: UseApiRequestStatus;
  response: ApiResponse<T>;
  executeRequest: any;
  ListItem: ComponentType<ListItemProps<T>>;
  extraQuery?: string;
  ref:any
}
const SearchBar: FC<Props<any>> = forwardRef(
  (
    {
      onSelectResult,
      status,
      response,
      executeRequest,
      ListItem,
      extraQuery = "",
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      clearSearch() {
        setSearchValue("");
        setShowResults(false);
      },
    }));

    const [searchValue, setSearchValue] = useState<string>("");
    const [showResults, setShowResults] = useState<boolean>(false);
    const [_results, setResults] = useState<any[]>([]);
    const [_selectedResult, setSelectedResult] = useState();

    const selectResult = (result: any) => {
      onSelectResult(result);
      setSelectedResult(result);
      setSearchValue(result.name);
      setShowResults(false);
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      debouncedSearch(value);
      setSearchValue(value);
    };

    async function search(queryString: string) {
      if (queryString.length <= 0) return setShowResults(false);
      const response = await executeRequest(queryString, extraQuery);
      setShowResults(true);
      if (!response) return;
      return response;
    }

    const debouncedSearch = useRef(
      debounce(async (queryString) => {
        setResults(await search(queryString));
      }, 300)
    ).current;

    useEffect(() => {
      return () => {
        debouncedSearch.cancel();
      };
    }, [debouncedSearch]);

    return (
      <div className="relative flex-grow shadow-md overflow-visible z-50 ">
        <Input
          autoComplete="off"
          value={searchValue}
          name="search"
          onChange={handleChange}
        />
        {showResults ? (
          <ul className="rounded-b-lg min-w-52  overflow-hidden absolute w-full bg-white left-0">
            <LoadingWrapper status={status}>
              {response?.data?.data?.length > 0 ? (
                // TODO: Change the type
                response.data?.data.map((res:any) => (
                  <ListItem
                    key={res.id}
                    res={res}
                    selectResult={selectResult}
                  />
                ))
              ) : (
                <li className="flex justify-center items-center text-red-600 p-2 cursor-pointer duration-150 gap-2">
                  No encontramos ningún resultado
                  <TbMoodSadSquint />
                </li>
              )}
            </LoadingWrapper>
          </ul>
        ) : null}
      </div>
    );
  }
);

export default SearchBar;
