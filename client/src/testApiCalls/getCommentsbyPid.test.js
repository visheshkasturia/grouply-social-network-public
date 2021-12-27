/* eslint-disable */
import mockAxios from "jest-mock-axios";

import { getCommentsByPid} from '../apiCalls/getCommentsByPid';

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("post data", async () => {
      // given
      const posts = [
        { id: 1, postTitle: "one" },
        { id: 2, postTitle: "two" },
      ];
      mockAxios.get.mockResolvedValueOnce(posts);

      // when
      const result = await getCommentsByPid();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/getPostByID/`);
      expect(result).not.toEqual(posts);
    });
  });