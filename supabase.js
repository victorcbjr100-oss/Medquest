// js/supabase.js

// 🔗 CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

// 🚀 CRIA CLIENTE GLOBAL (ESSA LINHA RESOLVE SEU ERRO)
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🧪 TESTE DE CONEXÃO (OPCIONAL)
async function testarConexao() {
    try {
        const { error } = await supabaseClient.from('questoes').select('id').limit(1);

        if (error) throw error;

        console.log("✅ Supabase conectado");
    } catch (e) {
        console.error("❌ Erro Supabase:", e.message);
    }
}
