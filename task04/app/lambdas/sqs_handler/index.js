// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };
exports.handler = async (event) => {
    console.log("Received message from SQS:", JSON.stringify(event, null, 2));
    // Process the SQS message (e.g., perform other actions)
};