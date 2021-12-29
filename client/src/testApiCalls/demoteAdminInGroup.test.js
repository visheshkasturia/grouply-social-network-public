/* eslint-disable */
import mockAxios from "jest-mock-axios";
import demoteAdminInGroup from "../apiCalls/demoteAdminInGroup"

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("demote admin", async () => {
      // given
      mockAxios.get.mockResolvedValueOnce();

      // when
      const result = await demoteAdminInGroup();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/api/user/acceptMember/`);
      expect(result).not.toEqual(undefined);
    });
  });