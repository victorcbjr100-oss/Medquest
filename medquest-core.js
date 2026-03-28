// --- CONFIGURAÇÕES GLOBAIS DO BANCO ---
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';
const _supabase = supabase.createClient(S_URL, S_KEY);

// --- 1. GESTÃO DE ESTATÍSTICAS E DASHBOARD ---

async function carregarEstatisticasDetalhadas() {
    try {
        const { data: statsData, error } = await _supabase
            .from('estatisticas')
            .select('*')
            .eq('usuario', 'Dr. Victor');

        if (error) throw error;
        if (!statsData) return;

        // Cálculos Gerais
        const total = statsData.length;
        const acertos = statsData.filter(i => i.acertou === true).length;
        const erros = total - acertos;
        const precisao = total > 0 ? Math.round((acertos / total) * 100) : 0;

        // Atualização dos Cards Superiores (IDs do HTML)
        const atualizarCard = (id, valor) => {
            const el = document.getElementById(id);
            if (el) el.innerText = valor;
        };

        atualizarCard('stat-total', total);
        atualizarCard('stat-acertos', acertos);
        atualizarCard('stat-erros', erros);
        atualizarCard('stat-precisao', precisao + '%');

        // Processamento de Temas e Subtemas (Radar de Erros)
        const resumoTemas = {};
        const alertaSubtemas = {};

        statsData.forEach(item => {
            // Lógica por Especialidade
            if (!resumoTemas[item.tema]) resumoTemas[item.tema] = { total: 0, acertos: 0 };
            resumoTemas[item.tema].total++;
            if (item.acertou) resumoTemas[item.tema].acertos++;

            // Lógica de Alerta (Subtemas)
            const sub = item.subtema || "Geral";
            if (!alertaSubtemas[sub]) alertaSubtemas[sub] = { total: 0, erros: 0 };
            alertaSubtemas[sub].total++;
            if (!item.acertou) alertaSubtemas[sub].erros++;
        });

        renderizarGraficosTemas(resumoTemas);
        renderizarAlertasCriticos(alertaSubtemas);

    } catch (e) {
        console.error("Erro ao carregar estatísticas:", e.message);
    }
}

function renderizarGraficosTemas(dados) {
    const container = document.getElementById('lista-estatisticas-temas');
    if (!container) return;
    
    container.innerHTML = Object.keys(dados).map(tema => {
        const { total, acertos } = dados[tema];
        const perc = Math.round((acertos / total) * 100);
        return `
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <div class="flex justify-between items-center mb-3">
                    <h4 class="font-bold text-gray-700 uppercase text-[10px] tracking-wider">${tema}</h4>
                    <span class="text-[10px] font-black ${perc >= 70 ? 'text-emerald-500' : 'text-blue-500'}">${perc}%</span>
                </div>
                <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-blue-600 h-full progress-bar" style="width: ${perc}%"></div>
                </div>
            </div>`;
    }).join('');
}

function renderizarAlertasCriticos(dados) {
    const container = document.getElementById('grafico-melhoria');
    if (!container) return;

    // Filtra subtemas com erro > 25%
    const criticos = Object.keys(dados).filter(sub => (dados[sub].erros / dados[sub].total) > 0.25);

    if (criticos.length === 0) {
        container.innerHTML = '<p class="text-[10px] text-emerald-500 font-bold uppercase">Excelente desempenho clínico!</p>';
        return;
    }

    container.innerHTML = criticos.map(sub => {
        const taxaErro = Math.round((dados[sub].erros / dados[sub].total) * 100);
        return `
            <div class="mb-4">
                <div class="flex justify-between mb-1">
                    <span class="text-[10px] font-bold text-gray-600 uppercase">${sub}</span>
                    <span class="text-[10px] font-bold text-red-500">${taxaErro}% ERRO</span>
                </div>
                <div class="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                    <div class="bg-red-500 h-full" style="width: ${taxaErro}%"></div>
                </div>
            </div>`;
    }).join('');
}

// --- 2. GESTÃO DE COMENTÁRIOS ---

let comentPaiId = null; // Para lidar com respostas a comentários

async function carregarComentarios(questaoId) {
    const container = document.getElementById('container-comentarios');
    if (!container) return;

    try {
        const { data, error } = await _supabase
            .from('comentarios')
            .select('*')
            .eq('questao_id', String(questaoId))
            .order('created_at', { ascending: true });

        if (error) throw error;

        container.innerHTML = data.length > 0 ? data.map(c => `
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] font-bold text-blue-600 uppercase">${c.usuario}</span>
                    <span class="text-[9px] text-gray-400">${new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p class="text-xs text-gray-700 leading-relaxed">${c.texto}</p>
            </div>
        `).join('') : '<p class="text-[10px] text-gray-400 italic">Nenhum comentário clínico ainda.</p>';

    } catch (e) {
        console.error("Erro ao carregar comentários:", e.message);
    }
}

async function enviarComentarioMaster(questaoId) {
    const input = document.getElementById('input-comentario');
    if (!input || !input.value.trim()) return;

    try {
        const payload = {
            questao_id: String(questaoId),
            usuario: 'Dr. Victor',
            texto: input.value
        };

        if (comentPaiId) payload.pai_id = comentPaiId;

        const { error } = await _supabase.from('comentarios').insert([payload]);

        if (error) throw error;

        input.value = '';
        comentPaiId = null;
        carregarComentarios(questaoId);

    } catch (e) {
        alert("Erro ao salvar comentário: " + e.message);
    }
}

// --- 3. SALVAMENTO AUTOMÁTICO DE RESULTADOS ---

async function salvarResultadoQuestao(tema, subtema, acertou) {
    try {
        await _supabase.from('estatisticas').insert([{
            usuario: 'Dr. Victor',
            tema: tema,
            subtema: subtema,
            acertou: acertou
        }]);
    } catch (e) {
        console.error("Erro ao salvar estatística:", e);
    }
}
