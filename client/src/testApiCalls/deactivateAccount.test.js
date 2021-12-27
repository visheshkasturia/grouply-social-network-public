/* eslint-disable */
import mockAxios from "jest-mock-axios";
import deactivateAccount from "../apiCalls/deactivateAccount"

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("deactivate account", async () => {
      // given
      mockAxios.get.mockResolvedValueOnce();

      // when
      const result = await deactivateAccount();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/api/user/acceptMember/`);
    //   expect(result).not.toEqual(undefined);
    });
  });