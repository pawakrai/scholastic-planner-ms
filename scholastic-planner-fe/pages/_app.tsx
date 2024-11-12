import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { FC, Fragment } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { UserProvider } from "@/contexts/auth/user-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: async () => {
        window.alert(
          "'Action Failed\nAn internal error occurred during your request. Please try again'"
        );
      },
    },
  },
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const Layout = (Component as any).Layout || Fragment;
  const LayoutWrapper: FC<{ pageProps: any; children: any }> = (props) => {
    return Layout === Fragment ? <>{props.children}</> : <Layout {...props} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {/* <LayoutWrapper pageProps={pageProps}> */}
        <Component {...pageProps} />
        {/* </LayoutWrapper> */}
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
