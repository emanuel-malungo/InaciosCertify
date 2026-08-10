# System Design — Inácios Certify
## Identidade visual e conceito do evento “Portfólio Comunique — Imagem como Património”

> Documento de referência para orientar o design visual, UX/UI e implementação do sistema de emissão e validação de certificados digitais associado ao evento.

---

## 1. Objetivo deste documento

Este documento traduz a identidade visual, o conceito editorial e a linguagem visual observada no material institucional do evento para um **Design System aplicável à plataforma tecnológica de certificados digitais**.

A plataforma não deve parecer um produto tecnológico genérico. Ela deve transmitir a mesma percepção institucional do evento:

- profissional;
- elegante;
- corporativa;
- humana;
- contemporânea;
- premium;
- ligada à comunicação e reputação;
- com forte presença visual feminina e africana;
- sofisticada sem ser excessivamente complexa.

A interface deve funcionar como uma extensão digital da experiência do evento.

---

# 2. Identidade do evento

## Nome principal

**Portfólio Comunique**

## Tema

**Imagem como Património**

## Marca/evento visual observado

**Ekanda**

## Conceito central

O conceito apresentado no material parte da ideia de que:

> A imagem de uma pessoa não é apenas aparência. É um ativo construído ao longo do tempo que influencia a forma como essa pessoa é vista, tratada e valorizada, afetando credibilidade, oportunidades e posicionamento na vida pessoal, social e profissional.

O evento aborda a imagem como um património multidimensional.

---

# 3. Conceito temático

O evento trabalha a imagem através de diferentes perspectivas:

- reputação;
- credibilidade;
- comunicação;
- presença;
- posicionamento;
- desenvolvimento pessoal;
- profissionalismo;
- empreendedorismo;
- oportunidades;
- relacionamento social;
- marca pessoal.

A proposta editorial apresenta diferentes especialistas contribuindo com perspectivas específicas sobre como a imagem influencia a vida das pessoas.

## Mensagem principal

**Imagem é património.**

Não deve ser interpretada apenas como estética ou aparência física.

A imagem é apresentada como:

```text
Imagem
   ↓
Percepção
   ↓
Credibilidade
   ↓
Posicionamento
   ↓
Relacionamentos
   ↓
Oportunidades
   ↓
Património pessoal e profissional
```

---

# 4. Posicionamento do produto tecnológico

O sistema de certificados deve ser percebido como parte da experiência institucional do evento.

Não deve parecer:

- um painel administrativo genérico;
- uma ferramenta escolar;
- uma plataforma de RH;
- um sistema financeiro;
- um SaaS excessivamente técnico.

Deve parecer:

**uma solução digital corporativa para formalizar e valorizar a participação no evento.**

A experiência deve transmitir:

> “A participação neste evento foi registrada, reconhecida e transformada em uma credencial digital verificável.”

---

# 5. Personalidade visual

A personalidade visual recomendada é:

### Premium

Espaços amplos, tipografia forte, imagens bem posicionadas e poucos elementos concorrendo pela atenção.

### Institucional

Hierarquia clara, informações organizadas e aparência confiável.

### Humana

Fotografia de pessoas, rostos, expressões naturais e representação profissional.

### Editorial

A interface deve lembrar uma publicação corporativa ou apresentação institucional sofisticada.

### Contemporânea

Uso de cards arredondados, sombras discretas, grids, espaços em branco e componentes digitais modernos.

### Africana e local

A identidade deve preservar a presença visual, cultural e profissional observada no material do evento, sem transformar a interface em um estereótipo cultural.

---

# 6. Paleta de cores

A imagem apresenta como cor dominante um vermelho queimado/vermelho institucional, combinado com branco, off-white, tons dourados/amarronzados e preto/cinza escuro.

As cores abaixo são referências aproximadas extraídas visualmente do material e devem ser refinadas posteriormente a partir dos ficheiros oficiais da marca.

## 6.1 Vermelho institucional

```text
Primary
HEX: #A62400
RGB: 166, 36, 0
```

Uso:

- títulos;
- headings;
- botões principais;
- linhas divisórias;
- badges;
- indicadores;
- elementos de destaque;
- ações principais.

Esta deve ser a cor de identidade mais importante da plataforma.

---

## 6.2 Vermelho vibrante

```text
Accent
HEX: #DA2F01
RGB: 218, 47, 1
```

Uso:

