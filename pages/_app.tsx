import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import RouteGuard from "../RouteGuard";

import { wrapper } from "../redux/store";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <RouteGuard>
        <Component {...props.pageProps} />
      </RouteGuard>
    </Provider>
  );
}

export default MyApp;
