/* eslint-disable */
import mockAxios from "jest-mock-axios";
import addComment from "../apiCalls/addComment";

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("add comment", async () => {
      // given
      const posts = [
        { id: 1, postTitle: "one" },
        { id: 2, postTitle: "two" },
      ];
    const input = {
        postId: 1,
        userId: 1,
        content: 1,
      };
      mockAxios.get.mockResolvedValueOnce(posts);

      // when
      const result = await addComment(input);

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/groups/removeMember/`);
    });
  });