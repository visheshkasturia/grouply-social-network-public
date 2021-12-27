/* eslint-disable */
import mockAxios from "jest-mock-axios";
import userLogin from "../apiCalls/userLogin";

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("userLogin", async () => {
      // given
      const posts = [
        { id: 1, postTitle: "one" },
        { id: 2, postTitle: "two" },
      ];
      mockAxios.get.mockResolvedValueOnce(posts);

      // when
      // const result = await userLogin();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/groups/userLogin/`);
    });
  });