- hover;
- gradientes muito discretos;
- destaques;
- indicadores de atenção;
- elementos promocionais;
- estados ativos.

Não utilizar como cor dominante em grandes áreas de conteúdo.

---

## 6.3 Branco

```text
White
HEX: #FFFFFF
```

Uso:

- fundo principal;
- cards;
- modais;
- certificados;
- áreas de conteúdo.

---

## 6.4 Off-white

```text
Surface
HEX: #FAF8F5
```

Uso:

- background secundário;
- páginas institucionais;
- áreas de destaque;
- áreas do dashboard.

A interface deve evitar depender exclusivamente de branco puro.

---

## 6.5 Bege claro

```text
Warm Surface
HEX: #F3EEE7
```

Uso:

- backgrounds secundários;
- cards especiais;
- áreas relacionadas à identidade visual;
- estados neutros.

---

## 6.6 Dourado / Taupe

A identidade apresenta tons dourados e castanho-claro associados à fotografia, vestuário e elementos de marca.

Referência:

```text
Gold
HEX: #B38A5A
```

Uso:

- detalhes;
- pequenos ícones;
- bordas decorativas;
- elementos premium;
- divisores;
- detalhes do certificado.

Não usar como cor primária da aplicação.

---

## 6.7 Texto principal

```text
Ink
HEX: #252321
```

Uso:

- títulos secundários;
- textos;
- tabelas;
- informações do evento.

---

## 6.8 Texto secundário

```text
Muted
HEX: #746F6A
```

Uso:

- descrições;
- labels;
- metadados;
- timestamps;
- informações auxiliares.

---

# 7. Tokens de cor recomendados

```ts
const colors = {
  primary: "#A62400",
  primaryHover: "#8E2000",
  accent: "#DA2F01",

  gold: "#B38A5A",

  background: "#FFFFFF",
  backgroundSoft: "#FAF8F5",
  surfaceWarm: "#F3EEE7",

  text: "#252321",
  textMuted: "#746F6A",

  border: "#E8E1DA",

  success: "#287A4B",
  warning: "#B7791F",
  error: "#B42318",

  white: "#FFFFFF",
};
```

Os valores de sucesso, aviso e erro são funcionais e podem ser utilizados como cores semânticas independentes da identidade principal.

---

# 8. Regra de uso das cores

A proporção visual recomendada:

```text
60% — Branco / Off-white
20% — Texto / neutros
15% — Vermelho institucional
5%  — Dourado / acentos
```

O vermelho deve ser usado para **direcionar atenção**, não para preencher toda a interface.

Evitar:

- páginas inteiramente vermelhas;
- excesso de gradientes;
- muitos botões vermelhos;
- texto longo em vermelho;
- fundos vermelhos atrás de grandes blocos de texto.

---

# 9. Elemento gráfico principal — linhas onduladas

Um dos elementos mais importantes da identidade visual é o padrão de linhas curvas/onduladas presente no fundo das páginas.

Visualmente:

```text
)))))))))))))))))))
)))))))))))))))))))
)))))))))))))))))))
```

As linhas são:

- finas;
- suaves;
- orgânicas;
- de baixa opacidade;
- geralmente cinza muito claro;
- utilizadas sobre branco/off-white.

## Significado visual

O padrão transmite:

- movimento;
- continuidade;
- fluidez;
- comunicação;
- conexão;
- sofisticação.

## Implementação

Pode ser feito através de:

1. SVG;
2. CSS background;
3. pseudo-elementos;
4. asset oficial da marca.

### Recomendação

Usar SVG para obter melhor qualidade e controle.

Exemplo conceitual:

```css
background-image: url("/patterns/waves.svg");
background-repeat: no-repeat;
background-position: center;
background-size: cover;
```

A opacidade deve ser baixa.

O padrão nunca deve prejudicar a leitura.

---

# 10. Linhas divisórias vermelhas

O material utiliza linhas vermelhas horizontais para separar grandes blocos.

No sistema, esse elemento pode ser utilizado em:

- header institucional;
- rodapé;
- certificado;
- páginas públicas;
- seções especiais.

Características:

- espessura moderada;
- vermelho institucional;
- largura controlada;
- nunca deve dominar a interface.

---

# 11. Tipografia

A identidade utiliza títulos em caixa alta, fortes e de alto impacto.

## Títulos

Características:

- sans-serif;
- peso elevado;
- caixa alta;
- espaçamento compacto;
- forte contraste;
- cor vermelha.

