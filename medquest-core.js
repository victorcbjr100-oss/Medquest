async function enviarComentarioMaster(questaoId) {
    const input = document.getElementById('input-comentario');
    if (!input || !input.value.trim()) return;

    try {
        const novoComentario = {
            questao_id: String(questaoId), // Força ser texto para o banco aceitar
            usuario: 'Dr. Victor',
            texto: input.value
        };

        // Só envia pai_id se houver uma resposta a outro comentário
        if (typeof comentPaiId !== 'undefined' && comentPaiId) {
            novoComentario.pai_id = comentPaiId;
        }

        const { error } = await _supabase.from('comentarios').insert([novoComentario]);

        if (error) throw error;

        input.value = '';
        comentPaiId = null;
        carregarComentarios(questaoId); // Recarrega a lista
        
    } catch (e) {
        console.error("Erro ao comentar:", e.message);
        alert("Erro clínico ao salvar comentário: " + e.message);
    }
}
