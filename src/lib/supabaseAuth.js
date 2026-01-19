import { supabase } from "./supabase";

/**
 * Just return the profile.
 * Creation is handled by DB trigger.
 */
export async function getMyProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  if (error) {
    console.warn("getMyProfile error:", error);
    return null;
  }

  return data;
}

export function onAuthChange(cb) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    cb(event, session);
  });

  return () => subscription.unsubscribe();
}
