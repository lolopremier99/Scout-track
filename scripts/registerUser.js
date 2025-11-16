// registerUser.js

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// ⚡ Renseigne ces valeurs depuis Supabase → Settings → API
const SUPABASE_URL = 'https://msccoudtbwmgtvwhksfm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zY2NvdWR0YndtZ3R2d2hrc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDM0MDMsImV4cCI6MjA3ODc3OTQwM30.bmP5Y1oXSu38Mxc_1SruGTgV3zVNUs1YB47qWZwPEgs';

// Créer le client Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function registerUser({
  login,
  email,
  password,
  groupe = '',
  droits = {},
  description1 = '',
  description2 = '',
  description3 = ''
}) {
  try {
    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .or(`login.eq.${login},email.eq.${email}`)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = "No rows found"
      throw fetchError;
    }

    if (existingUser) {
      console.log('Erreur : un utilisateur avec ce login ou email existe déjà.');
      return;
    }

    // Hasher le mot de passe
    const password_hash = await bcrypt.hash(password, 10);

    // Insérer dans la table users
    const { data, error } = await supabase
      .from('users')
      .insert([{
        login,
        email,
        password_hash,
        groupe,
        droits,
        description1,
        description2,
        description3
      }])
      .select();

    if (error) throw error;

    console.log('Utilisateur enregistré avec succès :', data);
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement :', err.message);
  }
}

// Exemple d’utilisation
registerUser({
  login: 'utilisateur2',
  email: 'user2@example.com',
  password: 'motdepasse123',
  groupe: 'admin',
  droits: { read: true, write: true },
  description1: 'Premier utilisateur',
});
