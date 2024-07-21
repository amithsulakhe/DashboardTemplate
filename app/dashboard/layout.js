import AuthGuard from "../auth-guard";
import DashboardLayout from "../dashboard-layout";

export default function layout({ children }) {
  return (
    <>
      <AuthGuard>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthGuard>
    </>
  );
}
