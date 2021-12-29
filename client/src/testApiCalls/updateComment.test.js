/* eslint-disable */
import mockAxios from "jest-mock-axios";

import { updateComment } from '../apiCalls/updateComment';

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("post data", async () => {
      // given
      const posts = [
        { id: 1, postTitle: "one" },
        { id: 2, postTitle: "two" },
      ];

      const input ={ userId: 1, postId: 1, groupId: 1};
      mockAxios.get.mockResolvedValueOnce(posts);

      // when
      const result = await updateComment(input);

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/getPostByID/`);
      expect(result).not.toEqual(posts);
    });
  });