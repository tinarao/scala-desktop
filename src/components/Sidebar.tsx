import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { projectsStorage } from "@/logic/database";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, PanelTopInactive } from "lucide-react";

export function AppSidebar() {
  const { projects } = projectsStorage();

  return (
    <Sidebar>
      <SidebarHeader className="border-b text-center">
        {/* <Link to="/" className="font-medium"> */}
        <h1 className="font-medium">Scala</h1>
        {/* </Link> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Проекты</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <ArrowLeft /> Просмотреть все
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/project/$projectId"
                      params={{ projectId: project.id.toString() }}
                    >
                      <PanelTopInactive />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
