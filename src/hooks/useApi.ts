import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import api from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';

export function useApiQuery<TData = unknown, TError = AxiosError>(
   key: string | string[],
   url: string,
   options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
   config?: AxiosRequestConfig
) {
   return useQuery<TData, TError>({
      queryKey: Array.isArray(key) ? key : [key],
      queryFn: async () => {
         const { data } = await api.get<TData>(url, config);
         return data;
      },
      ...options,
   });
}

interface ErrorResponse {
   success: boolean;
   data: null;
   meta: {
      status: number;
      errors: string[];
      timestamp: string;
   };
}

type UrlParam<TParams> = string | ((params: TParams) => string);

export function useApiMutation<TData = unknown, TBody = unknown, TParams = unknown>(
   url: UrlParam<TParams>,
   method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET',
   options?: Omit<UseMutationOptions<TData, AxiosError<ErrorResponse>, { params: TParams; body: TBody }>, 'mutationFn'>
) {
   return useMutation<TData, AxiosError<ErrorResponse>, { params: TParams; body: TBody }>({
      mutationFn: async ({ params, body }) => {
         const resolvedUrl = typeof url === 'function' ? url(params) : url;
         const config: AxiosRequestConfig = {
            url: resolvedUrl,
            method,
            data: method !== 'GET' ? body : undefined,
            params: method === 'GET' ? body : undefined,
         };
         const { data } = await api(config);
         return data;
      },
      ...options,
      onError: (error, variables, context) => {
         const errorMessage = error.response?.data?.meta?.errors?.[0] || error.message || 'An unexpected error occurred';
         console.error('API Mutation Error:', errorMessage);

         if (options?.onError) {
            options.onError(error, variables, context);
         }
      }
   });
}

export function useApiRefetch() {
   const queryClient = useQueryClient();

   return (key: string | string[]) => {
      const queryKey = Array.isArray(key) ? key : [key];
      return queryClient.refetchQueries({ queryKey, exact: true });
   };
}