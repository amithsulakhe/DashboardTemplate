import GuestGuard from "@/app/guest-guard";

export default function Layout({ children }) {
  return (
    <>
      <GuestGuard>{children}</GuestGuard>
    </>
  );
}
