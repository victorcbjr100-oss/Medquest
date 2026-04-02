// js/supabase.js
const SUPABASE_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

// Inicializa o cliente globalmente
if (typeof supabase !== 'undefined' && !window.supabaseClient) {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase inicializado com sucesso!");
}

async function inicializarSupabase() {
    if (typeof supabase === 'undefined') {
        console.warn("Aguardando biblioteca do Supabase...");
        return false;
    }
    if (!window.supabaseClient) {
        window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return true;
}

async function verificarAcesso() {
    // Aguarda o cliente carregar se ele ainda não estiver pronto
    if (!window.supabaseClient) {
        if (typeof supabase !== 'undefined') {
            window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } else {
            setTimeout(verificarAcesso, 200);
            return;
        }
    }

    const { data: { session } } = await window.supabaseClient.auth.getSession();
    const estaNaPaginaLogin = window.location.pathname.includes('login.html');

    // Se NÃO está logado e NÃO está na página de login -> Manda para o Login
    if (!session && !estaNaPaginaLogin) {
        window.location.href = 'login.html';
        return;
    } 
    
    // Se JÁ ESTÁ logado e tenta acessar a página de login -> Manda para a Index
    if (session && estaNaPaginaLogin) {
        window.location.href = 'index.html';
        return;
    }

    if (session) {
        console.log("👤 Usuário ativo:", session.user.email);
        // Atualiza elementos da interface se existirem (ex: nome do Dr. Victor)
        const userNameElem = document.querySelector('.user-name');
        if (userNameElem) userNameElem.innerText = session.user.user_metadata.full_name || "Médico";
    }
}

// Executa a proteção de rotas imediatamente
verificarAcesso();
