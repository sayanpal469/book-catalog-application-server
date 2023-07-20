export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

type IMeta = {
  total: number;
};

export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: IMeta | null;
  data?: T | null;
};

export type IGenericResponse<T> = {
  meta: IMeta;
  data: T;
};
