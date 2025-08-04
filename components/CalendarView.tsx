"use client"

import { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import type { EventApi, EventClickArg } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

import { supabase } from "@/lib/supabaseClient"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SlotType {
  id: number
  name: string
  base_price: number
}

interface Reserva {
  id: string
  title: string
  duration: number
  price: number
  start_time: string
  slot_type_id: number
  cal_slot_definitions?: SlotType | null
}

interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  backgroundColor: string
  borderColor: string
  extendedProps: {
    duration: number
    price: number
    typeName: string
  }
}

const typeColors: Record<string, string> = {
  PSY: "#60a5fa",
  COACH: "#f472b6",
}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null)
  const [open, setOpen] = useState(false)

  const fetchReservations = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("cal_reservas")
      .select(
        "id,title,duration,price,start_time,slot_type_id, cal_slot_definitions (name,base_price)"
      )

    setLoading(false)
    if (error || !data) {
      console.error(error)
      return
    }

    const mapped = (data as unknown as Reserva[]).map((reserva): CalendarEvent => {
      const typeName = reserva.cal_slot_definitions?.name || ""
      const start = reserva.start_time
      const endDate = new Date(start)
      endDate.setMinutes(endDate.getMinutes() + reserva.duration)
      const end = endDate.toISOString()

      const color = typeColors[typeName] || "#94a3b8"

      return {
        id: reserva.id.toString(),
        title: `${reserva.title} (${typeName})`,
        start,
        end,
        backgroundColor: color,
        borderColor: color,
        extendedProps: {
          duration: reserva.duration,
          price: reserva.price,
          typeName,
        },
      }
    })

    setEvents(mapped)
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const handleEventClick = (info: EventClickArg) => {
    setSelectedEvent(info.event)
    setOpen(true)
  }

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  })

  return (
    <Card className="p-4 space-y-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Calendario de Reservas</CardTitle>
        <Button onClick={fetchReservations} disabled={loading}>
          {loading ? "Actualizando..." : "Refrescar"}
        </Button>
      </CardHeader>
      <CardContent>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable
          editable
          events={events}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            {selectedEvent && (
              <DialogDescription className="space-y-2">
                <p>Tipo: {selectedEvent.extendedProps.typeName}</p>
                <p>Duración: {selectedEvent.extendedProps.duration} min</p>
                <p>
                  Precio: {currency.format(selectedEvent.extendedProps.price)}
                </p>
                <p>
                  Inicio: {selectedEvent.start?.toLocaleString("es-ES")}
                </p>
                <p>Fin: {selectedEvent.end?.toLocaleString("es-ES")}</p>
              </DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

