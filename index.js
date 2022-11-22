const express = require('express');
const express_app = express();

express_app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});
const port = process.env.PORT || 3000;
express_app.listen(port, () => {
    console.log(`listening on ${port}`);
});
