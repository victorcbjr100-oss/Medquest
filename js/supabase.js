// 🔗 CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';

// 🚀 CRIA CLIENTE GLOBAL
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * 📊 REGISTRA O DESEMPENHO DO USUÁRIO
 * Salva se a questão foi respondida corretamente ou não.
 */
window.registrarRevisao = async (questaoId, acertou) => {
    try {
        // Pega o usuário logado (necessário para saber de quem é a revisão)
        const { data: { user } } = await supabaseClient.auth.getUser();
        
        if (!user) {
            console.warn("⚠️ Usuário não logado. Progresso não será salvo.");
            return;
        }

        const { error } = await supabaseClient
            .from('revisoes')
            .insert([{
                questao_id: questaoId,
                usuario_id: user.id,
                acertou: acertou,
                data_revisao: new Date().toISOString()
            }]);

        if (error) throw error;
        console.log(`✅ Revisão registrada: ${acertou ? 'Acerto' : 'Erro'}`);

    } catch (e) {
        console.error("❌ Erro ao salvar revisão:", e.message);
    }
};

// 🧪 TESTE DE CONEXÃO
async function testarConexao() {
    try {
        const { error } = await supabaseClient.from('questoes').select('id').limit(1);
        if (error) throw error;
        console.log("✅ Supabase conectado");
    } catch (e) {
        console.error("❌ Erro Supabase:", e.message);
    }
}

testarConexao();