Exemplo:

```text
PORTFÓLIO
COMUNIQUE
```

## Fonte recomendada

Caso a fonte oficial não esteja disponível:

**Montserrat**

ou:

**Inter**

### Recomendação

Usar:

```text
Headings: Montserrat
Body: Inter
```

Alternativamente, utilizar somente Inter para manter o produto tecnológico consistente.

---

# 12. Escala tipográfica

```text
Display: 48–64px
H1:      36–44px
H2:      28–32px
H3:      22–24px
H4:      18–20px

Body:    15–16px
Small:   13–14px
Caption: 12px
```

Em mobile:

```text
Display: 32–40px
H1:      28–32px
H2:      24–28px
H3:      20–22px
Body:    15–16px
```

---

# 13. Hierarquia visual

Prioridade:

```text
1. Título
2. Informação principal
3. Ação principal
4. Informação secundária
5. Metadados
```

Evitar interfaces em que todos os elementos tenham o mesmo peso.

---

# 14. Fotografia

A apresentação utiliza fotografia profissional como componente importante da identidade.

Características observadas:

- retratos profissionais;
- pessoas em poses institucionais;
- fundo limpo;
- roupas profissionais;
- expressão confiante;
- forte presença humana;
- diversidade de perfis profissionais.

## Uso na plataforma

A fotografia pode aparecer:

- landing/login;
- página pública do evento;
- certificado;
- página institucional;
- áreas promocionais.

No dashboard administrativo, a fotografia deve ser muito mais discreta.

---

# 15. Tratamento das imagens

As imagens devem possuir:

- alta qualidade;
- fundo limpo;
- recorte profissional;
- iluminação consistente.

Preferir:

```text
object-fit: cover
```

para fotos em cards.

Para recortes institucionais:

```text
object-fit: contain
```

---

# 16. Bordas e radius

A identidade mistura elementos retos editoriais com cards arredondados.

### Cards

```text
border-radius: 16px
```

### Botões

```text
border-radius: 10px
```

### Inputs

```text
border-radius: 10px
```

### Badges

```text
border-radius: 999px
```

Evitar excesso de arredondamento em elementos que devem parecer institucionais.

---

# 17. Sombras

Usar sombras muito discretas.

```css
box-shadow:
  0 4px 20px rgba(37, 35, 33, 0.06);
```

Não utilizar sombras pesadas.

A sensação desejada é:

**leveza + sofisticação.**

---

# 18. Layout

O material possui uma estrutura editorial muito clara:

```text
┌──────────────────────────┐
│ LOGO                     │
│                          │
│ TÍTULO                   │
│ Subtítulo                │
│                          │
│ Imagem                   │
├──────────────────────────┤
│ CONTEÚDO                 │
│ Texto + imagem           │
├──────────────────────────┤
│ DESTAQUES                │
│ Card Card Card            │
├──────────────────────────┤
│ CONTEÚDO                 │
└──────────────────────────┘
```

A aplicação deve transformar isso em uma linguagem de dashboard moderna.

---

# 19. Grid

Desktop:

```text
max-width: 1280px
padding: 24–40px
```

Grid:

```text
12 colunas
gap: 24px
```

Tablet:

```text
8 colunas
```

Mobile:

```text
4 colunas
```

---

# 20. Espaçamento

Base:

```text
4px
```

Escala:

```text
4
8
12
16
20
24
32
40
48
64
80
```

Preferir múltiplos consistentes.

---

# 21. Botões

## Primary

```text
background: #A62400
color: #FFFFFF
```

Exemplo:

```text
Emitir certificado
```

## Secondary

```text
background: transparent
border: 1px solid #A62400
color: #A62400
```

## Ghost

```text
background: transparent
color: #A62400
```

## Destructive

Utilizar vermelho semântico mais escuro somente para ações críticas como revogar.

---

# 22. Componentes principais

O Design System deve possuir:

- Button;
- Input;
- Select;
- DatePicker;
- SearchInput;
- Badge;
- Card;
- Modal;
- Dialog;
- Dropdown;
- Table;
- Pagination;
- Tabs;
- Toast;
- Alert;
- EmptyState;
- Skeleton;
- Avatar;
- Breadcrumb;
- PageHeader;
- StatCard;
- CertificateCard;
- ParticipantCard;
- QRCodePreview;
- CertificatePreview.

---

# 23. Dashboard

O dashboard deve utilizar a linguagem visual do evento sem parecer uma apresentação PowerPoint.

