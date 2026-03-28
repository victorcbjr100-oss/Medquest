// CONFIGURAÇÕES GLOBAIS - MEDQUEST PRO
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';
const _supabase = supabase.createClient(S_URL, S_KEY);

// 1. FUNÇÃO PARA O DASHBOARD (Página Inicial)
async function atualizarEstatisticasDashboard() {
    try {
        const { count: totalBanco } = await _supabase.from('questoes').select('*', { count: 'exact', head: true });
        if(document.getElementById('total-banco')) document.getElementById('total-banco').innerText = totalBanco || 0;

        const { data: statsData } = await _supabase.from('estatisticas').select('*').eq('usuario', 'Dr. Victor');
        if (statsData) {
            const total = statsData.length;
            const acertos = statsData.filter(i => i.acertou === true).length;
            const precisao = total > 0 ? Math.round((acertos / total) * 100) : 0;

            if(document.getElementById('stat-total')) document.getElementById('stat-total').innerText = total;
            if(document.getElementById('stat-acertos')) document.getElementById('stat-acertos').innerText = acertos;
            if(document.getElementById('stat-precisao')) document.getElementById('stat-precisao').innerText = precisao + '%';
        }
    } catch (e) { console.error("Erro no Dashboard:", e); }
}

// 2. FUNÇÃO PARA COMENTÁRIOS ESTILO YOUTUBE (Página de Questões)
let comentPaiId = null;

async function carregarComentarios(questaoId) {
    const container = document.getElementById('container-comentarios');
    if(!container) return;

    const { data: todos, error } = await _supabase.from('comentarios').select('*').eq('questao_id', questaoId).order('created_at', { ascending: true });
    if (error) return;

    container.innerHTML = '';
    const principais = todos.filter(c => !c.pai_id);
    const respostas = todos.filter(c => c.pai_id);

    principais.forEach(coment => {
        container.innerHTML += templateComentario(coment, false);
        respostas.filter(r => r.pai_id === coment.id).forEach(reply => {
            container.innerHTML += templateComentario(reply, true);
        });
    });
}

function templateComentario(c, isReply) {
    const margin = isReply ? 'ml-12 border-l-2 border-blue-100 pl-4 bg-gray-50/50' : 'mb-4 bg-white shadow-sm';
    const botao = !isReply ? `<button onclick="setarResposta('${c.id}', '${c.usuario}')" class="text-[10px] font-bold text-blue-600 mt-2 tracking-tighter">RESPONDER</button>` : '';
    
    return `
        <div class="${margin} p-3 rounded-xl transition-all">
            <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">${c.usuario.charAt(0)}</div>
                <div class="flex-1">
                    <p class="text-[11px] font-bold text-gray-900">${c.usuario} <span class="text-gray-400 font-normal ml-2">${new Date(c.created_at).toLocaleDateString()}</span></p>
                    <p class="text-sm text-gray-700 leading-relaxed">${c.texto}</p>
                    ${botao}
                </div>
            </div>
        </div>`;
}

function setarResposta(id, nome) {
    comentPaiId = id;
    const input = document.getElementById('input-comentario');
    input.placeholder = `Respondendo a ${nome}...`;
    input.focus();
}

async function publicarComentario(questaoId) {
    const input = document.getElementById('input-comentario');
    if (!input.value) return;

    const { error } = await _supabase.from('comentarios').insert([{
        questao_id: questaoId,
        usuario: 'Dr. Victor',
        texto: input.value,
        pai_id: comentPaiId
    }]);

    if (!error) {
        input.value = '';
        input.placeholder = "Adicione um comentário clínico...";
        comentPaiId = null;
        carregarComentarios(questaoId);
    }
}
