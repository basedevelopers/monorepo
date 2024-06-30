import { Button } from "@basedev/common/components/ui/button"

export const GetStarted = () => {
  return (
    <div className="mt-6 flex flex-col items-center gap-6">
      <Button className="bg-primary" asChild>
        <a href="/introduction">Get Started</a>
      </Button>
    </div>
  )
}
