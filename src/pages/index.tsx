import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabaseClient"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

interface Evento {
  id: number
  title: string
  type: string
  duration: number
  description: string
  created_at: string
}

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([])

  useEffect(() => {
    const fetchEventos = async () => {
      const { data } = await supabase
        .from("cal_eventos")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) setEventos(data as Evento[])
    }

    fetchEventos()
  }, [])

  return (
    <div className="p-4 space-y-4">
      {eventos.map((evento) => (
        <Card key={evento.id}>
          <CardHeader className="flex items-center justify-between space-y-0">
            <CardTitle className="text-xl font-bold">{evento.title}</CardTitle>
            <Badge>{evento.type}</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <CardDescription>{evento.description}</CardDescription>
            <p className="text-sm">
              Duración: <span className="font-medium">{evento.duration}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(evento.created_at).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

