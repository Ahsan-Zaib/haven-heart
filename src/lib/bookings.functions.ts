import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  services: z.array(z.string().max(60)).min(1).max(20),
  requirements: z.string().max(2000).optional().default(""),
  frequency: z.enum(["once", "weekly", "fortnightly", "monthly", "custom"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.enum(["Morning", "Afternoon", "Evening"]),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(5).max(300),
  access: z.string().max(1000).optional().default(""),
  family: z.string().max(300).optional().default(""),
  estimate: z.string().max(200).optional().default(""),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const reference = `HH-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.floor(Math.random() * 36).toString(36).toUpperCase()}`;
    const { error } = await supabaseAdmin.from("booking_requests").insert({
      reference,
      services: data.services,
      requirements: data.requirements || null,
      frequency: data.frequency,
      preferred_date: data.date,
      preferred_time: data.time,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      access_notes: data.access || null,
      family_contact: data.family || null,
      estimate: data.estimate || null,
    });
    if (error) {
      console.error("booking insert failed", error.message);
      return { ok: false as const, error: "We couldn't save your booking. Please try again." };
    }
    return { ok: true as const, reference };
  });
