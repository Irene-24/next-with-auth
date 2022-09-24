import { baseApi } from "./base";

const screensApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getScreens: build.query<any, void>({
      query: () => ({
        url: "/Screens/ListAll",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetScreensQuery, useLazyGetScreensQuery } = screensApi;

export { screensApi };