## Estrutura

```text
┌────────────────────────────────────────────┐
│ Logo                    Utilizador         │
├─────────────┬──────────────────────────────┤
│ Dashboard   │                              │
│ Eventos     │ Bem-vindo                    │
│ Particip.   │                              │
│ Presença    │ [Eventos] [Participantes]    │
│ Certificados│ [Emitidos] [Pendentes]       │
│             │                              │
│ Configurações│ Atividade recente           │
└─────────────┴──────────────────────────────┘
```

---

# 24. Sidebar

A sidebar deve ser minimalista.

Itens:

```text
Dashboard

EVENTO
├── Eventos
├── Participantes
└── Presenças

CERTIFICADOS
├── Certificados
└── Templates

SISTEMA
├── Utilizadores
└── Configurações
```

---

# 25. Dashboard do evento

A página do evento deve ser o centro operacional.

## Header

```text
Portfólio Comunique
Imagem como Património

15 Agosto 2026
Local do evento
```

## Métricas

```text
┌──────────────┐
│ Participantes│
│     500      │
└──────────────┘

┌──────────────┐
│ Presentes    │
│     487      │
└──────────────┘

┌──────────────┐
│ Certificados │
│     480      │
└──────────────┘
```

---

# 26. Participantes

A tabela deve ser limpa.

Colunas:

```text
Código
Nome
Email
Tipo
Presença
Certificado
Ações
```

Status visual:

```text
PRESENTE      → badge verde
PENDENTE      → badge neutro
AUSENTE       → badge vermelho
EMITIDO       → badge verde
NÃO EMITIDO   → badge neutro
REVOGADO      → badge vermelho
```

---

# 27. Experiência de presença

Durante o evento, a interface deve ser extremamente rápida.

Tela:

```text
REGISTAR PRESENÇA

[ Pesquisar código ou nome ]

EVT-000182

João Manuel
Participante

[ MARCAR COMO PRESENTE ]
```

Após sucesso:

```text
✓ PRESENÇA REGISTRADA

João Manuel
EVT-000182
```

A operação deve exigir o menor número possível de cliques.

---

# 28. Certificado digital

O certificado é o componente visual mais importante do produto.

Deve seguir fortemente a identidade do evento.

## Estrutura

```text
┌───────────────────────────────────────────────┐
│                 EKANDA                        │
│                                               │
│              CERTIFICADO                      │
│                                               │
│           DE PARTICIPAÇÃO                     │
│                                               │
│        Certificamos que                       │
│                                               │
│             JOÃO MANUEL                       │
│                                               │
│ participou do evento                          │
│                                               │
│         PORTFÓLIO COMUNIQUE                   │
│         “IMAGEM COMO PATRIMÓNIO”              │
│                                               │
│ realizado em [DATA], em [LOCAL].              │
│                                               │
│ Carga horária: [X] horas                      │
│                                               │
│                                               │
│ Assinatura                  QR CODE           │
│                                               │
│ Certificado: CERT-2026-000001                │
└───────────────────────────────────────────────┘
```

---

# 29. Identidade visual do certificado

O certificado deve utilizar:

- branco/off-white;
- linhas onduladas;
- vermelho institucional;
- detalhes dourados;
- logo oficial;
- tipografia editorial;
- QR Code;
- assinatura;
- número do certificado.

Evitar:

- excesso de cores;
- gradients fortes;
- designs genéricos de certificado;
- excesso de ícones;
- aparência escolar.

---

# 30. Página pública de validação

Esta página é importante porque representa o sistema para qualquer pessoa que escanear o QR Code.

## Estado válido

```text
✓ CERTIFICADO VÁLIDO

Portfólio Comunique
Imagem como Património

João Manuel

Participação confirmada

15 de Agosto de 2026
Luanda

Carga horária: 8 horas

CERT-2026-000001

[Visualizar certificado]
```

Visual:

- fundo off-white;
- padrão ondulado;
- card branco;
- borda discreta;
- vermelho institucional;
- QR/ícone de validação;
- selo visual de autenticidade.

---

# 31. Estado inválido

```text
CERTIFICADO NÃO ENCONTRADO

O código informado não corresponde
a um certificado válido no sistema.
```

Não utilizar linguagem técnica como:

```text
Firestore document not found
```

---

# 32. Estado revogado

```text
CERTIFICADO REVOGADO

Este certificado foi invalidado
pela organização responsável.

Código:
CERT-2026-000001
```

