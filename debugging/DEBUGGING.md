# Debugging Analysis

## Scenario 1: Issue with create employee on Postman

-   **Breakpoint Location:** employeeController.ts line 7
-   **Objective:** When I use postman to test the create employee endpoint, it returns an error 

### Debugger Observations

-   **Variable States:** {employeeData: undefined, newEmployee: undefined}
-   **Call Stack:** createEmployee endpoint gets called
-   **Behavior:** its not recieving the body data from the request which throws an error when it calls the addEmployee function

### Analysis

-   My createEmployee endpoint is not working properly
-   There could be something wrong with my controller code or im missing a dependency of maybe its Postman's fault.

-   The issue was that I forgot to add `app.use(express.json());` in app.ts so it wasn't parsing the body of the request
-   this issue doesn't only affect one function, this issue is affecting other fucntions i have and will 
    no doubt affect other functions that i have yet to add. fixing this issue no doubt fixed several issues with my code 

## Scenario 2: [Title of the Scenario]

[Repeat the same format as Scenario 1]

## Scenario 3: [Title of the Scenario]

[Repeat the same format as Scenario 1]