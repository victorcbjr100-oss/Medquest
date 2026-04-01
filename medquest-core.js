// --- CONFIGURAÇÕES GLOBAIS ---
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'SUA_ANON_KEY_AQUI';
const _supabase = supabase.createClient(S_URL, S_KEY);

let questaoAtual = null;
let respondeu = false;

// --- 1. MOTOR DE QUESTÕES ---
async function carregarQuestao(id) {
    try {
        const { data, error } = await _supabase
            .from('questoes')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        questaoAtual = data;
        respondeu = false;

        const container = document.getElementById('container-questao');
        if (!container) return;

        container.innerHTML = `
            <div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <span class="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    ${data.tema} • ${data.subtema}
                </span>

                <h2 class="text-xl font-bold text-gray-800 mt-4 mb-8 leading-relaxed">
                    ${data.enunciado}
                </h2>

                <div class="space-y-3">
                    ${['a', 'b', 'c', 'd'].map(letra => `
                        <button 
                            data-letra="${letra}"
                            id="btn-${letra}"
                            class="btn-opcao w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center gap-4 group">
                            
                            <span class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-all uppercase">
                                ${letra}
                            </span>

                            <span class="text-sm font-medium text-gray-600">
                                ${data['op_' + letra] || 'Alternativa não disponível'}
                            </span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Adiciona eventos depois de renderizar
        document.querySelectorAll('.btn-opcao').forEach(btn => {
            btn.addEventListener('click', () => {
                verificarResposta(btn.dataset.letra);
            });
        });

        // Comentários
        carregarComentarios(id);

    } catch (e) {
        console.error("Erro ao carregar questão:", e.message);
        alert("Erro ao carregar questão.");
    }
}

// --- VERIFICAR RESPOSTA ---
async function verificarResposta(escolha) {
    if (!questaoAtual || respondeu) return;

    respondeu = true;

    const correta = questaoAtual.resposta_correta.toLowerCase();
    const acertou = (escolha === correta);

    // Desativa todos os botões
    document.querySelectorAll('.btn-opcao').forEach(btn => {
        btn.disabled = true;
    });

    // Marca correta e errada
    document.querySelectorAll('.btn-opcao').forEach(btn => {
        const letra = btn.dataset.letra;

        if (letra === correta) {
            btn.classList.add('bg-emerald-50', 'border-emerald-300');
        }

        if (letra === escolha && !acertou) {
            btn.classList.add('bg-red-50', 'border-red-300');
        }
    });

    // Salva estatística
    try {
        await _supabase.from('estatisticas').insert([{
            usuario: 'Dr. Victor',
            tema: questaoAtual.tema,
            subtema: questaoAtual.subtema,
            acertou: acertou
        }]);
    } catch (e) {
        console.error("Erro ao salvar estatística:", e.message);
    }
}
