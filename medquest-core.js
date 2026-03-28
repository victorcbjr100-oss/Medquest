// --- CONFIGURAÇÕES GLOBAIS ---
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';
const _supabase = supabase.createClient(S_URL, S_KEY);

let questaoAtual = null;

// --- 1. MOTOR DE QUESTÕES (RESTABELECIDO) ---
async function carregarQuestao(id) {
    try {
        const { data, error } = await _supabase.from('questoes').select('*').eq('id', id).single();
        if (error) throw error;

        questaoAtual = data;
        const container = document.getElementById('container-questao');
        if (!container) return;

        // Renderiza o HTML da questão
        container.innerHTML = `
            <div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <span class="text-[10px] font-black text-blue-600 uppercase tracking-widest">${data.tema} • ${data.subtema}</span>
                <h2 class="text-xl font-bold text-gray-800 mt-4 mb-8 leading-relaxed">${data.enunciado}</h2>
                <div class="space-y-3">
                    ${['a', 'b', 'c', 'd'].map(letra => `
                        <button onclick="verificarResposta('${letra}')" 
                                id="btn-${letra}"
                                class="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center gap-4 group">
                            <span class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-all uppercase">${letra}</span>
                            <span class="text-sm font-medium text-gray-600">${data['op_ ' + letra] || data['op_' + letra]}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Carrega os comentários desta questão
        carregarComentarios(id);
    } catch (e) {
        console.error("Erro ao carregar questão:", e.message);
    }
}

async function verificarResposta(escolha) {
    if (!questaoAtual) return;
    const correta = questaoAtual.resposta_correta.toLowerCase();
    const acertou = (escolha === correta);

    // Feedback visual
    document.getElementById(`btn-${escolha}`).classList.add(acertou ? 'bg-emerald-50' : 'bg-red-50');
    document.getElementById(`btn-${escolha}`).classList.add(acertou ? 'border-emerald-200' : 'border-red-200');

    // Salva no banco de estatísticas
    await _supabase.from('estatisticas').insert([{
        usuario: 'Dr. Victor',
        tema: questaoAtual.tema,
        subtema: questaoAtual.subtema,
        acertou: acertou
    }]);
}

// --- 2. SISTEMA DE COMENTÁRIOS E ESTATÍSTICAS ---
// (Mantenha as funções carregarEstatisticasDetalhadas e enviarComentarioMaster das mensagens anteriores)
