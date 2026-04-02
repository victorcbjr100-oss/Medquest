const SUPABASE_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Cria o cliente e expõe globalmente
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;

// Teste de conexão silencioso
async function testarConexao() {
    const { data, error } = await supabaseClient.from('questoes').select('id').limit(1);
    if (error) {
        console.error("❌ Erro de conexão:", error.message);
    } else {
        console.log("✅ Conectado ao banco MedQuest!");
    }
}
testarConexao();
