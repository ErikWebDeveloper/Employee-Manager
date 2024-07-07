import ServiceInterface from "../serviceInterface";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default class SupabaseInterface extends ServiceInterface {
  async getEmployees() {
    const { data } = await supabase.from("employee").select();
    return data;
  }
  async putEmployee() {
    const { error } = await supabase
      .from("countries")
      .insert({ id: 1, name: "Denmark" });
  }
}
