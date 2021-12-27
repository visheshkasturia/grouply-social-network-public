/* eslint-disable */
import mockAxios from "jest-mock-axios";

import getUserGroups from "../apiCalls/getUserGroups";

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("getUserGroups", async () => {
      const groupId = '123';
      mockAxios.get.mockResolvedValueOnce(groupId);

      // when
      const result = await getUserGroups(groupId);

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/api/filter/groupsByUID/`);
      // expect(result).not.toEqual(posts);
    });
  });