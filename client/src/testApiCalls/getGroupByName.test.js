/* eslint-disable */
import mockAxios from "jest-mock-axios";

import getGroupByName from '../apiCalls/getGroupByName';

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("getGroupDataByName", async () => {
      const groupName= 'test';
      mockAxios.get.mockResolvedValueOnce();

      // when
      const result = await getGroupByName(groupName);

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/api/groups/getGroup/test`);
      // expect(result).not.toEqual(posts);
    });
  });