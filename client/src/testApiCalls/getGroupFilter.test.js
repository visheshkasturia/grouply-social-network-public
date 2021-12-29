/* eslint-disable */
import mockAxios from "jest-mock-axios";

import { getGroupFilter } from '../apiCalls/getGroupFIlter';

const BASE_URL = "http://localhost:8080/api";

describe("when API call is successful", () => {
    it("group filter", async () => {
      // given
      const posts = [
        { id: 1, postTitle: "one" },
        { id: 2, postTitle: "two" },
      ];
      mockAxios.get.mockResolvedValueOnce(posts);

      // when
      const result = await getGroupFilter();

      // then
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/api/filter/tags/`);
      expect(result).not.toEqual(posts);
    });
  });