const AWS = require('aws-sdk');
const uuid = require('uuid');
const moment = require('moment');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const auditTable = process.env.AUDIT_TABLE;  // The Audit table name passed as an environment variable

exports.handler = async (event) => {
    for (const record of event.Records) {
        console.log('Processing record: ', JSON.stringify(record));

        // Insert Event - A new item is added to the Configuration table
        if (record.eventName === 'INSERT') {
            const newItem = record.dynamodb.NewImage;
            const itemKey = newItem.key.S;
            const value = parseInt(newItem.value.N);
            const modificationTime = moment.utc().toISOString(); // ISO 8601 format

            const auditEntry = {
                id: uuid.v4(),
                itemKey: itemKey,
                modificationTime: modificationTime,
                newValue: {
                    key: itemKey,
                    value: value,
                },
            };

            // Insert audit entry into the Audit table
            await dynamodb.put({
                TableName: auditTable,
                Item: auditEntry,
            }).promise();

            console.log('Audit entry created for INSERT event:', JSON.stringify(auditEntry));

        } else if (record.eventName === 'MODIFY') {
            // Modify Event - The value of an existing item in the Configuration table has changed
            const newItem = record.dynamodb.NewImage;
            const oldItem = record.dynamodb.OldImage;

            const itemKey = newItem.key.S;
            const newValue = parseInt(newItem.value.N);
            const oldValue = parseInt(oldItem.value.N);
            const modificationTime = moment.utc().toISOString(); // ISO 8601 format

            const auditEntry = {
                id: uuid.v4(),
                itemKey: itemKey,
                modificationTime: modificationTime,
                updatedAttribute: 'value',
                oldValue: oldValue,
                newValue: newValue,
            };

            // Insert audit entry into the Audit table
            await dynamodb.put({
                TableName: auditTable,
                Item: auditEntry,
            }).promise();

            console.log('Audit entry created for MODIFY event:', JSON.stringify(auditEntry));
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Audit records processed successfully' }),
    };
};
