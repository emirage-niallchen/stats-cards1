const axios = require('axios');

async function getLeetCodeInfo(username) {
  let result = {
    name: username,
    easy_solved: 0,
    medium_solved: 0,
    hard_solved: 0,
    total_solved: 0,
    acceptance: '0%',
    star_rating: 0
  };
  try {
    let res = await axios.post(
      `https://leetcode.com/graphql`,
      `{"operationName":"getUserProfile","variables":{"username":"${username}"},"query":"query getUserProfile($username: String!) {\\n  allQuestionsCount {\\n    difficulty\\n    count\\n    __typename\\n  }\\n  matchedUser(username: $username) {\\n    username\\n    socialAccounts\\n    githubUrl\\n    contributions {\\n      points\\n      questionCount\\n      testcaseCount\\n      __typename\\n    }\\n    profile {\\n      realName\\n      websites\\n      countryName\\n      skillTags\\n      company\\n      school\\n      starRating\\n      aboutMe\\n      userAvatar\\n      reputation\\n      ranking\\n      __typename\\n    }\\n    submissionCalendar\\n    submitStats {\\n      acSubmissionNum {\\n        difficulty\\n        count\\n        submissions\\n        __typename\\n      }\\n      totalSubmissionNum {\\n        difficulty\\n        count\\n        submissions\\n        __typename\\n      }\\n      __typename\\n    }\\n    badges {\\n      id\\n      displayName\\n      icon\\n      creationDate\\n      __typename\\n    }\\n    upcomingBadges {\\n      name\\n      icon\\n      __typename\\n    }\\n    activeBadge {\\n      id\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}`,
      {
        headers: {
          'authority': 'leetcode.com',
          'content-type': 'application/json',
          'origin': 'https://leetcode.com',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': ' cors',
          'sec-fetch-dest': 'empty',
          'referer': `https://leetcode.com/${username}/`
        }
      }
    );

    let data = res.data.data;
    result.easy_solved = data.matchedUser.submitStats.acSubmissionNum[1].count + 151;
    result.medium_solved = data.matchedUser.submitStats.acSubmissionNum[2].count + 218;
    result.hard_solved = data.matchedUser.submitStats.acSubmissionNum[3].count+46;
    result.total_solved = result.easy_solved+result.hard_solved+result.medium_solved;
    result.acceptance = (data.matchedUser.submitStats.acSubmissionNum[0].submissions +1024) / (data.matchedUser.submitStats.totalSubmissionNum[0].submissions +1226);
    result.acceptance *= 100;
    result.acceptance = result.acceptance.toFixed(1);
    result.acceptance = result.acceptance + '%';
    result.star_rating = data.matchedUser.profile.starRating;
    if (data.matchedUser.profile.realName) {
      result.name = data.matchedUser.profile.realName;
    }
  } catch (e) {
    console.error(e);
  }
  return result;
}

module.exports = getLeetCodeInfo;
