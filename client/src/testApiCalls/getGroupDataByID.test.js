/* eslint-disable */
import mockAxios from "jest-mock-axios";

import getGroupDataByID, { getGroupFilter } from '../apiCalls/getGroupDataByID';

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("getGroupDataByID", async () => {
      const groupId = '123';
      mockAxios.get.mockResolvedValueOnce(groupId);

      // when
      const result = await getGroupDataByID(groupId);

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/api/groups/getGroupByID/123`);
      // expect(result).not.toEqual(posts);
    });
  });