---

# 33. Microcopy

A linguagem do sistema deve ser:

- profissional;
- clara;
- humana;
- curta;
- institucional.

Evitar termos excessivamente técnicos.

### Bom

```text
Certificado emitido com sucesso.
```

### Evitar

```text
Certificate entity successfully persisted.
```

---

# 34. Mensagens de sucesso

Exemplos:

```text
Evento criado com sucesso.

Participante adicionado com sucesso.

Presença registrada com sucesso.

Certificado emitido com sucesso.

Certificado revogado com sucesso.
```

---

# 35. Mensagens de erro

Devem explicar o problema e a ação necessária.

Exemplo:

```text
Não foi possível emitir o certificado.

O participante ainda não possui presença
confirmada.
```

---

# 36. Estados de interface

Todos os componentes precisam considerar:

```text
DEFAULT
HOVER
FOCUS
ACTIVE
DISABLED
LOADING
SUCCESS
ERROR
EMPTY
```

---

# 37. Acessibilidade

O sistema deve:

- possuir contraste adequado;
- usar labels reais;
- suportar navegação por teclado;
- possuir foco visível;
- não depender apenas de cor para comunicar status;
- utilizar `alt` nas imagens;
- manter tamanho adequado de texto.

---

# 38. Responsividade

## Mobile

Prioridade:

```text
Presença
Consulta
Validação
Certificado
```

## Desktop

Prioridade:

```text
Gestão
Dashboard
Tabelas
Importação
Configuração
```

A página pública de validação deve ser **mobile-first**.

---

# 39. Identidade visual x tecnologia

O sistema será desenvolvido em:

```text
Next.js
TypeScript
Tailwind CSS
Firebase Auth
Firestore
```

A tecnologia deve ficar invisível para o usuário.

A interface deve comunicar:

```text
Evento
↓
Profissionalismo
↓
Reconhecimento
↓
Credibilidade
```

e não:

```text
Tecnologia
↓
Banco de dados
↓
Administração
```

---

# 40. Diretrizes específicas para Next.js

Estrutura visual recomendada:

```text
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── participants/
│   │   ├── attendance/
│   │   ├── certificates/
│   │   └── settings/
│   │
│   └── verify/
│       └── [verificationCode]/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   └── certificate/
│
├── features/
│   ├── events/
│   ├── participants/
│   ├── attendance/
│   ├── certificates/
│   └── auth/
│
├── lib/
│   ├── firebase/
│   ├── pdf/
│   └── qr/
│
├── styles/
│   └── tokens.css
│
└── types/
```

---

# 41. Design Tokens

Exemplo:

```css
:root {
  --color-primary: #A62400;
  --color-primary-hover: #8E2000;
  --color-accent: #DA2F01;

  --color-gold: #B38A5A;

  --color-background: #FFFFFF;
  --color-background-soft: #FAF8F5;
  --color-surface-warm: #F3EEE7;

  --color-text: #252321;
  --color-text-muted: #746F6A;

  --color-border: #E8E1DA;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

---

# 42. Logo

O logo da organização/evento deve ser tratado como asset institucional.

Estrutura:

```text
/public
├── brand/
│   ├── logo.svg
│   ├── logo-dark.svg
│   ├── logo-light.svg
│   └── favicon.svg
│
├── patterns/
│   └── waves.svg
│
└── images/
```

Nunca recriar o logo via texto.

Utilizar o ficheiro oficial fornecido pela organização.

---

# 43. Fotografia e assets

Estrutura:

```text
/public/images/event/
├── hero.webp
├── speaker-01.webp
├── speaker-02.webp
├── speaker-03.webp
└── ...
```

Sempre que possível:

- WebP;
- dimensões otimizadas;
- `next/image`;
- `priority` somente para imagens críticas;
- lazy loading nas demais.

---

# 44. Uso de patrocinadores

Os patrocinadores apresentados no material são parte da comunicação do evento.

No sistema, seus logotipos só devem aparecer se houver autorização e assets oficiais.

Áreas possíveis:

- página pública do evento;
- footer;
- página institucional;
- certificado, somente se previsto pela organização.

Não inserir automaticamente todos os patrocinadores no dashboard administrativo.

---

# 45. Uso das fotografias das pessoas

As fotografias apresentadas no documento devem ser consideradas **assets institucionais**.

Não devem ser reutilizadas no sistema sem que os arquivos e direitos de uso sejam disponibilizados pela organização.

Para desenvolvimento inicial:

```text
placeholder / imagem genérica
```

Pode ser usada até os assets oficiais serem fornecidos.

---

# 46. Experiência geral

A experiência ideal é:

```text
Entrar
  ↓
