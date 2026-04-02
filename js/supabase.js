// js/supabase.js - Configurado para seu projeto Supabase
let supabaseClient = null;

async function inicializarSupabase() {
    try {
        console.log('🔄 Inicializando Supabase...');
        
        // Suas credenciais EXATAS
        const { createClient } = supabase;
        supabaseClient = createClient(
            'https://xkhwfudjcqmbhcdkpewr.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI'
        );
        
        // Teste de conexão
        const { data: testData, error: testError } = await supabaseClient
            .from('questoes')
            .select('count')
            .limit(1)
            .single();
            
        if (testError) {
            console.warn('⚠️ Teste de conexão falhou (tabela pode estar vazia):', testError.message);
        } else {
            console.log('✅ Supabase conectado com sucesso!');
        }
        
        return true;
    } catch (error) {
        console.error('❌ Erro crítico ao conectar Supabase:', error);
        return false;
    }
}

// Inicializa automaticamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        inicializarSupabase();
    });
} else {
    inicializarSupabase();
}

// Exporta para uso global
window.supabaseClient = supabaseClient;
