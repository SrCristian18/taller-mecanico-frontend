<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Frontend Best Practices for this Project

When writing code for this project, agents must adhere to the following guidelines:

1. **Keep it Simple & Reusable**: 
   - Build UI components that are small, focused, and single-purpose.
   - Avoid creating massive "god components". Break down complex interfaces into smaller, reusable building blocks.
   - Use props to make components flexible and adaptable to different contexts rather than duplicating logic.

2. **CSS Reusability**:
   - Reuse existing CSS classes and styles whenever possible.
   - Avoid adding redundant styles. If a styling pattern is repeated, abstract it into a reusable utility class or a shared component.
   - Maintain a consistent design system and leverage Tailwind CSS utilities efficiently without repeating identical class lists.

3. **General Best Practices**:
   - Keep a clean separation of concerns (logic vs. presentation).
   - Write clean, readable, and well-documented code.
   - Prioritize accessibility (a11y) and responsive design.

4. **Design and Aesthetics (Modern Automotive Workshop)**:
   - Follow a unique, cohesive visual style that reflects a "Modern Automotive Workshop" (industrial, clean, metallic accents, high contrast, vibrant highlight colors like neon orange or electric blue against dark/gray backgrounds).
   - Incrementally add and refine styles as you build out components, ensuring each new piece fits the overall modern workshop aesthetic immediately.
