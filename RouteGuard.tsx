import React, { ReactNode, useState, useEffect, useRef } from "react";
import { useRouter, NextRouter } from "next/router";
import { useAppSelector } from "./redux/hooks";
import { selectCurrentAuth, Status } from "./redux/slices/auth.slice";
import { useRefreshMutation } from "./redux/services/auth";

const checkIsProtected = (router: NextRouter) => {
  const guarded = ["/admin", "/dashboard"];
  const auth = ["/"];
  const path = router.pathname;

  if (guarded.includes(path) || auth.includes(path)) {
    return true;
  }

  return false;
};

const checkIsAuth = (router: NextRouter) => {
  const auth = ["/"];
  const path = router.pathname;
  if (auth.includes(path)) {
    return true;
  }

  return false;
};

const routeWithToken = (router: NextRouter, setRender: Function) => {
  const auth = ["/"];
  const path = router.pathname;

  if (auth.includes(path)) {
    const redirectPath = (router.query?.callbackUrl as string) || "/admin";
    router.push(redirectPath);
    return;
  }

  setRender(true);
};

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const hasRefreshedRef = useRef(false);
  const user = useAppSelector(selectCurrentAuth);

  const [refresh] = useRefreshMutation();

  const router = useRouter();

  useEffect(() => {
    //don't run twice on mount
    if (hasRefreshedRef.current) {
      return;
    }
    if (checkIsProtected(router)) {
      if (
        (checkIsAuth(router) && user.authStatus === Status.rejected) ||
        user.authStatus === Status.idle
      ) {
        setShouldRender(true);
        return;
      }

      if (!checkIsAuth(router) && user.authStatus === Status.rejected) {
        router.push(`/?callbackUrl=${router.asPath}`);
        return;
      }

      if (user.token) {
        routeWithToken(router, setShouldRender);
      } else {
        (async () => {
          hasRefreshedRef.current = true;
          try {
            await refresh().unwrap();

            routeWithToken(router, setShouldRender);
          } catch (error) {
            const path =
              router.pathname === "/" ? "/" : `/?callbackUrl=${router.asPath}`;

            router.push(path);
            return;
          }
        })();
      }
    } else {
      setShouldRender(true);
    }
  }, [router, user, refresh]);

  useEffect(() => {
    if (user.token) {
      setShouldRender((shouldRender) => {
        if (!shouldRender && user.token && !checkIsAuth(router)) {
          return true;
        }
        return shouldRender;
      });
    }
  }, [user, router]);

  if (!shouldRender) {
    return <>Loading...</>;
  }

  return <>{children}</>;
};

export default RouteGuard;
