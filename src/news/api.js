var API_KEY = "e16a583559734cb99061351552647627" || process.env.NEWS_API_KEY;
var BASE_URL = process.env.NEWS_BASE_URL || "https://newsapi.org/v2/";

export default {
  async get(keyword) {
    return await this._get("everything");
  },

  async getSources(options) {
    let params = new URLSearchParams();
    options.country && params.append("country", options.country);
    options.category && params.append("category", options.category);
    options.language && params.append("language", options.language);
    let url = "sources?" + params.toString();
    let result = await this._get(url);
    return result.sources;
  },

  async getArticles(options) {
    return this._getArticles("everything", options);
  },

  async getHeadlines(options) {
    return this._getArticles("top-headlines", options);
  },

  async _getArticles(url, options) {
    let params = new URLSearchParams();
    if (options.country || options.category) {
      params.append("country", options.country);
      params.append("category", options.category);
    } else if (options.sources) {
      let sourcesS = options.sources.map(source => source.id).join(",");
      params.append("sources", sourcesS);
    }
    params.append("sortBy", encodeURI(options.sortBy));
    params.append("q", encodeURI(options.query));
    url += "?" + params.toString();
    let result = await this._get(url);
    return result.articles;
  },

  async _get(url, options) {
    url = new URL(url, BASE_URL);
    let result = await fetch(url, { headers: { "X-Api-Key": API_KEY } });
    let json = result.json();
    if (json.status === "error") {
      throw new Error(json.message);
    }
    return json;
  }
};
