import { Spinner } from "@/components/ui/spinner"

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50">
      <div className="flex items-center justify-center w-20 h-16 bg-muted rounded-md">
        <Spinner variant="ellipsis" />
      </div>
    </div>
  )
}

export default Loader
