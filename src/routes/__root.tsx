import { Outlet, createRootRoute } from "@tanstack/react-router";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import SidebarToggle from "@/components/SidebarToggle";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarToggle />
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
