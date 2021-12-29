/* eslint-disable */
import mockAxios from "jest-mock-axios";

import { getPublicGroups } from '../apiCalls/getPublicGroups';
import { getUserDataByID } from '../apiCalls/getUserDataByID';

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("public groiups", async () => {
      // given
      const groups = [
        { id: 1, groupName: "one" },
        { id: 2, groupName: "two" },
      ];
      mockAxios.get.mockResolvedValueOnce(groups);

      // when
      const result = await getPublicGroups();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/filter/public`);
      expect(result).not.toEqual(groups);
    });

    it("get user data by ID", async () => {
        // given
        const groups = [
          { id: 1, groupName: "one" },
          { id: 2, groupName: "two" },
        ];
        mockAxios.get.mockResolvedValueOnce(groups);
  
        // when
        const result = await getUserDataByID();
  
        // then
        expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}`);
        expect(result).not.toEqual(groups);
      });
  });