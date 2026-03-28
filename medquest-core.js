// --- SISTEMA DE COMENTÁRIOS (VERSÃO BLINDADA) ---

async function carregarComentarios(questaoId) {
    const container = document.getElementById('container-comentarios');
    if (!container) return;

    try {
        // Forçamos o ID para String para casar com o banco (evita erro UUID)
        const idBusca = String(questaoId);
        
        const { data, error } = await _supabase
            .from('comentarios')
            .select('*')
            .eq('questao_id', idBusca)
            .order('created_at', { ascending: true });

        if (error) throw error;

        container.innerHTML = data && data.length ? data.map(c => `
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] font-bold text-blue-600 uppercase">${c.usuario}</span>
                    <span class="text-[9px] text-gray-400">${new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p class="text-xs text-gray-700 leading-relaxed">${c.texto}</p>
            </div>`).join('') : '<p class="text-[10px] text-gray-400 italic py-4 text-center">Nenhum comentário clínico ainda.</p>';
            
    } catch (e) {
        console.error("Erro ao carregar comentários:", e.message);
    }
}

async function enviarComentarioMaster(questaoId) {
    const input = document.getElementById('input-comentario');
    
    // Se a questãoId não vier no clique, tentamos pegar da variável global questaoAtual
    const idFinal = questaoId || (questaoAtual ? questaoAtual.id : null);
    
    if (!input || !input.value.trim() || !idFinal) {
        console.warn("Dados insuficientes para comentar.");
        return;
    }

    try {
        const { error } = await _supabase
            .from('comentarios')
            .insert([{ 
                questao_id: String(idFinal), 
                usuario: 'Dr. Victor', 
                texto: input.value.trim() 
            }]);

        if (error) throw error;

        input.value = ''; // Limpa o campo
        carregarComentarios(idFinal); // Atualiza a lista na hora
        
    } catch (e) {
        alert("Erro ao salvar comentário: " + e.message);
        console.error(e);
    }
}
