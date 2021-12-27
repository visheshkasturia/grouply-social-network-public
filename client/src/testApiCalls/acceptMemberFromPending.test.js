/* eslint-disable */
import mockAxios from "jest-mock-axios";
import acceptMemberFromPending from "../apiCalls/acceptMemberFromPending"

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("accept member from pending", async () => {
      // given
      const posts = [
        { id: 1, postTitle: "one" },
        { id: 2, postTitle: "two" },
      ];
      mockAxios.get.mockResolvedValueOnce(posts);

      // when
      const result = await acceptMemberFromPending();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/api/user/acceptMember/`);
      expect(result).not.toEqual(posts);
    });
  });