// js/revisao.js

async function registrarRevisao(questaoId, acertou) {

    const user = await getUser().catch(() => null);
    if (!user) return;

    const { data } = await supabaseClient
        .from("revisoes")
        .select("*")
        .eq("user_id", user.id)
        .eq("questao_id", questaoId)
        .single();

    let nivel = 1;

    if (data) {
        nivel = acertou ? data.nivel + 1 : 1;
    }

    let dias = 1;

    if (nivel == 2) dias = 3;
    if (nivel == 3) dias = 7;
    if (nivel >= 4) dias = 15;

    const proxima = new Date();
    proxima.setDate(proxima.getDate() + dias);

    await supabaseClient.from("revisoes").upsert([{
        user_id: user.id,
        questao_id: questaoId,
        nivel: nivel,
        proxima_revisao: proxima
    }]);
}
