// 🔗 CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

// 🚀 CRIA CLIENTE GLOBAL (padrão recomendado)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    }
});

/**
 * 📊 REGISTRA O DESEMPENHO DO USUÁRIO
 * Salva se a questão foi respondida corretamente ou não.
 */
window.registrarRevisao = async (questaoId, acertou) => {
    try {
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
       
        if (authError || !user) {
            console.warn("⚠️ Usuário não autenticado. Progresso não será salvo.");
            return false;
        }

        const { error } = await supabaseClient
            .from('revisoes')
            .insert([{
                questao_id: questaoId,
                usuario_id: user.id,
                acertou: Boolean(acertou),           // garante que seja boolean
                // data_revisao e created_at podem ser gerados automaticamente no banco
            }]);

        if (error) throw error;

        console.log(`✅ Revisão registrada com sucesso: ${acertou ? 'Acerto' : 'Erro'}`);
        return true;
    } catch (e) {
        console.error("❌ Erlo ao salvar revisão:", e.message || e);
        return false;
    }
};

// 🧪 TESTE DE CONEXÃO (melhorado)
async function testarConexao() {
    try {
        const { data, error } = await supabaseClient
            .from('questoes')
            .select('id')
            .limit(1);

        if (error) throw error;

        console.log("✅ Supabase conectado com sucesso!");
        console.log(`📊 ${data?.length || 0} questão(s) encontrada(s) para teste.`);
        return true;
    } catch (e) {
        console.error("❌ Erro na conexão com Supabase:", e.message || e);
        console.warn("Verifique se o RLS permite leitura na tabela 'questoes' para o role 'anon' ou 'authenticated'.");
        return false;
    }
}

// Executa o teste ao carregar o arquivo
testarConexao();
