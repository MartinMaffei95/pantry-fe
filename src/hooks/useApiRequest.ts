import { useState } from "react";
import { UseApiRequestStatus } from "../interfaces";

interface ApiResponse<ResponseData = any> {
  data: ResponseData | null;
  error: any | null;
}

export function useApiRequest<ResponseData, ApiFunctionParams extends any[]>(
  apiFunction: (...data: ApiFunctionParams) => Promise<ResponseData>
) {
  const [status, setStatus] = useState<UseApiRequestStatus>("NONE");
  const [response, setResponse] = useState<ApiResponse<ResponseData>>({
    data: null,
    error: null,
  });

  const executeRequest = async (...params: ApiFunctionParams) => {
    setStatus("LOADING");
    setResponse(() => ({
      data: null,
      error: null,
    }));

    try {
      const result = await apiFunction(...params);
      setResponse((state) => ({ ...state, data: result }));
      setStatus("SUCCESS");
    } catch (error) {
      setResponse((state) => ({ ...state, error: error }));
      setStatus("ERROR");
    }
  };

  return { status, response, executeRequest };
}
