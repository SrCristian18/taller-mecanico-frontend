<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Context
A mechanical workshop receives several vehicles daily for different types of services (repair, maintenance, diagnostics, etc.). Currently, the owner lacks a digital tool to register and track the status of each vehicle during the service process. Information about vehicles and services is handled manually or informally, leading to potential data loss, difficulty in tracking progress, and uncertainty about service duration.

This project aims to provide the digital tools to solve these issues.

## Requirements

### Functional Requirements
1. **Register Vehicle**: Interface to enter vehicle information.
2. **Register Owner**: Interface to capture owner details.
3. **Register Service Type**: Selection of requested services.
4. **List Vehicles**: View of all registered vehicles and their status.
5. **Update Status**: Easy mechanism to change service progress.
6. **Finish Service**: Action to finalize and close a service.
7. **Time Calculation**: Display total attention time.
8. **Service History**: Search and view past services.

### Non-Functional Requirements
1. **Efficiency**: Registration flow must be completed in less than 1 minute.
2. **Security**: Secure data handling.
3. **Usability**: Simple and easy-to-use industrial-themed interface.
4. **Performance**: Quick response times for lists and searches.
5. **Responsive Design**: The interface must adapt and work seamlessly across different devices (mobile, tablet, desktop).

---

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

5. **No Hard Deletes Policy**:
   - **CRITICAL RULE**: Never implement or suggest physical `DELETE` operations.
   - All entities must use a status-based "Soft Delete" (e.g., active/inactive state).
   - The frontend should respect this by updating status fields instead of calling delete endpoints.

# Backend Analysis (Hexagonal Architecture)
The backend is a Spring Boot application using Hexagonal Architecture.

## Domain Models
- **Vehicle**: Represents a vehicle in the workshop.
  - `plate`: Vehicle identifier.
  - `brand`: Manufacturer brand.
  - `model`: Vehicle model.
  - `owner`: Reference to the Owner.
  - `service`: Reference to the current Service.
  - `entryDate`: Date when the vehicle entered the workshop.
  - `exitDate`: Date when the service was completed.
- **Owner**: Represents the vehicle owner.
  - `name`: Full name.
  - `phone`: Contact number.
- **Service**: Represents the work being performed.
  - `type`: Type of service (e.g., oil change, brake repair).
  - `status`: Current state (`ServiceStatus`).
- **ServiceStatus** (Enum):
  - `EN_ESPERA`: Waiting for a technician.
  - `EN_PROCESO`: Work in progress.
  - `FINALIZADO`: Service completed.

## Planned Operations (API Surface)
Based on `VehicleUseCase`, the frontend should expect the following functionality:
- **Register Vehicle**: Create a new entry in the system.
- **List All Vehicles**: Display active and past workshop entries.
- **Update Status**: Change the current state of a vehicle's service.
- **Finish Service**: Mark a service as completed and record the exit date.
- **Get History**: Search for past services by vehicle plate or owner name.

*Note: As of now, the backend defines the domain and ports but lacks controller implementations. Endpoints will likely follow REST conventions based on these use cases.*
