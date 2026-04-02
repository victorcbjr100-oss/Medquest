// js/supabase.js
const SUPABASE_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

async function inicializarSupabase() {
    try {
        // Verifica se a biblioteca externa (SDK) do Supabase já está disponível no navegador
        if (typeof supabase === 'undefined') {
            console.warn("Aguardando carregamento da biblioteca Supabase...");
            return false;
        }

        // Cria o cliente global apenas uma vez
        if (!window.supabaseClient) {
            window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log("✅ Conectado ao Supabase com sucesso!");
        }
        return true;
    } catch (error) {
        console.error("❌ Erro crítico na conexão:", error);
        return false;
    }
}
// Verifica se o usuário está logado
async function verificarAcesso() {
    // Aguarda o cliente carregar se necessário
    if (!window.supabaseClient) {
        setTimeout(verificarAcesso, 200);
        return;
    }

    const { data: { session } } = await window.supabaseClient.auth.getSession();
    
    // Se não houver sessão e não estiver na página de login, redireciona
    if (!session && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    } 
    
    // Se estiver logado, você pode capturar os dados do usuário
    if (session) {
        console.log("Usuário ativo:", session.user.email);
        // Exemplo: session.user.user_metadata.full_name (nome do Google)
        // Exemplo: session.user.user_metadata.avatar_url (foto do Google)
    }
}

verificarAcesso();
