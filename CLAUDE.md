@AGENTS.md

---

## Skills y Agentes locales (`.agents/` está en `.gitignore`)

Para evitar conflictos de merge entre compañeros, la carpeta `.agents/` se mantiene local (ignorada por Git).

### Skills instaladas / requeridas en el proyecto

- **Sistema de diseño oficial:** `ayniradar-design-system` (paleta *Noche de emergencia*: `#0D1520`, `#16222F`, `#E9F1F5`, `#2BB673`, `#4FB3F0`, `#F5B324`, `#EF5A4C`, tipografía Poppins, contraste WCAG y reglas de logo).
- **Diseño y UI/UX:** `frontend-design`, `ui-ux-pro-max`, `impeccable`.
- **Frontend React, QA y Accesibilidad:** `react-best-practices`, `react-review`, `react-test`, `react-build`, `a11y-debugging`, `e2e-testing`, `browser-qa`.
- **Calidad, BD e IA:** `tdd-workflow`, `verification-loop`, `supabase`, `supabase-postgres-best-practices`, `gemini-api-dev`.
- **Backend NestJS (`@nestjs/skills`):** `nestjs`, `nestjs-feature`, `nestjs-data`, `nestjs-auth`, `nestjs-testing`, `nestjs-production`.

### Cómo instalar o agregar nuevas skills localmente

1. **Skill compartida por un compañero (archivo `.md` o carpeta):**
   - Crea la carpeta `.agents/skills/<nombre-skill>/` (en `kebab-case`, ej. `.agents/skills/ayniradar-design-system/`).
   - Guarda el archivo como `SKILL.md` dentro de esa carpeta.
   - Asegúrate de que tenga frontmatter YAML al inicio:
     ```yaml
     ---
     name: <nombre-skill>
     description: Descripción breve de cuándo usar esta skill.
     ---
     ```
2. **Skills desde CLI (ej. NestJS / Vercel / ECC):**
   ```bash
   npx skills add <paquete-o-repo> --agent claude-code
   ```
3. **Al agregar una skill nueva que necesite todo el equipo:**
   - Documenta su nombre y propósito aquí en `CLAUDE.md` (este archivo **sí** se versiona en Git).
   - Comparte el `SKILL.md` por Discord/WhatsApp o mediante una referencia en `docs/` si aplica, sin quitar `.agents/` de `.gitignore`.
