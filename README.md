# CineMatch

## Visão Geral do Projeto

O **CineMatch** é uma aplicação web para explorar e descobrir filmes. Com ela, o usuário pode:

- **Pesquisar** títulos
- **Visualizar detalhes** de cada filme
- **Filtrar** por gênero
- **Gerenciar listas de favoritos**

O projeto foi pensado para ser **limpo**, **manutenível** e **escalável**, seguindo conceitos de **arquitetura limpa** e aplicando os princípios **SOLID** e **GRASP**.

---

## Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface
- **TypeScript**: Tipagem estática para maior segurança e previsibilidade
- **Tailwind CSS**: Framework de utilitários para estilização rápida e responsiva
- **Axios**: Cliente HTTP para requisições à API
- **The Movie Database (TMDb) API**: Fonte de dados sobre filmes
- **Lucide React**: Biblioteca de ícones leves e personalizáveis

---

## Princípios de Design Aplicados

### SOLID

1. **Single Responsibility Principle (SRP)**  
   Cada módulo tem uma única responsabilidade.  
   - **Exemplo**:  
     - `src/services/api.ts` só faz comunicação com a API TMDb.  
     - `src/components/MovieCard.tsx` só se preocupa em exibir um cartão de filme.  
     - `src/hooks/useMovies.ts` só gerencia a lógica de busca e estado dos filmes.

2. **Open/Closed Principle (OCP)**  
   O código deve estar aberto para extensão, mas fechado para modificação.  
   - **Exemplo**:  
     - Você pode estender `useMovies` para adicionar novos filtros de busca sem alterar sua implementação original.

3. **Dependency Inversion Principle (DIP)**  
   Módulos de alto nível dependem de abstrações, não de implementações concretas.  
   - **Exemplo**:  
     - `useMovies.ts` depende de uma interface `movieService`, não diretamente de `axios` ou de detalhes da API.

### GRASP

1. **Information Expert**  
   Atribuir responsabilidade a quem possui a informação.  
   - **Exemplo**:  
     - `src/services/api.ts` é o expert em obter dados da TMDb.  
     - `MovieCard` sabe como formatar e exibir os dados de um filme.

2. **Controller**  
   Objeto que recebe eventos do sistema e delega responsabilidades.  
   - **Exemplo**:  
     - O hook `useMovies` atua como controller: recebe parâmetros de busca, gerencia o estado e chama o `movieService`.

3. **High Cohesion**  
   Manter responsabilidades relacionadas dentro de um mesmo módulo.  
   - **Exemplo**:  
     - Todas as funções de requisição passam por `api.ts`.  
     - Toda lógica de gerenciamento de filmes fica em `useMovies.ts`.

4. **Low Coupling**  
   Minimizar dependências diretas entre módulos.  
   - **Exemplo**:  
     - `MovieCard` recebe dados e handlers via props/hooks, sem acessar diretamente serviços externos.

5. **Pure Fabrication**  
   Classes criadas para manter alta coesão e baixo acoplamento, sem representar conceitos do domínio.  
   - **Exemplo**:  
     - `src/services/api.ts` não existe no domínio “filme”, mas isolar chamadas HTTP melhora a estrutura.

6. **Protected Variations**  
   Proteger partes do sistema contra mudanças em elementos externos.  
   - **Exemplo**:  
     - `api.ts` encapsula detalhes da TMDb, permitindo ajustar endpoints ou parâmetros sem afetar todo o app.  
     - `src/types/movie.ts` define os tipos esperados, isolando variações na resposta da API.

---

## Como Rodar o Projeto

1. **Clone** este repositório e descompacte, se necessário.  
2. Abra o terminal dentro da pasta do projeto:  
   ```bash
   
   cd CineMatch
3. Instale as dependencias:
   ```bash
   
   npm install
4. Configure sua chave de API do TMDb:
   - Obtenha uma em https://www.themoviedb.org/
   - No arquivo src/services/api.ts, substitua:
   ```bash
   
   const API_KEY = '08dfe5a9ea656f4ff8ebd16c13db5b2f';
5. Inicie o servidor de desenvolvimento:
   ```bash
   
   npm run dev
6. Abra no navegador em:
   ```bash
   
   http://localhost:5173
