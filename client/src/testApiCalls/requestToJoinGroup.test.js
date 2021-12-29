/* eslint-disable */
import mockAxios from "jest-mock-axios";
import requestToJoinGroup from "../apiCalls/requestToJoinGroup"

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("demote admin", async () => {
      // given
      mockAxios.get.mockResolvedValueOnce();

      // when
      const result = await requestToJoinGroup();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/api/user/request/`);
    //   expect(result).toEqual(undefined);
    });
  });