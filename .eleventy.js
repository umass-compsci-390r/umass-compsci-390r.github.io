module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/js");
    eleventyConfig.addPassthroughCopy("./src/CNAME");
    eleventyConfig.addPassthroughCopy("./src/resources");
    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  };