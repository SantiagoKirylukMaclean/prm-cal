import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Evento {
  id: number;
  title: string;
  type: string;
  duration: number;
  description: string;
  created_at: string;
}

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const { data } = await supabase
        .from("cal_eventos")
        .select("id, title, type, duration, description, created_at")
        .order("created_at", { ascending: false });
      if (data) {
        setEventos(data);
      }
    };

    fetchEventos();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {eventos.map((evento) => (
        <Card key={evento.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{evento.title}</CardTitle>
            <Badge>{evento.type}</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <CardDescription>{evento.description}</CardDescription>
            <p className="text-sm text-muted-foreground">
              Duración: {evento.duration} min
            </p>
            <p className="text-xs text-muted-foreground">
              Creado: {new Date(evento.created_at).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
