const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const moment = require('moment');  // For ISO8601 formatting

// Lambda handler to process stream events
exports.handler = async (event) => {
    // Iterate over each record from the DynamoDB Stream event
    for (const record of event.Records) {
        // Check if the record is an Insert or Modify
        if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
            const newItem = record.dynamodb.NewImage;
            const oldItem = record.eventName === 'MODIFY' ? record.dynamodb.OldImage : null;
            
            const itemKey = newItem.key.S;  // itemKey from 'Configuration'
            const modificationTime = moment().toISOString();  // ISO8601 formatted string
            const auditItem = {
                id: uuid.v4(),
                itemKey: itemKey,
                modificationTime: modificationTime,
            };
            
            // If it's a new item (INSERT) or modified item (MODIFY)
            if (record.eventName === 'INSERT') {
                // Audit entry for insert
                auditItem.newValue = {
                    key: newItem.key.S,
                    value: newItem.value.N
                };
            } else if (record.eventName === 'MODIFY') {
                // Audit entry for modification
                auditItem.updatedAttribute = 'value';
                auditItem.oldValue = oldItem.value.N;
                auditItem.newValue = {
                    key: newItem.key.S,
                    value: newItem.value.N
                };
            }

            // Insert the audit entry into the 'Audit' table
            const params = {
                TableName: process.env.AUDIT_TABLE,  // 'Audit' table name passed as env var
                Item: auditItem
            };

            try {
                await dynamoDB.put(params).promise();
                console.log(`Audit entry created for ${itemKey}`);
            } catch (error) {
                console.error('Error inserting audit item:', error);
                throw error;
            }
        }
    }

    return { statusCode: 200, body: 'Audit process completed' };
};
