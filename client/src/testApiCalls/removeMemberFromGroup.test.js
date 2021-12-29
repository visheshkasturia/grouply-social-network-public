/* eslint-disable */
import mockAxios from "jest-mock-axios";
import removeMemberFromGroup from "../apiCalls/removeMemberFromGroup";

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("remove member from group", async () => {
      // given
      const posts = [
        { id: 1, postTitle: "one" },
        { id: 2, postTitle: "two" },
      ];
      mockAxios.get.mockResolvedValueOnce(posts);

      // when
      const result = await removeMemberFromGroup();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/groups/removeMember/`);
    });
  });