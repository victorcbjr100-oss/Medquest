<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estatísticas - MedQuest Pro</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="sidebar.js"></script> 
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; margin-left: 16rem; }
        @media (max-width: 768px) { body { margin-left: 0; } }
        .progress-bar { transition: width 1s ease-in-out; }
    </style>
</head>
<body class="bg-[#f8fafc]">

    <main class="p-10 max-w-6xl mx-auto">
        <div class="mb-10">
            <h2 class="text-3xl font-bold text-gray-800">Seu Desempenho 📊</h2>
            <p class="text-gray-500 mt-1">Análise diagnóstica de evolução clínica</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md">
                <div><p class="text-[9px] font-bold text-gray-400 uppercase mb-1">Respondidas</p><h3 id="stat-total" class="text-2xl font-black text-gray-800">...</h3></div>
                <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><i class="fas fa-tasks text-sm"></i></div>
            </div>
            
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md">
                <div><p class="text-[9px] font-bold text-gray-400 uppercase mb-1">Precisão Geral</p><h3 id="stat-precisao" class="text-2xl font-black text-blue-600">...</h3></div>
                <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><i class="fas fa-bullseye text-sm"></i></div>
            </div>

            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md">
                <div><p class="text-[9px] font-bold text-emerald-500 uppercase mb-1">Acertos Totais</p><h3 id="stat-acertos" class="text-2xl font-black text-emerald-600">...</h3></div>
                <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><i class="fas fa-check text-sm"></i></div>
            </div>

            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md">
                <div><p class="text-[9px] font-bold text-red-500 uppercase mb-1">Questões Erradas</p><h3 id="stat-erros" class="text-2xl font-black text-red-600">...</h3></div>
                <div class="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"><i class="fas fa-times text-sm"></i></div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
                <h3 class="text-[10px] font-black text-gray-400 uppercase mb-6 tracking-widest">Estatísticas por Tema</h3>
                <div id="lista-estatisticas-temas" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p class="text-gray-400 italic text-sm py-10">Processando dados...</p>
                </div>
            </div>

            <div class="bg-red-50/40 p-6 rounded-[32px] border border-red-100 h-fit">
                <div class="flex items-center gap-2 mb-4">
                    <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <h3 class="text-[10px] font-black text-red-600 uppercase tracking-widest">Atenção Necessária</h3>
                </div>
                <p class="text-[11px] text-red-500/70 font-medium mb-6 leading-tight">Subtemas com taxa de erro superior a 25%. Priorize estes estudos.</p>
                
                <div id="grafico-melhoria" class="space-y-5">
                    </div>
            </div>
        </div>
    </main>

    <script src="medquest-core.js"></script>
    <script>
        window.onload = () => {
            // Chamar a função unificada que lida com todos os dados
            carregarEstatisticasDetalhadas(); 
        };
    </script>
</body>
</html>
