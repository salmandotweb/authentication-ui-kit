export interface Response<T> {
   success: boolean;
   data: T;
   meta: {
      status: number;
      message: string;
   };
}