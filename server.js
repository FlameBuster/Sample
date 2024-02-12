const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const port = 5500;

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.GoogleAuth({
    keyFile: 'abc.json', 
    scopes: SCOPES
});

const drive = google.drive({
    version: 'v3',
    auth
});

app.get('/getPdfFromDrive', async (req, res) => {
    try {
        const fileId = '1Pd0NGNIJjPDlmDN_Zi8yA_166VMjHtO3'; 
        const response = await drive.files.get({
            fileId,
            alt: 'media'
        }, { responseType: 'stream' });

        res.setHeader('Content-Type', 'application/pdf');
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching PDF from Google Drive:', error);
        res.status(500).send('Error fetching PDF from Google Drive');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
