import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="p-6">
      <Card className="mx-auto max-w-3xl space-y-4 p-6">
        <CardHeader>
          <CardTitle>Calendario</CardTitle>
          <CardDescription>
            Administra y reserva tus slots desde el calendario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg">
            <Link href="/calendar">Ver calendario</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

