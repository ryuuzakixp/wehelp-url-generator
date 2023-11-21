const crypto = require('crypto');
const buffer = require('buffer');
const querystring = require('querystring');
const moment = require('moment');

function base64UrlEncode(input) {
  return buffer.Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '_')
    .replace(/\//g, '-');
}

function generateUrl(obj, encryptKey) {

  if (!validationObj(obj)) {
    return "";
  }

  if (encryptKey === undefined || encryptKey.length === 0) {
    console.error('The encryptKey is empty.');
    return "";
  }

  var header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  var payload = JSON.stringify(obj);

  var encodedHeader = base64UrlEncode(header);
  var encodedPayload = base64UrlEncode(payload);
  var signatureInput = header + payload;

  var signature = crypto
    .createHmac('sha256', encryptKey)
    .update(signatureInput)
    .digest('base64');

  var encodedSignature = signature.replace(/\+/g, '_').replace(/\//g, '-');
  var accessToken = encodedHeader + '.' + encodedPayload + '.' + encodedSignature;
  var query = querystring.stringify({ access_token: accessToken });
  var url = 'https://app.wehelpsoftware.com/survey_persons/link?' + query;

  return url;
}

function validationObj(obj) {
  const listRequiredFields = [
    'code',
    'experience_id',
    'experience_date',
    'company_unit_code',
    'person'
  ];

  const requiredFields = listRequiredFields.filter(
    field => !obj.hasOwnProperty(field)
  );

  if (requiredFields.length > 0) {
    console.error(`Required fields: ${requiredFields.join(', ')}`);
    return false;
  }

  if (
    !moment(obj.experience_date, 'YYYY-MM-DD HH:mm:ss', true).isValid()
  ) {
    console.error('The "experience_date" field must be a valid date and time in the format "YYYY-MM-DD HH:mm:ss".');
    return false;
  }

  const listRequiredFieldsPerson = [
    'name',
    'internal_code',
    'type',
    'company_unit_code'
  ];

  if (!obj.person || typeof obj.person !== 'object') {
    console.error('The "person" field must be present and be an object.');
    return false;
  }

  const requiredFieldsPerson = listRequiredFieldsPerson.filter(
    field => !obj.person.hasOwnProperty(field)
  );

  if (requiredFieldsPerson.length > 0) {
    console.error(`Missing fields in the object "person": ${requiredFieldsPerson.join(', ')}`);
    return false;
  }

  return true;
}

module.exports = {
  generateUrl,
};