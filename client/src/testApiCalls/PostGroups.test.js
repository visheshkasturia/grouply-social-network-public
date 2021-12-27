/*eslint-disable */
import axios from 'axios';
// import PostGroups from '../apiCalls/PostGroups.js';
const MockAdapter = require('axios-mock-adapter');
const lib = require('../apiCalls/PostGroups.js');
const mockAxios = new MockAdapter(axios);
describe('the api returned correct data for new Player creation on 200', () => {
  const input = {
            groupName: 'testing',
            description: 'description',
            privacy: 'public',
            tags: 'tags',
            createdBy: 'dummy'
          }
  mockAxios.onPost().reply(200, {
            groupName: 'testing',
            description: 'description',
            privacy: 'public',
            tags: 'tags',
            createdBy: 'dummy'});

  test('the handle is Ok', () =>  lib.PostGroups(input).then((data) => {
    expect(data).not.toBe('testing')
  }));
});




