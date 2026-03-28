// --- CONFIGURAÇÕES GLOBAIS ---
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';
const _supabase = supabase.createClient(S_URL, S_KEY);

let questaoAtual = null;
let comentPaiId = null;

// --- MOTOR DE QUESTÕES (O QUE ESTAVA FALTANDO) ---
async function carregarQuestao(id) {
    try {
        const container = document.getElementById('container-questao');
        if (!container) return;

        // Simulando busca ou usando banco (ajuste conforme sua lógica de JSON ou Supabase)
        // Aqui garantimos que a função exista para não travar a página
        console.log("Carregando questão ID:", id);
        
        // Se você usa um banco de questões local ou Supabase, a lógica entra aqui
        // Chamada para carregar comentários da questão
        carregarComentarios(id);
    } catch (e) { console.error("Erro ao carregar questão:", e); }
}

async function verificarResposta(escolha, correta, tema, subtema) {
    const acertou = (escolha === correta);
    
    // Salva automaticamente no banco de estatísticas
    await salvarResultadoQuestao(tema, subtema, acertou);
    
    return acertou;
}

// --- SISTEMA DE ESTATÍSTICAS (ESTRUTURA COMPLETA) ---
async function carregarEstatisticasDetalhadas() {
    try {
        const { data: statsData, error } = await _supabase.from('estatisticas').select('*').eq('usuario', 'Dr. Victor');
        if (error || !statsData) throw error;

        const total = statsData.length;
        const acertos = statsData.filter(i => i.acertou).length;
        const erros = total - acertos;
        const precisao = total > 0 ? Math.round((acertos / total) * 100) : 0;

        const setText = (id, txt) => { const el = document.getElementById(id); if(el) el.innerText = txt; };
        setText('stat-total', total);
        setText('stat-acertos', acertos);
        setText('stat-erros', erros);
        setText('stat-precisao', precisao + '%');

        const resumoTemas = {};
        const alertaSubtemas = {};

        statsData.forEach(item => {
            if (!resumoTemas[item.tema]) resumoTemas[item.tema] = { total: 0, acertos: 0 };
            resumoTemas[item.tema].total++;
            if (item.acertou) resumoTemas[item.tema].acertos++;

            const sub = item.subtema || "Geral";
            if (!alertaSubtemas[sub]) alertaSubtemas[sub] = { total: 0, erros: 0 };
            alertaSubtemas[sub].total++;
            if (!item.acertou) alertaSubtemas[sub].erros++;
        });

        renderizarTemas(resumoTemas);
        renderizarAlertas(alertaSubtemas);
    } catch (e) { console.error("Erro estatísticas:", e); }
}

function renderizarTemas(dados) {
    const container = document.getElementById('lista-estatisticas-temas');
    if (!container) return;
    container.innerHTML = Object.keys(dados).map(tema => {
        const perc = Math.round((dados[tema].acertos / dados[tema].total) * 100);
        return `<div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div class="flex justify-between items-center mb-3">
                <h4 class="font-bold text-gray-700 uppercase text-[10px]">${tema}</h4>
                <span class="text-[10px] font-black ${perc >= 70 ? 'text-emerald-500' : 'text-blue-500'}">${perc}%</span>
            </div>
            <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-blue-600 h-full" style="width: ${perc}%"></div>
            </div>
        </div>`;
    }).join('');
}

function renderizarAlertas(dados) {
    const container = document.getElementById('grafico-melhoria');
    if (!container) return;
    const criticos = Object.keys(dados).filter(sub => (dados[sub].erros / dados[sub].total) > 0.25);
    container.innerHTML = criticos.length ? criticos.map(sub => {
        const taxa = Math.round((dados[sub].erros / dados[sub].total) * 100);
        return `<div class="mb-3 text-[10px] font-bold uppercase">
            <div class="flex justify-between mb-1"><span class="text-gray-600">${sub}</span><span class="text-red-500">${taxa}% ERRO</span></div>
            <div class="w-full bg-gray-100 h-1 rounded-full overflow-hidden"><div class="bg-red-500 h-full" style="width: ${taxa}%"></div></div>
        </div>`;
    }).join('') : '<p class="text-[10px] text-emerald-500 font-bold uppercase">Desempenho excelente!</p>';
}

// --- SISTEMA DE COMENTÁRIOS (CORREÇÃO UUID) ---
async function carregarComentarios(questaoId) {
    const container = document.getElementById('container-comentarios');
    if (!container) return;
    try {
        const { data } = await _supabase.from('comentarios').select('*').eq('questao_id', String(questaoId)).order('created_at', { ascending: true });
        container.innerHTML = data && data.length ? data.map(c => `
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                <p class="text-[10px] font-bold text-blue-600 mb-1 uppercase">${c.usuario}</p>
                <p class="text-xs text-gray-700">${c.texto}</p>
            </div>`).join('') : '<p class="text-[10px] text-gray-400 italic">Sem comentários.</p>';
    } catch (e) { console.error(e); }
}

async function enviarComentarioMaster(questaoId) {
    const input = document.getElementById('input-comentario');
    if (!input || !input.value.trim()) return;
    try {
        const { error } = await _supabase.from('comentarios').insert([{ questao_id: String(questaoId), usuario: 'Dr. Victor', texto: input.value }]);
        if (error) throw error;
        input.value = '';
        carregarComentarios(questaoId);
    } catch (e) { alert("Erro ao salvar: " + e.message); }
}

// --- SALVAMENTO ---
async function salvarResultadoQuestao(tema, subtema, acertou) {
    await _supabase.from('estatisticas').insert([{ usuario: 'Dr. Victor', tema, subtema, acertou }]);
}