Ver evento
  ↓
Gerir participantes
  ↓
Confirmar presença
  ↓
Emitir certificado
  ↓
Baixar PDF
  ↓
QR Code
  ↓
Validar online
```

Cada etapa deve ser simples e rápida.

---

# 47. Princípios de UX

## 1. Clareza

O usuário sempre deve saber o que está acontecendo.

## 2. Rapidez

Operações durante o evento devem exigir poucos cliques.

## 3. Confiança

Informações críticas devem possuir confirmação.

## 4. Elegância

O sistema deve parecer parte do evento.

## 5. Consistência

O vermelho, padrão ondulado, tipografia e espaçamento devem ser consistentes.

## 6. Não exagerar

A identidade visual deve ser preservada sem transformar o dashboard em um cartaz.

---

# 48. O que NÃO fazer

Evitar:

- interface completamente vermelha;
- excesso de gradientes;
- glassmorphism;
- neon;
- excesso de animações;
- cards gigantes;
- sombras pesadas;
- excesso de ícones;
- dashboards visualmente carregados;
- fontes decorativas;
- muitos estilos diferentes;
- copiar literalmente cada página do portfólio para a aplicação.

O objetivo é **interpretar a identidade**, não transformar a aplicação em uma cópia do PDF.

---

# 49. Motion Design

As animações devem ser discretas.

Usar:

```text
fade
slide
scale
```

com duração aproximada:

```text
150ms – 250ms
```

Exemplos:

- abertura de modal;
- entrada de cards;
- mudança de estado;
- toast;
- geração de certificado.

Evitar animações contínuas ou chamativas.

---

# 50. Iconografia

Utilizar uma biblioteca consistente, por exemplo:

**Lucide Icons**

Características:

- line icons;
- simples;
- discretos;
- espessura consistente.

Não misturar várias bibliotecas de ícones.

---

# 51. Sistema de status

```text
PRESENTE
→ verde

PENDENTE
→ cinza

AUSENTE
→ vermelho

CERTIFICADO EMITIDO
→ verde

REVOGADO
→ vermelho

EVENTO ATIVO
→ vermelho institucional

EVENTO CONCLUÍDO
→ neutro/verde
```

O status deve possuir também texto/ícone, não depender somente da cor.

---

# 52. Página de login

A tela de login pode ser a página mais fortemente ligada à identidade visual.

Estrutura:

```text
┌──────────────────────────────────────────────┐
│                                              │
│ LOGO                 IMAGEM                  │
│                                              │
│ Acesso administrativo                        │
│                                              │
│ Email                                        │
│ [________________________]                   │
│                                              │
│ Palavra-passe                                │
│ [________________________]                   │
│                                              │
│ [ ENTRAR ]                                   │
│                                              │
└──────────────────────────────────────────────┘
```

Usar:

- fundo off-white;
- padrão ondulado;
- vermelho;
- fotografia institucional opcional.

---

# 53. Página inicial pública

Caso seja criada uma landing page para o evento:

```text
Hero
↓
Sobre o evento
↓
Tema “Imagem como Património”
↓
Oradores
↓
Programação
↓
Patrocinadores
↓
Validação de certificado
↓
Footer
```

Mas essa landing page não é necessária para o MVP de certificados.

---

# 54. Arquitetura visual do certificado

O certificado deve ser pensado como uma peça editorial independente.

Grid recomendado:

```text
A4 Landscape

┌─────────────────────────────────────────────────┐
│ Logo                               Elemento     │
│                                    decorativo   │
│                                                 │
│              CERTIFICADO                        │
│                                                 │
│          DE PARTICIPAÇÃO                        │
│                                                 │
│             [NOME]                              │
│                                                 │
│           [EVENTO]                              │
│                                                 │
│          [DESCRIÇÃO]                            │
│                                                 │
│                                                 │
│ Assinatura                       QR CODE        │
│                                                 │
│ Código do certificado                          │
└─────────────────────────────────────────────────┘
```

---

# 55. Segurança visual do certificado

Além do QR Code:

- número único;
- código de validação;
- nome do evento;
- nome do participante;
- data;
- organização.

Isso aumenta a confiança da credencial.

---

# 56. Princípio de autenticidade

O PDF não deve ser considerado a única prova.

A verdadeira fonte de autenticidade é:

```text
Código
   ↓
