# Debugging Analysis

## Scenario 1: Validation Logic

-   **Breakpoint Location:** Validate.ts Line 36
-   **Objective:** Investigating the Validation Logic of my code specifically for update branch

### Debugger Observations

-   **Variable States:** data = {
                                name: "",
                                address: "317-A Fisher Road, Arborg, MB, R0C 0A0",
                                phone: "204-555-3461",
                                }
                         error = "Validation error: Name cannot be empty."
-   **Call Stack:** from the router, it calls validateRequest for the parameter value 
                    which then calls validate to check the request parameter (branchID) 
                    against the branchID Schema when it passes, it then calls validateRequest 
                    again for the request body which then calls validate to check the body 
                    against the branchSchema 
-   **Behavior:** The validate throws an error due to the empty name.

### Analysis

-   I Understood how my validation middleware works better.
-   No unexpected behavior observed.
-   I can't think of any ways to improve this at this time
-   This is the validation middleware of my code, no matter which 
    schema is used or which route is using it this is the same code 
    being used, understanding it better helps me understand how 
    validation works for the whole project

## Scenario 2: [Title of the Scenario]

-   **Breakpoint Location:** [File and line number]
-   **Objective:** [What you are investigating or trying to understand]

### Debugger Observations

-   **Variable States:** [List key variables and their values]
-   **Call Stack:** [Summarize the function sequence leading to the breakpoint]
-   **Behavior:** [Describe what happens at this point in the program]

### Analysis

-   What did you learn from this scenario?
-   Did you observe any unexpected behavior? If so, what might be the cause?
-   Are there areas for improvement or refactoring in this part of the code?
-   How does this enhance your understanding of the overall project?

## Scenario 3: [Title of the Scenario]

-   **Breakpoint Location:** [File and line number]
-   **Objective:** [What you are investigating or trying to understand]

### Debugger Observations

-   **Variable States:** [List key variables and their values]
-   **Call Stack:** [Summarize the function sequence leading to the breakpoint]
-   **Behavior:** [Describe what happens at this point in the program]

### Analysis

-   What did you learn from this scenario?
-   Did you observe any unexpected behavior? If so, what might be the cause?
-   Are there areas for improvement or refactoring in this part of the code?
-   How does this enhance your understanding of the overall project?