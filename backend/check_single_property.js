const http = require('http');

const id = '698f29f6e50d6ebedcf7994f'; // ID from previous step

const options = {
    hostname: 'localhost',
    port: 5000,
    path: `/api/properties/${id}`,
    method: 'GET'
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    let data = '';

    res.on('data', d => {
        data += d;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('Property Title:', json.title);
        } catch (e) {
            console.log('Response is not JSON:', data.substring(0, 200));
        }
    });
});

req.on('error', error => {
    console.error('API Error:', error);
});

req.end();