Sistema
   ↓
Registro do certificado
   ↓
Estado
```

O QR Code simplesmente facilita o acesso a essa validação.

---

# 57. Modelo mental do produto

O produto pode ser entendido como:

```text
                    EVENTO
                      │
          ┌───────────┴───────────┐
          │                       │
    PARTICIPANTE               ORGANIZAÇÃO
          │                       │
       PRESENÇA                EVENTO
          │                       │
          └───────────┬───────────┘
                      ↓
                 CERTIFICADO
                      │
              ┌───────┴───────┐
              ↓               ↓
             PDF             QR
                              │
                              ↓
                         VERIFICAÇÃO
```

---

# 58. Resultado visual esperado

Ao abrir o sistema, a percepção deve ser:

**“Este é o sistema oficial de um evento corporativo premium.”**

E não:

**“Este é apenas um CRUD de certificados.”**

A tecnologia deve ficar em segundo plano e a identidade do evento deve conduzir a experiência.

---

# 59. Prioridade visual do MVP

### Prioridade 1

Certificado.

### Prioridade 2

Página de validação.

### Prioridade 3

Presença.

### Prioridade 4

Gestão de participantes.

### Prioridade 5

Dashboard.

### Prioridade 6

Configurações.

Isso é importante porque o certificado e a validação são as partes que chegarão ao participante final.

---

# 60. Checklist final do Design System

## Marca

- [ ] Logo oficial
- [ ] Favicon
- [ ] Versão clara
- [ ] Versão escura
- [ ] Área de proteção do logo

## Cores

- [ ] Primary
- [ ] Accent
- [ ] Gold
- [ ] Background
- [ ] Surface
- [ ] Text
- [ ] Border
- [ ] Semantic colors

## Tipografia

- [ ] Font heading
- [ ] Font body
- [ ] Escala
- [ ] Pesos
- [ ] Line height

## Componentes

- [ ] Buttons
- [ ] Inputs
- [ ] Cards
- [ ] Tables
- [ ] Badges
- [ ] Modal
- [ ] Toast
- [ ] Dialog
- [ ] Empty state
- [ ] Loading
- [ ] Certificate preview

## Identidade

- [ ] Ondas
- [ ] Linhas vermelhas
- [ ] Fotografia
- [ ] Vermelho institucional
- [ ] Off-white
- [ ] Detalhes dourados

## Certificado

- [ ] Layout A4
- [ ] QR Code
- [ ] Número
- [ ] Código
- [ ] Assinatura
- [ ] Logo
- [ ] Validação

---

# 61. Diretriz final para implementação

A implementação deve seguir esta regra:

> **Usar a identidade visual do evento como linguagem de marca e não como decoração.**

O produto deve combinar:

```text
IDENTIDADE DO EVENTO
        +
DESIGN EDITORIAL
        +
UX MODERNA
        +
INTERFACE ADMINISTRATIVA
        +
CERTIFICADO DIGITAL
        +
VALIDAÇÃO PÚBLICA
```

O resultado esperado é uma plataforma simples, rápida e profissional, visualmente conectada ao **Portfólio Comunique — Imagem como Património**, mas suficientemente limpa para funcionar como um produto tecnológico real.

---

## 62. Resumo executivo do Design System

**Marca:** Ekanda / Portfólio Comunique

**Tema:** Imagem como Património

**Personalidade:** Premium, institucional, humana, editorial e contemporânea.

**Cor principal:** `#A62400`

**Cor de destaque:** `#DA2F01`

**Cor de apoio:** `#B38A5A`

**Background:** `#FFFFFF` / `#FAF8F5`

**Tipografia:** Montserrat + Inter, ou Inter como alternativa única.

**Elemento gráfico:** linhas onduladas suaves.

**Forma:** cards arredondados moderadamente, divisores horizontais e layouts editoriais.

**Fotografia:** retratos profissionais e institucionais.

**Produto:** plataforma de gestão de participantes, presença, emissão de certificados e validação pública.

**Experiência principal:**

```text
Participação
     ↓
Presença
     ↓
Certificação
     ↓
QR Code
     ↓
Validação
```

**Princípio central:**

> O certificado é a extensão digital da experiência e da credibilidade do evento.
