import { Provider as ModalProvider } from "@ebay/nice-modal-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"
import type { PropsWithChildren } from "react"

const queryClient = new QueryClient()

export function Provider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{children}</ModalProvider>
      <ReactQueryDevtools />
      <Toaster />
    </QueryClientProvider>
  )
}
