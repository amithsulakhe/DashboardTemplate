"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "./use-auth-context";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const { loading } = useAuthContext();

  return (
    <>
      {loading ? (
        <div class="loader"></div>
      ) : (
        <Container> {children}</Container>
      )}
    </>
  );
}

function Container({ children }) {
  const [checked, setChecked] = useState(false);
  const { authenticated } = useAuthContext();
  const router = useRouter();

  const check = useCallback(() => {
    if (!authenticated) {
      router.replace("/auth/login");
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
