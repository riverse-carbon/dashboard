export const getYearsCreditsPricesFields = data => {
  var response = {};

  var priceRange = [50, 50];

  if (data && data.length !== 0) {
    var dataCopy = [...data];
    var pricesPerYear = [];
    var creditsPerYear = [];
    var years = [];

    dataCopy.forEach(dataCopy => {
      const yearCreditsPrice = dataCopy.split('|');

      const year = yearCreditsPrice[0];
      const credits = +yearCreditsPrice[1];
      var price = +yearCreditsPrice[2];

      if (price < priceRange[0]) {
        priceRange[0] = price;
      }
      if (price > priceRange[1]) {
        priceRange[1] = price;
      }
      pricesPerYear.push(price);
      creditsPerYear.push(credits);
      years.push(year);
    });

    response.pricesPerYear = pricesPerYear;
    response.creditsPerYear = creditsPerYear;
    response.years = years;
  }
  response.priceRange = priceRange;

  return response;
};
