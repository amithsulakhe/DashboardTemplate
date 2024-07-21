"use client";

import { useCallback, useEffect } from "react";
import { useAuthContext } from "./use-auth-context";
import { useRouter } from "next/navigation";

export default function GuestGuard({ children }) {
  const { loading } = useAuthContext();
  return (
    <>
      {loading ? <div class="loader"></div> : <Container>{children}</Container>}
    </>
  );
}

function Container({ children }) {
  const { authenticated } = useAuthContext();
  const router = useRouter();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace("/dashboard");
    }
  }, [router, authenticated]);

  useEffect(() => {
    check();
  }, [check]);
  return <>{children}</>;
}
