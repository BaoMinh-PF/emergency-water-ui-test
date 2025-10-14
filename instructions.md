<context>
<instructions>
<orchestrator>
I have provided <orchestrator>Orchestrator</orchestrator> with <task_>Tasks</task_> that contain <specifications>Specifications</specifications> for issues that need to be solved and improvements/changes to implement. Orchestrator will systematically delegate clearly specified instructions for every task to <architect>Architect</architect> to create a solution and provide an implementation plan for approval. When the plan is approved, Orchestrator delegates the plan to <code>Code</code> for a full implementation.

<specifications>
<task_1>
Set up a new project using React, Next.js, Node.js, and TypeScript. Ensure the project is modular and scalable. Use the latest stable versions. Include basic folder structure for components, pages, services, and utils.
</task_1>

<task_2>
Configure environment variables and routing. Use `.env.local` for sensitive data. Set up basic routing using Next.js pages and dynamic routes if needed.
</task_2>

<task_3>
Implement a service to connect to MS SQL Server using a secure method (e.g., `mssql` package). Create a reusable database service that can query geometry data from a specified table.
</task_3>

<task_4>
Parse geometry data from WKT format to GeoJSON. Use `@terraformer/wkt` or similar libraries. Ensure the parser is modular and can be extended to support other formats in the future.
</task_4>

<task_5>
Display parsed GeoJSON data using OpenLayers. Create a map component that can render layers dynamically. Ensure it supports zoom, pan, and layer toggling.
</task_5>

<task_6>
Create a sidebar component with toggles to load different types of geometry data from the database. Each toggle should trigger a query and update the map accordingly. Ensure the sidebar is modular and easy to extend.
</task_6>
</specifications>
</orchestrator>

<architect>
Architect always uses Context7 MCP server to find up-to-date documentation and best practices for associated libraries and dependencies to base all solutions on.
</architect>

<code>
Code must focus on completing one task at a time, and ensure to always mark completed tasks in the **TODO** list and not start a new task before the previous has been marked as complete. When Code has completed a **TODO** list, Code delegates a summary to Architect for <first_verification>Verification</first_verification>.
</code>
</instructions>

<first_verification>
<instructions>
<architect>
Architect reviews and <step_>Step-By-Step</step_> verifies the implementation and tasks completed by Code and if no issues are identified, Architect delegates to Orchestrator with confirmation to proceed with the next step. **BUT** If any issues are identified, Architect will instead identify a solution and delegate to Code for implementation.
</architect>

<code>
Code must focus on completing one task at a time, and ensure to always mark completed tasks in the **TODO** list and not start a new task before the previous has been marked as complete. When Code has completed a **TODO** list, Code delegates a summary to Orchestrator for <second_verification>Verification</second_verification>.
</code>
</instructions>
</first_verification>

<second_verification>
<orchestrator>
Orchestrator reviews and verifies the summary of the implemented solution by Code and verifies the implementation is free from issues or pending tasks. IF any issues are identified, you report the errors to Architect to create a solution and delegate it to Code for implementation. When **NO** more issues or pending tasks have been confirmed, you assess the current status and delegate the next pending task.

<architect>
Architect will design solutions for any error reported by Orchestrator and delegate the solution to Code for implementation.
<code>
Code will first complete any pending or delegated tasks and always add <step_>Step-By-Step</step_> as the last tasks in the **TODO** list and delegate a report with <first_verification>Errors</first_verification> to Architect.
</code>
</orchestrator>

<step_1>
Initialize project with React, Next.js, Node.js, and TypeScript.
</step_1>
<step_2>
Set up environment variables and routing.
</step_2>
<step_3>
Connect to MS SQL Server and retrieve geometry data.
</step_3>
<step_4>
Parse WKT to GeoJSON.
</step_4>
<step_5>
Render GeoJSON on OpenLayers map.
</step_5>
<step_6>
Create sidebar with toggles for different data types.
</step_6>
<step_7>
Verify modularity and ease of future updates.
</step_7>

</architect>
</code>
</instructions>
</second_verification>
</context>