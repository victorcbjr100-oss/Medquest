<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MedQuest - Meu Perfil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="sidebar.js"></script>
    <style>
        main { margin-left: 16rem; }
        @media (max-width: 768px) { main { margin-left: 0; } }
    </style>
</head>
<body class="bg-[#f8fafc]">
    <main class="p-4 md:p-10">
        <div class="max-w-xl mx-auto bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-blue-600 p-8 text-white text-center">
                <div class="relative inline-block">
                    <div id="preview-avatar" class="w-24 h-24 bg-blue-500 rounded-3xl border-4 border-white/20 mx-auto flex items-center justify-center text-3xl font-bold overflow-hidden shadow-inner">
                        V
                    </div>
                    <label class="absolute -bottom-2 -right-2 bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform border-2 border-blue-50">
                        <i class="fas fa-camera text-sm"></i>
                        <input type="file" id="input-foto" class="hidden" accept="image/*">
                    </label>
                </div>
                <h2 class="mt-4 font-black text-xl">Configurações de Perfil</h2>
                <p class="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-80">Dr. Victor</p>
            </div>

            <form id="form-perfil" class="p-8 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="col-span-2">
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Nome Completo</label>
                        <input type="text" id="nome" required class="w-full bg-gray-50 border-none rounded-xl p-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Dr. Victor Hugo">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Data de Nascimento</label>
                        <input type="date" id="nascimento" class="w-full bg-gray-50 border-none rounded-xl p-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ano de Formatura</label>
                        <input type="number" id="formatura" class="w-full bg-gray-50 border-none rounded-xl p-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: 2025">
                    </div>

                    <div class="col-span-2">
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Categoria Profissional</label>
                        <select id="categoria" class="w-full bg-gray-50 border-none rounded-xl p-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                            <option value="Aluno">Aluno</option>
                            <option value="Residente">Residente</option>
                            <option value="Especialista">Especialista</option>
                        </select>
                    </div>
                </div>

                <button type="submit" class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95">
                    Salvar Alterações
                </button>
                
                <button type="button" onclick="window.history.back()" class="w-full text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-gray-600 transition-colors">
                    Cancelar e Voltar
                </button>
            </form>
        </div>
    </main>

    <script>
        const form = document.getElementById('form-perfil');
        const inputFoto = document.getElementById('input-foto');
        const preview = document.getElementById('preview-avatar');

        // 1. CARREGAR DADOS SALVOS
        const carregarPerfil = () => {
            const dadosSalvos = JSON.parse(localStorage.getItem('medquest_perfil')) || {};
            
            if(dadosSalvos.nome) document.getElementById('nome').value = dadosSalvos.nome;
            if(dadosSalvos.nascimento) document.getElementById('nascimento').value = dadosSalvos.nascimento;
            if(dadosSalvos.formatura) document.getElementById('formatura').value = dadosSalvos.formatura;
            if(dadosSalvos.categoria) document.getElementById('categoria').value = dadosSalvos.categoria;
            
            if(dadosSalvos.foto) {
                preview.innerHTML = `<img src="${dadosSalvos.foto}" class="w-full h-full object-cover">`;
            } else if (dadosSalvos.nome) {
                preview.innerText = dadosSalvos.nome.charAt(0).toUpperCase();
            }
        };

        // 2. LÓGICA DE FOTO (CORRIGIDA)
        inputFoto.addEventListener('change', function(e) {
            const file = e.target.files; // Correção: Pegar o primeiro arquivo do array
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result;
                    preview.innerHTML = `<img src="${base64}" class="w-full h-full object-cover">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // 3. SALVAR E SINCRONIZAR
        form.onsubmit = (e) => {
            e.preventDefault();
            
            const imgElement = preview.querySelector('img');
            
            const perfil = {
                nome: document.getElementById('nome').value,
                nascimento: document.getElementById('nascimento').value,
                formatura: document.getElementById('formatura').value,
                categoria: document.getElementById('categoria').value,
                foto: imgElement ? imgElement.src : null
            };

            localStorage.setItem('medquest_perfil', JSON.stringify(perfil));
            
            // Feedback visual e redirecionamento
            alert("Perfil do Dr. Victor atualizado!");
            window.location.href = 'index.html'; // Volta para a home após salvar
        };

        // Iniciar carregamento
        carregarPerfil();
    </script>
</body>
</html>
