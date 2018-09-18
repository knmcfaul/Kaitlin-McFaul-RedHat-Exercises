To run via command line:

In /src/, execute: "node Exec.js". This runs the remoteMathService method provided in the exercise.

To run the uni test confirming the result:

In /redhat exercise 1/, execute: "npm i" and then "npm test". This installs the dependencies and then runs the unit test.

Additional notes:

I moved the remoteMathService function call to a separate file (Exec.js), to prevent the unit test from also running the extra call every execution.

After I determined the issue with the code snippet to be related to the inner function timeouts, I decided to edit the code to include Promises. This ensures that remoteMathService will await the two inner service functions before returning.
