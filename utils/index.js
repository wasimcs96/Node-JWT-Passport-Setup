const { buildSuccObject } = require('./buildSuccObject');
const { buildErrObject } = require('./buildErrObject');
const { handleError } = require('./handleError');
const { handleSuccess } = require('./handleSuccess')
const { dataNotFound } = require('./dataNotFound');


module.exports = {
    buildSuccObject,
    buildErrObject,
    handleError,
    handleSuccess,
    dataNotFound
}