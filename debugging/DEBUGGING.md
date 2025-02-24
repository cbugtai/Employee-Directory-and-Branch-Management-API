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

## Scenario 2: Firestore Operations

-   **Breakpoint Location:** employeeController.ts Line 50
-   **Objective:** investigating how my services interacts with the Firestore database
                    specifically for getEmployee

### Debugger Observations

-   **Variable States:** req.params = { id: "8huwzwR8bScljUuBSj4e" }
                         successResponse Return Value = 
                         {
                            "status": "success",
                            "data": {
                                "id": "8huwzwR8bScljUuBSj4e",
                                "name": "Alice Johnson",
                                "position": "Branch Manager",
                                "department": "Management",
                                "email": "alice.johnson@pixell-river.com",
                                "phone": "604-555-0148",
                                "branchID": "1"
                            },
                            "message": "Employee ID 8huwzwR8bScljUuBSj4e Retrieved"
                        }
-   **Call Stack:** The endpoint gets called and the request passed through validation.
-   **Behavior:** The controller calls the employeeService.getEmployee method using the request parameter id,
                then the firebase.getDocumentById function gets called with "employee" collection and the Id,
                the getDocumentById function then queries the firestore database using the "employee" collection and id
                and gets the snapshot for that document, its then returned to employeeService.getEmployee which parses that 
                snapshot data into an Employee type and returns it to employeeController.getEmployee as result which is
                then sent to successResponse with a message which then formats it for the response.

### Analysis

-   I learned how my service works when called successfully including interaction with the firestore database
-   No unexpected behavior observed
-   No areas of improvemen found at this time
-   Getting a step-by-step look at my getEmployee service function allows me to understand my overall code better 
    especially the middleware for firestore and the responseModels

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