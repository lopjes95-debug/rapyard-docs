import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/app/lib/supabase";

export async function POST(req, { params }) {
  const { sessionId } = params;
  const { phase } = await req.json();

  const supabase = getSupabaseClient();

  await supabase.channel(`yard-engine:${sessionId}`).send({
    type: "broadcast",
    event: "phase",
    payload: { phase }
  });

  return NextResponse.json({ ok: true });
}
