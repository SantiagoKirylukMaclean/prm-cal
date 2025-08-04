import dynamic from "next/dynamic"

const CalendarView = dynamic(() => import("@/components/CalendarView"), {
  ssr: false,
})

export default function CalendarPage() {
  return (
    <div className="container mx-auto p-4 flex justify-center">
      <CalendarView />
    </div>
  )
}

