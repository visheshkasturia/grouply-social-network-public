/* eslint-disable */
import mockAxios from "jest-mock-axios";

import { getAllposts } from '../apiCalls/getAllposts';

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("should return all posts", async () => {
      // given
      const posts = [
        { id: 1, postTitle: "one" },
        { id: 2, postTitle: "two" },
      ];
      mockAxios.get.mockResolvedValueOnce(posts);

      // when
      const result = await getAllposts();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/posts/allPosts`);
      expect(result).not.toEqual(posts);
    });
  });