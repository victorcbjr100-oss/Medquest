// js/supabase.js
const SUPABASE_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

// Inicializa o cliente uma única vez
if (typeof supabase !== 'undefined' && !window.supabaseClient) {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

async function verificarAcesso() {
    if (!window.supabaseClient) {
        setTimeout(verificarAcesso, 200);
        return;
    }

    const { data: { session } } = await window.supabaseClient.auth.getSession();
    const estaNoLogin = window.location.pathname.includes('login.html');

    // Se não estiver logado e não estiver na página de login
    if (!session && !estaNoLogin) {
        window.location.href = 'login.html';
        return;
    } 
    
    // Se já estiver logado e tentar entrar no login, vai para a home
    if (session && estaNoLogin) {
        window.location.href = 'index.html';
    }
}

verificarAcesso();
