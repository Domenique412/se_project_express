const router = require('express').Router();

router.get('/', () => console.log('GET users'));
router.get('/:userID', () => console.log('GET userID'))
router.post('/', () => console.log('creates users'))

module.exports = router;