export type Locale = "pt" | "en";

export const copy = {
  pt: {
    common: {
      brand: "Rumo",
      language: "Idioma",
      back: "Voltar",
      continue: "Continuar",
      demo: "Dados demonstrativos",
      source: "Confirma sempre na fonte oficial.",
      home: "Início",
      discover: "Descobrir",
      plan: "Plano",
      profile: "Perfil",
      verified: "Confirmado",
      estimated: "Estimado",
      unverified: "Por verificar"
    },
    landing: {
      eyebrow: "ESTUDAR FORA, COM CLAREZA",
      title: "Encontra oportunidades que fazem sentido para ti.",
      body: "Compara requisitos, percebe a compatibilidade com o teu perfil e organiza cada candidatura passo a passo.",
      stepsTitle: "Um percurso mais claro",
      steps: [
        ["01", "Conta-nos o teu ponto de partida", "Perfil académico, preferências e orçamento aproximado."],
        ["02", "Percebe o que é compatível", "Explicamos forças, limites e o que ainda precisa de confirmação."],
        ["03", "Organiza os próximos passos", "Guarda oportunidades e segue uma checklist responsável."]
      ],
      noteTitle: "Orientação, não garantia",
      note: "A Rumo não garante admissão, bolsa, financiamento ou visto.",
      cta: "Traçar o meu rumo",
      signin: "Já tens conta?",
      enter: "Entrar"
    },
    register: {
      eyebrow: "GUARDAR O TEU PERCURSO",
      title: "A tua análise está pronta para continuar.",
      body: "Cria uma conta demonstrativa para guardar esta análise e abrir o dashboard. Não introduzas informação pessoal real.",
      name: "Nome demonstrativo",
      email: "Email demonstrativo",
      password: "Palavra-passe demonstrativa",
      consent: "Li e aceito os termos demonstrativos de privacidade.",
      privacyTitle: "Os teus dados importam",
      privacy: "A versão de produção só recolherá dados após requisitos de privacidade, retenção e recuperação serem aprovados.",
      cta: "Guardar e abrir o Dashboard",
      validation: "Revê os campos assinalados para continuar.",
      required: "Este campo é obrigatório."
    },
    onboarding: {
      title: "O teu perfil",
      labels: [
        "NÍVEL ACADÉMICO",
        "OBJETIVO DE ESTUDO",
        "ÁREA DE ESTUDO",
        "DESTINOS",
        "LÍNGUAS",
        "CAPACIDADE FINANCEIRA",
        "CALENDÁRIO"
      ],
      questions: [
        "Onde estás no teu percurso académico?",
        "Que nível queres frequentar?",
        "Que área queres explorar?",
        "Onde gostarias de estudar?",
        "Que línguas consegues usar nos estudos?",
        "Que apoio poderás precisar?",
        "Quando gostarias de começar?"
      ],
      descriptions: [
        "Escolhe a opção que melhor descreve a tua situação atual.",
        "Podes ajustar esta resposta mais tarde.",
        "Usaremos esta preferência para organizar resultados demonstrativos.",
        "Os destinos iniciais são Portugal, Alemanha e Espanha.",
        "O nível declarado deverá ser confirmado conforme cada programa.",
        "Uma resposta aproximada já ajuda. Podes indicar que ainda não tens certeza.",
        "Uma indicação aproximada é suficiente para este protótipo."
      ],
      options: [
        ["A concluir o ensino secundário", "Ensino secundário concluído", "Licenciatura concluída", "Ainda não sei"],
        ["Licenciatura", "Pós-graduação", "Mestrado", "Ainda não sei"],
        ["Engenharia informática", "Gestão", "Ciências sociais", "Outra área"],
        ["Portugal", "Alemanha", "Espanha", "Ainda não sei"],
        ["Português", "Inglês", "Alemão", "Espanhol"],
        ["Até 3 000 €", "3 000 € a 7 000 €", "Mais de 7 000 €", "Ainda não sei"],
        ["Próxima entrada", "Dentro de 12 meses", "Dentro de 2 anos", "Ainda não sei"]
      ],
      funding: "Preciso ou prefiro uma bolsa ou outro financiamento.",
      estimateTitle: "Resposta aproximada",
      estimate: "Este valor será tratado como estimativa, não como informação confirmada.",
      analyse: "Analisar o meu perfil"
    },
    analysis: {
      title: "Análise do perfil",
      eyebrow: "ANÁLISE INICIAL",
      heading: "O teu ponto de partida.",
      body: "Esta análise explica o que sabemos e o que ainda precisa de confirmação. Não é uma decisão de admissão.",
      cards: [
        ["Académico", "Base compatível", "O nível pretendido e a área indicada permitem iniciar a pesquisa.", "Estimado"],
        ["Financeiro", "Bolsa importante", "O orçamento poderá limitar opções sem apoio financeiro.", "Estimado"],
        ["Línguas", "Preparação parcial", "O nível autodeclarado precisa de confirmação conforme cada programa.", "Autodeclarado"]
      ],
      verifyTitle: "Requer verificação",
      verify: "Equivalência da qualificação e requisitos específicos de cada instituição.",
      cta: "Guardar análise e continuar",
      edit: "Corrigir o meu perfil"
    },
    dashboard: {
      hello: "OLÁ, ANA",
      title: "O teu percurso",
      ready: "Perfil analisado",
      readyState: "Pronto para pesquisar",
      readyNote: "Algumas informações ainda requerem verificação.",
      next: "PRÓXIMA AÇÃO",
      discoverTitle: "Descobre oportunidades compatíveis.",
      discoverBody: "Usaremos o teu perfil para explicar por que cada oportunidade apareceu.",
      cta: "Descobrir oportunidades",
      emptyTitle: "O teu plano ainda está vazio",
      emptyBody: "Adiciona uma oportunidade para começares a organizar os próximos passos.",
      openPlan: "Abrir plano"
    },
    discovery: {
      title: "Oportunidades",
      filters: "Filtros",
      search: "Pesquisar",
      placeholder: "Engenharia informática",
      results: "Resultados para ti",
      resultNote: "A compatibilidade é uma estimativa e não garante admissão.",
      empty: "Não encontrámos oportunidades com estes critérios.",
      reset: "Limpar pesquisa",
      view: "Ver detalhes",
      opportunities: [
        ["PORTUGAL · LICENCIATURA", "Engenharia Informática", "Instituição demonstrativa A", "Boa correspondência inicial", "Área, destino e nível pretendido coincidem com o teu perfil.", "Prazo por verificar"],
        ["ALEMANHA · LICENCIATURA", "Computer Science", "Instituição demonstrativa B", "Correspondência parcial", "O requisito de língua e os custos precisam de confirmação.", "Informação incompleta"],
        ["ESPANHA · LICENCIATURA", "Ingeniería de Software", "Instituição demonstrativa C", "Possível alternativa", "A área coincide; o idioma e a equivalência ainda precisam de confirmação.", "Requisitos por verificar"]
      ]
    },
    details: {
      title: "Detalhes",
      share: "Partilhar",
      eyebrow: "DADOS DEMONSTRATIVOS · NÃO VERIFICADOS",
      program: "Engenharia Informática",
      institution: "Instituição demonstrativa A · Portugal · Licenciatura",
      matchTitle: "Boa correspondência inicial",
      match: "Coincide com a tua área, nível e destino. Isto não confirma elegibilidade ou admissão.",
      requirements: [
        ["Requisitos académicos", "Qualificação e equivalência por confirmar"],
        ["Língua", "Nível exigido por verificar"],
        ["Custos estimados", "Informação por confirmar"],
        ["Bolsa ou financiamento", "Disponibilidade por verificar"],
        ["Prazo", "Confirmar na fonte oficial"],
        ["Documentos", "Lista inicial ainda incompleta"]
      ],
      sourceTitle: "Fonte oficial necessária",
      sourceBody: "Antes de agir, confirma requisitos, custos e prazo no website oficial da instituição.",
      add: "Adicionar ao meu plano",
      added: "Ver no meu plano"
    },
    applicationPlan: {
      title: "Plano de candidatura",
      count: "1 oportunidade",
      eyebrow: "DADOS DEMONSTRATIVOS",
      program: "Engenharia Informática",
      institution: "Instituição demonstrativa A · Portugal",
      progress: "Progresso",
      tasks: "tarefas",
      progressNote: "A próxima ação depende da confirmação dos requisitos académicos.",
      taskList: [
        ["Rever os detalhes da oportunidade", "Concluído"],
        ["Confirmar elegibilidade académica", "Próxima ação · Por verificar"],
        ["Confirmar requisitos linguísticos", "Depende da fonte oficial"],
        ["Preparar documentos académicos", "Por fazer"],
        ["Confirmar prazo oficial", "Sem prazo confirmado"],
        ["Concluir o processo da instituição", "Fora da Rumo"]
      ],
      noteTitle: "Progresso ≠ verificação",
      note: "Concluir uma tarefa não transforma informação incerta em informação confirmada.",
      cta: "Atualizar próxima tarefa",
      toast: "Próxima tarefa marcada como em curso. A informação continua por verificar.",
      emptyTitle: "O teu plano ainda está vazio",
      emptyBody: "Adiciona uma oportunidade para começares a organizar os próximos passos.",
      emptyCta: "Descobrir oportunidades"
    }
  },
  en: {
    common: {
      brand: "Rumo",
      language: "Language",
      back: "Back",
      continue: "Continue",
      demo: "Demonstration data",
      source: "Always confirm with the official source.",
      home: "Home",
      discover: "Discover",
      plan: "Plan",
      profile: "Profile",
      verified: "Confirmed",
      estimated: "Estimated",
      unverified: "Verify"
    },
    landing: {
      eyebrow: "STUDY ABROAD, WITH CLARITY",
      title: "Find opportunities that make sense for you.",
      body: "Compare requirements, understand how an opportunity fits your profile, and organise each application step by step.",
      stepsTitle: "A clearer path",
      steps: [
        ["01", "Tell us where you are starting", "Academic profile, preferences, and an approximate budget."],
        ["02", "Understand what may fit", "We explain strengths, limits, and what still needs confirmation."],
        ["03", "Organise the next steps", "Save opportunities and follow a responsible checklist."]
      ],
      noteTitle: "Guidance, not a guarantee",
      note: "Rumo does not guarantee admission, scholarships, funding, or visas.",
      cta: "Map my route",
      signin: "Already have an account?",
      enter: "Sign in"
    },
    register: {
      eyebrow: "SAVE YOUR ROUTE",
      title: "Your analysis is ready to continue.",
      body: "Create a demonstration account to save this analysis and open the dashboard. Do not enter real personal information.",
      name: "Demonstration name",
      email: "Demonstration email",
      password: "Demonstration password",
      consent: "I accept the demonstration privacy terms.",
      privacyTitle: "Your data matters",
      privacy: "A production version will only collect data after privacy, retention, and recovery requirements are approved.",
      cta: "Save and open Dashboard",
      validation: "Review the highlighted fields to continue.",
      required: "This field is required."
    },
    onboarding: {
      title: "Your profile",
      labels: ["ACADEMIC LEVEL", "STUDY GOAL", "STUDY AREA", "DESTINATIONS", "LANGUAGES", "FINANCIAL CAPACITY", "TIMELINE"],
      questions: [
        "Where are you in your academic journey?",
        "What level would you like to study?",
        "Which area would you like to explore?",
        "Where would you like to study?",
        "Which languages can you use for study?",
        "What support might you need?",
        "When would you like to start?"
      ],
      descriptions: [
        "Choose the option that best describes your current situation.",
        "You can update this answer later.",
        "We will use this preference to organise demonstration results.",
        "The initial destinations are Portugal, Germany, and Spain.",
        "Your stated level must be confirmed for each programme.",
        "An approximate answer is useful. You can say that you are not sure yet.",
        "An approximate indication is enough for this prototype."
      ],
      options: [
        ["Finishing secondary school", "Secondary school completed", "Bachelor's degree completed", "Not sure yet"],
        ["Bachelor's degree", "Postgraduate programme", "Master's degree", "Not sure yet"],
        ["Computer engineering", "Management", "Social sciences", "Another area"],
        ["Portugal", "Germany", "Spain", "Not sure yet"],
        ["Portuguese", "English", "German", "Spanish"],
        ["Up to €3,000", "€3,000 to €7,000", "More than €7,000", "Not sure yet"],
        ["Next intake", "Within 12 months", "Within 2 years", "Not sure yet"]
      ],
      funding: "I need or prefer a scholarship or another form of funding.",
      estimateTitle: "Approximate answer",
      estimate: "This value will be treated as an estimate, not confirmed information.",
      analyse: "Analyse my profile"
    },
    analysis: {
      title: "Profile analysis",
      eyebrow: "INITIAL ANALYSIS",
      heading: "Your starting point.",
      body: "This analysis explains what we know and what still needs confirmation. It is not an admission decision.",
      cards: [
        ["Academic", "Compatible basis", "Your intended level and chosen area allow you to begin researching.", "Estimated"],
        ["Financial", "Scholarship important", "Your budget may limit options without financial support.", "Estimated"],
        ["Languages", "Partly prepared", "Your self-reported level must be confirmed for each programme.", "Self-reported"]
      ],
      verifyTitle: "Requires verification",
      verify: "Qualification equivalence and institution-specific requirements.",
      cta: "Save analysis and continue",
      edit: "Correct my profile"
    },
    dashboard: {
      hello: "HELLO, ANA",
      title: "Your journey",
      ready: "Profile analysed",
      readyState: "Ready to explore",
      readyNote: "Some information still needs verification.",
      next: "NEXT ACTION",
      discoverTitle: "Discover opportunities that may fit.",
      discoverBody: "We will use your profile to explain why each opportunity appeared.",
      cta: "Discover opportunities",
      emptyTitle: "Your plan is still empty",
      emptyBody: "Add an opportunity to begin organising your next steps.",
      openPlan: "Open plan"
    },
    discovery: {
      title: "Opportunities",
      filters: "Filters",
      search: "Search",
      placeholder: "Computer engineering",
      results: "Results for you",
      resultNote: "Compatibility is an estimate and does not guarantee admission.",
      empty: "We did not find opportunities matching these criteria.",
      reset: "Clear search",
      view: "View details",
      opportunities: [
        ["PORTUGAL · BACHELOR'S", "Computer Engineering", "Demonstration institution A", "Strong initial match", "Area, destination, and intended level align with your profile.", "Deadline to verify"],
        ["GERMANY · BACHELOR'S", "Computer Science", "Demonstration institution B", "Partial match", "Language requirements and costs need confirmation.", "Incomplete information"],
        ["SPAIN · BACHELOR'S", "Software Engineering", "Demonstration institution C", "Possible alternative", "The area aligns; language and equivalence still need confirmation.", "Requirements to verify"]
      ]
    },
    details: {
      title: "Details",
      share: "Share",
      eyebrow: "DEMONSTRATION DATA · NOT VERIFIED",
      program: "Computer Engineering",
      institution: "Demonstration institution A · Portugal · Bachelor's",
      matchTitle: "Strong initial match",
      match: "It aligns with your area, level, and destination. This does not confirm eligibility or admission.",
      requirements: [
        ["Academic requirements", "Qualification and equivalence to confirm"],
        ["Language", "Required level to verify"],
        ["Estimated costs", "Information to confirm"],
        ["Scholarship or funding", "Availability to verify"],
        ["Deadline", "Confirm with the official source"],
        ["Documents", "Initial list is still incomplete"]
      ],
      sourceTitle: "Official source required",
      sourceBody: "Before acting, confirm requirements, costs, and the deadline on the institution's official website.",
      add: "Add to my plan",
      added: "View in my plan"
    },
    applicationPlan: {
      title: "Application plan",
      count: "1 opportunity",
      eyebrow: "DEMONSTRATION DATA",
      program: "Computer Engineering",
      institution: "Demonstration institution A · Portugal",
      progress: "Progress",
      tasks: "tasks",
      progressNote: "The next action depends on confirming the academic requirements.",
      taskList: [
        ["Review the opportunity details", "Completed"],
        ["Confirm academic eligibility", "Next action · To verify"],
        ["Confirm language requirements", "Depends on the official source"],
        ["Prepare academic documents", "To do"],
        ["Confirm the official deadline", "No confirmed deadline"],
        ["Complete the institution's process", "Outside Rumo"]
      ],
      noteTitle: "Progress ≠ verification",
      note: "Completing a task does not turn uncertain information into confirmed information.",
      cta: "Update next task",
      toast: "Next task marked in progress. The information still needs verification.",
      emptyTitle: "Your plan is still empty",
      emptyBody: "Add an opportunity to begin organising your next steps.",
      emptyCta: "Discover opportunities"
    }
  }
} as const;

export type Copy = (typeof copy)[Locale];
