import { HStack } from "@components/shared-components/stack"
import { SideBar } from "@features/dashboard/components/side-bar"
import TaskList from "@features/dashboard/projects/milestones/components/tasks/components/task-list"

export default function TasksPage() {
  return (
    <HStack>
      <TaskList />
      <SideBar />
    </HStack>
  )
}
