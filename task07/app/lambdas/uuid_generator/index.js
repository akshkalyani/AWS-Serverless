const AWS = require('aws-sdk');
const uuid = require('uuid');
const moment = require('moment');

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;  // The S3 bucket name passed as an environment variable

exports.handler = async (event) => {
    try {
        // Generate 10 random UUIDs
        const uuids = [];
        for (let i = 0; i < 10; i++) {
            uuids.push(uuid.v4());
        }

        // Get the current execution start time in ISO 8601 format
        const executionStartTime = moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        // Create the content to store in the file (a list of UUIDs)
        const content = JSON.stringify({ ids: uuids }, null, 2);

        // Define the file name with the execution start time
        const fileName = `${executionStartTime}.json`;

        // Upload the generated UUIDs to the S3 bucket
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: content,
            ContentType: 'application/json',
        };

        await s3.putObject(params).promise();

        console.log(`File uploaded successfully to S3: ${fileName}`);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'UUIDs generated and uploaded successfully', fileName: fileName }),
        };
    } catch (error) {
        console.error('Error occurred:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred', error: error.message }),
        };
    }
};
