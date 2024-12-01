const getLeetCodeCnInfo = (username) => {
  let result = {
    name: username,
    easy_solved: 0,
    medium_solved: 0,
    hard_solved: 0,
    total_solved: 0,
    acceptance: '0%',
    star_rating: 0
  };

  // 手动给定的数据
  result.easy_solved = 151;
  result.medium_solved = 218;
  result.hard_solved = 46;
  result.total_solved = result.easy_solved + result.medium_solved + result.hard_solved;

  let totalSubmitNum = 1226;
  let acceptSubmitNum = 1024;
  result.acceptance = (acceptSubmitNum / totalSubmitNum) * 100;
  result.acceptance = result.acceptance.toFixed(1) + '%';
  
  result.star_rating = 0; // 假设星级评分是0

  return result;
};

module.exports = getLeetCodeCnInfo;
