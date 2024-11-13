// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };

exports.handler = async (event) => {
    console.log("Received message from SNS:", JSON.stringify(event, null, 2));
    // Process the SNS message (e.g., perform other actions)
};
