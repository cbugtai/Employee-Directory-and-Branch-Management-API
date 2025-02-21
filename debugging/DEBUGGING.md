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

## Scenario 2: Branch Management Logic (Update Branch)

-   **Breakpoint Location:** branchService.ts Line 60
-   **Objective:** How the logic of the updateBranch function works

### Debugger Observations

-   **Variable States:** arguments = (id: "11", updateData: {id, address, name, phone}),
                other key variables = (branch: {id, address, name, phone}, safeUpdate: {address, name, phone})
-   **Call Stack:** updateBranch on branchController gets called then calls updateBranch on branchService
-   **Behavior:** updateBranch finds the branch that matches the given branchID then deletes the id property of the 
                updateData object to create a safeUpdate object then assigns the safeUpdate object data to the branch data.

### Analysis

-   How the data changes as it goes through the updateBranch function
-   The function worked as intended
-   Maybe implement a way to create a branch instead if the id is missing.
-   It gave me a deeper undestanding on how object data works which is used all over my code

## Scenario 3: Exploring the Logical Operation Relationships

-   **Breakpoint Location:** logicService.ts Line 11
-   **Objective:** Explore the relationship between employee and branches

### Debugger Observations

-   **Variable States:** branchID = 8, employees = Array(20), return value = array(2)
-   **Call Stack:** getBranchEmployees on logicController.ts gets called then calls on getBranchEmployees on logicService.ts
-   **Behavior:** getBranchEmployees filters out all objects that doesnt have the property {branchID: "8"} from the employees array
                    then returns the rest as an array of objects

### Analysis

-   id is not the only way the employee object can be filtered by, other properties can also be used
-   no, the logic is working as intended
-   i cant see any areas that need improving at this time
-   it gives me a better understanding of how to manipulate an array of objects which is used on most functions in my code.