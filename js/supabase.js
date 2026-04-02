// js/supabase.js
const SUPABASE_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

// Inicialização segura
if (typeof supabase !== 'undefined' && !window.supabaseClient) {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

async function verificarAcesso() {
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

    if (!session && !estaNaPaginaLogin) {
        window.location.href = 'login.html';
        return;
    } 
    
    if (session && estaNaPaginaLogin) {
        window.location.href = 'index.html';
        return;
    }

    if (session) {
        console.log("✅ Usuário autenticado:", session.user.email);
        // Atualiza a interface se o elemento existir
        const nomeUsuario = document.querySelector('.user-name');
        if (nomeUsuario) nomeUsuario.innerText = session.user.user_metadata.full_name || "Médico";
    }
}

verificarAcesso();
