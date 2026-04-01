// js/supabase.js

// 🔌 CONFIGURAÇÃO DO SUPABASE
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';

const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

// 🚀 CLIENTE GLOBAL (usado no projeto inteiro)
const supabaseClient = supabase.createClient(S_URL, S_KEY);

// 🛡️ TESTE DE CONEXÃO (opcional, útil pra debug)
async function testarConexao() {
    try {
        const { error } = await supabaseClient
            .from('questoes')
            .select('id')
            .limit(1);

        if (error) throw error;

        console.log("✅ Supabase conectado com sucesso");
        return true;

    } catch (e) {
        console.error("❌ Erro ao conectar com Supabase:", e.message);
        return false;
    }
}

// 👤 PEGAR USUÁRIO (fallback seguro)
async function getUserSafe() {
    try {
        const { data, error } = await supabaseClient.auth.getUser();

        if (error) throw error;

        return data.user;
    } catch (e) {
        console.error("Erro ao obter usuário:", e.message);
        return null;
    }
}
