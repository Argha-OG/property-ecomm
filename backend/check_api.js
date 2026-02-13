const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/properties',
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
            console.log(`Number of properties returned: ${json.length}`);
            if (json.length > 0) console.log('Full ID:', json[0]._id);
        } catch (e) {
            console.log('Response is not JSON:', data.substring(0, 200));
        }
    });
});

req.on('error', error => {
    console.error('API Error:', error);
});

req.end();
