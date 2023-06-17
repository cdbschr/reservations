import { supabase } from "./supabaseClient";

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log("Erreur lors de la connexion :", error.message);
  } else {
    console.log("Connecté avec succès !", data.session);

    const { data: user, error: userError } = await supabase
      .from("User")
      .select("id")
      .eq("id", data?.user?.id ?? "");

    if ((user && user.length === 0) || userError) {
      const { error: insertError } = await supabase.from("User").insert([
        {
          id: data?.user?.id,
          email: data?.user?.email,
          role_id: 3,
        },
      ]);

      if (insertError) {
        console.log(
          "Erreur lors de l'insertion du nouvel utilisateur :",
          insertError.message
        );
      }
    }

    const trigramExists = await isTrigramExisting(data?.user?.id ?? "");

    if (!trigramExists) {
      window.location.href = "/trigram";
    } else {
      window.location.href = "/";
    }
  }
}

export async function isUserAuthenticated() {
  const user = (await supabase.auth.getSession()).data.session?.access_token;
  console.log("isUserAuthenticated :", user != null ? "true" : "false");

  return user != null;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Erreur lors de la déconnexion :", error.message);
  } else {
    console.log("Déconnecté avec succès !");
  }
}

export async function updateUserTrigram(userId: string, trigram: string) {
  const { data, error } = await supabase
    .from("User")
    .update({ trigram })
    .eq("id", userId);

  if (error) {
    console.log("Erreur lors de la mise à jour du trigramme de l'utilisateur :", error.message);
  } else {
    console.log("Trigramme de l'utilisateur mis à jour avec succès !");
  }

  return { data, error };
}

export async function isTrigramExisting(userId: string) {
  const { data, error } = await supabase
    .from("User")
    .select("trigram")
    .eq("id", userId);

  if (error) {
    console.log("Erreur lors de la récupération du trigramme de l'utilisateur :", error.message);
    return false;
  }

  return data && data[0]?.trigram != null;
}